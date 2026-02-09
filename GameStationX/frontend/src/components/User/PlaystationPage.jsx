import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

// DATA PRODUK UPDATE
const PS_STORE_DATA = [
  { id: 1, name: "PlayStation 5 ", price: "Rp 9.299.000", img: "/Playstation5.jpg", category: "Latest Gen", desc: "Experience lightning fast loading with an ultra-high speed SSD." },
  { id: 2, name: "PlayStation 3 Super Slim", price: "Rp 1.600.000", img: "/Playstation3.jpg", category: "Classic", desc: "The generation that defined high-definition gaming." },
  { id: 3, name: "PlayStation 2 FAT", price: "Rp 450.000", img: "/Playstation2.jpg", category: "Retro", desc: "The best-selling console in gaming history." },
  { id: 4, name: "God of War Ragnarok", price: "Rp 729.000", img: "/god_of_war.jpg", category: "Games", desc: "God of War is an action-adventure game franchise created by David Jaffe and developed by Sony's Santa Monica Studio. It began in 2005 on the PlayStation 2 (PS2) video game console and has become a flagship series for PlayStation, consisting of nine installments across multiple platforms. Based on ancient mythologies, the series' plot follows Kratos, a Spartan warrior who becomes the God of War and comes into conflict with various mythological pantheons. The earlier games in the series are based on Greek mythology and see Kratos follow a path of vengeance against the Olympian gods; the later games are based on Norse mythology and see Kratos on a path of redemption while also introducing his son Atreus as a secondary protagonist, as they come into conflict or interact with various Norse deities and figures." },
  { id: 5, name: "The Last of Us Part I", price: "Rp 799.000", img: "/TheLastOfUs.jpg", category: "Games", desc: "Experience he Last of Us Part I is a 2022 action-adventure game developed by Naughty Dog and published by Sony Interactive Entertainment. A remake of the 2013 game The Last of Us, it features revised gameplay, including enhanced combat and exploration, and expanded accessibility options. Players control Joel, who is tasked with escorting the young Ellie across a post-apocalyptic United States and defend her against cannibalistic creatures infected by a mutated strain of the Cordyceps fungus. The game includes a remake of the 2014 expansion pack The Last of Us: Left Behind, which follows Ellie and her best friend Riley. emotional storytelling and unforgettable characters." },
  { id: 6, name: "Uncharted Legacy of Thieves Collection", price: "Rp 1.299.000", img: "/Uncharted.jpg", category: "Games", desc: "The Uncharted LPlay as Nathan Drake and Chloe Frazer in their own standalone adventures as they confront their pasts and forge their own legacies. This game includes the critically acclaimed single-player stories from both UNCHARTED 4: A Thief’s End and UNCHARTED: The Lost Legacy.egacy of Thieves Collection is a compilation of three Uncharted games, featuring the adventures of Nathan Drake and his companions in their quest for treasure and discovery." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

// --- TAMBAHKAN PROPS { onAddToCart } DI SINI ---
const PlaystationPage = ({ onAddToCart }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-[#020202] text-white min-h-screen pb-20 overflow-hidden"
    >
      <audio ref={audioRef} loop src="/ps_backsound.mp3" />

      {/* HERO */}
      <header className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="/Playstation.jpg" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#020202]" />
        </div>

        <div className="relative z-10 text-center">
          <span className="text-blue-500 font-black tracking-[0.8em] text-[10px] uppercase block mb-4">
            Ultimate Interface
          </span>
          <h1 className="text-7xl md:text-[10rem] font-black italic uppercase">
            PS<span className="text-blue-600">X</span>
          </h1>
          <p className="text-gray-400 italic tracking-widest mt-4">
            "Play Has No Limits. Explore the Legacy."
          </p>
        </div>
      </header>

      {/* PRODUCTS */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 -mt-20 relative z-20">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PS_STORE_DATA.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group bg-white/5 border border-white/5 rounded-[2.5rem] p-6 hover:bg-white/10 transition-all duration-500 shadow-2xl flex flex-col h-full"
            >
              {/* IMAGE */}
              <div className="relative h-72 mb-6 overflow-hidden rounded-[2rem] bg-zinc-900">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute top-4 right-4 bg-black/60 px-4 py-1.5 rounded-full text-[8px] font-black uppercase text-blue-400">
                  {item.category}
                </div>
              </div>

              {/* INFO */}
              <div className="flex flex-col flex-1 space-y-4">
                <h3 className="text-xl font-black uppercase italic group-hover:text-blue-500 transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs text-gray-500 italic">
                  {item.desc}
                </p>

                {/* PRICE + BUTTON (SEJAJAR) */}
                <div className="flex justify-between items-center pt-6 mt-auto">
                  <div>
                    <span className="text-[9px] text-zinc-600 uppercase font-bold block mb-1">
                      Price
                    </span>
                    <span className="text-2xl font-black italic">
                      {item.price}
                    </span>
                  </div>

                  {/* UPDATE: ONCLICK MENGIRIM DATA KE APP.JSX */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onAddToCart({ ...item, title: item.name })}
                    className="bg-blue-600 px-6 py-3 rounded-2xl flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 transition-all"
                  >
                    <ShoppingBag size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Add
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </motion.div>
  );
};

export default PlaystationPage;