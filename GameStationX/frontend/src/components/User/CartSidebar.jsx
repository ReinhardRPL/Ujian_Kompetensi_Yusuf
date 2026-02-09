import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, CreditCard, CheckCircle, Wallet, Landmark, QrCode } from "lucide-react";

const CartSidebar = ({ isOpen, onClose, cart, setCart }) => {
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStep, setPaymentStep] = useState("select");

  const updateQuantity = (id, amount) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    ));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ""));
      return total + price * item.quantity;
    }, 0);
  };

  // --- PERBAIKAN FUNGSI CHECKOUT ---
  const handleCheckout = async (method) => {
    setPaymentStep("processing");
    
    try {
      // 1. Kirim data ke API Backend
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: localStorage.getItem("name") || "Yusuf Reinhard",
          total_price: `Rp ${calculateTotal().toLocaleString('id-ID')}`,
          payment_method: method,
          cart_items: cart 
        }),
      });

      // 2. Cek apakah server berhasil menyimpan
      if (response.ok) {
        // Beri jeda sedikit agar animasi "Authorizing" terlihat natural
        setTimeout(() => {
          setPaymentStep("success");
        }, 1500);
      } else {
        const errorData = await response.json();
        alert("Gagal mencatat pesanan: " + (errorData.Message || "Kesalahan Server"));
        setPaymentStep("select");
      }

    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Koneksi ke Server Terputus! Pastikan Backend (server.js) menyala.");
      setPaymentStep("select");
    }
  };

  const closeAll = () => {
    if (paymentStep === "success") {
      setCart([]); // Kosongkan keranjang hanya jika berhasil
    }
    setIsPaying(false);
    setPaymentStep("select");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[998]" />
          
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[999] p-8 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-black italic uppercase tracking-tighter text-white font-sans">Your Order</h2>
              <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white"><X size={24} /></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
                  <ShoppingBag size={48} className="mb-4 text-zinc-500" />
                  <p className="italic text-sm uppercase font-bold tracking-widest text-zinc-500">order is empty...</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-3xl border border-white/5">
                    <img src={item.img} className="w-20 h-20 object-cover rounded-xl" alt={item.title} />
                    <div className="flex-1 text-white">
                      <h3 className="text-[10px] font-bold uppercase truncate w-40">{item.title}</h3>
                      <p className="text-cyan-400 font-black text-sm">{item.price}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 bg-black/50 p-1 rounded-xl border border-white/10">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-cyan-400 transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-cyan-400 transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-zinc-600 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex justify-between mb-6">
                  <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Total_Charge</span>
                  <span className="text-2xl font-black italic text-white font-sans text-right">Rp {calculateTotal().toLocaleString('id-ID')}</span>
                </div>
                <button onClick={() => setIsPaying(true)} className="w-full bg-cyan-600 hover:bg-cyan-500 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 text-white transition-all shadow-[0_10px_30px_rgba(8,145,178,0.3)]">
                  <CreditCard size={16} /> Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}

      {isPaying && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[1100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-2xl">
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-[#111] border border-white/10 p-10 rounded-[3rem] w-full max-w-md text-center shadow-2xl">
            {paymentStep === "select" && (
              <>
                <h2 className="text-2xl font-black italic uppercase mb-2 text-white font-sans">Payment Selection</h2>
                <div className="grid grid-cols-1 gap-3 my-8">
                  <button onClick={() => handleCheckout('QRIS')} className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-cyan-500 transition-all text-white group">
                    <QrCode className="text-cyan-400" /> <span className="text-[10px] font-black uppercase tracking-widest">QRIS / All E-Wallet</span>
                  </button>
                  <button onClick={() => handleCheckout('Bank Transfer')} className="flex items-center gap-4 p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-cyan-500 transition-all text-white group">
                    <Landmark className="text-cyan-400" /> <span className="text-[10px] font-black uppercase tracking-widest">Virtual Account</span>
                  </button>
                </div>
                <button onClick={() => setIsPaying(false)} className="text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-white">Cancel Transaction</button>
              </>
            )}
            {paymentStep === "processing" && (
              <div className="py-10 flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-6"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white animate-pulse">Authorizing...</p>
              </div>
            )}
            {paymentStep === "success" && (
              <div className="py-10 flex flex-col items-center text-white">
                <CheckCircle className="text-green-500 mb-6" size={60} />
                <h3 className="text-xl font-black italic uppercase mb-2">Payment_Verified</h3>
                <button onClick={closeAll} className="mt-8 w-full bg-white text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-widest">Done</button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;