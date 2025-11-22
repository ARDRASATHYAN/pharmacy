import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { navigationItems } from "@/config/navigation";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarWidth = isExpanded ? "w-64" : "w-16";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleSubmenu = (key) => {
    setOpenSubmenu((prev) => (prev === key ? null : key));
  };

  return (
    <>
      {/* === Desktop / Tablet Sidebar === */}
      <nav
        className={cn(
          "hidden md:flex fixed left-0 top-0 h-screen z-30 flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          sidebarWidth
        )}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo Section */}
        <div className="flex items-center border-b border-gray-200 px-3 py-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2966/2966486.png"
            alt="PharmaPro"
            className="h-10 w-10 rounded-md"
          />
          {isExpanded && (
            <span className="ml-2 overflow-hidden">
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
        <ul className="flex-1 px-2 py-3 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const hasChildren = !!item.children?.length;
            const isActive =
              location.pathname === item.href ||
              item.children?.some((c) => c.href === location.pathname);
            const isOpen = openSubmenu === item.key;

            // icon is a component (LayoutDashboard, Users, etc.)
            const Icon = item.icon;

            return (
              <li key={item.key}>
                <div>
                  <button
                    onClick={() =>
                      hasChildren ? toggleSubmenu(item.key) : navigate(item.href)
                    }
                    className={cn(
                      "flex items-center justify-between px-2 py-2 rounded-md w-full text-left text-sm transition-all",
                      isActive
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl flex-shrink-0">
                        {Icon && <Icon size={18} />}
                      </span>
                      {isExpanded && (
                        <span className="text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.label}
                        </span>
                      )}
                    </div>

                    {hasChildren && isExpanded && (
                      <span className="ml-auto">
                        {isOpen ? (
                          <ChevronDown size={16} className="text-gray-500" />
                        ) : (
                          <ChevronRight size={16} className="text-gray-500" />
                        )}
                      </span>
                    )}
                  </button>

                  {/* Submenu */}
                  {hasChildren && isOpen && isExpanded && (
                    <ul className="pl-9 mt-1 space-y-1 transition-all duration-200">
                      {item.children.map((sub) => {
                        const subActive = location.pathname === sub.href;
                        return (
                          <li key={sub.key}>
                            <button
                              onClick={() => navigate(sub.href)}
                              className={cn(
                                "block w-full text-left text-xs px-2 py-1.5 rounded-md",
                                subActive
                                  ? "text-blue-600 bg-blue-50"
                                  : "text-gray-700 hover:bg-gray-100"
                              )}
                            >
                              {sub.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Logout */}
        <div className="px-3 py-3 border-t border-gray-200">
          <button
            className="flex items-center gap-2 w-full px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md text-sm text-white font-medium justify-center"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            {isExpanded && "Logout"}
          </button>
        </div>
      </nav>

      {/* === Mobile Bottom Navbar === */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-white border border-gray-200 shadow-lg rounded-full px-4 py-2 flex justify-around items-center w-[94%] max-w-[380px] md:hidden">
        {navigationItems.map((item) => {
          const hasChildren = !!item.children?.length;
          const isActive =
            location.pathname === item.href ||
            item.children?.some((c) => c.href === location.pathname);

          const Icon = item.icon;

          return (
            <button
              key={item.key}
              onClick={() => navigate(item.href)}
              className="flex flex-col items-center justify-center text-center"
            >
              <span
                className={cn(
                  "text-xl mb-0.5 transition-colors duration-200",
                  isActive ? "text-blue-600" : "text-gray-600"
                )}
              >
                {Icon && <Icon size={18} />}
              </span>
              <span
                className={cn(
                  "text-[9px] leading-tight",
                  isActive ? "text-blue-600 font-medium" : "text-gray-700"
                )}
              >
                {(() => {
                  const label = item?.label || "";
                  return label.length > 10 ? label.slice(0, 9) + "…" : label;
                })()}
              </span>
            </button>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center text-center text-gray-600 hover:text-red-500"
        >
          <LogOut size={20} />
          <span className="text-[9px] leading-tight">Logout</span>
        </button>
      </div>
    </>
  );
}
