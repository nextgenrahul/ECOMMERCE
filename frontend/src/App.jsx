import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AppContextProvider } from "./context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainNavbar from "./components/MainNavbar";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <AppContextProvider>
        
        <AppRoutes />
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
