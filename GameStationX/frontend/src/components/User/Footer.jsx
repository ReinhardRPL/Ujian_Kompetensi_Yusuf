import React from "react";
import { 
  Github, Instagram, Twitter, Youtube, 
  ChevronRight, ShieldCheck, Globe, CreditCard 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-10">
        
        {/* Top Section: Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Column 1: Brand & Language */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <img src="/GameStationX_Logo.png" alt="Logo" className="h-10 w-auto" />
              <span className="text-xl font-black italic tracking-tighter">GAMESTATION<span className="text-cyan-500">X</span></span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              Your ultimate gateway for physical game media and collectibles. 
              Connecting the legacy of the past with the technology of the future.
            </p>
          </div>

          {/* Column 2: Browse */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 mb-6 underline decoration-2 underline-offset-8 decoration-cyan-500/30">Browse_Store</h4>
            <ul className="space-y-4 text-xs font-bold uppercase text-zinc-400">
              <li className="hover:text-cyan-400 cursor-pointer flex items-center gap-2 transition-all group">
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> New Arrivals
              </li>
              <li className="hover:text-cyan-400 cursor-pointer flex items-center gap-2 transition-all group">
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Most Played
              </li>
              <li className="hover:text-cyan-400 cursor-pointer flex items-center gap-2 transition-all group">
                <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" /> Limited Editions
              </li>
            </ul>
          </div>

          {/* Column 3: Platform */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 mb-6 underline decoration-2 underline-offset-8 decoration-cyan-500/30">Platforms</h4>
            <ul className="space-y-4 text-xs font-bold uppercase text-zinc-400">
              <li className="hover:text-blue-500 cursor-pointer transition-colors tracking-widest">PlayStation</li>
              <li className="hover:text-green-500 cursor-pointer transition-colors tracking-widest">Xbox Universe</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors tracking-widest">Nintendo Link</li>
              <li className="hover:text-blue-400 cursor-pointer transition-colors tracking-widest">PC Master Race</li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 mb-6 underline decoration-2 underline-offset-8 decoration-cyan-500/30">Vault_Support</h4>
            <ul className="space-y-4 text-xs font-bold uppercase text-zinc-400">
              <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-white cursor-pointer transition-colors">Order Status</li>
              <li className="hover:text-white cursor-pointer transition-colors">Refund Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
            </ul>
          </div>
        </div>

          <div className="flex gap-6">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all cursor-pointer"><Instagram size={18}/></div>
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all cursor-pointer"><Twitter size={18}/></div>
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-cyan-500/20 hover:text-cyan-400 transition-all cursor-pointer"><Youtube size={18}/></div>
          </div>

     
        {/* Bottom Section: Legal & Credits */}
        <div className="pt-10 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-zinc-600">
            <p>© 2026 GAMESTATION X. DEVELOPED BY YUSUF REINHARD SIPAHUTAR</p>
            <p className="hover:text-zinc-300 cursor-pointer">Privacy Policy</p>
            <p className="hover:text-zinc-300 cursor-pointer">Terms of Service</p>
            <p className="hover:text-zinc-300 cursor-pointer">Cookie Settings</p>
          </div>
          <div className="flex items-center gap-3 bg-white/[0.02] px-4 py-2 rounded-full border border-white/5">
            <ShieldCheck size={14} className="text-green-500" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">Official Certified Developer (SMK LETRIS 2)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;