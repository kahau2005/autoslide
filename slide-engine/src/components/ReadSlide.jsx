import React from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';

export default function ReadSlide({ data }) {
  const {
    title = "Listen and read",
    audio_url,
    content,
    sentences = [
      "The ancient Maya people *lived* in Mexico.",
      "They *didn't use* electricity."
    ]
  } = data || {};

  // Nếu truyền content dạng string thì tách ra thành mảng (theo xuống dòng), nếu không thì dùng mảng sentences mặc định
  const displaySentences = content ? content.split('\n') : sentences;

  // Hàm render chữ nổi bật (phần bọc trong dấu *...* sẽ thành màu đỏ)
  const parseHighlight = (text) => {
    const parts = text.split(/\*(.*?)\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <span key={i} className="text-[#e74c3c]">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden flex flex-col items-center justify-center font-sans">

      {/* --- CÁC HỌA TIẾT TRANG TRÍ NỀN --- */}
      {/* Nền chấm bi tím nhạt */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#d4b4e2 4px, transparent 4px)',
          backgroundSize: '80px 80px',
          backgroundPosition: '0 0, 40px 40px'
        }}
      />

      {/* --- HEADER --- */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative z-10 bg-[#bde0fe] rounded-[32px] py-4 px-24 shadow-sm mb-12"
      >
        <h2
          className="text-[3.5rem] font-bold text-[#2f3542] leading-none tracking-wide text-center"
          style={{ fontFamily: "'Fredoka', sans-serif" }}
        >
          {title}
        </h2>
      </motion.div>

      {/* --- NỘI DUNG CHÍNH (Khối Vàng) --- */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
        className="relative z-10 w-[90%] max-w-[1200px] bg-[#fae596] rounded-[60px] p-12 lg:p-20 shadow-md flex flex-col items-center justify-center min-h-[350px]"
      >
        {/* Trình phát Audio nổi ở góc phải trên */}
        {audio_url && (
          <div className="absolute -top-6 right-6 z-50">
            <AudioPlayer src={audio_url} />
          </div>
        )}

        {/* Nội dung text */}
        <div className="flex flex-col gap-4 text-center z-10 relative">
          {displaySentences.map((sentence, index) => (
            <p
              key={index}
              className="text-[2.5rem] md:text-[3.5rem] font-bold text-[#1e272e] leading-snug"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              {parseHighlight(sentence)}
            </p>
          ))}
        </div>

        {/* --- CÁC DECOR TƯƠNG TÁC XUNG QUANH KHỐI VÀNG --- */}

        {/* 1. Khối Lập Phương Xanh Lá (Góc trên trái) */}
        <div className="absolute -top-16 -left-16 md:-top-24 md:-left-24 z-20 w-40 h-40 md:w-56 md:h-56 -rotate-12 animate-bounce hover:animate-spin" style={{ animationDuration: '3s' }}>
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Cạnh trên */}
            <polygon points="50,60 110,40 170,60 110,80" fill="#c3e8b0" stroke="#2f3542" strokeWidth="4" strokeLinejoin="round" />
            {/* Cạnh bên phải */}
            <polygon points="110,80 170,60 170,120 110,140" fill="#a4d193" stroke="#2f3542" strokeWidth="4" strokeLinejoin="round" />
            {/* Cạnh trước */}
            <polygon points="50,60 110,80 110,140 50,120" fill="#bdecb6" stroke="#2f3542" strokeWidth="4" strokeLinejoin="round" />

            {/* Khuôn mặt dễ thương */}
            <circle cx="70" cy="90" r="4" fill="#2f3542" />
            <circle cx="90" cy="90" r="4" fill="#2f3542" />
            <path d="M70,105 Q80,120 90,105 Z" fill="#d4b4e2" stroke="#2f3542" strokeWidth="3" />

            {/* Tay (Giơ lên cao yoohoo) */}
            <path d="M50,90 Q30,70 20,60" fill="none" stroke="#2f3542" strokeWidth="4" strokeLinecap="round" />
            <circle cx="20" cy="60" r="4" fill="none" stroke="#2f3542" strokeWidth="3" />
            <path d="M110,100 Q130,80 150,70" fill="none" stroke="#2f3542" strokeWidth="4" strokeLinecap="round" />
            <circle cx="150" cy="70" r="4" fill="none" stroke="#2f3542" strokeWidth="3" />

            {/* Chân đang chạy/nhảy */}
            <path d="M60,130 Q60,160 80,170" fill="none" stroke="#2f3542" strokeWidth="5" strokeLinecap="round" />
            <path d="M100,135 Q100,160 120,150" fill="none" stroke="#2f3542" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>

        {/* 2. Kính viễn vọng (Góc dưới trái) */}
        <div className="absolute -bottom-16 -left-16 md:-bottom-24 md:-left-24 z-20 w-48 h-48 md:w-64 md:h-64 rotate-[15deg]">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Chân máy (Tripod) */}
            <line x1="100" y1="120" x2="80" y2="180" stroke="#372c84" strokeWidth="8" strokeLinecap="round" />
            <line x1="100" y1="120" x2="100" y2="180" stroke="#372c84" strokeWidth="8" strokeLinecap="round" />
            <line x1="100" y1="120" x2="120" y2="180" stroke="#372c84" strokeWidth="8" strokeLinecap="round" />
            <line x1="85" y1="150" x2="115" y2="150" stroke="#372c84" strokeWidth="4" />

            {/* Khớp nối chữ T */}
            <rect x="92" y="110" width="16" height="20" fill="#372c84" rx="4" />
            <circle cx="100" cy="120" r="6" fill="#fff" />

            {/* Thân kính viễn vọng chính (Ống xéo) */}
            <g transform="rotate(-15 100 100)">
              {/* Ống nhỏ sau */}
              <rect x="40" y="85" width="40" height="15" fill="#f1f5f9" stroke="#cfd8dc" strokeWidth="2" />
              {/* Ống lớn */}
              <rect x="80" y="80" width="80" height="25" fill="#fff" stroke="#cfd8dc" strokeWidth="2" />
              {/* Vòng đai */}
              <rect x="110" y="80" width="10" height="25" fill="#372c84" />
              <rect x="70" y="85" width="10" height="15" fill="#d4b4e2" />
              {/* Mắt kính (Thấu kính sau) */}
              <path d="M40,82 L35,82 L35,103 L40,103 Z" fill="#372c84" />
              {/* Nắp kính viễn vọng trước */}
              <path d="M160,75 L170,75 L170,110 L160,110 Z" fill="#372c84" />
              <path d="M170,80 L175,80 L175,105 L170,105 Z" fill="#ffc8dd" />
            </g>
          </svg>
        </div>

        {/* 3. Cụm sao lấp lánh (Góc dưới phải) */}
        <div className="absolute -bottom-8 -right-8 md:-bottom-16 md:-right-16 z-20">
          <svg viewBox="0 0 100 100" className="w-32 h-32 md:w-48 md:h-48 animate-pulse">
            {/* Sao vàng to */}
            <path d="M50,10 Q55,40 85,45 Q55,50 50,80 Q45,50 15,45 Q45,40 50,10" fill="#fae596" stroke="#2f3542" strokeWidth="3" strokeLinejoin="round" />
            {/* Sao xanh teal nhỏ */}
            <path d="M20,60 Q22,75 35,78 Q22,81 20,95 Q18,81 5,78 Q18,75 20,60" fill="#00cec9" stroke="#2f3542" strokeWidth="3" strokeLinejoin="round" />
            {/* Sao trắng nhỏ */}
            <path d="M80,70 Q82,85 95,88 Q82,91 80,105 Q78,91 65,88 Q78,85 80,70" fill="#fff" stroke="#2f3542" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>
      </motion.div>
    </div>
  );

}