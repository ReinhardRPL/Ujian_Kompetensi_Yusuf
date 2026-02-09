import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, LogOut, History, Zap } from 'lucide-react';
import { FaXbox, FaPlaystation } from 'react-icons/fa';
import { SiNintendoswitch, SiSega } from 'react-icons/si';

const NAV_ITEMS = [
  { id: 'ps', label: 'PlayStation', icon: <FaPlaystation />, color: '#0070d1' },
  { id: 'nintendo', label: 'Nintendo', icon: <SiNintendoswitch />, color: '#e60012' },
  { id: 'xbox', label: 'Xbox', icon: <FaXbox />, color: '#107c10' },
  { id: 'sega', label: 'Sega', icon: <SiSega />, color: '#0089cf' },
];

const Navbar = ({ onNavigate, onLogout, onOpenCart, cartCount }) => {
  const [hoveredTab, setHoveredTab] = useState(null);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] px-6 py-4">
      <div className="relative mx-auto max-w-7xl">
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl" />
        
        <div className="relative px-6 py-3 flex justify-between items-center z-10">
          {/* Logo */}
          <div onClick={() => onNavigate('home')} className="cursor-pointer group flex items-center gap-2">
            <img src="/GameStationX_Logo.png" alt="Logo" className="h-10 w-auto group-hover:scale-110 transition-transform" />
            <div className="hidden sm:block">
              <span className="text-xs font-black uppercase italic tracking-tighter">GameStation<span className="text-cyan-500">X</span></span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <div 
                key={item.id} 
                onMouseEnter={() => setHoveredTab(item.id)} 
                onMouseLeave={() => setHoveredTab(null)}
                // --- LOGIKA KLIK PROTEKSI ---
                onClick={() => {
                  if (item.id === 'ps') {
                    onNavigate('playstation');
                  } else {
                    alert(`${item.label} Hub is currently under maintenance for legacy optimization.`);
                  }
                }}
                className={`relative px-5 py-2 cursor-pointer group transition-all duration-300 ${item.id !== 'ps' ? 'opacity-40 hover:opacity-100' : ''}`}
              >
                <div className="relative z-20 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-gray-400 group-hover:text-white transition-colors">
                  <span className="text-lg" style={{ color: item.color }}>{item.icon}</span> {item.label}
                </div>
                {hoveredTab === item.id && (
                  <motion.div layoutId="nav-pill" className="absolute inset-0 bg-white/5 rounded-xl z-10" />
                )}
              </div>
            ))}
            
            {/* TOMBOL HISTORY */}
            <div 
              onMouseEnter={() => setHoveredTab('history')}
              onMouseLeave={() => setHoveredTab(null)}
              onClick={() => onNavigate('history')}
              className="relative px-5 py-2 cursor-pointer group"
            >
              <div className="relative z-20 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-500 group-hover:text-cyan-400 transition-colors">
                <History size={16} /> History
              </div>
              {hoveredTab === 'history' && (
                <motion.div layoutId="nav-pill" className="absolute inset-0 bg-cyan-500/10 rounded-xl z-10" />
              )}
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-6">
            {/* Status Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Online</span>
            </div>

            {/* Cart */}
            <div className="relative cursor-pointer group" onClick={onOpenCart}>
              <ShoppingCart size={20} className="text-gray-400 group-hover:text-white transition-colors" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-cyan-600 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(8,145,178,0.5)]"
                >
                  {cartCount}
                </motion.span>
              )}
            </div>

            {/* Logout */}
            <button 
              onClick={onLogout} 
              className="group p-2 bg-red-600/5 text-red-500 rounded-xl border border-red-500/10 hover:bg-red-600 hover:text-white transition-all duration-500"
            >
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;