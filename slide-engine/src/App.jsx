import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import UnitTitleSlide from './components/UnitTitleSlide'
import SectionSlide from './components/SectionSlide'
import VocabularySlide from './components/VocabularySlide'
import VocabularyListSlide from './components/VocabularyListSlide'
import GuessWordSlide from './components/GuessWordSlide'
import ChantSlide from './components/ChantSlide'
import ReadSlide from './components/ReadSlide'
import GrammarSlide from './components/GrammarSlide'
import ExerciseSlide from './components/ExerciseSlide'
import ReadQuestionSlide from './components/ReadQuestionSlide'
import VideoActivitySlide from './components/VideoActivitySlide'
import WritingSlide from './components/WritingSlide'
import CustomSlide from './components/CustomSlide'

import { parseAutoSlideText } from './utils/slideParser'
import { AI_PROMPT_RULES } from './utils/aiRules'

const componentMap = {
  UnitTitle: UnitTitleSlide,
  SectionSlide: SectionSlide,
  Vocabulary: VocabularySlide,
  VocabularyList: VocabularyListSlide,
  GuessWordSlide: GuessWordSlide,
  ChantSlide: ChantSlide,
  ReadSlide: ReadSlide,
  GrammarSlide: GrammarSlide,
  ExerciseSlide: ExerciseSlide,
  ReadQuestionSlide: ReadQuestionSlide,
  VideoActivity: VideoActivitySlide,
  Writing: WritingSlide,
  CustomSlide: CustomSlide
};

const rawMarkdownInput = `
---
[UnitTitle]
title: ON MY WAY!

---
[SectionSlide]
title: Words\\nand\\ngrammar

---
[VideoActivity]
title_left: Watch and Check
video_url: https://www.w3schools.com/html/mov_bbb.mp4
activity_type: checkbox
question: Who did the activity in the photo?
image_url: https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=800
options:
- id: 1 | text: Shiven | is_correct: false
- id: 2 | text: Rhiane | is_correct: false
- id: 3 | text: AJ | is_correct: true

---
[VideoActivity]
title_left: Watch and Match
video_url: https://www.w3schools.com/html/mov_bbb.mp4
activity_type: matching
question: Match the words with their meanings
left_col:
- id: l1 | text: Lidar | match_id: r2
- id: l2 | text: Maya | match_id: r3
- id: l3 | text: Ancient | match_id: r1
right_col:
- id: r1 | text: Very Old
- id: r2 | text: Laser Machine
- id: r3 | text: Civilization

---
[VideoActivity]
title_left: Listen and fill in
video_url: https://www.w3schools.com/html/mov_bbb.mp4
activity_type: fill_blank
question: Fill in the missing words
sentence_parts:
- text: The ancient Maya people 
- is_blank: true | correct_answer: lived
- text:  in the south of Mexico 1,200 
- is_blank: true | correct_answer: years
- text:  ago.

---
[VideoActivity]
title_left: Watch and Number
video_url: https://www.w3schools.com/html/mov_bbb.mp4
activity_type: numbering
question: Number the events in order
items:
- id: n1 | text: They built large cities and roads. | correct_order: 3
- id: n2 | text: Archaeologists used lidar to find remains. | correct_order: 2
- id: n3 | text: The ancient Maya lived in Mexico. | correct_order: 1

---
[VocabularyList]
title: Listen and repeat
words:
- word: bike to school | translation: đạp xe đến trường
- word: travel by boat | translation: đi bằng thuyền
- word: go by bus | translation: đi bằng xe buýt
- word: walk | translation: đi bộ

---
[Writing]
layout: two_columns
col1_heading: Starting an e-mail
col1_subheading: Start an e-mail like this:
col1_lines:
- Hi Suzie,
- How are you?
col2_heading: Ending an e-mail
col2_subheading: End an e-mail like this:
col2_lines:
- See you soon!
- Love, Ben

---
[Writing]
activity_type: fill_blank
question: Fill in the blanks
instruction: (Love, Hi, soon, How)
sentence_parts:
- text: (1) 
- is_blank: true | correct_answer: Hi
- text:  Anna, 
- is_break: true
- text: (2) 
- is_blank: true | correct_answer: How
- text:  are you?
- is_break: true
- text: I am very happy today. I have a new book.
- is_break: true
- text: See you (3) 
- is_blank: true | correct_answer: soon
- text: !
- is_break: true
- text: (4) 
- is_blank: true | correct_answer: Love
- text: ,
- is_break: true
- text: Tony
`;

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

