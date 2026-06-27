import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';

export default function ReadQuestionSlide({ data }) {
  const {
    title = "Word\nDetective",
    instruction = "",
    image_url = "",
    audio_url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    question = "What did the lidar pictures show?",
    options = [
      "A. They showed a lot of villages and cities.",
      "B. They showed small houses only.",
      "C. They showed electricity and horses.",
      "D. They showed the ocean."
    ],
    correct_option = 0,
    passage = [
      "The ancient Maya people lived in the south of Mexico and Guatemala 1,200 years ago. Maya people still live there today.",
      "Archaeologists are looking for the roads and buildings of the ancient Maya people. A new machine using lidar is helping them find the remains of old Maya towns and villages. Marcello Canuto is a National Geographic Explorer. He says that it is difficult to look for the remains in the forest, but with lidar, they can now see the shapes of buildings and roads under the trees.",
      "Did the archaeologists learn anything new from the lidar machine? Yes, they did. They believed that the ancient Maya people lived in small houses in small villages, but the lidar pictures changed their ideas. *They showed a lot of villages and cities.* Marcello thinks that between five and ten million people lived in the area.",
      "The ancient Maya people didn't have electricity or horses to help them to carry things, but they built a lot of villages and cities. All these people needed food and water, so there were a lot of farms to grow food and roads to transport it to the cities. They were some of the largest cities in the world at the time!"
    ]
  } = data || {};

  const [isRevealed, setIsRevealed] = useState(false);

  // Hàm render chữ nổi bật (phần bọc trong dấu *...* sẽ thành màu đỏ nếu isRevealed = true)
  const parseHighlight = (text) => {
    const parts = text.split(/\*(.*?)\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return (
          <span
            key={i}
            className={`transition-colors duration-500 ${isRevealed ? 'text-[#e74c3c] font-bold bg-yellow-100 px-1 rounded' : 'text-inherit'}`}
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="relative w-full h-screen bg-[#fae596] overflow-hidden flex items-center justify-center font-sans">

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
            className={`${title.length > 15 ? 'text-[2rem] lg:text-[2.5rem]' : 'text-[4rem] lg:text-[5rem]'} font-bold text-[#2f3542] text-center leading-[1.1] mb-8`}
            style={{ fontFamily: "'Patrick Hand', cursive", whiteSpace: "pre-line" }}
          >
            {title}
          </h2>

          {/* KIỂM TRA NẾU CÓ CÂU HỎI TRẮC NGHIỆM THÌ HIỂN THỊ, NẾU KHÔNG HIỂN THỊ ẢNH CŨ */}
          {question ? (
            <div className="w-full flex flex-col gap-4 mb-8 z-10 relative">
              <h3 className="text-[1.3rem] lg:text-[1.5rem] font-bold text-[#2f3542] mb-2 leading-snug" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {question}
              </h3>
              <div className="flex flex-col gap-3">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`p-3 lg:p-4 rounded-2xl text-left font-bold text-[1.1rem] lg:text-[1.2rem] transition-all border-4 shadow-sm ${isRevealed && idx === correct_option
                      ? "bg-[#2ecc71] border-[#27ae60] text-white shadow-md scale-105"
                      : "bg-white border-transparent text-[#2f3542] hover:border-[#d4b4e2] hover:scale-105"
                      }`}
                    style={{ fontFamily: "'Nunito', sans-serif" }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Khối Ảnh */}
              <div className="relative w-full max-w-[400px] aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-4 border-white mb-8 bg-gray-200 flex items-center justify-center">
                {image_url ? (
                  <img src={image_url} alt="Detective" className="w-full h-full object-cover" />
                ) : (
                  <svg viewBox="0 0 24 24" className="w-24 h-24 fill-gray-400">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                )}
              </div>

              {/* Hướng dẫn */}
              <p className="text-[1.2rem] lg:text-[1.4rem] font-medium text-[#2f3542] text-center px-4 mb-10" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {instruction}
              </p>
            </>
          )}

          {/* Nút bật/tắt Đáp án (Gợi ý) */}
          <div className="z-30 mb-4">
            <button
              onClick={() => setIsRevealed(!isRevealed)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-lg font-bold transition-all hover:scale-105 active:scale-95 ${isRevealed ? "bg-[#2f3542] text-white" : "bg-[#e74c3c] text-white animate-bounce"
                }`}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              {isRevealed ? "Hide Answers" : "Reveal Answers"}
            </button>
          </div>

          {/* Decor: Thám tử nhí (Góc dưới trái khối blue) */}
          <div className="absolute -bottom-8 -left-8 w-32 h-40 drop-shadow-md z-20 hover:scale-110 transition-transform cursor-pointer" onClick={() => setIsRevealed(!isRevealed)}>
            <svg viewBox="0 0 100 150" className="w-full h-full">
              {/* Thân */}
              <path d="M30,120 L30,70 L70,70 L70,120 Z" fill="#8d6e63" />
              {/* Chân */}
              <rect x="35" y="120" width="10" height="20" fill="#ffccbc" />
              <rect x="55" y="120" width="10" height="20" fill="#ffccbc" />
              <rect x="32" y="140" width="16" height="10" fill="#3e2723" rx="3" />
              <rect x="52" y="140" width="16" height="10" fill="#3e2723" rx="3" />
              {/* Áo khoác thám tử */}
              <path d="M25,70 L75,70 L80,110 L20,110 Z" fill="#a1887f" />
              <path d="M40,70 L50,90 L60,70 Z" fill="#fff" />
              <line x1="50" y1="90" x2="50" y2="110" stroke="#3e2723" strokeWidth="2" />
              {/* Đầu */}
              <circle cx="50" cy="50" r="25" fill="#ffccbc" />
              {/* Mắt */}
              <circle cx="42" cy="45" r="3" fill="#2f3542" />
              <circle cx="58" cy="45" r="3" fill="#2f3542" />
              {/* Kính lúp (che mắt phải) */}
              <circle cx="62" cy="45" r="12" fill="#81d4fa" fillOpacity="0.6" stroke="#2f3542" strokeWidth="3" />
              <line x1="70" y1="54" x2="85" y2="70" stroke="#2f3542" strokeWidth="5" strokeLinecap="round" />
              {/* Miệng nhếch mép cười */}
              <path d="M40,55 Q45,58 52,55" fill="none" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />
              {/* Mũ thám tử (Deerstalker) */}
              <path d="M20,35 Q50,10 80,35 Q90,35 90,45 L10,45 Q10,35 20,35 Z" fill="#795548" />
              <path d="M30,35 Q50,5 70,35 Z" fill="#8d6e63" />
              <path d="M10,45 Q30,55 50,45" fill="none" stroke="#3e2723" strokeWidth="3" />
            </svg>
          </div>
        </motion.div>


        {/* --- CỘT PHẢI (Khối Đoạn văn) --- */}
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
              <path d="M22,25 A8,8 0 0,1 38,25" fill="#fff" />
              {/* Mắt phải */}
              <circle cx="70" cy="30" r="12" fill="#2f3542" />
              <path d="M62,25 A8,8 0 0,1 78,25" fill="#fff" />
              {/* Miệng */}
              <path d="M45,40 Q50,48 55,40" stroke="#2f3542" strokeWidth="3" fill="none" strokeLinecap="round" />
              {/* Má hồng */}
              <path d="M15,45 L25,45 M17,49 L23,49" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />
              <path d="M75,45 L85,45 M77,49 L83,49" stroke="#2f3542" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>

          {/* Băng dính Washi Tape góc phải */}
          <div className="absolute -top-6 -right-8 z-20 w-56 h-14 bg-[#cdb4db] rotate-[15deg] shadow-sm flex items-center justify-around px-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2" style={{ background: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, #fae596 4px, #fae596 8px)' }}></div>
            <div className="absolute right-0 top-0 bottom-0 w-2" style={{ background: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, #fae596 4px, #fae596 8px)' }}></div>
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white -rotate-12"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white rotate-12"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white -rotate-6"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          </div>

          {/* Khung trắng chứa Đoạn văn */}
          <div className="w-full h-full bg-white rounded-[40px] p-8 lg:p-12 shadow-md relative z-10 flex flex-col justify-start overflow-y-auto max-h-[800px] custom-scrollbar transition-shadow hover:shadow-xl group pt-16 lg:pt-16">

            {/* Nút Play/Pause Audio (nếu có audio) */}
            {audio_url && (
              <div className="absolute top-6 right-6 lg:right-10 z-50">
                <AudioPlayer src={audio_url} />
              </div>
            )}

            <div className="flex flex-col gap-4 text-justify">
              {passage.map((para, index) => (
                <p
                  key={index}
                  className="text-[1.1rem] lg:text-[1.3rem] text-[#2f3542] leading-relaxed"
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  {parseHighlight(para)}
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

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4b4e2;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}
