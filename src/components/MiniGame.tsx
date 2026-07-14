import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface MiniGameProps {
  onWin: () => void;
}

export function MiniGame({ onWin }: MiniGameProps) {
  const [score, setScore] = useState(0);
  const targetScore = 50;
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    if (score >= targetScore) {
      setTimeout(() => {
        onWin();
      }, 800);
      return;
    }

    const interval = setInterval(() => {
      setScore(prev => {
        if (prev >= targetScore) return prev;
        return Math.max(0, prev - 1);
      });
    }, 400);

    return () => clearInterval(interval);
  }, [score, targetScore, onWin]);

  const handleTap = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    // Prevent default to avoid double-firing on some touch devices
    if (e.type === 'touchstart') {
      e.preventDefault();
    }
    
    if (score >= targetScore) return;

    // Get click coordinates for floating heart effect relative to the viewport
    let clientX = 0;
    let clientY = 0;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    setScore(prev => prev + 1);
    
    // Add a floating heart
    const newHeart = { id: Date.now(), x: clientX, y: clientY };
    setFloatingHearts(prev => [...prev, newHeart]);

    // Remove it after animation
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1000);
  };

  const progress = Math.min((score / targetScore) * 100, 100);

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className="font-elegant text-4xl text-rose-600 mb-2">กดๆๆๆ</h2>
        <p className="font-playful text-rose-500 text-sm">Tap the heart to fill it up!</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-5 bg-rose-200 rounded-full overflow-hidden mb-12 relative border-2 border-white shadow-inner">
        <motion.div 
          className="h-full bg-gradient-to-r from-rose-400 to-rose-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
        />
        {score >= targetScore && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </div>

      {/* Big Heart Button */}
      <motion.div
        className="relative cursor-pointer select-none touch-manipulation z-20"
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleTap}
        onTouchStart={handleTap}
      >
        <motion.div
          animate={{ 
            scale: score >= targetScore ? [1, 1.1, 1] : 1,
          }}
          transition={{ repeat: score >= targetScore ? Infinity : 0, duration: 1 }}
        >
          <Heart 
            className={`w-36 h-36 transition-colors duration-300 ${score >= targetScore ? 'fill-rose-500 text-rose-600' : 'fill-rose-300 text-rose-400'} filter drop-shadow-2xl`} 
          />
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-playful text-white text-3xl font-bold drop-shadow-md">
            {score < targetScore ? `${Math.round(progress)}%` : '100%'}
          </span>
        </div>
      </motion.div>

      {/* Floating Effects - We attach these to the document body conceptually by making them fixed, but React portals or fixed positioning works well here */}
      <AnimatePresence>
        {floatingHearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, y: 0, scale: 0.5, x: 0 }}
            animate={{ 
              opacity: 0, 
              y: -150, 
              scale: 1.5, 
              x: (Math.random() - 0.5) * 100,
              rotate: (Math.random() - 0.5) * 45
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed pointer-events-none z-50 text-rose-400"
            style={{ 
              left: heart.x - 16, // center the icon horizontally based on tap
              top: heart.y - 16   // center vertically 
            }}
          >
            <Heart className="w-8 h-8 fill-rose-400 opacity-75" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