function App() {
  const [slidesData, setSlidesData] = React.useState(null);
  const [markdownText, setMarkdownText] = React.useState(rawMarkdownInput);

  // Sharing States
  const [isSharing, setIsSharing] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState('');

  // Slideshow States
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(0);

  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopyRules = () => {
    navigator.clipboard.writeText(AI_PROMPT_RULES).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleGenerate = () => {
    if (!markdownText.trim()) {
      alert("Please enter some markdown text.");
      return;
    }
    const slides = parseAutoSlideText(markdownText);
    setSlidesData(slides);
    setCurrentSlideIndex(0);
    setDirection(0);
  };

  const handleShare = async () => {
    if (!markdownText.trim()) {
      alert("Please enter some markdown text first.");
      return;
    }
    setIsSharing(true);
    setShareUrl('');
    
    try {
      const formData = new FormData();
      const blob = new Blob([markdownText], { type: 'text/plain' });
      formData.append('file', blob);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      if (data.secure_url) {
        const url = new URL(window.location.href);
        url.searchParams.set('file', data.secure_url);
        const link = url.toString();
        setShareUrl(link);
        
        navigator.clipboard.writeText(link).then(() => {
          alert("Share link copied to clipboard!\n" + link);
        });
      } else {
        alert("Upload failed. Did you set up the Cloudinary preset correctly?");
        console.error(data);
      }
    } catch (error) {
      console.error("Error sharing:", error);
      alert("An error occurred while sharing.");
    } finally {
      setIsSharing(false);
    }
  };

  const handleLoadDefault = () => {
    setMarkdownText(rawMarkdownInput);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setMarkdownText(e.target.result);
      reader.readAsText(file);
    }
  };

  const paginate = (newDirection) => {
    if (!slidesData) return;
    const nextIndex = currentSlideIndex + newDirection;
    if (nextIndex >= 0 && nextIndex < slidesData.length) {
      setDirection(newDirection);
      setCurrentSlideIndex(nextIndex);
    }
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!slidesData) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, slidesData]);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fileUrl = params.get('file');
    if (fileUrl) {
      fetch(fileUrl)
        .then(res => res.text())
        .then(text => {
          setMarkdownText(text);
          const slides = parseAutoSlideText(text);
          setSlidesData(slides);
          setCurrentSlideIndex(0);
          setDirection(0);
        })
        .catch(err => {
          console.error("Error loading shared file:", err);
          alert("Failed to load the shared presentation.");
        });
    }
  }, []);

  const slideVariants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  // If slides are generated, show the presentation
  if (slidesData) {
    const slide = slidesData[currentSlideIndex];
    const Component = componentMap[slide?.type];

    return (
      <div className="w-full h-screen bg-black relative overflow-hidden flex items-center justify-center group">

        {/* Floating Back Button (shows on hover) */}
        <button
          onClick={() => setSlidesData(null)}
          className="fixed top-4 left-4 z-50 bg-black/50 hover:bg-black text-white px-4 py-2 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ← Back to Editor
        </button>

        {/* Navigation Controls - Previous */}
        <button
          onClick={() => paginate(-1)}
          disabled={currentSlideIndex === 0}
          className={`fixed left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl opacity-0 group-hover:opacity-100 transition-all shadow-lg ${currentSlideIndex === 0 ? 'bg-black/20 text-white/30 cursor-not-allowed' : 'bg-black/40 text-white hover:bg-black/80 hover:scale-110'}`}
        >
          ←
        </button>

        {/* Navigation Controls - Next */}
        <button
          onClick={() => paginate(1)}
          disabled={currentSlideIndex === slidesData.length - 1}
          className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl opacity-0 group-hover:opacity-100 transition-all shadow-lg ${currentSlideIndex === slidesData.length - 1 ? 'bg-black/20 text-white/30 cursor-not-allowed' : 'bg-black/40 text-white hover:bg-black/80 hover:scale-110'}`}
        >
          →
        </button>

        {/* Slide Counter */}
        <div className="fixed bottom-6 right-8 z-50 bg-black/40 px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold tracking-widest shadow-lg" style={{ fontFamily: "'Fredoka', sans-serif" }}>
          {currentSlideIndex + 1} / {slidesData.length}
        </div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlideIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            {Component ? (
              <Component {...slide.props} />
            ) : (
              <div className="w-full h-screen relative flex items-center justify-center bg-gray-100">
                <h1 className="text-3xl text-red-500 font-bold">Unknown Slide Type: {slide?.type}</h1>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    )
  }

  // Otherwise, show Editor UI
  return (
    <div className="relative w-full min-h-screen bg-[#bde0fe] flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '40px 40px', opacity: 0.4 }} />
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 60, ease: "linear" }} className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-[#ffc8dd] rounded-full mix-blend-multiply filter blur-3xl opacity-60" />
      <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 80, ease: "linear" }} className="absolute top-1/2 -right-32 w-[35rem] h-[35rem] bg-[#ffe898] rounded-full mix-blend-multiply filter blur-3xl opacity-60" />

      {/* Main Glass Box */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="relative z-10 w-full max-w-[1100px] bg-white/60 backdrop-blur-2xl rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/60 overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/40">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-[2.5rem] md:text-[3.2rem] font-black text-[#2f3542] leading-none drop-shadow-sm" style={{ fontFamily: "'Fredoka', sans-serif" }}>
              ✨ AutoSlide Engine
            </h1>
            <p className="text-[#6b7280] font-bold mt-2 text-lg">
              Paste your magical <span className="bg-white px-3 py-1 rounded-lg text-[#7b5cda] shadow-sm ml-1 mr-1">.autols</span> code here!
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyRules}
              className={`px-5 py-3 rounded-2xl font-bold transition-all shadow-sm ${isCopied ? 'bg-[#2ecc71] text-white shadow-md' : 'bg-white hover:bg-gray-50 text-[#7b5cda] hover:-translate-y-1 hover:shadow-md'}`}
            >
              {isCopied ? "✓ Copied!" : "🤖 Copy AI Rules"}
            </button>
            <label className="cursor-pointer bg-[#7b5cda] hover:bg-[#6c4ac7] px-5 py-3 rounded-2xl font-bold text-white transition-all shadow-sm hover:-translate-y-1 hover:shadow-md">
              📁 Upload File
              <input type="file" accept=".txt,.autols,.md" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 p-8 flex flex-col gap-4">
          <textarea
            value={markdownText}
            onChange={(e) => setMarkdownText(e.target.value)}
            placeholder="---&#10;[UnitTitle]&#10;title: ON MY WAY!&#10;..."
            className="w-full h-[450px] p-6 rounded-[32px] bg-white/70 border-[4px] border-white/50 font-mono text-[16px] resize-none focus:outline-none focus:border-[#aed9f8] focus:bg-white shadow-inner transition-all text-[#2f3542] leading-relaxed"
          ></textarea>
        </div>

        {/* Footer actions */}
        <div className="p-8 pt-2 flex flex-col md:flex-row items-center justify-between gap-4">
          <button
            onClick={handleLoadDefault}
            className="px-6 py-3 font-bold text-[#6b7280] hover:text-[#2f3542] bg-white/40 hover:bg-white/80 rounded-2xl transition-all"
          >
            Load Default Template
          </button>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <button
              onClick={handleShare}
              disabled={isSharing}
              className={`group relative px-8 py-4 font-bold text-white rounded-3xl transition-all hover:-translate-y-1 active:translate-y-0 shadow-md ${isSharing ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#7b5cda] hover:bg-[#6c4ac7]'}`}
              style={{
                fontFamily: "'Fredoka', sans-serif",
                boxShadow: isSharing ? "none" : "0 6px 0 0 #5f42b3, 0 10px 15px rgba(0,0,0,0.1)"
              }}
            >
              {isSharing ? '⏳ Generating Link...' : '🔗 Share Link'}
            </button>

            <button
              onClick={handleGenerate}
              className="group relative px-10 py-4 bg-[#bdecb6] hover:bg-[#a5e09f] text-[#2f3542] font-black text-2xl rounded-3xl transition-all hover:-translate-y-2 active:translate-y-0"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                boxShadow: "0 8px 0 0 #8cc786, 0 15px 20px rgba(0,0,0,0.1)"
              }}
            >
              🚀 Generate Slides
              {/* Sparkles effect */}
              <motion.div
                className="absolute -top-4 -right-4 text-4xl opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                ✨
              </motion.div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App
