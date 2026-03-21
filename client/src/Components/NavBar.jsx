import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, Home, Calendar, Upload, FileText, Menu, X, CalendarDays, User } from "lucide-react";
import { toast } from "react-hot-toast";
import { removeToken } from "../utils/auth";
import ChangePasswordModal from "./ChangePasswordModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    removeToken();
    navigate("/signin");
  };

  const navItems = [
    { name: "Home", path: "/home", icon: Home },
    { name: "Events", path: "/events", icon: CalendarDays },
    { name: "Schedule", path: "/schedule", icon: Calendar }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="border-b border-white/10 bg-[#0d0b14]/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/home" className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#7F5AF0] to-[#C77DFF] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="text-white font-bold text-xl tracking-tight hidden sm:block">
                  FoodCupon
                </span>
              </Link>
            </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-white/20 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon size={16} />
                  {item.name}
                </Link>
              ))}
              
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#7F5AF0] to-[#C77DFF] hover:scale-105 transition"
                >
                  <User size={16} className="text-white" />
                </button>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1a1a2e]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 z-50">
                    <button
                      onClick={() => { setShowProfileMenu(false); setPasswordModalOpen(true); }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition"
                    >
                      <User size={14} />
                      Change Password
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1a2e]/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? "bg-white/20 text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => { setIsOpen(false); setPasswordModalOpen(true); }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <User size={20} />
              Change Password
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      )}
      </nav>

      {/* Change Password Modal */}
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setPasswordModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
