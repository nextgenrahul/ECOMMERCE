import React from 'react';
import { assets } from '../assets/images/assets.js';

const OurPolicy = () => {
    return (
        <section className="w-full bg-white text-black border-t border-b border-neutral-100 px-6 md:px-12 max-w-[1600px] mx-auto py-16">
            {/* Editorial Grid Structure */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x md:divide-neutral-100">

                {/* Policy Item 01 */}
                <div className="flex flex-col items-start text-left md:px-8 first:pl-0 last:pr-0 space-y-4 group">
                    <div className="flex items-center justify-between w-full">
                        <img src={assets.exchange_icon} className="w-5 filter brightness-0 opacity-80 transition-transform duration-300 group-hover:scale-110" alt="Exchange Icon" />
                        <span className="text-[10px] font-black text-neutral-300 tracking-widest">[01]</span>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-xs font-black tracking-widest uppercase text-black">
                            EASY EXCHANGE POLICY
                        </h4>
                        <p className="text-[11px] tracking-wide leading-relaxed text-neutral-400 font-medium">
                            Seamless sizing revisions. We facilitate direct, automated collection returns across all active shipping zones.
                        </p>
                    </div>
                </div>

                {/* Policy Item 02 */}
                <div className="flex flex-col items-start text-left md:px-8 first:pl-0 last:pr-0 space-y-4 group">
                    <div className="flex items-center justify-between w-full">
                        <img src={assets.quality_icon} className="w-5 filter brightness-0 opacity-80 transition-transform duration-300 group-hover:scale-110" alt="Return Icon" />
                        <span className="text-[10px] font-black text-neutral-300 tracking-widest">[02]</span>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-xs font-black tracking-widest uppercase text-black">
                            07 DAY COMPLIANCE RETURN
                        </h4>
                        <p className="text-[11px] tracking-wide leading-relaxed text-neutral-400 font-medium">
                            Zero-friction inspection windows. Returns are accepted on all pristine, original production items within 7 days.
                        </p>
                    </div>
                </div>

                {/* Policy Item 03 */}
                <div className="flex flex-col items-start text-left md:px-8 first:pl-0 last:pr-0 space-y-4 group">
                    <div className="flex items-center justify-between w-full">
                        <img src={assets.support_img} className="w-5 filter brightness-0 opacity-80 transition-transform duration-300 group-hover:scale-110" alt="Support Icon" />
                        <span className="text-[10px] font-black text-neutral-300 tracking-widest">[03]</span>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-xs font-black tracking-widest uppercase text-black">
                            AUTOMATED CONCIERGE SUPPORT
                        </h4>
                        <p className="text-[11px] tracking-wide leading-relaxed text-neutral-400 font-medium">
                            Permanent tracking connectivity. Backed by our upcoming AI triage agent to resolve order anomalies instantly.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default OurPolicy;