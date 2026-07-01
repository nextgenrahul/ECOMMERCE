import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup registration signature:', { name, email, password });
    
    // In production, this anchors into your axios submission payload:
    // const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
    
    navigate('/login');
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center px-6 md:px-12 max-w-[1600px] mx-auto bg-white text-black">
      
      {/* Central Asymmetric Execution Box */}
      <div className="w-full max-w-md border-2 border-black p-6 md:p-8 bg-white relative rounded-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Form Identity Matrix Header */}
        <div className="mb-6 space-y-1 text-left">
          <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase block">
            REGISTRATION GATEWAY
          </span>
          <h2 className="text-2xl font-black tracking-widest uppercase text-black">
            CREATE ACCOUNT //
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input Unit: Full Name */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-black tracking-widest uppercase text-black" htmlFor="name">
              FULL NAME IDENTITY
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ENTER REGISTERED NAME..."
              className="w-full border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase rounded-none"
              required
            />
          </div>

          {/* Input Unit: Email Coordinates */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-black tracking-widest uppercase text-black" htmlFor="email">
              EMAIL COORDINATES
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER UNIQUE EMAIL NODE..."
              className="w-full border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase rounded-none"
              required
            />
          </div>

          {/* Input Unit: Access Cipher */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-black tracking-widest uppercase text-black" htmlFor="password">
              SECURE PASS CIPHER
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="DEFINE SESSION PASSWORD..."
              className="w-full border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase rounded-none"
              required
            />
          </div>

          {/* Action Trigger Operators */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-black text-white text-[10px] font-black tracking-widest py-4 border border-black transition-all hover:bg-white hover:text-black uppercase rounded-none"
            >
              INITIALIZE REGISTRATION
            </button>
          </div>

        </form>

        {/* Cross-Route Redirection Link */}
        <div className="mt-6 pt-4 border-t border-neutral-100 text-center">
          <p className="text-[11px] font-medium tracking-wide text-neutral-500 uppercase">
            ALREADY HOLD AN ACTIVE IDENTIFIER?{" "}
            <Link to="/login" className="font-black text-black underline underline-offset-2 hover:opacity-60 transition-opacity">
              LOGIN NODE
            </Link>
          </p>
        </div>

        {/* Technical Safety Matrix Subtext */}
        <div className="flex items-center justify-center gap-2 text-[8px] font-bold tracking-widest text-neutral-400 uppercase pt-4">
          <span className="h-1 w-1 bg-neutral-300 rounded-full animate-pulse" />
          <span>DATA RECORD ENCRYPTED VIA ENDPOINT LEDGER</span>
        </div>

      </div>
    </section>
  );
};

export default Signup;