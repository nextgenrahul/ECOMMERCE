// import React, { useContext } from "react";
// import { assets } from "../assets/images/assets.js";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext.jsx";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { backendUrl, setIsLoggedin, userData, setUserData, isLoggedin } = useContext(AppContext);
//   console.log(userData.isAccountVerified);
//   console.log("isLogIn : " + isLoggedin)

//   // Logout

//   const logout = async () => {
//     try {
//       axios.defaults.withCredentials = true;
//       const { data } = await axios.post(backendUrl + "/api/auth/logout", {});
//       if (data.success) {
//         setIsLoggedin(false);
//         setUserData({});
//          localStorage.removeItem("isLoggedin");
//         toast.success(data.message || "Logged out successfully");
//         navigate("/login");
//       } else {
//         toast.error(data.message || "Logout failed");
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || "Logout error");
//     }
//   };

//   // Send Otp Verification
//   const sendVerificationOtp = async () => {
//     try {
//       axios.defaults.withCredentials = true;
//       const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp');
//       if(data.success){
//         navigate("/email-verify")
//         toast.success(data.message)
//       }else{
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//     }
//   }
//   return (
//     <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 z-50">
//       <img
//         src={assets.logoIcon}
//         alt="Logo"
//         className="h-10 cursor-pointer"
//         onClick={() => navigate("/")}
//       />

//       {userData && userData.name ? (
//         <div className="relative group inline-block">
//           {/* Avatar */}
//           <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-semibold cursor-pointer">
//             {userData.name.charAt(0).toUpperCase()}
//           </div>

//           <div className="absolute top-full right-0 mt-2 w-44 bg-white shadow-lg rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-200 ease-in-out">
//             <ul className="text-sm py-2">
//               {!userData.isAccountVerified && (
//                 <li
//                 onClick={sendVerificationOtp}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 >
//                   Verify Email
//                 </li>
//               )}

//               <li
//                 className="px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
//                 onClick={logout}
//               >
//                 Logout
//               </li>
//             </ul>
//           </div>
//         </div>
//       ) : (
//         <button
//           onClick={() => navigate("/login")}
//           className="border border-black rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
//         >
//           Login
//         </button>
//       )}
//     </div>
//   );
// };

// export default Navbar;
