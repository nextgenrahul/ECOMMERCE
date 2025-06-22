import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children, token }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

 
 
  const value = {
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
