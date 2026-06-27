import React from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';

export default function ChantSlide({ data }) {
  const {
    title = "Listen\nand chant",
    image_url,
    audio_url,
    lyrics = [
      "The ancient Maya people",
      "lived in Mexico long ago.",
      "Their cities were amazing;",
      "there's a lot that we now know.",
      "They didn't use electricity;",
      "they cooked on fires, of course.",
      "They walked to places, didn't drive,",
      "and didn't travel by horse.",
      "The people farmed and sailed and cooked,",
      "painted pictures on the walls.",
      "They loved the taste of chocolate",
      "and played a sport with balls."
    ]
  } = data || {};

  return (
    <div className="relative w-full h-screen bg-[#fae596] overflow-hidden flex items-center justify-center font-sans">
      {/* Audio Player nổi ở góc phải trên cùng */}
      {audio_url && (
        <div className="absolute top-8 right-12 z-[100]">
          <AudioPlayer src={audio_url} />
        </div>
      )}

      {/* --- CÁC HỌA TIẾT TRANG TRÍ NỀN (BACKGROUND DECORS) --- */}
      {/* 1. Nền chấm bi (Polka dots) mờ */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(#d4b4e2 4px, transparent 4px)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }}
      />

      {/* 2. Đường lượn sóng (Góc trên trái) */}
      <div className="absolute top-8 left-8 z-0">
        <svg viewBox="0 0 100 50" className="w-24 h-12">
          <path d="M0,20 Q10,0 20,20 T40,20 T60,20 T80,20 T100,20" fill="none" stroke="#87c7e3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M0,40 Q10,20 20,40 T40,40 T60,40 T80,40 T100,40" fill="none" stroke="#78c6a3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* 3. Cụm sao lấp lánh (Góc trên phải) */}
      <div className="absolute top-12 right-12 z-0 animate-pulse">
        <svg viewBox="0 0 50 50" className="w-12 h-12 rotate-12">
          <path d="M25,0 Q25,25 50,25 Q25,25 25,50 Q25,25 0,25 Q25,25 25,0" fill="#fff" stroke="#333" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        <svg viewBox="0 0 50 50" className="w-8 h-8 absolute top-10 -left-6 -rotate-12">
          <path d="M25,0 Q25,25 50,25 Q25,25 25,50 Q25,25 0,25 Q25,25 25,0" fill="#ffc8dd" stroke="#333" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>

      {/* 4. Hình tròn và X (Góc dưới trái) */}
      <div className="absolute bottom-12 left-12 z-0 opacity-80">
        <svg viewBox="0 0 100 100" className="w-16 h-16">
          <circle cx="30" cy="30" r="15" fill="none" stroke="#ffb7b2" strokeWidth="6" />
          <path d="M60,60 L90,90 M90,60 L60,90" stroke="#87c7e3" strokeWidth="6" strokeLinecap="round" />
          <circle cx="80" cy="20" r="8" fill="#d4b4e2" />
        </svg>
      </div>

      {/* 5. Nốt nhạc bay bổng (Giữa 2 khối) */}
      <div className="absolute top-1/3 left-[45%] z-20 hidden lg:block opacity-70">
        <svg viewBox="0 0 100 100" className="w-16 h-16 -rotate-12">
          <path d="M30,70 A15,10 0 1,1 15,60 L15,10 L75,20 L75,60 A15,10 0 1,1 60,50 L60,30 L25,25 L25,70 Z" fill="#bdecb6" stroke="#333" strokeWidth="3" />
        </svg>
      </div>
      <div className="absolute bottom-1/3 left-[42%] z-20 hidden lg:block opacity-70">
        <svg viewBox="0 0 50 50" className="w-10 h-10 rotate-12">
          <path d="M25,40 A10,7 0 1,1 15,33 L15,5 L35,10 L35,15 L25,12 L25,40 Z" fill="#ffc8dd" stroke="#333" strokeWidth="3" />
        </svg>
      </div>

      <div className="relative z-10 w-[95%] max-w-[1400px] flex flex-row items-stretch justify-center gap-12 lg:gap-20">

        {/* --- CỘT TRÁI (Khối Blue) --- */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="w-[40%] bg-[#bde0fe] border-[12px] border-[#d4b4e2] rounded-[60px] p-8 flex flex-col items-center justify-center relative shadow-sm"
        >
          {/* Text Title */}
          <h2
            className="text-[4rem] lg:text-[5.5rem] font-bold text-[#2f3542] text-center leading-[1.1] mb-8"
            style={{ fontFamily: "'Patrick Hand', cursive", whiteSpace: "pre-line" }}
          >
            {title}
          </h2>

          {/* Khối Ảnh */}
          <div className="relative w-full max-w-[400px] aspect-[4/3] rounded-3xl overflow-hidden shadow-lg group">
            {/* Ảnh nền */}
            {image_url ? (
              <img src={image_url} alt="Chant" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                <span className="text-2xl">Video/Image</span>
              </div>
            )}
          </div>
        </motion.div>


        {/* --- CỘT PHẢI (Khối Lời bài hát) --- */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
          className="w-[50%] relative mt-8 lg:mt-0"
        >
          {/* Nhân vật ngó đầu từ trên khối trắng */}
          <div className="absolute -top-14 left-1/4 z-0 w-32 h-16">
            <svg viewBox="0 0 100 50" className="w-full h-full">
              {/* Mắt trái */}
              <circle cx="30" cy="30" r="12" fill="#2f3542" />
              <path d="M22,25 A8,8 0 0,1 38,25" fill="#fff" /> {/* Highlight mắt */}
              {/* Mắt phải */}
              <circle cx="70" cy="30" r="12" fill="#2f3542" />
              <path d="M62,25 A8,8 0 0,1 78,25" fill="#fff" />
              {/* Miệng mỉm cười */}
              <path d="M45,40 Q50,48 55,40" stroke="#2f3542" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Má hồng (dạng đường sọc chéo) */}
              <path d="M15,45 L25,45 M17,49 L23,49" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />
              <path d="M75,45 L85,45 M77,49 L83,49" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Băng dính Washi Tape góc phải */}
          <div className="absolute -top-6 -right-8 z-20 w-56 h-14 bg-[#cdb4db] rotate-[15deg] shadow-sm flex items-center justify-around px-4 overflow-hidden">
            {/* Răng cưa của băng dính */}
            <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, #fae596 4px, #fae596 8px)' }}></div>
            <div className="absolute right-0 top-0 bottom-0 w-2" style={{ background: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, #fae596 4px, #fae596 8px)' }}></div>
            {/* Họa tiết tim trắng */}
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white -rotate-12"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white rotate-12"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white -rotate-6"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          </div>

          {/* Khung trắng chứa Lời bài hát */}
          <div className="w-full h-full bg-white rounded-[40px] p-8 shadow-md relative z-10 flex flex-col justify-center min-h-[400px]">
            <div className="flex flex-col gap-1 text-center">
              {lyrics.map((line, index) => (
                <p
                  key={index}
                  className="text-[1.2rem] lg:text-[1.6rem] font-bold text-[#557b2f] leading-snug"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Decor cuộn ruy băng (Góc dưới trái của khối trắng) */}
          <div className="absolute -bottom-8 left-0 z-20">
            <svg viewBox="0 0 100 100" className="w-20 h-20">
              <path d="M20,80 C10,50 60,30 50,70 C40,110 90,80 80,40" fill="none" stroke="#a3c988" strokeWidth="6" strokeLinecap="round" />
              <path d="M50,90 C60,60 90,60 80,90 C70,120 100,100 90,70" fill="none" stroke="#ffb7b2" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
