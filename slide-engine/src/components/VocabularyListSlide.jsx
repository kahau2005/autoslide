import React from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';

export default function VocabularyListSlide({ data }) {
  const {
    title = "Listen and repeat",
    audio_url,
    items = [],
    words = []
  } = data || {};

  // Mock data nếu không có items truyền vào
  const passedItems = items.length > 0 ? items : words;

  // Chuẩn hóa dữ liệu (alias translation -> meaning) và đảm bảo có word
  const normalizedItems = passedItems.map(item => {
    if (typeof item === 'string') return { word: item, meaning: "", image_url: "" };
    return {
      word: item.word || item.text || item.title || "",
      meaning: item.meaning || item.translation || item.desc || "",
      image_url: item.image_url || ""
    };
  }).filter(item => item.word); // Bỏ các item không có từ vựng (parse lỗi)

  const displayItems = normalizedItems.length > 0 ? normalizedItems : [
    { word: "bike to school", meaning: "đạp xe đến trường", image_url: "" },
    { word: "sail", meaning: "chèo thuyền", image_url: "" },
    { word: "climb trees", meaning: "trèo cây", image_url: "" },
    { word: "stay home", meaning: "ở nhà", image_url: "" },
    { word: "cry", meaning: "khóc", image_url: "" },
    { word: "wait for the bus", meaning: "đợi xe buýt", image_url: "" },
    { word: "laugh", meaning: "cười", image_url: "" },
    { word: "walk to school", meaning: "đi bộ đến trường", image_url: "" },
    { word: "need water", meaning: "khát nước", image_url: "" }
  ];

  // Các màu shadow tuần hoàn cho các card
  const shadowColors = ['#ffe898', '#d4b4e2', '#bdecb6', '#ffc8dd', '#aed9f8'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { type: "spring", bounce: 0.5, duration: 0.6 }
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#bde0fe] overflow-hidden flex flex-col items-center justify-center font-sans py-6">

      {/* Audio Player nổi ở góc phải trên cùng */}
      {audio_url && (
        <div className="absolute top-8 right-12 z-[100]">
          <AudioPlayer src={audio_url} />
        </div>
      )}
      {/* Background Dots Pattern (Mô phỏng tuyết/sao) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(#fff 4px, transparent 4px)',
          backgroundSize: '80px 80px',
          backgroundPosition: '0 0, 40px 40px'
        }}
      />

      {/* Góc tam giác vàng chấm bi (Dưới trái) */}
      <div
        className="absolute bottom-0 left-0 w-64 h-64 md:w-80 md:h-80 z-0"
        style={{
          background: '#ffe898',
          clipPath: 'polygon(0 0, 0 100%, 100% 100%)',
          backgroundImage: 'radial-gradient(#fff 4px, transparent 4px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* --- HEADER --- */}
      <div className="relative z-10 flex items-center justify-center w-full mt-4 mb-8">

        {/* Decor: Ngôi sao vàng trái */}
        <div className="absolute left-[15%] top-0 md:left-[25%] -translate-x-12 -translate-y-4">
          <svg viewBox="0 0 50 50" className="w-12 h-12">
            <path d="M25,0 Q25,25 50,25 Q25,25 25,50 Q25,25 0,25 Q25,25 25,0" fill="#ffe898" stroke="#333" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>
        {/* Decor: Ngôi sao xanh nhỏ trái */}
        <div className="absolute left-[15%] top-0 md:left-[25%] -translate-x-4 translate-y-8">
          <svg viewBox="0 0 50 50" className="w-8 h-8">
            <path d="M25,0 Q25,25 50,25 Q25,25 25,50 Q25,25 0,25 Q25,25 25,0" fill="#bdecb6" stroke="#333" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Khối trắng tiêu đề */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="bg-white rounded-full py-4 px-12 md:px-20 shadow-sm border-2 border-transparent relative"
        >
          <h2
            className="text-[3rem] md:text-[4.5rem] font-bold text-[#2f3542] leading-none"
            style={{ fontFamily: "'Patrick Hand', cursive" }}
          >
            {title}
          </h2>
        </motion.div>

        {/* Decor: Nhân vật quả trứng ngộ nghĩnh (Phải) */}
        <div className="absolute right-[15%] md:right-[25%] translate-x-12 translate-y-4 hidden md:block">
          <svg viewBox="0 0 100 120" className="w-20 h-24">
            {/* Chân */}
            <path d="M40,90 L30,110 M60,90 L70,110" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Tay */}
            <path d="M20,60 Q10,50 5,60 M80,60 Q90,50 95,60" stroke="#333" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Thân */}
            <path d="M50,20 Q80,20 80,60 Q80,90 50,90 Q20,90 20,60 Q20,20 50,20 Z" fill="#bdecb6" stroke="#333" strokeWidth="3" />
            {/* Mắt & Miệng */}
            <circle cx="40" cy="50" r="4" fill="#333" />
            <circle cx="60" cy="50" r="4" fill="#333" />
            <path d="M45,65 Q50,75 55,65 Z" fill="#fff" stroke="#333" strokeWidth="2" />
            {/* Mũ sinh nhật */}
            <polygon points="35,22 65,22 50,0" fill="#d4b4e2" stroke="#333" strokeWidth="2" />
            <circle cx="50" cy="0" r="4" fill="#ffc8dd" />
            {/* Cờ đuôi nheo lượn sóng kế bên */}
            <path d="M85,20 Q95,10 90,30 Q95,40 85,30" stroke="#aed9f8" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M95,30 Q105,20 100,40" stroke="#ffc8dd" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* --- GRID TỪ VỰNG --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-[95%] max-w-[1300px] flex flex-wrap justify-center gap-x-4 gap-y-6 md:gap-x-8 md:gap-y-10 mt-4 px-4"
      >
        {displayItems.map((item, index) => {
          // Tính toán kích thước thẻ dựa trên số lượng phần tử
          const count = displayItems.length;
          let cardSizeClass = "w-[140px] sm:w-[160px] md:w-[200px]"; // Default (7-9 items)
          let titleSizeClass = "text-[1.2rem] md:text-[1.5rem]";
          let meaningSizeClass = "text-[1rem] md:text-[1.1rem]";

          if (count <= 3) {
            cardSizeClass = "w-[240px] sm:w-[280px] md:w-[320px]"; // Rất ít item -> Rất bự
            titleSizeClass = "text-[2rem] md:text-[2.5rem]";
            meaningSizeClass = "text-[1.4rem] md:text-[1.6rem]";
          } else if (count <= 6) {
            cardSizeClass = "w-[180px] sm:w-[200px] md:w-[240px]"; // Vừa phải -> Bự
            titleSizeClass = "text-[1.5rem] md:text-[1.8rem]";
            meaningSizeClass = "text-[1.2rem] md:text-[1.4rem]";
          } else if (count > 9) {
            cardSizeClass = "w-[120px] sm:w-[140px] md:w-[160px]"; // Rất nhiều item -> Nhỏ vừa
            titleSizeClass = "text-[1rem] md:text-[1.2rem]";
            meaningSizeClass = "text-[0.9rem] md:text-[1rem]";
          }

          return (
            <motion.div
              key={index}
              variants={cardVariants}
              className={`flex flex-col items-center group ${cardSizeClass}`}
            >
              {/* Box chứa ảnh */}
              <div
                className="w-full pt-[100%] bg-white rounded-xl relative transition-transform duration-300 group-hover:-translate-y-2 cursor-pointer"
                style={{
                  boxShadow: `-6px 6px 0px 0px ${shadowColors[index % shadowColors.length]}`,
                  border: '1px solid rgba(0,0,0,0.05)'
                }}
              >
                <div className="absolute inset-0 p-2 md:p-3">
                  <div className="w-full h-full bg-[#f1f5f9] rounded-lg overflow-hidden flex items-center justify-center relative">
                    <img
                      src={item.image_url || `https://image.pollinations.ai/prompt/${encodeURIComponent(`Cute flat vector illustration for kids of ${item.word}, white background, highly detailed`)}?width=400&height=400&nologo=true`}
                      alt={item.word}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Box chứa Text để cố định chiều cao */}
              <div className="flex flex-col items-center justify-start mt-4 md:mt-5 h-[70px] md:h-[90px] w-full">
                {/* Text Tiếng Anh */}
                <h3
                  className={`${titleSizeClass} font-bold text-[#2f3542] text-center leading-tight line-clamp-2`}
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  {item.word}
                </h3>

                {/* Text Tiếng Việt */}
                <p
                  className={`${meaningSizeClass} font-semibold text-[#6b7280] text-center leading-tight mt-1 px-2 line-clamp-2`}
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {item.meaning}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>



    </div>
  );
}
