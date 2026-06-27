import React from 'react';
import { motion } from 'framer-motion';

export default function VocabularySlide({ data }) {
  // Lấy dữ liệu từ AI JSON, nếu không có thì dùng placeholder
  const {
    word = "bike to school",
    type = "v",
    meaning = "đạp xe đến trường",
    image_url
  } = data || {};

  // --- Framer Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const popVariants = {
    hidden: { scale: 0.5, opacity: 0, y: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: "spring", bounce: 0.5, duration: 0.8 }
    }
  };

  const decorVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 1 }
    }
  };

  return (
    // Slide Wrapper
    <div className="relative w-full h-screen bg-[#bde0fe] overflow-hidden flex items-center justify-center font-sans">

      {/* --- CÁC HỌA TIẾT TRANG TRÍ (BACKGROUND DECORS) --- */}

      {/* 1. Washi Tape Góc trên trái */}
      <motion.div variants={decorVariants} initial="hidden" animate="visible" className="absolute top-4 -left-12 w-80 h-16 bg-[#d4b4e2] -rotate-[15deg] flex items-center justify-around px-6 opacity-95">
        <HeartIcon className="w-8 h-8 fill-white opacity-80 rotate-12" />
        <HeartIcon className="w-6 h-6 fill-white opacity-80 -rotate-12" />
        <HeartIcon className="w-8 h-8 fill-white opacity-80 rotate-6" />
      </motion.div>

      {/* 2. Washi Tape Góc dưới phải */}
      <motion.div variants={decorVariants} initial="hidden" animate="visible" className="absolute -bottom-2 -right-12 w-96 h-16 bg-[#d4b4e2] -rotate-[15deg] flex items-center justify-around px-6 opacity-95">
        <HeartIcon className="w-8 h-8 fill-white opacity-80 rotate-12" />
        <HeartIcon className="w-10 h-10 fill-white opacity-80 -rotate-12" />
        <HeartIcon className="w-6 h-6 fill-white opacity-80 rotate-45" />
      </motion.div>

      {/* 3. Notebook (Mid Left) */}
      <motion.div variants={decorVariants} initial="hidden" animate="visible" className="absolute top-1/2 -left-4 -translate-y-1/2 w-40 h-56 drop-shadow-lg hover:-translate-y-2 transition-transform cursor-default z-0">
        <svg viewBox="0 0 150 200" className="w-full h-full -rotate-12">
          {/* Sổ bìa */}
          <rect x="25" y="10" width="115" height="170" rx="8" fill="#d4b4e2" />
          <rect x="25" y="170" width="115" height="10" fill="#aed9f8" /> {/* Viền xanh dưới */}
          <rect x="25" y="160" width="115" height="10" fill="#bdecb6" /> {/* Viền xanh lá */}
          {/* Chữ NOTES */}
          <text x="50" y="60" fill="#fff" fontSize="22" fontWeight="bold" transform="rotate(-15 60 70)" fontFamily="sans-serif">NOTES</text>
          {/* Gáy xoắn trắng */}
          <path d="M10,25 Q25,15 20,35 M10,50 Q25,40 20,60 M10,75 Q25,65 20,85 M10,100 Q25,90 20,110 M10,125 Q25,115 20,135 M10,150 Q25,140 20,160 M10,175 Q25,165 20,185" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* 4. Green Pencil (Bottom Left) */}
      <motion.div variants={decorVariants} initial="hidden" animate="visible" className="absolute bottom-20 left-16 w-32 h-10 drop-shadow-md hover:rotate-12 transition-transform z-0">
        <svg viewBox="0 0 200 40" className="w-full h-full -rotate-12">
          {/* Đầu bút */}
          <polygon points="10,20 40,5 40,35" fill="#ffe898" />
          <polygon points="10,20 20,13 20,27" fill="#333" />
          {/* Thân bút xanh */}
          <rect x="40" y="5" width="130" height="30" fill="#bdecb6" />
          <rect x="40" y="15" width="130" height="10" fill="#fff" opacity="0.4" />
          {/* Đuôi bút tẩy */}
          <rect x="170" y="5" width="20" height="30" fill="#333" />
          <rect x="170" y="5" width="8" height="30" fill="#aed9f8" />
        </svg>
      </motion.div>

      {/* 5. Purple Pen (Mid Right) */}
      <motion.div variants={decorVariants} initial="hidden" animate="visible" className="absolute top-1/3 right-10 w-32 h-10 drop-shadow-md hover:-rotate-12 transition-transform z-0">
        <svg viewBox="0 0 200 40" className="w-full h-full -rotate-[45deg]">
          {/* Đầu bút */}
          <path d="M10,20 Q30,5 40,10 L40,30 Q30,35 10,20" fill="#cdb4db" />
          {/* Thân bút tím */}
          <rect x="40" y="10" width="130" height="20" fill="#d4b4e2" />
          <rect x="40" y="10" width="130" height="5" fill="#fff" opacity="0.3" />
          {/* Đuôi bút */}
          <rect x="170" y="10" width="20" height="20" fill="#333" />
          <circle cx="190" cy="20" r="10" fill="#333" />
        </svg>
      </motion.div>

      {/* 6. Scissors & Clothespin (Bottom Right) */}
      <motion.div variants={decorVariants} initial="hidden" animate="visible" className="absolute bottom-32 right-12 flex flex-col gap-4 drop-shadow-md z-0">
        {/* Kẹp ghim tím */}
        <div className="w-24 h-10 rotate-12">
          <svg viewBox="0 0 100 40" className="w-full h-full">
            <rect x="10" y="10" width="80" height="6" rx="3" fill="#d4b4e2" />
            <rect x="10" y="20" width="80" height="6" rx="3" fill="#d4b4e2" />
            <circle cx="50" cy="18" r="4" fill="#ffe898" />
            <path d="M20,13 L80,23" stroke="#ffe898" strokeWidth="2" opacity="0.5" />
          </svg>
        </div>
        {/* Kéo xanh ngọc */}
        <div className="w-32 h-32 -rotate-45 ml-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Lưỡi kéo */}
            <polygon points="20,20 60,45 20,50" fill="#bdecb6" />
            <polygon points="20,80 60,55 20,50" fill="#bdecb6" />
            {/* Trục */}
            <circle cx="55" cy="50" r="4" fill="#333" />
            {/* Tay cầm tròn */}
            <circle cx="80" cy="30" r="15" fill="none" stroke="#aed9f8" strokeWidth="6" />
            <circle cx="80" cy="70" r="15" fill="none" stroke="#aed9f8" strokeWidth="6" />
          </svg>
        </div>
      </motion.div>


      {/* --- CONTENT CHÍNH --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-[90%] max-w-[1200px] h-full py-8 md:py-16 flex flex-col items-center justify-center gap-10 md:gap-14"
      >
        {/* Tiêu đề "New words" (Khối xanh dương) */}
        <motion.div
          variants={popVariants}
          className="w-[80%] max-w-[900px] bg-[#aed9f8] rounded-[24px] md:rounded-[32px] py-4 md:py-6 px-10 text-center shadow-sm"
        >
          <h2 className="text-[2.2rem] md:text-[3.5rem] font-bold text-[#2f3542] tracking-wide" style={{ fontFamily: "'Fredoka', sans-serif" }}>
            New words
          </h2>
        </motion.div>

        {/* Khối Trắng ở giữa chứa thông tin từ vựng */}
        <motion.div
          variants={popVariants}
          className="w-full bg-white rounded-[32px] md:rounded-[48px] flex flex-col md:flex-row items-center justify-center p-6 md:p-12 shadow-sm gap-8 md:gap-16"
        >
          {/* Ảnh minh họa (Bên trái) */}
          <div className="w-full md:w-[45%] lg:w-[40%] aspect-square bg-[#f1f5f9] rounded-[24px] md:rounded-[32px] overflow-hidden flex items-center justify-center shadow-inner relative group">
            <img
              src={image_url || `https://image.pollinations.ai/prompt/${encodeURIComponent(`Cute flat vector illustration for kids of ${word}, white background, highly detailed`)}?width=400&height=400&nologo=true`}
              alt={word}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Cụm Text (Bên phải) */}
          <div className="w-full md:w-[50%] flex flex-col items-center justify-center text-center gap-3 md:gap-5 py-4">
            {/* Từ tiếng Anh */}
            <h1
              className={`
                ${word.length > 20 ? 'text-[2rem] md:text-[2.8rem]' : 'text-[2.8rem] md:text-[4rem]'} 
                font-bold text-[#2f3542] leading-[1.2] text-balance
              `}
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              {word}
            </h1>

            {/* Loại từ (VD: v, n, adj) */}
            <span className="text-[1.5rem] md:text-[2rem] font-bold text-[#6b7280]" style={{ fontFamily: "'Nunito', sans-serif" }}>
              ({type})
            </span>

            {/* Nghĩa tiếng Việt */}
            <p className="text-[1.6rem] md:text-[2.2rem] font-semibold text-[#4b5563] text-balance max-w-full px-2 mt-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {meaning}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Sub-component cho icon trái tim trên cuộn băng dính
function HeartIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}
