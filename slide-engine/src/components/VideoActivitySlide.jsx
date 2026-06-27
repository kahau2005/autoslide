import React from 'react';
import { motion } from 'framer-motion';
import DynamicActivity from './DynamicActivity';

export default function VideoActivitySlide({ data }) {
  const {
    title_left = "Watch the video.",
    video_url = "https://www.w3schools.com/html/mov_bbb.mp4",
    activity = {
      type: "checkbox",
      question: "Who did the activity in the photo?",
      image_url: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800",
      options: [
        { id: "1", text: "Shiven", is_correct: false },
        { id: "2", text: "Rhiane", is_correct: false },
        { id: "3", text: "AJ", is_correct: true }
      ]
    }
  } = data || {};

  return (
    <div className="relative w-full h-screen bg-[#fae596] overflow-hidden flex items-center justify-center font-sans">

      {/* --- DECORS (Trang trí) --- */}
      {/* 1. Đường lượn sóng (Zig-zag) Góc trên trái */}
      <div className="absolute top-10 left-12 z-0 w-24 h-24 rotate-[-10deg]">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[4] strokeLinecap-round strokeLinejoin-round">
          <path d="M5,20 L25,40 L45,20 L65,40 L85,20" stroke="#78c6a3" />
          <path d="M5,40 L25,60 L45,40 L65,60 L85,40" stroke="#87c7e3" />
          <path d="M5,60 L25,80 L45,60 L65,80 L85,60" stroke="#2f3542" />
        </svg>
      </div>

      {/* 2. Băng dính Washi Tape Trái tim Góc trên phải (Dán đè lên khung trắng) */}
      <div className="absolute top-12 right-[5%] z-30 rotate-[20deg] w-64 h-16 bg-[#d4b4e2] shadow-sm flex items-center justify-center gap-8 overflow-hidden opacity-90"
        style={{ clipPath: 'polygon(5% 0, 95% 0, 100% 15%, 98% 30%, 100% 50%, 98% 70%, 100% 85%, 95% 100%, 5% 100%, 0 85%, 2% 70%, 0 50%, 2% 30%, 0 15%)' }}
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white/80 rotate-[-15deg] mt-2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
        <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white/80 rotate-[10deg]"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white/80 rotate-[-5deg] mt-1"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
      </div>

      <div className="relative z-10 w-[95%] max-w-[1400px] h-[85vh] flex flex-row items-stretch justify-center gap-8 lg:gap-12 mt-4">

        {/* --- CỘT TRÁI (Khối Video) --- */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="w-[40%] bg-[#bde0fe] border-[12px] border-[#d4b4e2] rounded-[60px] p-8 lg:p-10 flex flex-col items-center justify-center shadow-sm"
        >
          {/* Tiêu đề Cột trái */}
          <h2 className="text-[2rem] lg:text-[2.5rem] font-bold text-[#2f3542] mb-8 text-center leading-none" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {title_left}
          </h2>

          {/* Trình phát Video */}
          <div className="w-full aspect-video rounded-[24px] overflow-hidden shadow-md bg-black border-[4px] border-[#7b5cda] relative group">
            {video_url ? (
              <video src={video_url} controls className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/50 text-xl font-bold">
                No Video Source
              </div>
            )}
          </div>
        </motion.div>


        {/* --- CỘT PHẢI (Khối Activity) --- */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
          className="flex-1 bg-white rounded-[40px] p-8 lg:p-10 shadow-sm relative flex flex-col overflow-visible"
        >
          {/* Khuôn mặt hoạt hình lấp ló viền trên */}
          <div className="absolute -top-[55px] left-[15%] w-36 h-20 z-20 pointer-events-none">
            <svg viewBox="0 0 100 60" className="w-full h-full">
              {/* Tròng mắt đen T */}
              <circle cx="30" cy="40" r="14" fill="#2f3542" />
              {/* Lòng trắng mắt T (Lưỡi liềm) */}
              <path d="M22,35 A10,10 0 0,1 38,35 A10,10 0 0,0 22,35" fill="#fff" />
              <path d="M34,42 A3,3 0 1,1 34.01,42" fill="#fff" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              {/* Đường kẻ dưới mắt T */}
              <line x1="20" y1="56" x2="40" y2="56" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
              <line x1="22" y1="52" x2="38" y2="52" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="48" x2="36" y2="48" stroke="#2f3542" strokeWidth="1" strokeLinecap="round" />

              {/* Tròng mắt đen P */}
              <circle cx="70" cy="40" r="14" fill="#2f3542" />
              {/* Lòng trắng mắt P (Lưỡi liềm) */}
              <path d="M62,35 A10,10 0 0,1 78,35 A10,10 0 0,0 62,35" fill="#fff" />
              <path d="M74,42 A3,3 0 1,1 74.01,42" fill="#fff" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              {/* Đường kẻ dưới mắt P */}
              <line x1="60" y1="56" x2="80" y2="56" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
              <line x1="62" y1="52" x2="78" y2="52" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />
              <line x1="64" y1="48" x2="76" y2="48" stroke="#2f3542" strokeWidth="1" strokeLinecap="round" />

              {/* Lông mi T */}
              <path d="M22,25 L18,15" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
              <path d="M30,22 L30,12" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
              <path d="M38,25 L42,15" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />

              {/* Lông mi P */}
              <path d="M62,25 L58,15" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
              <path d="M70,22 L70,12" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
              <path d="M78,25 L82,15" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />

              {/* Miệng mỉm cười */}
              <path d="M45,45 Q50,55 55,45" fill="none" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* DYNAMIC ACTIVITY RENDERER */}
          <div className="flex-1 pt-6 flex flex-col min-h-0 overflow-hidden">
            <DynamicActivity activity={activity} />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
