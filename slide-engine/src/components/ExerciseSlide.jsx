import React from 'react';
import { motion } from 'framer-motion';

export default function ExerciseSlide({ data }) {
  const { 
    title = "Bài tập",
    embed_url = "" // Nếu có url sẽ nhúng iframe, nếu không sẽ hiện placeholder mộc
  } = data || {};

  return (
    <div className="relative w-full h-screen bg-[#fae596] overflow-hidden flex items-center justify-center font-sans p-4 lg:p-12">
      
      {/* --- TRANG TRÍ BÊN NGOÀI (Nền vàng) --- */}
      {/* Nền chấm bi mờ */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(#d4b4e2 4px, transparent 4px)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }}
      />

      {/* Đường lượn sóng (Góc trên trái) */}
      <div className="absolute top-8 left-8 z-0">
        <svg viewBox="0 0 100 50" className="w-24 h-12">
          <path d="M0,20 Q10,0 20,20 T40,20 T60,20 T80,20 T100,20" fill="none" stroke="#87c7e3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M0,40 Q10,20 20,40 T40,40 T60,40 T80,40 T100,40" fill="none" stroke="#78c6a3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* --- KHUNG CHÍNH (Khối Xanh dương bo tròn viền tím) --- */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="relative z-10 w-full max-w-[1400px] h-full max-h-[900px] bg-[#bde0fe] border-[12px] lg:border-[16px] border-[#d4b4e2] rounded-[40px] lg:rounded-[60px] flex flex-col items-center justify-start py-8 px-4 lg:py-12 lg:px-16 shadow-lg"
      >
        
        {/* --- TRANG TRÍ BÊN TRONG (Khối xanh) --- */}
        {/* Nhân vật ngó đầu & Băng dính Washi Tape (Góc trên phải) */}
        <div className="absolute top-0 right-12 lg:right-24 z-20">
          {/* Khuôn mặt */}
          <div className="absolute -top-6 -left-16 w-32 h-16 rotate-12">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              {/* Mắt trái */}
              <circle cx="30" cy="30" r="12" fill="#2f3542" />
              <path d="M22,25 A8,8 0 0,1 38,25" fill="#fff" />
              {/* Mắt phải */}
              <circle cx="70" cy="30" r="12" fill="#2f3542" />
              <path d="M62,25 A8,8 0 0,1 78,25" fill="#fff" />
              {/* Miệng mỉm cười */}
              <path d="M45,40 Q50,48 55,40" stroke="#2f3542" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Má hồng */}
              <path d="M15,45 L25,45 M17,49 L23,49" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />
              <path d="M75,45 L85,45 M77,49 L83,49" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          
          {/* Băng dính */}
          <div className="absolute -top-12 -right-8 z-30 w-56 h-14 bg-[#cdb4db] rotate-[20deg] shadow-sm flex items-center justify-around px-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, #fae596 4px, #fae596 8px)' }}></div>
            <div className="absolute right-0 top-0 bottom-0 w-2" style={{ background: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, #fae596 4px, #fae596 8px)' }}></div>
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white -rotate-12"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white rotate-12"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white -rotate-6"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          </div>
        </div>

        {/* Cuộn ruy băng (Góc dưới giữa) */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-20 w-32 h-20">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <path d="M20,40 C10,10 50,0 40,30 C30,60 70,40 60,10" fill="none" stroke="#a3c988" strokeWidth="5" strokeLinecap="round" />
            <path d="M40,45 C50,20 80,10 70,40 C60,70 100,50 90,20" fill="none" stroke="#ffb7b2" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>

        {/* --- NỘI DUNG --- */}
        {/* Tiêu đề */}
        <h1 
          className="text-[3.5rem] lg:text-[4.5rem] font-black text-[#5e54d6] mb-8 lg:mb-12"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          {title}
        </h1>

        {/* Vùng nhúng Iframe */}
        <div className="w-full max-w-[1000px] flex-1 min-h-[400px] bg-[#2a0845] rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col items-center justify-center border-4 border-[#3a0ca3]">
          
          {embed_url ? (
            // Nếu có link bài tập, nhúng thẳng thẻ iframe
            <iframe 
              src={embed_url} 
              className="w-full h-full border-none"
              title="Exercise Iframe"
              allowFullScreen
            />
          ) : (
            // Nếu chưa truyền link, hiển thị Placeholder giống Wayground (Quizizz)
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#400e32] to-[#1a0525] text-white">
              
              {/* Logo giả lập Wayground */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  <div className="w-2 h-6 bg-[#ff477e] -skew-x-12"></div>
                  <div className="w-2 h-8 bg-[#ff477e] -skew-x-12"></div>
                  <div className="w-4 h-10 bg-[#ff477e] -skew-x-12"></div>
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-[#ff477e]">WAYGROUND</h2>
              </div>
              <p className="text-sm text-[#00e5ff] font-semibold mb-10 tracking-widest uppercase">formerly Quizizz</p>
              
              {/* Thông tin bài test */}
              <h3 className="text-5xl font-bold mb-4 font-sans">Look3_10</h3>
              
              <div className="flex flex-col items-center gap-2 mb-8 text-gray-300 font-medium">
                <p>Created by</p>
                <div className="flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full">
                  <span className="text-white font-semibold">Hậu Minh</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">15 questions</p>
              </div>

              {/* Nút Play */}
              <button className="bg-white text-black font-bold text-xl px-12 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                Play now
              </button>

            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
}
