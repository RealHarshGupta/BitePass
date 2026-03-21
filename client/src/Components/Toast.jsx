import React, { createContext, useContext, useState, useEffect } from "react";
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const show = (message, type = "success", options = {}) => {
    const id = options.id || Math.random().toString(36).substr(2, 9);
    
    setToasts((prev) => {
      // If ID exists, update it (useful for replacing loading toasts)
      const existing = prev.find(t => t.id === id);
      if (existing) {
        return prev.map(t => t.id === id ? { ...t, message, type, ...options } : t);
      }
      return [...prev, { id, message, type, ...options }];
    });

    if (type !== "loading") {
      setTimeout(() => remove(id), options.duration || 3000);
    }
    return id;
  };

  const remove = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toast = {
    success: (msg, opts) => show(msg, "success", opts),
    error: (msg, opts) => show(msg, "error", opts),
    loading: (msg, opts) => show(msg, "loading", opts),
    dismiss: (id) => remove(id),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none px-4">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`
                flex items-center gap-3 p-4 rounded-2xl shadow-2xl backdrop-blur-xl border pointer-events-auto
                ${t.type === "success" ? "bg-green-500/20 border-green-500/50 text-green-100" : ""}
                ${t.type === "error" ? "bg-red-500/20 border-red-500/50 text-red-100" : ""}
                ${t.type === "loading" ? "bg-purple-500/20 border-[#7F5AF0]/50 text-purple-100" : ""}
              `}
            >
              <div className="flex-shrink-0">
                {t.type === "success" && <CheckCircle size={20} className="text-green-400" />}
                {t.type === "error" && <AlertCircle size={20} className="text-red-400" />}
                {t.type === "loading" && <Loader2 size={20} className="text-[#C77DFF] animate-spin" />}
              </div>
              <p className="text-sm font-medium flex-1">{t.message}</p>
              <button onClick={() => remove(t.id)} className="hover:opacity-70 transition">
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
