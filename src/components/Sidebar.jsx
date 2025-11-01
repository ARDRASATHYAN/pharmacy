import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RxDashboard,
  RxClipboard,
} from "react-icons/rx";
import { LogOut } from "lucide-react";
import { FaUserMd, FaUsers, FaPills, FaTruck } from "react-icons/fa";
import { MdPointOfSale } from "react-icons/md";
// import logo from "../../assets/pharma-logo.png"; // replace with your logo

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { icon: <RxDashboard />, name: "Dashboard", href: "/dashboard" },
    { icon: <FaPills />, name: "Medicines", href: "/medicines" },
    { icon: <MdPointOfSale />, name: "Sales", href: "/sales" },
    { icon: <FaTruck />, name: "Suppliers", href: "/suppliers" },
    { icon: <FaUserMd />, name: "Customers", href: "/customers" },
    { icon: <RxClipboard />, name: "Reports", href: "/reports" },
    { icon: <FaUsers />, name: "Staff", href: "/staff" },
  ];

  const sidebarWidth = isExpanded ? "w-64" : "w-16";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* === Desktop Sidebar === */}
      <nav
        className={cn(
          "hidden md:flex fixed left-0 top-0 h-screen z-30 flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          sidebarWidth
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo Section */}
        <div className="flex items-center border-b border-gray-200 p-4">
          <img src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png" alt="PharmaPro" className="h-[40px] w-[40px] rounded-md" />
          {isExpanded && (
            <span className="ml-2">
              <p className="text-[18px] text-blue-700 font-bold whitespace-nowrap">
                PharmaPro
              </p>
              <p className="text-[10px] text-gray-500 whitespace-nowrap">
                Pharmacy System
              </p>
            </span>
          )}
        </div>

        {/* Menu */}
        <ul className="flex-1 p-3 space-y-1">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.href)}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md transition-all w-full text-left",
                    isActive
                      ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <span className="text-2xl">{item.icon}</span>
                  {isExpanded && (
                    <span className="text-sm font-medium whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200">
          <button
            className="flex items-center gap-2 w-full p-2 bg-red-500 hover:bg-red-600 rounded-md text-sm text-white font-medium justify-center"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            {isExpanded && "Logout"}
          </button>
        </div>
      </nav>

      {/* === Mobile Floating Navbar === */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-white border border-gray-200 shadow-lg rounded-full px-5 py-2 flex justify-around items-center w-[90%] max-w-[380px] md:hidden">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.href)}
              className="flex flex-col items-center justify-center text-center"
            >
              <span
                className={cn(
                  "text-2xl mb-1 transition-colors duration-200",
                  isActive ? "text-blue-600" : "text-gray-600"
                )}
              >
                {item.icon}
              </span>
              <span
                className={cn(
                  "text-[10px]",
                  isActive ? "text-blue-600 font-medium" : "text-gray-700"
                )}
              >
                {item.name}
              </span>
            </button>
          );
        })}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center text-center text-gray-600 hover:text-red-500"
        >
          <LogOut size={22} />
          <span className="text-[10px]">Logout</span>
        </button>
      </div>
    </>
  );
}
