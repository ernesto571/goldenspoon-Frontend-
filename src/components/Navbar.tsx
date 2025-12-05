import {  UserButton, useUser } from "@clerk/clerk-react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, ShieldCheck, Menu, X } from "lucide-react";
import { useAdminStore } from "../store/AdminAuthStore";
import { useState } from "react";

function Navbar() {
  const { isSignedIn } = useUser();
  const { isAdmin } = useAdminStore();

  const navLinks = [
    { path: "/breakfast", label: "Breakfast" },
    { path: "/lunch", label: "Lunch" },
    { path: "/dinner", label: "Dinner" },
    { path: "/appetizers", label: "Appetizers" },
    { path: "/desserts", label: "Desserts" },
    { path: "/beverages", label: "Beverages" }
  ];

  const cartLinks = [
    {
      path: "/cart",
      label: "Cart",
      icon: <ShoppingCart className="w-5 h-5" />
    },
    {
      path: "/admin",
      label: "Admin",
      icon: <ShieldCheck className="w-5 h-5" />
    }
  ];


  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <nav className="sticky top-0 z-10 w-full bg-[#fff3ec]">
      <div className="w-[98%] md:w-[90%] lg:w-[90%] py-1  flex justify-between font-serif items-center mx-auto border-dotted border-b-2 border-[#13776a]">
        
      
        {/* LOGO */}
        
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-gray-800 hover:text-red-600 transition-colors">
            <button
            className="flex hover:bg-gray-200"
            onClick={(e) =>{e.preventDefault(), setSidebarOpen(!sidebarOpen)}}>
            {sidebarOpen ? (
            <X className="text-[#13776a]"/>
            ) : (
            <span className="flex items-center">
                <Menu className="text-[#13776a]"/>
            </span>
            )}
        </button>
          <img
            src="icon.png"
            alt="Golden Spoon icon"
            className="w-15 h-9 rounded-full object-contain"
          />
          <h2 className="text-[1.2rem] hidden md:flex lg:flex text-[#157c6e] font-bold">
            Golden Spoon
          </h2>
        </Link>

        {/* NAV LINKS */}
        <span className="gap-5 font-bold text-[#157c6e] hidden lg:flex">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition-all px-3 py-1 rounded-full font-medium ${
                  isActive
                    ? "bg-[#157c6e] text-white shadow-md"
                    : "text-[#157c6e] hover:bg-[#157c6e] hover:bg-opacity-10"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </span>

        {/* Sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-[50%] md:w-[40%] lg:w-[20%] bg-[#fff3eb] shadow-lg transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col w-full gap-6 pt-6 font-bold text-gray-800">
          {/* Close button */}
          <button
            className="self-start ml-2"
            onClick={() => setSidebarOpen(false)}>
            <X size={30} className="hover:bg-gray-200 " />
          </button>

          

          {/* Sidebar Links */}
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                `transition-all px-3 py-2 my-3 border-2 border-dotted border-[#157c6e] rounded-full font-medium ${
                  isActive
                    ? "bg-[#157c6e] text-white shadow-md"
                    : "text-[#157c6e] hover:bg-[#157c6e] hover:bg-opacity-10"
                }`
              }
                onClick={() => setSidebarOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>


        {/* RIGHT SIDE */}
        {isSignedIn ? (
            <div className="flex items-center gap-3">

            {/* CART + ADMIN (ONLY IF ADMIN) */}
            {isAdmin ? (
              <span className="gap-1 font-bold text-[#157c6e] flex">
                {cartLinks.map(link => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `transition-all px-3 py-1 rounded-full font-medium flex items-center gap-2 ${
                        isActive
                          ? "bg-[#157c6e] text-white shadow-md"
                          : "text-[#157c6e] hover:bg-[#157c6e] hover:bg-opacity-10"
                      }`
                    }
                  >
                    {link.icon}
                  </NavLink>
                ))}
              </span>
            ) : (
              /* If NOT admin, only show Cart */
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `transition-all px-3 py-1 rounded-full font-medium flex ${
                    isActive
                      ? "bg-[#157c6e] text-white shadow-md"
                      : "text-[#157c6e] hover:bg-[#157c6e] hover:bg-opacity-10"
                  }`
                }
              >
                <ShoppingCart className="w-5 h-5" />
              </NavLink>
            )}
  
            {/* AUTH SECTION */}
            <UserButton />
             
              
          </div>
        ) :(
          <NavLink
          to="/sign-in"
          className={({ isActive }) =>
            `transition-all px-3 py-1 rounded-full font-medium  ${
              isActive
                ? "bg-[#157c6e] text-white shadow-md"
                : "text-[#157c6e] hover:bg-[#157c6e] hover:bg-opacity-10"
            }`
          }
        >
          Sign In
        </NavLink>
        ) }
        
      </div>
    </nav>
  );
}

export default Navbar;

