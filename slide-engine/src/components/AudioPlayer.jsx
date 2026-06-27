import React, { useState, useRef } from 'react';

export default function AudioPlayer({ src }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setProgress(newTime);
  };

  if (!src) return null;

  return (
    <div 
      className="relative z-[100] flex items-center bg-[#5e54d6] rounded-full shadow-lg transition-all duration-500 overflow-hidden h-14 hover:shadow-xl"
      style={{ width: isHovered ? '280px' : '56px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Main Button (Always visible) */}
      <button 
        onClick={togglePlay}
        className="w-14 h-14 shrink-0 flex items-center justify-center text-white outline-none"
      >
        {!isHovered ? (
          // Music Note Icon
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        ) : (
          // Play / Pause Icon
          isPlaying ? (
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current ml-1"><path d="M8 5v14l11-7z"/></svg>
          )
        )}
      </button>

      {/* Seek Bar (Visible on hover) */}
      <div 
        className={`flex-1 pr-4 pl-1 flex flex-col justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100 delay-200' : 'opacity-0'}`}
      >
        <div className="flex items-center justify-between text-white/80 text-[11px] font-bold mb-1.5 px-1 font-sans">
           <span>{formatTime(progress)}</span>
           <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={progress}
          onChange={handleSeek}
          className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer hover:bg-white/50 transition-colors"
          style={{ accentColor: "#fae596" }}
        />
      </div>
    </div>
  );
}

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
