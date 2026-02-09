import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Package, Truck, CheckCircle, Receipt, ChevronRight } from "lucide-react";

const UserHistory = ({ userName }) => {
  const [myOrders, setMyOrders] = useState([]);

 const fetchMyOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders");
      const data = await res.json();
      
      // Ambil nama dari berbagai sumber agar lebih aman
      const activeUser = userName || localStorage.getItem("name");
      
      const filtered = data.filter(order => {
        // Jika di database masih 'undefined', kita beri toleransi untuk testing
        if (order.customer_name === 'undefined') return true; 
        
        // Filter normal (tidak peduli huruf besar/kecil)
        return order.customer_name?.toLowerCase() === activeUser?.toLowerCase();
      });
      
      setMyOrders(filtered);
    } catch (err) {
      console.error("Gagal ambil history");
    }
  };
  useEffect(() => { fetchMyOrders(); }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock className="text-yellow-500" size={20} />;
      case 'Packing': return <Package className="text-blue-500" size={20} />;
      case 'On Delivery': return <Truck className="text-purple-500" size={20} />;
      case 'Success': return <CheckCircle className="text-green-500" size={20} />;
      default: return <Clock size={20} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="pt-40 pb-20 min-h-screen bg-[#020202] container mx-auto px-10"
    >
      <div className="mb-16">
        <h2 className="text-6xl font-black italic uppercase tracking-tighter text-white">Purchase LOG</h2>
        <p className="text-cyan-500 font-black text-[10px] uppercase tracking-[0.4em] mt-2">Make Your Dream Come True. And Protect It</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {myOrders.length === 0 ? (
          <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[3rem] opacity-20">
            <Receipt size={64} className="mx-auto mb-4" />
            <p className="text-xl font-bold uppercase italic tracking-widest">No Transaction Found</p>
          </div>
        ) : (
          myOrders.map((order) => (
            <motion.div 
              key={order.id}
              whileHover={{ x: 10 }}
              className="bg-white/5 border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-8 group hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center gap-8">
                <div className="p-6 bg-black/50 rounded-3xl border border-white/10 group-hover:scale-110 transition-transform">
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1">Order_ID: #{order.id}</p>
                  <h3 className="text-2xl font-black italic text-white uppercase">{order.total_price}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9px] font-bold uppercase text-zinc-400">Method: {order.payment_method}</span>
                    <span className="w-1 h-1 bg-zinc-800 rounded-full"></span>
                    <span className="text-[9px] font-bold uppercase text-zinc-400">{new Date(order.order_date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-12 w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-12">
                <div className="flex-1 md:flex-none text-right md:text-left">
                  <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2">Current_Status</p>
                  <p className={`text-sm font-black uppercase italic tracking-tighter
                    ${order.status === 'Pending' ? 'text-yellow-500' : 
                      order.status === 'Packing' ? 'text-blue-500' : 
                      order.status === 'On Delivery' ? 'text-purple-500' : 
                      'text-green-500'}`}>
                    {order.status}
                  </p>
                </div>
                <ChevronRight className="text-zinc-800 group-hover:text-cyan-500 transition-colors" />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default UserHistory;