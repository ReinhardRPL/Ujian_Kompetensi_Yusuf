import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Package, LogOut, Plus, Trash2, Edit3, X, 
  ShoppingCart, Truck, CheckCircle, Box 
} from "lucide-react";

const AdminPage = ({ userName, onLogout }) => {
  const [activeTab, setActiveTab] = useState("inventory");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", price: "", stock: "", category: "Console" });

  // --- 1. FUNGSI INVENTORY ---
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Gagal ambil produk:", err);
    }
  };

  // --- 2. FUNGSI ORDERS (PENYEBAB KOSONG TADI) ---
  const fetchOrders = async () => {
    try {
      // Kita tambahkan cache buster agar data selalu fresh
      const res = await fetch(`http://localhost:5000/api/orders?t=${new Date().getTime()}`);
      if (!res.ok) throw new Error("Gagal mengambil data dari server");
      const data = await res.json();
      console.log("Data Order Diterima:", data); // Cek di F12 Console
      setOrders(data);
    } catch (err) {
      console.error("Gagal ambil order:", err);
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchOrders(); // Refresh setelah update
    } catch (err) {
      alert("Gagal update status!");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    
    // Opsional: Refresh otomatis setiap 10 detik agar admin up-to-date
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  // Fungsi CRUD Inventory
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      setShowModal(false);
      setFormData({ name: "", price: "", stock: "", category: "Console" });
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Hapus item ini?")) {
      await fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans">
      {/* SIDEBAR */}
      <div className="w-72 border-r border-white/5 p-8 flex flex-col justify-between fixed h-full bg-[#050505] z-30">
        <div className="space-y-12">
          <h2 className="text-2xl font-black uppercase tracking-tighter">Admin</h2>
          <nav className="space-y-4">
            <button onClick={() => setActiveTab("inventory")} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-xs uppercase tracking-widest border transition-all ${activeTab === 'inventory' ? 'bg-blue-600/10 text-blue-500 border-blue-600/20' : 'text-zinc-500 border-transparent hover:bg-white/5'}`}><Package size={18} /> Inventory</button>
            <button onClick={() => setActiveTab("orders")} className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-xs uppercase tracking-widest border transition-all ${activeTab === 'orders' ? 'bg-cyan-600/10 text-cyan-500 border-cyan-600/20' : 'text-zinc-500 border-transparent hover:bg-white/5'}`}><ShoppingCart size={18} /> Orders</button>
          </nav>
        </div>
        <button onClick={onLogout} className="flex items-center gap-4 text-red-500 font-black text-[10px] uppercase tracking-[0.3em] hover:opacity-70"><LogOut size={16} />LOG OUT</button>
      </div>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-72 p-12">
        {activeTab === "inventory" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-end mb-12">
              <h1 className="text-5xl font-black uppercase italic text-white">Inventory</h1>
              <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-white text-black px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"><Plus size={16} /> Add Entry</button>
            </div>

            {/* Tabel Inventory Sama Seperti Sebelumnya */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
              <table className="w-full text-left">
                <thead><tr className="border-b border-white/5 bg-white/[0.02] text-zinc-500 text-[10px] uppercase font-black tracking-widest"><th className="p-6">Product</th><th className="p-6">Price</th><th className="p-6">Stock</th><th className="p-6 text-right">Actions</th></tr></thead>
                <tbody>
                  {products.map(item => (
                    <tr key={item.id} className="border-b border-white/5 text-sm uppercase font-bold italic"><td className="p-6">{item.name}</td><td className="p-6 text-blue-500 font-black">{item.price}</td><td className="p-6">{item.stock}</td><td className="p-6 text-right"><div className="flex justify-end gap-3"><button className="p-3 bg-white/5 rounded-xl"><Edit3 size={16}/></button><button onClick={() => handleDelete(item.id)} className="p-3 bg-white/5 rounded-xl text-red-500"><Trash2 size={16}/></button></div></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-5xl font-black italic uppercase mb-12">Order</h1>
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
              <table className="w-full text-left">
                <thead><tr className="border-b border-white/5 bg-white/[0.02] text-zinc-500 text-[10px] uppercase font-black tracking-widest"><th className="p-6">Customer</th><th className="p-6">Payment</th><th className="p-6">Status</th><th className="p-6 text-center">Action</th></tr></thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr><td colSpan="4" className="p-20 text-center text-zinc-600 font-black uppercase italic tracking-widest opacity-30">No Transactions Detected</td></tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 text-sm font-bold italic uppercase tracking-tighter hover:bg-white/[0.02]">
                        <td className="p-6">{order.customer_name}</td>
                        <td className="p-6"><p className="text-cyan-400 font-black">{order.total_price}</p><p className="text-[10px] text-zinc-500 tracking-widest font-black">{order.payment_method}</p></td>
                        <td className="p-6">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black italic ${order.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' : order.status === 'Packing' ? 'bg-blue-500/10 text-blue-500' : order.status === 'On Delivery' ? 'bg-purple-500/10 text-purple-500' : 'bg-green-500/10 text-green-500'}`}>{order.status}</span>
                        </td>
                        <td className="p-6"><div className="flex justify-center gap-3">
                          <button onClick={() => updateOrderStatus(order.id, 'Packing')} className="p-3 bg-white/5 hover:bg-blue-600 rounded-xl"><Box size={16}/></button>
                          <button onClick={() => updateOrderStatus(order.id, 'On Delivery')} className="p-3 bg-white/5 hover:bg-purple-600 rounded-xl"><Truck size={16}/></button>
                          <button onClick={() => updateOrderStatus(order.id, 'Success')} className="p-3 bg-white/5 hover:bg-green-600 rounded-xl"><CheckCircle size={16}/></button>
                        </div></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>

      {/* MODAL TAMBAH PRODUK SAMA SEPERTI SEBELUMNYA */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowModal(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-[#0a0a0a] border border-white/10 p-10 rounded-[3rem] w-full max-w-lg">
              <h2 className="text-2xl font-black italic uppercase mb-8">New Entry</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" placeholder="NAME" className="w-full bg-transparent border-b border-white/10 py-3 outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
                <input type="text" placeholder="PRICE" className="w-full bg-transparent border-b border-white/10 py-3 outline-none" onChange={e => setFormData({...formData, price: e.target.value})} />
                <input type="number" placeholder="STOCK" className="w-full bg-transparent border-b border-white/10 py-3 outline-none" onChange={e => setFormData({...formData, stock: e.target.value})} />
                <select className="w-full bg-transparent border-black border-white/10 py-3 outline-none" onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="Console">Console</option><option value="Games">Games</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 py-5 rounded-2xl font-black uppercase text-[10px]">Upload</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;