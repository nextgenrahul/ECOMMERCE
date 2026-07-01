import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import Title from "../components/Title";
import axios from "axios";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [trackOrder, setTrackOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const { backendUrl, products } = useContext(AppContext);

  const trackSubmitButton = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) {
      return toast.error("Please provide a valid tracking hash ID.");
    }
    
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/order/trackorder`, {
        orderId: orderId.trim(),
      });
      
      if (response.data.success) {
        setTrackOrder(response.data.trackData);
        toast.success("Telemetry tracking parameters updated");
      } else {
        toast.warning(response.data.message || "Order node signature not found.");
        setTrackOrder(null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Telemetry server communication timeout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[85vh] flex flex-col lg:flex-row gap-12 px-6 md:px-12 max-w-[1600px] mx-auto bg-white text-black pt-10 pb-20 items-start">
      
      {/* LEFT ASPECT: Industrial Control Box */}
      <div className="w-full lg:w-96 flex flex-col items-start space-y-6">
        <div>
          <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase block mb-1">
            LOGISTICS PROTOCOL
          </span>
          <Title text1="TRACK" text2="SHIPMENT" />
          <p className="text-xs tracking-wide leading-relaxed text-neutral-500 font-medium mt-2">
            Enter the transmission ledger tracking code to fetch real-time transit status metrics directly from our fulfillment array.
          </p>
        </div>

        <form onSubmit={trackSubmitButton} className="w-full space-y-4">
          <div className="flex flex-col gap-1.5">
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              name="orderId"
              type="text"
              placeholder="ENTER SHIPMENT HASH ID..."
              className="w-full border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase rounded-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-[10px] font-black tracking-widest py-4 border border-black transition-all uppercase rounded-none ${
              loading 
                ? "bg-neutral-200 border-neutral-200 text-neutral-400 cursor-not-allowed" 
                : "bg-black text-white hover:bg-white hover:text-black"
            }`}
          >
            {loading ? "FETCHING TELEMETRY..." : "EXECUTE RETRIEVAL"}
          </button>
        </form>
      </div>

      {/* RIGHT ASPECT: Structural Status Output Monitor */}
      <div className="flex-1 w-full">
        {trackOrder ? (
          <div className="border border-black p-6 md:p-8 space-y-8 animate-fade-in bg-white rounded-none">
            
            {/* Header Matrix Status Grid */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-4">
              <div>
                <span className="text-[9px] font-black tracking-widest text-neutral-400 uppercase block mb-0.5">METRIC TARGET</span>
                <h3 className="text-xs font-mono font-black text-black tracking-wider uppercase">ID: {trackOrder._id || orderId}</h3>
              </div>
              <div className="sm:text-right">
                <span className="text-[9px] font-black tracking-widest text-neutral-400 uppercase block mb-0.5">CURRENT DISPATCH STATE</span>
                <span className="px-3 py-1 bg-black text-white text-[9px] font-black tracking-widest uppercase rounded-none">
                  {trackOrder.status || "TRANSIT_PENDING"}
                </span>
              </div>
            </div>

            {/* If a reason text exists inside tracking schema logs */}
            {trackOrder.reason && (
              <div className="p-4 bg-neutral-50 border-l-2 border-black text-xs font-medium tracking-wide text-neutral-600">
                <span className="text-[9px] font-black tracking-widest text-black uppercase block mb-1">MANIFEST EXCEPTIONS //</span>
                "{trackOrder.reason}"
              </div>
            )}

            {/* Line Item Data Parsers */}
            <div className="space-y-4">
              <span className="text-[10px] font-black tracking-[0.25em] text-neutral-400 uppercase block">ALLOCATED PACK MANIFEST</span>
              
              <div className="divide-y divide-neutral-100 border-t border-b border-neutral-100">
                {trackOrder.items?.map((item, index) => {
                  const product = products.find((p) => p._id === item.productId);
                  if (!product) return null;
                  const itemCompositeKey = `${trackOrder._id || index}-track-${item.productId}`;

                  return (
                    <div key={itemCompositeKey} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs tracking-wide">
                      <div className="space-y-1">
                        <h4 className="font-bold text-black uppercase">{product.name}</h4>
                        <p className="text-neutral-400 text-[11px] uppercase">
                          QUANTITY SEGMENT: <span className="text-black font-mono font-bold">{item.quantity}</span>
                        </p>
                      </div>
                      
                      <div className="sm:text-right">
                        <p className="text-neutral-400 text-[11px] uppercase mb-0.5">UNIT TIER PRICE</p>
                        <p className="font-black text-black">₹{Number(product.price).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Security Ticker Verification */}
            <div className="flex items-center gap-2 text-[8px] font-bold tracking-widest text-neutral-400 uppercase pt-2">
              <span className="h-1.5 w-1.5 bg-black rounded-full animate-ping" />
              <span>LIVE CORE TELEMETRY INTERFACE FEED ACTIVE</span>
            </div>

          </div>
        ) : (
          /* Empty/Initial Standby Canvas Blueprint Frame */
          <div className="w-full border-2 border-dashed border-neutral-200 h-64 md:h-80 flex flex-col items-center justify-center text-center p-4 bg-neutral-50/50">
            <span className="text-xs font-black tracking-[0.25em] text-neutral-400 uppercase mb-2">
              AWAITING TRANSIT DATA QUERY
            </span>
            <p className="text-[11px] text-neutral-400 font-medium max-w-xs">
              Execute a tracking parameters code script execution request via the left interface deck to populate this monitoring dashboard.
            </p>
          </div>
        )}
      </div>

    </section>
  );
};

export default TrackOrder;