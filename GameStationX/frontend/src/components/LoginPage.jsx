import React, { useState } from "react";
import { motion } from "framer-motion";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.Status === "Success") {
        localStorage.setItem("token", data.Token);
        onLoginSuccess(data.Role);
      } else {
        alert(data.Message);
      }
    } catch (err) {
      alert("Pastikan Backend sudah dijalankan!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-12 bg-white/5 border border-white/10 rounded-[3rem] w-full max-w-md backdrop-blur-xl">
        <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-10 text-center">GAMESTATION<span className="text-blue-600">X</span></h2>
        <form onSubmit={handleLogin} className="space-y-8">
          <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-blue-600 outline-none transition-all" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="PASSWORD" className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:border-blue-600 outline-none transition-all" onChange={e => setPassword(e.target.value)} />
          <button className="w-full bg-blue-600 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-500 shadow-2xl transition-all">Verify Identity</button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;