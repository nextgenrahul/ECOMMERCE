import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(AppContext);
    const [searchParams] = useSearchParams();

    // Guard reference pointer to ensure verification runs exactly once per mount thread
    const processingRef = useRef(false);

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const verifyPayment = async () => {
        // Prevent double execution caused by React 18 StrictMode mount dual cycles
        if (processingRef.current) return;
        processingRef.current = true;

        try {
            if (!token) {
                toast.error("Authorization signature absent. Aborting alignment.");
                navigate('/cart');
                return;
            }

            const response = await axios.post(
                `${backendUrl}/api/order/verifyStripe`,
                { success, orderId },
                { withCredentials: true }
            );

            if (response.data.success) {
                setCartItems({});
                // LocalStorage fallback sync to match the clear event
                localStorage.removeItem("cartData");
                toast.success("Transaction token verified. Manifest synchronized.");
                navigate('/orders');
            } else {
                toast.error("Payment authorization sequence rejected by external provider.");
                navigate('/cart');
            }
        } catch (error) {
            console.error("Gateway execution crash:", error);
            toast.error(error?.response?.data?.message || "Fulfillment processing error.");
            navigate('/cart');
        }
    };

    useEffect(() => {
        if (token) {
            verifyPayment();
        }
    }, [token]);

    return (
        <section className="min-h-[75vh] w-full flex flex-col items-center justify-center bg-white text-black px-6">
            <div className="max-w-md w-full border-2 border-black p-8 text-center space-y-6 relative overflow-hidden">

                {/* Core Animated Processing Pulse Accent */}
                <div className="flex justify-center items-center py-4">
                    <div className="relative flex items-center justify-center h-12 w-12">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-black/10 opacity-75" />
                        <span className="relative inline-flex text-xs font-black font-mono">[⚡]</span>
                    </div>
                </div>

                {/* Industrial Telemetry Labels */}
                <div className="space-y-2">
                    <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase block">
                        SECURE ROUTE GATEWAY
                    </span>
                    <h2 className="text-sm font-black tracking-widest uppercase text-black">
                        SYNCHRONIZING ORDER TIER //
                    </h2>
                    <p className="text-[11px] font-medium tracking-wide leading-relaxed text-neutral-500 uppercase max-w-xs mx-auto">
                        Verifying secure Stripe ledger attributes against your session hash. Please retain terminal connectivity...
                    </p>
                </div>

                {/* Minor Technical Subtext */}
                <div className="pt-4 border-t border-dashed border-neutral-100 flex items-center justify-center gap-2 text-[9px] font-bold tracking-widest text-neutral-400 uppercase">
                    <span className="h-1 w-1 bg-neutral-300 rounded-full animate-pulse" />
                    <span>ORDER_REF_ID // {orderId ? orderId.substring(0, 12) : "NULL"}...</span>
                </div>

            </div>
        </section>
    );
};

export default Verify;