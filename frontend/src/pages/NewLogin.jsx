import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

const NewLogin = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(AppContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleForgotPassword = async () => {
    setCurrentState("Forgot Password");
    if (!email) {
      toast.error("Email is required");
      setCurrentState("Login")
      return;
    }
                  
    try {
      if (otp && newPassword) {
        const res = await axios.post(
          `${backendUrl}/api/user/reset-password`,
          { email, otp, newPassword },
          { withCredentials: true }
        );

        if (res.data.success) {
          toast.success(res.data.message);
          setCurrentState("Login")
        } else {
          toast.error(res.data.message);
        }
      } else {
        setCurrentState("Forgot Password");
        const res = await axios.post(
          `${backendUrl}/api/user/send-reset-otp`,
          { email },
          { withCredentials: true }
        );

        if (res.data.success) {
          const token = localStorage.getItem("token")
          setToken(token)
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        toast.error("Email is required");
        return;
      }

      if (currentState === "Sign Up" && (!name || !password)) {
        toast.error("Please fill all fields");
        return;
      }
      if (currentState === "Forgot Password") {
        await handleForgotPassword(); 
        return;
      }
      if (currentState === "Login" && !password) {
        toast.error("Password is required");
        return;
      }

      const endpoint =
        currentState === "Sign Up" ? "/api/user/register" : "/api/user/login";

      const payload =
        currentState === "Sign Up"
          ? { name, email, password }
          : { email, password };

      const response = await axios.post(`${backendUrl}${endpoint}`, payload, {
        withCredentials: true,
      });

      if (response.data.success) {
        if (currentState === "Sign Up") {
          setCurrentState("Login");
          toast.success("Account created. Please log in.");
        } else {
          setToken(response.data.accessToken);
          localStorage.setItem("token", response.data.accessToken);
          navigate("/");
        }
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    try {
      const res = await axios.post(
        `${backendUrl}/api/user/google-login`,
        { token: idToken },
        { withCredentials: true }
      );

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        toast.success("Logged in with Google");
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Sign Up" && (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />

      {(currentState === "Login" || currentState === "Sign Up") && (
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          required
        />
      )}

      {currentState === "Forgot Password" && (
        <>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="New Password"
            required
          />
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Login OTP"
            required
          />
        </>
      )}

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        {currentState === "Login" && (
          <p
            onClick={() => handleForgotPassword()}
            className="cursor-pointer text-blue-600"
          >
            Forgot your password?
          </p>
        )}

        <p
          onClick={() =>
            setCurrentState(
              currentState === "Login"
                ? "Sign Up"
                : currentState === "Sign Up"
                ? "Login"
                : "Login"
            )
          }
          className={`cursor-pointer text-blue-500 ${
            currentState !== "Login" && "w-full text-right"
          }`}
        >
          {currentState === "Login" ? "Create Account" : "Back to Login"}
        </p>
      </div>

      <GoogleLogin
        onSuccess={handleGoogleLogin}
        onError={() => toast.error("Google Login Failed")}
      />

      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState === "Login"
          ? "Sign In"
          : currentState === "Sign Up"
          ? "Sign Up"
          : "Reset Password"}
      </button>
    </form>
  );
};

export default NewLogin;
