import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { slides } from './data';
import { PolaroidStack } from './components/PolaroidStack';
import { MiniGame } from './components/MiniGame';
import { MusicPlayer } from './components/MusicPlayer';
import { Heart, ChevronRight, ChevronLeft, Sparkles, Gift, Castle, Crown, Wand2, Stars } from 'lucide-react';

function FloatingDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
      <motion.div animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-10 left-10 text-rose-300">
        <Castle className="w-12 h-12" />
      </motion.div>
      <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="absolute top-32 right-8 text-rose-400">
        <Crown className="w-8 h-8" />
      </motion.div>
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="absolute bottom-40 left-12 text-rose-300">
        <Stars className="w-10 h-10" />
      </motion.div>
      <motion.div animate={{ y: [0, -15, 0], x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }} className="absolute bottom-20 right-16 text-rose-400">
        <Wand2 className="w-8 h-8" />
      </motion.div>
      <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }} className="absolute top-1/2 left-4 text-rose-300">
        <Heart className="w-6 h-6 fill-rose-200" />
      </motion.div>
      <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.5 }} className="absolute top-2/3 right-8 text-rose-300">
        <Heart className="w-5 h-5 fill-rose-200" />
      </motion.div>
    </div>
  );
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const slide = slides[currentSlide];

  const nextSlide = () => {
    if (slide.type === 'game' && !gameWon) return;
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(curr => curr + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(curr => curr - 1);
    }
  };

  const handleGameWin = () => {
    setGameWon(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3']
    });
  };

  const triggerFinalConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#fb7185']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#fb7185']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div className="w-full h-[100dvh] relative overflow-hidden bg-rose-50 flex flex-col">
      <div className="film-grain" />
      <FloatingDecorations />
      
      {/* Top Bar Area */}
      <div className="w-full p-4 flex justify-start z-50 shrink-0 min-h-[88px] relative">
        <MusicPlayer />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 1.05 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
          >
            {slide.type === 'intro' && (
              <div className="max-w-md w-full space-y-6">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                >
                  <Sparkles className="w-12 h-12 mx-auto text-rose-400 mb-4" />
                </motion.div>
                <h1 className="font-princess text-6xl text-rose-600 leading-tight">
                  Happy 18th Birthday na Jeenaaa!
                </h1>
                <p className="font-playful text-rose-500 text-lg">
                  มาทบทวนความทรงจำหิด
                </p>
                <p className="font-elegant italic text-rose-400 mt-8">
                  Love, Poe
                </p>
              </div>
            )}

            {slide.type === 'category' && slide.category && (
              <div className="max-w-md w-full flex flex-col h-full py-12">
                <div className="flex-1 flex flex-col justify-center space-y-10">
                  <div>
                    <h2 className="font-elegant text-4xl text-rose-600 mb-4">
                      {slide.category.title}
                    </h2>
                    <p className="font-playful text-rose-400 px-4">
                      {slide.category.description}
                    </p>
                  </div>
                  
                  <div className="w-full flex justify-center">
                    <PolaroidStack items={slide.category.placeholders} />
                  </div>
                </div>
              </div>
            )}

            {slide.type === 'game' && (
              <div className="max-w-md w-full">
                <MiniGame onWin={handleGameWin} />
              </div>
            )}

            {slide.type === 'outro' && (
              <div className="max-w-md w-full space-y-8 flex flex-col items-center">
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Gift className="w-20 h-20 text-rose-500" />
                </motion.div>
                <h1 className="font-elegant text-4xl text-rose-600 leading-tight">
                  เปิดของขวัญได้เลยยย...
                </h1>
                <p className="font-playful text-rose-500 text-lg px-4">
                  (หวังว่าจะพร้อมเก็บความทรงจำด้วยกันไปอีกเยอะๆนะก้าบบ 📸)
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={triggerFinalConfetti}
                  className="mt-8 px-8 py-3 bg-rose-500 text-white font-playful rounded-full shadow-lg hover:bg-rose-600 flex items-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>เย้!</span>
                </motion.button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Bar */}
      <div className="h-20 shrink-0 flex items-center justify-between px-6 pb-6 relative z-10 max-w-md w-full mx-auto">
        <button
          onClick={prevSlide}
          className={`p-3 rounded-full bg-white/50 backdrop-blur text-rose-500 shadow transition-opacity ${currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-white'}`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Progress dots */}
        <div className="flex space-x-2">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-rose-500 scale-125' : 'bg-rose-200'}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={slide.type === 'game' && !gameWon}
          className={`p-3 rounded-full bg-rose-500 text-white shadow-lg transition-all ${(currentSlide === slides.length - 1 || (slide.type === 'game' && !gameWon)) ? 'opacity-0 pointer-events-none scale-0' : 'opacity-100 hover:bg-rose-600 scale-100'}`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
