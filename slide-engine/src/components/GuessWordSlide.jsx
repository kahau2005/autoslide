import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function GuessWordSlide({ data }) {
  // Lấy dữ liệu hoặc dùng giá trị mặc định
  const { 
    question_number = 1,
    image_url,
    answer = "walk to school"
  } = data || {};

  // Trạng thái lật mở đáp án
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <div className="relative w-full h-screen bg-[#bde0fe] overflow-hidden flex flex-col items-center justify-center font-sans">
      
      {/* Background Dots */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#fff 4px, transparent 4px)',
          backgroundSize: '80px 80px',
          backgroundPosition: '0 0, 40px 40px'
        }}
      />

      {/* Góc tam giác vàng (Dưới trái) */}
      <div 
        className="absolute bottom-0 left-0 w-64 h-64 md:w-[400px] md:h-[400px] z-0"
        style={{
          background: '#ffe898',
          clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
          backgroundImage: 'radial-gradient(#fff 4px, transparent 4px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 w-[90%] max-w-[1200px] h-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 py-8">
        
        {/* --- CỘT TRÁI (Header & Nhân vật) --- */}
        <div className="w-full md:w-[45%] flex flex-col items-center justify-center gap-10 relative">
          
          {/* Decor Ngôi sao */}
          <div className="absolute -top-16 left-0">
             <svg viewBox="0 0 50 50" className="w-20 h-20 -rotate-12">
               <path d="M25,0 Q25,25 50,25 Q25,25 25,50 Q25,25 0,25 Q25,25 25,0" fill="#ffe898" stroke="#333" strokeWidth="2" strokeLinejoin="round"/>
             </svg>
             <svg viewBox="0 0 50 50" className="w-12 h-12 absolute top-16 left-16 rotate-12">
               <path d="M25,0 Q25,25 50,25 Q25,25 25,50 Q25,25 0,25 Q25,25 25,0" fill="#bdecb6" stroke="#333" strokeWidth="2" strokeLinejoin="round"/>
             </svg>
             <svg viewBox="0 0 50 50" className="w-8 h-8 absolute top-32 left-0 -rotate-45">
               <path d="M25,0 Q25,25 50,25 Q25,25 25,50 Q25,25 0,25 Q25,25 25,0" fill="#fff" stroke="#333" strokeWidth="2" strokeLinejoin="round"/>
             </svg>
          </div>

          {/* Bong bóng thoại "Guess the word" */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="relative bg-white rounded-[50px] px-12 py-16 w-full max-w-[500px] text-center shadow-md z-10"
          >
            <h1 
              className="text-[5rem] md:text-[6.5rem] font-bold text-[#2f3542] leading-[1.1]"
              style={{ fontFamily: "'Patrick Hand', cursive" }}
            >
              Guess the<br/>word
            </h1>
            {/* Đuôi bong bóng thoại trỏ xuống nhân vật */}
            <div className="absolute -bottom-6 right-20 w-12 h-12 bg-white rotate-45"></div>
          </motion.div>

          {/* Nhân vật Hạt đậu giơ tay */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-48 h-48 md:w-56 md:h-56 ml-24"
          >
            <svg viewBox="0 0 100 120" className="w-full h-full">
               {/* Chân */}
               <path d="M40,90 L30,110 L25,110 M60,90 L70,110 L75,110" stroke="#cdb4db" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
               {/* Tay giơ lên cao \o/ */}
               <path d="M25,60 Q10,40 5,30 M75,60 Q90,40 95,30" stroke="#cdb4db" strokeWidth="4" fill="none" strokeLinecap="round" />
               <circle cx="5" cy="30" r="3" fill="#cdb4db" />
               <circle cx="95" cy="30" r="3" fill="#cdb4db" />
               {/* Thân */}
               <path d="M50,20 Q80,20 80,60 Q80,90 50,90 Q20,90 20,60 Q20,20 50,20 Z" fill="#bdecb6" stroke="#333" strokeWidth="3" />
               {/* Mắt to */}
               <circle cx="35" cy="50" r="6" fill="#333" />
               <circle cx="37" cy="48" r="2" fill="#fff" />
               <circle cx="65" cy="50" r="6" fill="#333" />
               <circle cx="67" cy="48" r="2" fill="#fff" />
               {/* Miệng cười há */}
               <path d="M35,65 Q50,85 65,65 Z" fill="#fff" stroke="#333" strokeWidth="2" />
               <line x1="38" y1="65" x2="62" y2="65" stroke="#333" strokeWidth="2" />
               <line x1="50" y1="65" x2="50" y2="75" stroke="#333" strokeWidth="2" />
               {/* Mũ len chóp nhọn */}
               <polygon points="30,22 70,22 50,-10" fill="#d4b4e2" stroke="#333" strokeWidth="2" />
               <polygon points="30,22 70,22 65,10 35,10" fill="#f6d887" />
               <path d="M35,10 Q50,15 65,10" fill="none" stroke="#333" strokeWidth="2" />
               <path d="M30,22 Q50,25 70,22" fill="none" stroke="#333" strokeWidth="2" />
               <circle cx="50" cy="-10" r="6" fill="#fff" stroke="#333" strokeWidth="2" />
            </svg>
          </motion.div>
        </div>

        {/* --- CỘT PHẢI (Khung Quiz) --- */}
        <div className="w-full md:w-[55%] flex justify-center mt-10 md:mt-0">
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", bounce: 0.4 }}
            className="relative w-full max-w-[600px] aspect-[4/3] bg-white rounded-[40px] flex flex-col items-center justify-between p-8 md:p-12 cursor-pointer transition-transform hover:scale-[1.02]"
            style={{
              boxShadow: '-15px 15px 0px 0px #ffe898', // Đổ bóng vàng đậm lệch trái dưới
            }}
            onClick={handleReveal}
          >
            {/* Số thứ tự câu hỏi */}
            <div 
              className="absolute top-8 left-10 text-[4rem] font-black text-[#2f3542] leading-none"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              {question_number}
            </div>

            {/* Vùng chứa ảnh */}
            <div className="w-full flex-1 flex items-center justify-center mt-10 mb-6">
               <img 
                 src={image_url || `https://image.pollinations.ai/prompt/${encodeURIComponent(`Cute flat vector illustration for kids of ${answer}, white background, highly detailed`)}?width=400&height=400&nologo=true`} 
                 alt="Guess" 
                 className="max-w-full max-h-[300px] object-contain" 
               />
            </div>

            {/* Vùng đáp án (Dấu gạch dưới / Text đỏ) */}
            <div className="w-[85%] h-[60px] flex flex-col items-center justify-end relative">
               
               <motion.div 
                 initial={false}
                 animate={{ y: isRevealed ? 0 : 20, opacity: isRevealed ? 1 : 0 }}
                 className="absolute bottom-4 text-[2.2rem] md:text-[3rem] font-bold text-[#e74c3c] tracking-wide w-full text-center whitespace-nowrap"
                 style={{ fontFamily: "'Fredoka', sans-serif" }}
               >
                 {answer}
               </motion.div>
               
               {/* Đường gạch dưới */}
               <div className="w-full border-b-[5px] border-[#333] border-dashed"></div>

               {/* Hướng dẫn click nếu chưa lật */}
               {!isRevealed && (
                 <div className="absolute -bottom-8 text-lg text-gray-400 animate-pulse font-sans">
                   Click to reveal
                 </div>
               )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
