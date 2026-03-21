import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0b0b1a]/80 backdrop-blur-md border-t border-white/10 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#7F5AF0] to-[#C77DFF] rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">F</span>
          </div>
          <span className="text-white font-semibold tracking-tight">
            FoodCupon
          </span>
        </div>
        
        <p className="text-gray-400 text-sm text-center">
          © {new Date().getFullYear()} FoodCupon Management System. All rights reserved.
        </p>

        <div className="flex gap-6">
          <a href="#" className="text-gray-400 hover:text-[#C77DFF] transition-colors text-sm">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-[#C77DFF] transition-colors text-sm">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-[#C77DFF] transition-colors text-sm">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
