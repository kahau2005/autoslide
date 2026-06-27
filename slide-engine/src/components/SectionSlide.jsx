import React from 'react';
import { motion } from 'framer-motion';

export default function SectionSlide({ data }) {
  // --- Framer Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const centerBoxVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", bounce: 0.5, duration: 0.8 }
    }
  };

  const decorVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -20 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: { type: "spring", bounce: 0.4, duration: 1 }
    }
  };

  return (
    // Slide Wrapper: Fullscreen 16:9 ratio container
    <div className="relative w-full h-screen bg-[#bde0fe] overflow-hidden flex items-center justify-center">

      {/* 1. Yellow Pattern Corners */}
      {/* Top Right Corner */}
      <div
        className="absolute top-0 right-0 w-64 h-64 md:w-[400px] md:h-[400px]"
        style={{
          background: '#ffe898', // Màu vàng
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)', // Cắt chéo thành hình tam giác
          backgroundImage: 'radial-gradient(#fff 4px, transparent 4px)',
          backgroundSize: '30px 30px'
        }}
      />
      {/* Bottom Left Corner */}
      <div
        className="absolute bottom-0 left-0 w-64 h-64 md:w-[400px] md:h-[400px]"
        style={{
          background: '#ffe898',
          clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
          backgroundImage: 'radial-gradient(#fff 4px, transparent 4px)',
          backgroundSize: '30px 30px'
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        {/* 2. Main Center Box */}
        <motion.div
          variants={centerBoxVariants}
          className="relative w-[75%] max-w-[900px] min-h-[40%] bg-white rounded-[32px] flex items-center justify-center py-16 px-12 md:py-24 md:px-20"
          style={{
            boxShadow: '-16px 16px 0px 0px #cdb4db',
          }}
        >
          {/* Text Title with Dynamic Sizing */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`
              ${(data?.title || "Words\nand\ngrammar").length > 50
                ? "text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4rem]"
                : (data?.title || "Words\nand\ngrammar").length > 20
                  ? "text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]"
                  : "text-[3.5rem] sm:text-[4.5rem] md:text-[6rem] lg:text-[7rem]"}
              font-black text-[#2f3542] text-center leading-[1.15] tracking-wide text-balance whitespace-pre-line flex flex-col items-center justify-center w-full
            `}
            style={{ fontFamily: "'Nunito', 'Fredoka One', sans-serif" }}
          >
            {data?.title || "Words\nand\ngrammar"}
          </motion.h1>
        </motion.div>

        {/* 3. Decor: 3D Cube (Top Left) */}
        <motion.div
          variants={decorVariants}
          className="absolute top-8 left-8 md:top-16 md:left-16 w-32 h-32 md:w-48 md:h-48 drop-shadow-xl hover:-translate-y-2 transition-transform cursor-default"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="#333" strokeWidth="4" />
            {/* Top Face */}
            <polygon points="50,10 90,30 50,50 10,30" fill="#cdb4db" stroke="#333" strokeWidth="3" strokeLinejoin="round" />
            {/* Left Face */}
            <polygon points="10,30 50,50 50,90 10,70" fill="#bdecb6" stroke="#333" strokeWidth="3" strokeLinejoin="round" />
            {/* Right Face */}
            <polygon points="90,30 50,50 50,90 90,70" fill="#ffe898" stroke="#333" strokeWidth="3" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* 4. Decor: Shooting Star (Top Right) */}
        <motion.div
          variants={decorVariants}
          className="absolute top-16 right-20 md:top-24 md:right-32 w-48 h-32 md:w-64 md:h-40 drop-shadow-lg"
        >
          <svg viewBox="0 0 200 100" className="w-full h-full">
            {/* Tail */}
            <path d="M60,50 Q130,-10 200,20 Q130,20 80,60 Z" fill="#cdb4db" />
            <path d="M70,60 Q140,10 200,40 Q150,50 90,70 Z" fill="#ffc8dd" />
            {/* Star */}
            <path d="M40,10 L50,35 L75,40 L55,55 L60,80 L40,65 L20,80 L25,55 L5,40 L30,35 Z" fill="#ffe898" stroke="#333" strokeWidth="3" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* 5. Decor: Notebook (Bottom Left) */}
        <motion.div
          variants={decorVariants}
          className="absolute bottom-8 left-16 md:bottom-16 md:left-32 w-36 h-48 md:w-48 md:h-64 drop-shadow-xl -rotate-[15deg] hover:rotate-0 transition-transform origin-bottom-left"
        >
          <svg viewBox="0 0 120 160" className="w-full h-full">
            {/* Bookmark */}
            <polygon points="90,130 90,155 100,145 110,155 110,130" fill="#ffe898" stroke="#333" strokeWidth="2" strokeLinejoin="round" />
            {/* Book Body */}
            <rect x="20" y="10" width="90" height="130" rx="12" fill="#cdb4db" stroke="#333" strokeWidth="4" />
            {/* Notebook Details (dots) */}
            <circle cx="95" cy="115" r="2" fill="#fdfdfd" opacity="0.6" />
            <circle cx="80" cy="125" r="2" fill="#fdfdfd" opacity="0.6" />
            <circle cx="50" cy="95" r="2" fill="#fdfdfd" opacity="0.6" />
            <circle cx="40" cy="110" r="2" fill="#fdfdfd" opacity="0.6" />
            <circle cx="100" cy="80" r="2" fill="#fdfdfd" opacity="0.6" />
            <circle cx="90" cy="30" r="2" fill="#fdfdfd" opacity="0.6" />

            {/* Spiral Binding */}
            <circle cx="20" cy="30" r="4.5" fill="#fdfdfd" stroke="#333" strokeWidth="2" />
            <circle cx="20" cy="50" r="4.5" fill="#fdfdfd" stroke="#333" strokeWidth="2" />
            <circle cx="20" cy="70" r="4.5" fill="#fdfdfd" stroke="#333" strokeWidth="2" />
            <circle cx="20" cy="90" r="4.5" fill="#fdfdfd" stroke="#333" strokeWidth="2" />
            <circle cx="20" cy="110" r="4.5" fill="#fdfdfd" stroke="#333" strokeWidth="2" />
            <circle cx="20" cy="130" r="4.5" fill="#fdfdfd" stroke="#333" strokeWidth="2" />

            {/* Title Label */}
            <g transform="rotate(-15 65 40)">
              <rect x="35" y="25" width="55" height="25" fill="#fdfdfd" stroke="#333" strokeWidth="2" />
              <line x1="42" y1="33" x2="83" y2="33" stroke="#cdb4db" strokeWidth="3" strokeLinecap="round" />
              <line x1="42" y1="42" x2="70" y2="42" stroke="#cdb4db" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        </motion.div>

        {/* 6. Decor: Sun Burst Mascot (Bottom Right) */}
        <motion.div
          variants={decorVariants}
          className="absolute bottom-4 right-4 md:bottom-10 md:right-10 w-56 h-56 md:w-72 md:h-72 drop-shadow-xl hover:rotate-12 transition-transform"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Burst Background */}
            <path d="M100,10 L120,40 L160,30 L150,70 L190,90 L150,110 L160,150 L120,140 L100,180 L80,140 L40,150 L50,110 L10,90 L50,70 L40,30 L80,40 Z"
              fill="#c8f7c5" stroke="#333" strokeWidth="4" strokeLinejoin="round" />

            {/* Sun Face */}
            <circle cx="100" cy="100" r="45" fill="#ffe898" stroke="#333" strokeWidth="4" />

            {/* White Cheeks (over edge) */}
            <ellipse cx="65" cy="110" rx="10" ry="18" fill="#fdfdfd" stroke="#333" strokeWidth="2" transform="rotate(-20 65 110)" />
            <ellipse cx="135" cy="110" rx="10" ry="18" fill="#fdfdfd" stroke="#333" strokeWidth="2" transform="rotate(20 135 110)" />

            {/* Eyes */}
            <circle cx="85" cy="95" r="4" fill="#333" />
            <circle cx="115" cy="95" r="4" fill="#333" />
            {/* Eyebrows */}
            <path d="M78,85 Q85,80 92,85" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            <path d="M108,85 Q115,80 122,85" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
            {/* Nose (small vertical oval) */}
            <ellipse cx="100" cy="105" rx="2" ry="4" fill="none" stroke="#333" strokeWidth="2" />
            {/* Smile */}
            <path d="M90,115 Q100,125 110,115" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </motion.div>

      </motion.div>
    </div>
  );
}
