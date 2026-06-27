import React from 'react';
import { motion } from 'framer-motion';

import DynamicActivity from './DynamicActivity';

export default function WritingSlide({ data }) {
  const {
    title = "Writing",
    note = {
      title: "Note",
      layout: "two_columns",
      columns: [
        {
          heading: "Starting an e-mail",
          subheading: "Start an e-mail like this:",
          lines: ["Hi Suzie,", "How are you?"]
        }
      ]
    },
    activity
  } = data || {};

  // Background dots style
  const dotPattern = {
    backgroundImage: 'radial-gradient(#ffffff 3px, transparent 3px)',
    backgroundSize: '60px 60px',
    backgroundPosition: '0 0, 30px 30px'
  };

  const renderColumns = () => {
    if (!note.columns) return null;

    // Tự động chuyển về 1 cột nếu data chỉ có 1 phần tử
    const isTwoColumns = note.layout === "two_columns" && note.columns.length > 1;

    if (isTwoColumns) {
      return (
        <div className="flex flex-row w-full relative mt-6 pb-4">
          {/* Vertical Divider */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#d4b4e2] opacity-60 -translate-x-1/2"></div>

          {/* Column 1 */}
          <div className="flex-1 flex flex-col px-4 lg:px-12 text-center">
            <h4 className="text-[1.5rem] lg:text-[1.8rem] font-bold text-[#e74c3c] mb-6 tracking-wide" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {note.columns[0]?.heading}
            </h4>
            <p className="text-[1.3rem] lg:text-[1.5rem] font-bold text-[#7b5cda] mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {note.columns[0]?.subheading}
            </p>
            {note.columns[0]?.lines?.map((line, i) => (
              <p key={i} className="text-[1.3rem] lg:text-[1.5rem] font-medium text-[#2f3542] leading-loose" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {line}
              </p>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex-1 flex flex-col px-4 lg:px-12 text-center">
            <h4 className="text-[1.5rem] lg:text-[1.8rem] font-bold text-[#e74c3c] mb-6 tracking-wide" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {note.columns[1]?.heading}
            </h4>
            <p className="text-[1.3rem] lg:text-[1.5rem] font-bold text-[#7b5cda] mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {note.columns[1]?.subheading}
            </p>
            {note.columns[1]?.lines?.map((line, i) => (
              <p key={i} className="text-[1.3rem] lg:text-[1.5rem] font-medium text-[#2f3542] leading-loose" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {line}
              </p>
            ))}
          </div>
        </div>
      );
    } else {
      // one_column
      return (
        <div className="flex flex-col w-full mt-6 px-12 items-center text-center pb-4">
          {note.columns?.map((col, idx) => (
            <div key={idx} className="mb-10 w-full">
              <h4 className="text-[1.6rem] lg:text-[2rem] font-bold text-[#e74c3c] mb-4 tracking-wide" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {col.heading}
              </h4>
              {col.subheading && (
                <p className="text-[1.4rem] lg:text-[1.6rem] font-bold text-[#7b5cda] mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {col.subheading}
                </p>
              )}
              {col.lines?.map((line, i) => (
                <p key={i} className="text-[1.4rem] lg:text-[1.6rem] font-medium text-[#2f3542] leading-loose" style={{ fontFamily: "'Nunito', sans-serif" }}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#bde0fe] overflow-hidden flex flex-col items-center justify-center font-sans">

      {/* Background Dots */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={dotPattern} />

      {/* --- DECORS (Trang trí) --- */}

      {/* 1. Ngôi sao góc trên trái */}
      <div className="absolute top-10 left-10 w-32 h-32 z-20">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Sao vàng */}
          <path d="M30,10 Q35,30 50,35 Q35,40 30,60 Q25,40 10,35 Q25,30 30,10" fill="#feca57" stroke="#2f3542" strokeWidth="2" strokeLinejoin="round" />
          {/* Sao xanh */}
          <path d="M60,40 Q63,55 75,58 Q63,61 60,75 Q57,61 45,58 Q57,55 60,40" fill="#78c6a3" stroke="#2f3542" strokeWidth="2" strokeLinejoin="round" />
          {/* Sao trắng */}
          <path d="M20,65 Q22,75 30,78 Q22,81 20,90 Q18,81 10,78 Q18,75 20,65" fill="#fff" stroke="#2f3542" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>

      {/* 2. Nhân vật hạt đậu đội mũ (Cạnh tiêu đề) */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute top-[8%] left-[60%] w-24 h-32 z-50 drop-shadow-sm"
      >
        <svg viewBox="0 0 100 120" className="w-full h-full">
          {/* Tay trái */}
          <path d="M30,70 Q10,60 15,50" fill="none" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
          <circle cx="15" cy="50" r="4" fill="#2f3542" />
          {/* Tay phải */}
          <path d="M70,70 Q90,60 85,50" fill="none" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
          <circle cx="85" cy="50" r="4" fill="#2f3542" />

          {/* Chân trái */}
          <path d="M40,90 Q30,110 25,115" fill="none" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="25" cy="115" rx="6" ry="3" fill="#d4b4e2" stroke="#2f3542" strokeWidth="2" />
          {/* Chân phải */}
          <path d="M60,90 Q70,110 75,115" fill="none" stroke="#2f3542" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="75" cy="115" rx="6" ry="3" fill="#d4b4e2" stroke="#2f3542" strokeWidth="2" />

          {/* Thân hạt đậu */}
          <ellipse cx="50" cy="70" rx="30" ry="25" fill="#c3e8b0" stroke="#2f3542" strokeWidth="3" />

          {/* Mắt */}
          <circle cx="40" cy="65" r="5" fill="#2f3542" />
          <circle cx="60" cy="65" r="5" fill="#2f3542" />
          <circle cx="42" cy="63" r="1.5" fill="#fff" />
          <circle cx="62" cy="63" r="1.5" fill="#fff" />

          {/* Miệng */}
          <path d="M45,75 Q50,82 55,75 Z" fill="#fff" stroke="#2f3542" strokeWidth="2" />
          <line x1="47" y1="78" x2="53" y2="78" stroke="#2f3542" strokeWidth="1" />

          {/* Mũ sinh nhật */}
          <polygon points="50,20 35,50 65,50" fill="#d4b4e2" stroke="#2f3542" strokeWidth="2" strokeLinejoin="round" />
          {/* Họa tiết mũ */}
          <path d="M38,45 Q50,50 62,45" fill="none" stroke="#2f3542" strokeWidth="2" />
          <path d="M43,35 Q50,40 57,35" fill="none" stroke="#2f3542" strokeWidth="2" />
          {/* Cục bông */}
          <circle cx="50" cy="18" r="6" fill="#fff" stroke="#2f3542" strokeWidth="2" />
        </svg>

        {/* Squiggles trang trí bay quanh đậu */}
        <svg viewBox="0 0 50 50" className="absolute -right-12 top-4 w-12 h-12">
          <path d="M10,20 Q20,10 30,20 T40,20" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <path d="M15,30 Q25,40 30,30 T45,35" fill="none" stroke="#ff9ff3" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* 3. Tay cầm sách (Góc trên phải) */}
      <div className="absolute top-12 right-12 w-48 h-40 z-20">
        <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-md">
          {/* Cuốn sách mở */}
          <path d="M50,20 L95,30 L95,120 L50,110 Z" fill="#f1f2f6" stroke="#2f3542" strokeWidth="3" strokeLinejoin="round" />
          <path d="M140,20 L95,30 L95,120 L140,110 Z" fill="#f1f2f6" stroke="#2f3542" strokeWidth="3" strokeLinejoin="round" />

          {/* Bookmark */}
          <polygon points="120,25 130,27 130,50 125,45 120,50" fill="#7b5cda" />
          <rect x="135" y="30" width="10" height="10" fill="#d4b4e2" />

          {/* Dòng chữ (Mock) */}
          <line x1="60" y1="40" x2="85" y2="45" stroke="#bdc3c7" strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="55" x2="85" y2="60" stroke="#bdc3c7" strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="70" x2="85" y2="75" stroke="#bdc3c7" strokeWidth="3" strokeLinecap="round" />
          <line x1="105" y1="45" x2="130" y2="40" stroke="#bdc3c7" strokeWidth="3" strokeLinecap="round" />
          <line x1="105" y1="60" x2="130" y2="55" stroke="#bdc3c7" strokeWidth="3" strokeLinecap="round" />

          <path d="M55,38 L65,48 L75,35" fill="none" stroke="#7b5cda" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Tay trái */}
          <path d="M40,130 Q50,90 55,90 Q65,90 60,110 Z" fill="#feca57" stroke="#2f3542" strokeWidth="2" strokeLinejoin="round" />
          <path d="M55,90 Q60,80 65,95" fill="none" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />
          <path d="M58,95 Q65,85 70,100" fill="none" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />

          {/* Tay phải (Ngón trỏ chỉ vào) */}
          <path d="M120,130 Q130,95 125,95 Q115,95 110,110 Z" fill="#feca57" stroke="#2f3542" strokeWidth="2" strokeLinejoin="round" />
          {/* Ngón trỏ chỉ lên */}
          <path d="M115,100 Q105,70 100,65 Q95,70 105,100" fill="#feca57" stroke="#2f3542" strokeWidth="2" strokeLinejoin="round" />
          <path d="M110,105 Q100,95 105,115" fill="none" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* 4. Góc tam giác vàng (Dưới trái) */}
      <div className="absolute bottom-0 left-0 w-64 h-64 z-10 pointer-events-none">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <polygon points="0,200 200,200 0,50" fill="#feca57" />
          {/* Chấm bi trắng */}
          <circle cx="20" cy="180" r="4" fill="#fff" />
          <circle cx="60" cy="180" r="4" fill="#fff" />
          <circle cx="100" cy="180" r="4" fill="#fff" />
          <circle cx="140" cy="180" r="4" fill="#fff" />

          <circle cx="40" cy="150" r="4" fill="#fff" />
          <circle cx="80" cy="150" r="4" fill="#fff" />
          <circle cx="120" cy="150" r="4" fill="#fff" />

          <circle cx="20" cy="120" r="4" fill="#fff" />
          <circle cx="60" cy="120" r="4" fill="#fff" />

          <circle cx="40" cy="90" r="4" fill="#fff" />
        </svg>
      </div>

      {/* 5. Cô gái dùng tablet (Dưới phải) */}
      <div className="absolute -bottom-2 -right-4 w-72 h-72 z-30 drop-shadow-lg">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          {/* Cơ thể cô gái */}
          <path d="M60,200 Q70,140 120,140 Q170,140 190,200 Z" fill="#ffb8b8" stroke="#2f3542" strokeWidth="3" />
          {/* Vai và tay áo */}
          <path d="M120,140 Q150,145 155,190" fill="none" stroke="#e17055" strokeWidth="2" />
          <path d="M120,140 Q90,145 85,190" fill="none" stroke="#e17055" strokeWidth="2" />
          <path d="M100,140 L100,200" stroke="#e17055" strokeWidth="2" />

          {/* Cánh tay trái ôm tablet */}
          <path d="M60,180 Q80,160 100,180 Q105,190 95,195" fill="#ffeaa7" stroke="#2f3542" strokeWidth="2" />
          {/* Cánh tay phải chống cằm */}
          <path d="M170,180 Q160,130 140,110 Q130,110 125,120" fill="#ffeaa7" stroke="#2f3542" strokeWidth="2" />

          {/* Cổ */}
          <rect x="110" y="100" width="20" height="45" fill="#ffeaa7" stroke="#2f3542" strokeWidth="2" />

          {/* Khuôn mặt nghiêng/cúi xuống */}
          <ellipse cx="120" cy="105" rx="25" ry="30" fill="#ffeaa7" stroke="#2f3542" strokeWidth="3" transform="rotate(15 120 105)" />
          {/* Tóc */}
          <path d="M98,90 Q120,60 145,95 Q140,120 145,130 Q120,135 98,125 Q90,105 98,90 Z" fill="#5d4037" stroke="#2f3542" strokeWidth="3" />

          {/* Búi tóc */}
          <circle cx="100" cy="70" r="12" fill="#5d4037" stroke="#2f3542" strokeWidth="3" />
          <circle cx="145" cy="80" r="12" fill="#5d4037" stroke="#2f3542" strokeWidth="3" />
          {/* Kẹp tóc vàng */}
          <rect x="95" y="78" width="10" height="4" fill="#feca57" />
          <rect x="140" y="88" width="10" height="4" fill="#feca57" transform="rotate(15 145 90)" />

          {/* Đặc điểm khuôn mặt */}
          <path d="M110,100 Q115,102 120,100" fill="none" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />
          <path d="M130,105 Q135,107 140,105" fill="none" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />
          <path d="M115,115 Q125,120 135,115" fill="none" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />

          {/* Tai nghe */}
          <circle cx="140" cy="115" r="5" fill="#ff9ff3" />
          <path d="M140,120 Q130,150 115,160" fill="none" stroke="#2f3542" strokeWidth="1" />

          {/* Tablet hồng */}
          <polygon points="60,195 120,195 140,200 80,200" fill="#a29bfe" stroke="#2f3542" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="60,165 120,165 120,195 60,195" fill="#ff9ff3" stroke="#2f3542" strokeWidth="3" strokeLinejoin="round" />
          {/* Giá đỡ tablet */}
          <polygon points="120,165 130,175 130,200 120,195" fill="#d4b4e2" stroke="#2f3542" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      </div>


      {/* --- NỘI DUNG CHÍNH --- */}
      <div className="relative z-40 w-full max-w-[1200px] h-[85vh] flex flex-col items-center justify-start mt-8">

        {/* Header "Writing" */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-white rounded-full py-4 px-32 lg:px-48 shadow-sm mb-8 lg:mb-12"
        >
          <h2
            className="text-[3rem] lg:text-[4rem] text-[#2f3542] font-bold tracking-widest leading-none"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            {title}
          </h2>
        </motion.div>

        {/* Khối Note */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
          className="w-[90%] max-w-[1000px] bg-[#fae596] rounded-[60px] p-8 lg:p-12 shadow-sm flex flex-col items-center flex-1 min-h-0 overflow-hidden mb-6"
        >
          {activity ? (
            <DynamicActivity activity={activity} />
          ) : (
            <>
              {/* Tiêu đề Note */}
              <h3 className="text-[2.5rem] lg:text-[3rem] font-bold text-[#7b5cda] mb-4 tracking-wide" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                {note?.title || "Note"}
              </h3>

              {/* Divider Ngang */}
              <div className="w-[90%] h-[2px] bg-[#d4b4e2] opacity-60 mb-2"></div>

              {/* Cột nội dung linh hoạt */}
              {renderColumns()}
            </>
          )}
        </motion.div>

      </div>
    </div>
  );
}
