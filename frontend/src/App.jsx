import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AppContextProvider } from "./context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainNavbar from "./components/MainNavbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <ToastContainer />
        <AppContextProvider>
          <AppRoutes />
        </AppContextProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
