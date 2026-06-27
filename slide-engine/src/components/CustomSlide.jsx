import React from 'react';
import { motion } from 'framer-motion';

export default function CustomSlide({ data }) {
  const {
    title = "",
    subtitle = "",
    layout = "center", // 'center', 'split'
    bg_color = "#ffffff",
    elements = [],
    elements_left = [],
    elements_right = []
  } = data || {};

  const renderElement = (el, index) => {
    switch (el.type) {
      case 'html':
        return (
          <div 
            key={index}
            className="w-full mb-4"
            style={{ textAlign: el.align || 'left' }}
            dangerouslySetInnerHTML={{ __html: el.content }}
          />
        );
      case 'text':
        return (
          <p 
            key={index} 
            className="whitespace-pre-wrap"
            style={{ 
              color: el.color || '#2f3542', 
              fontSize: el.size || '1.5rem',
              fontWeight: el.bold ? 'bold' : 'normal',
              textAlign: el.align || 'left',
              fontFamily: "'Nunito', sans-serif",
              marginBottom: '1rem'
            }}
          >
            {el.content}
          </p>
        );
      case 'title':
        return (
          <h2 
            key={index}
            style={{
              color: el.color || '#7b5cda',
              fontSize: el.size || '3rem',
              fontWeight: 'extrabold',
              textAlign: el.align || 'center',
              fontFamily: "'Fredoka', sans-serif",
              marginBottom: '1.5rem'
            }}
          >
            {el.content}
          </h2>
        );
      case 'image':
        return (
          <div key={index} className="flex justify-center mb-4 w-full" style={{ justifyContent: el.align === 'left' ? 'flex-start' : el.align === 'right' ? 'flex-end' : 'center' }}>
            <img 
              src={el.url} 
              alt="Custom element" 
              className="shadow-sm object-cover"
              style={{
                width: el.width || '100%',
                height: el.height || 'auto',
                borderRadius: el.rounded === false ? '0' : '24px'
              }}
            />
          </div>
        );
      case 'space':
        return <div key={index} style={{ height: el.height || '2rem', width: '100%' }}></div>;
      case 'box':
        return (
          <div 
            key={index}
            className="p-6 rounded-3xl mb-4 w-full"
            style={{ 
              backgroundColor: el.bg_color || '#fae596',
              border: el.border_color ? `4px solid ${el.border_color}` : 'none'
            }}
          >
             <p className="font-bold text-[1.4rem] whitespace-pre-wrap" style={{ color: el.color || '#2f3542', fontFamily: "'Nunito', sans-serif" }}>
               {el.content}
             </p>
          </div>
        );
      default:
        return <div key={index} className="text-red-500">Unknown element: {el.type}</div>;
    }
  };

  return (
    <div 
      className="w-full h-screen overflow-hidden flex flex-col items-center justify-center relative p-8 lg:p-16"
      style={{ backgroundColor: bg_color }}
    >
      
      {/* Decorative Dots Pattern for background texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#000000 2px, transparent 2px)',
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 20px 20px'
      }} />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-[1400px] h-full flex flex-col">
        
        {/* Header Section */}
        {(title || subtitle) && (
          <motion.div 
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full text-center mb-8"
          >
            {title && (
              <h1 className="text-[3.5rem] lg:text-[4.5rem] font-bold text-[#2f3542] leading-none mb-2" style={{ fontFamily: "'Fredoka', sans-serif" }}>
                {title}
              </h1>
            )}
            {subtitle && (
              <h3 className="text-[1.8rem] lg:text-[2rem] font-bold text-[#7b5cda]" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {subtitle}
              </h3>
            )}
          </motion.div>
        )}

        {/* Content Section */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 w-full flex flex-row gap-8 lg:gap-12 min-h-0"
        >
          {layout === 'center' && (
            <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-[40px] p-8 lg:p-12 shadow-sm overflow-y-auto custom-scrollbar">
               {elements.map((el, i) => renderElement(el, i))}
            </div>
          )}

          {layout === 'split' && (
            <>
              <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-[40px] p-8 lg:p-12 shadow-sm overflow-y-auto custom-scrollbar flex flex-col">
                 {elements_left.map((el, i) => renderElement(el, i))}
              </div>
              <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-[40px] p-8 lg:p-12 shadow-sm overflow-y-auto custom-scrollbar flex flex-col">
                 {elements_right.map((el, i) => renderElement(el, i))}
              </div>
            </>
          )}
        </motion.div>
        
      </div>
    </div>
  );
}
