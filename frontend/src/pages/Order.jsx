import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Order = () => {
  const { backendUrl, currency, products } = useContext(AppContext);

  const [orderMainAllData, setOrderMainAllData] = useState([]);
  const [activeReturnOrderId, setActiveReturnOrderId] = useState(null);
  const [reason, setReason] = useState("");
  const [showReasonError, setShowReasonError] = useState(false);

  const loadOrderData = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        setOrderMainAllData(response.data.orders.reverse());
      }
    } catch (error) {
      console.error("Failed to load orders", error);
      toast.error("Unable to retrieve transaction matrix");
    }
  };

  const handleReturnSubmit = async (e, orderId, userId) => {
    e.preventDefault();
    if (!reason.trim()) {
      setShowReasonError(true);
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/returns`, {
        userId,
        orderId,
        reason,
      });

      if (response.data.success) {
        toast.success(response.data.message || "Return request logged");
        setActiveReturnOrderId(null);
        setReason("");
        loadOrderData();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Return processing gateway failure");
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <section className="bg-white text-black min-h-screen px-6 md:px-12 max-w-[1600px] mx-auto pt-10 pb-20">
      
      {/* Structural Title block */}
      <div className="border-t border-neutral-100 pt-8 mb-12">
        <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase block mb-1">
          TRANSACTION HISTORIC LEDGER
        </span>
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orderMainAllData.length === 0 ? (
        <div className="border border-dashed border-neutral-200 py-24 flex flex-col items-center justify-center text-center rounded-sm bg-neutral-50/50">
          <span className="text-xs font-black tracking-[0.25em] text-neutral-400 uppercase mb-2">
            NO MANIFEST RECORDED
          </span>
          <p className="text-[11px] text-neutral-400">Zero past order signatures have been matching your account node.</p>
        </div>
      ) : (
        <div className="divide-y divide-neutral-200 border-b border-neutral-200">
          {orderMainAllData.map((order) => (
            <div key={order._id} className="py-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start animate-fade-in">
              
              {/* Left Column Aspect: Order Tracking Hash Card */}
              <div className="lg:col-span-2 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
                  <span className="text-[10px] font-mono font-black text-neutral-400 tracking-wider">
                    ID: {order._id}
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 font-medium space-y-1">
                  <p className="uppercase">Method: <span className="text-black font-bold">{order.paymentMethod}</span></p>
                  <p className="uppercase">Processed: <span className="text-black font-bold">{new Date(order.date).toDateString()}</span></p>
                  {!order.returnOrder?.status && (
                    <p className="uppercase">
                      LOGISTICS STATUS: <span className="text-black font-black underline underline-offset-2">{order.status}</span>
                    </p>
                  )}
                </div>

                {/* Sub-block context processing if return layer parameters are present */}
                {order.returnOrder && order.returnOrder.status && (
                  <div className="mt-4 p-4 bg-neutral-50 border border-neutral-200 rounded-sm space-y-1 text-[11px]">
                    <span className="text-[9px] font-black tracking-widest text-neutral-400 block uppercase mb-1">RETURN MATRIX LOG</span>
                    <p className="uppercase font-bold text-black">Status: {order.returnOrder.status}</p>
                    <p className="text-neutral-500">Reason: {order.returnOrder.reason}</p>
                    {order.returnOrder.comments && <p className="text-neutral-500">Notes: {order.returnOrder.comments}</p>}
                  </div>
                )}
              </div>

              {/* Center Column Aspect: Line Item Purchases Stack */}
              <div className="lg:col-span-2 divide-y divide-neutral-100">
                {order.items.map((item, idx) => {
                  const productItem = products.find((p) => p._id === item.productId);
                  if (!productItem) return null;
                  const itemKey = `${order._id}-item-${idx}`;

                  return (
                    <div key={itemKey} className="py-3 first:pt-0 last:pb-0 flex items-start gap-4">
                      <Link to={`/product/${productItem.slug}`} className="bg-neutral-50 border border-neutral-100 p-1 flex-shrink-0">
                        <img className="w-12 h-16 object-cover filter grayscale" src={productItem.image[0]} alt={productItem.name} />
                      </Link>
                      <div className="text-[11px] tracking-wide space-y-0.5 text-neutral-500 font-medium">
                        <h4 className="text-xs font-bold text-black uppercase truncate max-w-[200px]">{productItem.name}</h4>
                        <p className="uppercase">SIZE: <span className="text-black font-bold">{item.size}</span> // QTY: <span className="text-black font-bold">{item.quantity}</span></p>
                        <p className="text-black font-black">{currency}{Number(productItem.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column Aspect: Micro Action System Commands Triggers */}
              <div className="lg:col-span-1 flex flex-col gap-2.5 text-[10px] font-black tracking-widest uppercase">
                <button
                  onClick={loadOrderData}
                  className="w-full py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all text-center"
                >
                  TRACK SHIPMENT
                </button>

                {(!order.returnOrder || !order.returnOrder.status) && (
                  <button
                    onClick={() => {
                      setActiveReturnOrderId(order._id);
                      setReason("");
                      setShowReasonError(false);
                    }}
                    className="w-full py-3 bg-black text-white border-2 border-black hover:bg-neutral-800 transition-all text-center"
                  >
                    INITIATE RETURN
                  </button>
                )}
              </div>

              {/* High-End Refactored Embedded Modal Instance Block */}
              {activeReturnOrderId === order._id && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                  <div onClick={() => setActiveReturnOrderId(null)} className="absolute inset-0 bg-black/20 backdrop-blur-xs" />
                  <div className="bg-white w-full max-w-md border-2 border-black p-6 md:p-8 shadow-2xl z-10 relative rounded-sm">
                    
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-black tracking-[0.3em] text-neutral-400 uppercase block mb-1">RELOG ACTION REQUIRED</span>
                        <h3 className="text-md font-black tracking-widest uppercase text-black">RETURN DISPATCH STATEMENT //</h3>
                      </div>
                    </div>

                    <form onSubmit={(e) => handleReturnSubmit(e, order._id, order.userId)} className="space-y-4">
                      <textarea
                        className="w-full border border-neutral-200 text-xs font-semibold tracking-wider p-4 h-32 resize-none bg-neutral-50 focus:bg-white focus:border-black outline-none transition-all placeholder-neutral-400 uppercase"
                        placeholder="SPECIFY TERMINATION REASON PROFILE..."
                        value={reason}
                        onChange={(e) => {
                          setReason(e.target.value);
                          if(e.target.value.trim()) setShowReasonError(false);
                        }}
                        required
                      />
                      {showReasonError && (
                        <p className="text-[10px] font-bold text-black bg-neutral-100 border-l-2 border-black px-2 py-1 tracking-wider uppercase">
                          Execution Blocked: Specification Text Required
                        </p>
                      )}

                      <div className="flex items-center justify-end gap-3 text-[10px] font-black tracking-widest uppercase pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveReturnOrderId(null);
                            setReason("");
                          }}
                          className="px-5 py-3 border border-neutral-200 text-neutral-400 hover:text-black hover:border-black transition-all"
                        >
                          ABORT
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-3 bg-black text-white border border-black transition-all hover:bg-white hover:text-black"
                        >
                          TRANSMIT DATA NODE
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Order;