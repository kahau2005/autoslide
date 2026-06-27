import React from 'react';
import { motion } from 'framer-motion';

export default function UnitTitleSlide({ data }) {
  // --- Framer Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const popVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", bounce: 0.5, duration: 0.8 }
    }
  };

  const floatVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", bounce: 0.4 }
    }
  };

  return (
    // Slide Wrapper: Fullscreen 16:9 ratio container
    <div className="relative w-full h-screen bg-[#fdfdfd] overflow-hidden flex items-center justify-center">
      
      {/* 1. Background Pattern */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: 'radial-gradient(#e0d4e8 4px, transparent 4px)',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }}
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-[80%] max-w-[1200px] aspect-[16/9] flex items-center justify-center"
      >
        {/* 2. Main Box */}
        <motion.div 
          variants={popVariants}
          className="relative w-full h-[75%] bg-[#bce0fd] border-[20px] border-[#ccafe0] rounded-[80px] flex items-center justify-center shadow-lg"
        >
          {/* 3. Text Tiêu đề */}
          <motion.h1 
            variants={floatVariants}
            className={`
              ${(data?.title || "").length > 40
                ? "text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem]"
                : (data?.title || "").length > 20
                  ? "text-[3rem] md:text-[4.5rem] lg:text-[6rem]"
                  : "text-[4rem] md:text-[6rem] lg:text-[8rem]"}
              font-bold text-[#333333] tracking-widest uppercase text-center px-12 leading-[1.2] whitespace-pre-line text-balance
            `}
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            {data?.title}
          </motion.h1>

          {/* 4. Decor: Tia chớp vàng (Góc trên trái) */}
          <motion.div variants={popVariants} className="absolute -top-16 -left-16 w-32 h-32 md:w-36 md:h-36">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#ffd166] stroke-current" strokeWidth="8" strokeLinecap="round">
              <line x1="20" y1="80" x2="45" y2="55" />
              <line x1="5" y1="45" x2="35" y2="40" />
              <line x1="40" y1="15" x2="55" y2="45" />
            </svg>
          </motion.div>

          {/* 5. Decor: Tia chớp vàng (Góc dưới phải) */}
          <motion.div variants={popVariants} className="absolute -bottom-16 -right-16 w-32 h-32 md:w-36 md:h-36">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#ffd166] stroke-current" strokeWidth="8" strokeLinecap="round">
              <line x1="80" y1="20" x2="55" y2="45" />
              <line x1="95" y1="55" x2="65" y2="60" />
              <line x1="60" y1="85" x2="45" y2="55" />
            </svg>
          </motion.div>

          {/* 6. Decor: Ngôi sao Sparkles (Góc trên phải) */}
          <motion.div variants={popVariants} className="absolute -top-12 -right-8 flex flex-col gap-4">
            <svg className="w-16 h-16 md:w-24 md:h-24 text-[#fff69c] fill-current stroke-[#333] stroke-[3px]" viewBox="0 0 24 24">
              <path d="M12 0l2.5 8.5H24l-7.5 5.5 2.5 10-8-6-8 6 2.5-10L0 8.5h9.5z" strokeLinejoin="round" />
            </svg>
            <svg className="w-10 h-10 md:w-14 md:h-14 text-[#c5e8c1] fill-current stroke-[#333] stroke-[3px] ml-10 md:ml-16" viewBox="0 0 24 24">
              <path d="M12 0l2.5 8.5H24l-7.5 5.5 2.5 10-8-6-8 6 2.5-10L0 8.5h9.5z" strokeLinejoin="round" />
            </svg>
          </motion.div>

          {/* 7. Decor: Mascot (Góc dưới trái) */}
          <motion.div 
            variants={popVariants}
            whileHover={{ scale: 1.05, rotate: -5 }}
            className="absolute -bottom-24 -left-12 md:-left-20 w-48 h-48 md:w-72 md:h-72 drop-shadow-md origin-bottom-left"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M40 180 C 10 180, 20 100, 30 70 C 15 50, 25 30, 45 40 C 60 48, 70 70, 80 80 C 110 70, 140 70, 160 90 C 180 110, 190 130, 180 150 C 170 180, 120 180, 40 180 Z" 
                    fill="#bdecb6" stroke="#333" strokeWidth="5" strokeLinejoin="round" />
              <circle cx="45" cy="55" r="8" fill="#333" />
              <ellipse cx="85" cy="115" rx="7" ry="10" fill="#333" />
              <circle cx="82" cy="112" r="3" fill="#fff" />
              <ellipse cx="130" cy="110" rx="7" ry="10" fill="#333" />
              <circle cx="127" cy="107" r="3" fill="#fff" />
              <line x1="70" y1="135" x2="80" y2="130" stroke="#9bc59a" strokeWidth="3" strokeLinecap="round" />
              <line x1="75" y1="140" x2="85" y2="135" stroke="#9bc59a" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="160" cy="140" rx="10" ry="6" fill="#333" transform="rotate(-15 160 140)" />
              <path d="M125 145 Q 135 155 145 145" fill="none" stroke="#333" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
}
