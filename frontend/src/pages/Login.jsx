import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, setLoading, getUserData } = useContext(AppContext);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (!isLogin) {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          navigate("/");
          toast.success(data.message || "Registration sequence authorized");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          setIsLoggedin(true);
          navigate("/");
          toast.success(data.message || "Session key established");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Authentication gateway exception");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-between px-6 md:px-12 max-w-[1600px] mx-auto bg-white text-black relative overflow-hidden">
      
      {/* Left Column: Form Control Node */}
      <div className="w-full max-w-sm flex flex-col items-start text-left space-y-8 z-10 py-12 animate-fade-in">
        
        {/* Core System Meta Tag */}
        <div className="space-y-2 w-full">
          <span className="text-[9px] font-black tracking-[0.35em] text-neutral-400 uppercase block">
            {isLogin ? "SECURE AUTHENTICATION" : "ACCESS PROVISIONING"}
          </span>
          <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">
            {isLogin ? "SESSION LOCK" : "NEW REGISTRY"}
            <span className="text-neutral-200"> //</span>
          </h1>
        </div>

        {/* Action Processing Block */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {!isLogin && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black tracking-widest text-neutral-400 uppercase" htmlFor="name">
                User Label Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase"
                placeholder="ENTER FULL IDENTIFIER..."
                required={!isLogin}
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black tracking-widest text-neutral-400 uppercase" htmlFor="email">
              Email Node Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase"
              placeholder="ENTER SECURE EMAIL..."
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black tracking-widest text-neutral-400 uppercase" htmlFor="password">
                Pass Phrase
              </label>
              {isLogin && (
                <Link
                  className="text-[9px] font-bold tracking-wider text-neutral-400 hover:text-black transition-colors uppercase underline underline-offset-2"
                  to="/reset-password"
                >
                  Forgot Cipher?
                </Link>
              )}
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-black bg-neutral-50 px-4 py-3 text-xs font-semibold tracking-wider text-black placeholder-neutral-400 outline-none focus:bg-white uppercase"
              placeholder="ENTER UNIQUE SEQUENCE..."
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white text-[10px] font-black tracking-widest py-4 border border-black transition-all hover:bg-white hover:text-black uppercase mt-2"
          >
            {isLogin ? "ESTABLISH CONSOLE LINK" : "EXECUTE INITIAL RUN"}
          </button>
        </form>

        {/* Dynamic State Modifiers Trigger Link */}
        <div className="w-full text-left pt-2 border-t border-dashed border-neutral-100">
          <p className="text-[11px] font-semibold text-neutral-400 tracking-wide">
            {isLogin ? (
              <>
                Unallocated entry point?{" "}
                <span
                  className="text-black font-black cursor-pointer underline underline-offset-4 tracking-wider uppercase hover:opacity-60 transition-opacity"
                  onClick={toggleForm}
                >
                  Create Identity Node
                </span>
              </>
            ) : (
              <>
                Existing clearance protocol?{" "}
                <span
                  className="text-black font-black cursor-pointer underline underline-offset-4 tracking-wider uppercase hover:opacity-60 transition-opacity"
                  onClick={toggleForm}
                >
                  Return to Link
                </span>
              </>
            )}
          </p>
        </div>

      </div>

      {/* Right Column: Industrial Matrix Graphics Layout Spacer */}
      <div className="hidden lg:flex flex-col items-end justify-center w-1/3 h-full select-none pointer-events-none opacity-[0.02]">
        <span className="text-[20vw] font-black tracking-tighter text-black select-none leading-none">
          {isLogin ? "AUTH" : "REG"}
        </span>
      </div>

    </section>
  );
};

export default Login;