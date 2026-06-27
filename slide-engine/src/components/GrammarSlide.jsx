import React from 'react';
import { motion } from 'framer-motion';

export default function GrammarSlide({ data }) {
  const {
    title = "Grammar Focus",
    box_title = "Simple Past Tense",
    rule,
    layout = [
      // Mặc định là 1 lưới 2x2 giống ảnh mẫu
      [ // Dòng 1
        [ // Cột 1
          { type: 'title', text: 'Form:\nKhẳng định', color: '#557b2f' },
          { type: 'formula', text: 'S + V-2 / V-ed' },
          { type: 'example', text: 'Eg: They painted pictures.' }
        ],
        [ // Cột 2
          { type: 'title', text: 'Câu hỏi', color: '#557b2f' },
          { type: 'formula', text: 'Did + S + V (nguyên mẫu)?' },
          { type: 'example', text: "Eg: Did they live in Mexico?\n→ Yes, they did. / No, they didn't." }
        ]
      ],
      [ // Dòng 2
        [ // Cột 1
          { type: 'title', text: 'Phủ định', color: '#557b2f' },
          { type: 'formula', text: "S + didn't + V (nguyên mẫu)" },
          { type: 'example', text: "Eg: They didn't use electricity." }
        ],
        [ // Cột 2
          { type: 'title', text: 'Grammar rules', color: '#4a69bd' },
          {
            type: 'list', items: [
              'Dùng để kể về những việc đã xảy ra trong quá khứ (long ago).',
              'Khẳng định: Thêm "-ed" hoặc "-d" vào sau động từ hành động (Ví dụ: live -> lived, paint -> painted).',
              'Phủ định: Dùng "didn\'t" (viết tắt của did not) + động từ GIỮ NGUYÊN không thêm "-ed".'
            ]
          }
        ]
      ]
    ]
  } = data || {};

  // Hàm render từng block nội dung linh hoạt
  const renderBlock = (block, idx) => {
    switch (block.type) {
      case 'title':
        return (
          <h3 key={idx} className="text-[1.5rem] md:text-[2rem] font-bold leading-tight" style={{ color: block.color || '#557b2f', fontFamily: "'Nunito', sans-serif", whiteSpace: 'pre-line' }}>
            {block.text}
          </h3>
        );
      case 'formula':
        return (
          <p key={idx} className="text-[1.8rem] md:text-[2.2rem] font-bold text-[#e74c3c] mt-2 mb-2 leading-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {block.text}
          </p>
        );
      case 'example':
        return (
          <p key={idx} className="text-[1.4rem] md:text-[1.6rem] text-[#8e44ad] leading-snug" style={{ fontFamily: "'Nunito', sans-serif", whiteSpace: 'pre-line' }}>
            {block.text}
          </p>
        );
      case 'list':
        return (
          <ul key={idx} className="list-disc pl-8 flex flex-col gap-2 mt-2">
            {block.items.map((item, i) => (
              <li key={i} className="text-[1.2rem] md:text-[1.4rem] text-[#2f3542] leading-snug" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {item}
              </li>
            ))}
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden flex flex-col items-center justify-center font-sans px-4 lg:px-12">

      {/* Nền chấm bi tím nhạt */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#d4b4e2 4px, transparent 4px)',
          backgroundSize: '80px 80px',
          backgroundPosition: '0 0, 40px 40px'
        }}
      />

      {/* --- CÁC HỌA TIẾT TRANG TRÍ CỐ ĐỊNH Ở NGOÀI --- */}

      {/* 1. Mặt trời tím (Góc trên trái) */}
      <div className="absolute top-12 left-12 z-20 w-48 h-48 md:w-64 md:h-64 animate-spin-slow" style={{ animation: 'spin 20s linear infinite' }}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Cánh sao 10 cánh màu tím */}
          <path d="M100,0 L120,40 L160,30 L150,70 L190,90 L150,110 L160,150 L120,140 L100,180 L80,140 L40,150 L50,110 L10,90 L50,70 L40,30 L80,40 Z" fill="#cdb4db" stroke="#2f3542" strokeWidth="4" strokeLinejoin="round" />
          {/* Khuôn mặt vàng */}
          <circle cx="100" cy="90" r="40" fill="#fae596" stroke="#2f3542" strokeWidth="4" />
          {/* Mắt, mũi, miệng */}
          <circle cx="85" cy="85" r="4" fill="#2f3542" />
          <circle cx="115" cy="85" r="4" fill="#2f3542" />
          <ellipse cx="100" cy="95" rx="3" ry="5" fill="none" stroke="#2f3542" strokeWidth="3" />
          <path d="M85,105 Q100,115 115,105" fill="none" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
          <circle cx="75" cy="95" r="5" fill="#ffc8dd" />
          <circle cx="125" cy="95" r="5" fill="#ffc8dd" />
        </svg>
      </div>

      {/* 2. Cuốn sổ và cây bút (Góc trên phải) */}
      <div className="absolute top-16 right-12 z-20 w-48 h-48 md:w-56 md:h-56 rotate-12 hover:-rotate-12 transition-transform duration-500">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Cây bút */}
          <g transform="translate(10, 50) rotate(-20)">
            <rect x="0" y="20" width="80" height="12" fill="#bdecb6" stroke="#2f3542" strokeWidth="3" rx="4" />
            <path d="M80,20 L100,26 L80,32 Z" fill="#fff" stroke="#2f3542" strokeWidth="3" strokeLinejoin="round" />
            <rect x="-15" y="20" width="20" height="12" fill="#2f3542" rx="4" />
          </g>
          {/* Sổ tay vàng */}
          <g transform="translate(80, 20) rotate(15)">
            <rect x="10" y="10" width="100" height="140" fill="#fae596" stroke="#2f3542" strokeWidth="4" rx="8" />
            <rect x="40" y="30" width="50" height="20" fill="#fff" stroke="#2f3542" strokeWidth="2" rx="2" />
            <line x1="45" y1="36" x2="85" y2="36" stroke="#d4b4e2" strokeWidth="3" strokeLinecap="round" />
            <line x1="45" y1="44" x2="70" y2="44" stroke="#d4b4e2" strokeWidth="3" strokeLinecap="round" />
            {/* Lò xo (gáy sổ) */}
            <circle cx="10" cy="30" r="5" fill="#fff" stroke="#2f3542" strokeWidth="3" />
            <circle cx="10" cy="50" r="5" fill="#fff" stroke="#2f3542" strokeWidth="3" />
            <circle cx="10" cy="70" r="5" fill="#fff" stroke="#2f3542" strokeWidth="3" />
            <circle cx="10" cy="90" r="5" fill="#fff" stroke="#2f3542" strokeWidth="3" />
            <circle cx="10" cy="110" r="5" fill="#fff" stroke="#2f3542" strokeWidth="3" />
            <circle cx="10" cy="130" r="5" fill="#fff" stroke="#2f3542" strokeWidth="3" />
            {/* Bookmark tím */}
            <path d="M80,150 L90,150 L90,170 L85,165 L80,170 Z" fill="#ffc8dd" stroke="#2f3542" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* 3. Ngôi sao 4 cánh (Góc dưới trái) */}
      <div className="absolute bottom-16 left-16 z-20 animate-pulse">
        <svg viewBox="0 0 100 100" className="w-20 h-20">
          <path d="M50,10 Q55,40 85,45 Q55,50 50,80 Q45,50 15,45 Q45,40 50,10" fill="#bde0fe" stroke="#2f3542" strokeWidth="4" strokeLinejoin="round" />
        </svg>
        <svg viewBox="0 0 100 100" className="w-12 h-12 absolute top-16 -left-6">
          <path d="M50,10 Q55,40 85,45 Q55,50 50,80 Q45,50 15,45 Q45,40 50,10" fill="#cdb4db" stroke="#2f3542" strokeWidth="4" strokeLinejoin="round" />
        </svg>
      </div>

      {/* --- HEADER --- */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="relative z-10 bg-[#bde0fe] rounded-[32px] py-2 lg:py-4 px-16 lg:px-32 shadow-sm mb-6 mt-4"
      >
        <h2
          className="text-[3rem] lg:text-[4.5rem] font-bold text-[#2f3542] leading-none tracking-wide text-center"
          style={{ fontFamily: "'Patrick Hand', cursive" }}
        >
          {title}
        </h2>
      </motion.div>

      {/* --- NỘI DUNG CHÍNH (Khối Vàng Động - Layout Builder) --- */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
        className="relative z-10 w-[95%] max-w-[1300px] bg-[#fae596] rounded-[40px] lg:rounded-[60px] p-6 lg:p-12 shadow-md flex flex-col"
      >
        {/* Box Title */}
        {box_title && (
          <h1
            className="text-[2.5rem] lg:text-[3.8rem] font-black text-[#5e54d6] text-center w-full mb-4 lg:mb-6"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            {box_title}
          </h1>
        )}

        {/* Dynamic Grid Layout hoặc Simple Rule */}
        <div className="flex flex-col w-full items-center">
          {rule ? (
            <p className="text-[2rem] lg:text-[2.5rem] font-bold text-[#2f3542] text-center max-w-[95%] leading-relaxed whitespace-pre-line" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {(() => {
                const parts = rule.split(/\*(.*?)\*/g);
                return parts.map((part, i) => {
                  if (i % 2 === 1) {
                    return <span key={i} className="text-[#e74c3c]">{part}</span>;
                  }
                  return <span key={i}>{part}</span>;
                });
              })()}
            </p>
          ) : (
            layout.map((row, rIdx) => (
              <React.Fragment key={rIdx}>
                {/* Render Row */}
                <div className="flex flex-col md:flex-row w-full items-stretch">
                  {row.map((col, cIdx) => (
                    <React.Fragment key={cIdx}>
                      {/* Render Column */}
                      <div className="flex-1 flex flex-col gap-4 p-4 md:p-8">
                        {col.map((block, bIdx) => renderBlock(block, bIdx))}
                      </div>
                      {/* Dấu gạch dọc phân cách (Nếu không phải cột cuối) */}
                      {cIdx < row.length - 1 && (
                        <div className="hidden md:block w-[3px] bg-[#2f3542] rounded-full my-4 mx-4"></div>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Dấu gạch ngang phân cách (Nếu không phải hàng cuối) */}
                {rIdx < layout.length - 1 && (
                  <div className="w-full h-[3px] bg-[#2f3542] rounded-full my-4"></div>
                )}
              </React.Fragment>
            ))
          )}
        </div>
      </motion.div>

    </div>
  );
}
