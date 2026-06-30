import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(AppContext);
  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;

  return (
    <div className="w-full bg-neutral-50 p-6 md:p-8 border border-neutral-100 rounded-sm">
      {/* Editorial Section Header */}
      <div className="mb-6">
        <span className="text-[10px] font-black tracking-[0.3em] text-neutral-400 uppercase block mb-1">
          Final Ledger
        </span>
        <h3 className="text-lg font-black tracking-tight uppercase text-black">
          SUMMARY<span className="text-neutral-300"> //</span>
        </h3>
      </div>

      {/* Financial Metrics Stack */}
      <div className="flex flex-col gap-4 text-xs font-medium tracking-wide text-neutral-600">
        
        {/* Subtotal Item */}
        <div className="flex justify-between items-center">
          <p className="uppercase text-neutral-400 font-bold tracking-wider">Subtotal</p>
          <p className="text-black font-semibold">
            {currency} {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="w-full h-[1px] bg-neutral-200" />

        {/* Shipping Item */}
        <div className="flex justify-between items-center">
          <p className="uppercase text-neutral-400 font-bold tracking-wider">Shipping Fee</p>
          <p className="text-black font-semibold">
            {currency} {delivery_fee.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>
        
        <div className="w-full h-[1px] bg-neutral-900" />

        {/* Total Item */}
        <div className="flex justify-between items-end pt-2">
          <div>
            <p className="uppercase text-black font-black tracking-widest text-sm">Total Due</p>
            <span className="text-[9px] text-neutral-400 tracking-normal normal-case font-normal block mt-0.5">
              Taxes calculated at check out
            </span>
          </div>
          <p className="text-lg font-black text-black tracking-tight">
            {currency} {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
        </div>

      </div>
    </div>
  );
};

export default CartTotal;