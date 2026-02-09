import React, { useState, useEffect } from "react"; 
import Navbar from "./components/User/Navbar";
import Footer from "./components/User/Footer";
import PlaystationPage from "./components/User/PlaystationPage";
import LoginPage from "./components/LoginPage";
import AdminPage from "./components/Admin/AdminPage";
import CartSidebar from "./components/User/CartSidebar";
import UserHistory from "./components/User/UserHistory"; 
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ShoppingBag } from "lucide-react";

const FEATURED_GAMES = [
  { id: 101, title: "God of War Ragnarok", price: "Rp 729.000", img: "/god_of_war.jpg", category: "Games" },
  { id: 102, title: "Zelda: TOTK", price: "Rp 699.000", img: "/legend_of_zelda_tears_of_the_kingdom.jpg", category: "Games" },
  { id: 103, title: "Starfield", price: "Rp 850.000", img: "/starfield.jpg", category: "Games" },
  { id: 104, title: "Shenmue I & II", price: "Rp 450.000", img: "/shenmue.jpg", category: "Games" },
  { id: 105, title: "Uncharted Legacy of Thieves Collection", price: "Rp 1.299.000", img: "/Uncharted.jpg", category: "Games" },
];

function App() {
  const [view, setView] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- 1. FITUR AUTO-CHECK LOGIN SAAT REFRESH ---
  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const savedRole = localStorage.getItem("role");

    if (savedName && savedRole) {
      setIsLoggedIn(true);
      setUserName(savedName);
      setRole(savedRole);
    }
  }, []);

  const handleLoginSuccess = (userRole, name) => {
    setIsLoggedIn(true);
    setRole(userRole);
    setUserName(name);
    // Simpan ke browser agar tidak hilang saat refresh
    localStorage.setItem("name", name);
    localStorage.setItem("role", userRole); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
    setUserName("");
    // Hapus data sesi dari browser
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    window.location.reload();
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, title: product.title || product.name, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view]);

  // --- 2. LOGIKA PROTEKSI HALAMAN ---
  if (!isLoggedIn) return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  
  // Jika Admin, tampilkan Dashboard Admin secara penuh
  if (role === "admin") return <AdminPage userName={userName} onLogout={handleLogout} />;

  // Jika User Biasa, tampilkan Storefront
  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans overflow-x-hidden selection:bg-cyan-500/30">
      <Navbar 
        onNavigate={setView} 
        onLogout={handleLogout} 
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        setCart={setCart} 
      />
      
      <AnimatePresence mode="wait">
        {view === "home" && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
            <section className="pt-40 pb-32 bg-[#010101] border-b border-white/5 overflow-hidden">
              <div className="container mx-auto px-10 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                  <div className="flex items-center gap-3">
                    <Sparkles size={16} className="text-cyan-400" />
                    <span className="text-cyan-400 font-black tracking-[0.3em] text-[10px] uppercase">Welcome Back User </span>
                  </div>
                  <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white">GameStation<span className="text-cyan-400">X</span></h2>
                  <p className="text-gray-400 text-lg md:text-2xl italic leading-relaxed max-w-xl">"Make Your Dream Come True. And Protect It "</p>
                </div>
                <div className="flex-1 flex justify-center"><img src="/GameStationX_Logo.png" alt="Big Logo" className="w-full max-w-sm" /></div>
              </div>
            </section>

            <section className="py-24 bg-[#020202]">
              <div className="container mx-auto px-10 mb-16"><h3 className="text-6xl font-black italic uppercase tracking-tighter text-white">Video Game</h3></div>
              <div className="flex overflow-hidden relative py-10">
                <motion.div animate={{ x: ["0%", "-100%"] }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }} className="flex gap-12 px-12">
                  {[...FEATURED_GAMES, ...FEATURED_GAMES].map((game, idx) => (
                    <div key={idx} className="w-[300px] flex-shrink-0 bg-[#080808] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
                      <div className="h-[350px] overflow-hidden"><img src={game.img} className="w-full h-full object-cover" /></div>
                      <div className="p-6">
                        <h4 className="text-xl font-black uppercase italic truncate text-white">{game.title}</h4>
                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5">
                          <span className="text-xl font-black italic text-white">{game.price}</span>
                          <button onClick={() => addToCart(game)} className="bg-blue-600 p-4 rounded-2xl text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"><ShoppingBag size={18} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}

        {view === "playstation" && (
          <PlaystationPage key="playstation" onAddToCart={addToCart} />
        )}

        {view === "history" && (
          <UserHistory key="history" userName={userName} />
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;