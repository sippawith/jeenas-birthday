import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play } from 'lucide-react';

export function MusicPlayer() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgSrc, setImgSrc] = useState('/hai_ther_cover.jpg.jpg');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rewindRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/hai_ther.mp3');
    audioRef.current.loop = true;
    rewindRef.current = new Audio('/rewind.mp3');
    rewindRef.current.loop = true;
    
    return () => {
      audioRef.current?.pause();
      rewindRef.current?.pause();
    };
  }, []);

  const handleStart = () => {
    setHasStarted(true);
    setIsPlaying(true);
    audioRef.current?.play().catch(e => console.error("Audio playback failed", e));
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.error("Audio playback failed", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleDragStart = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    }
    rewindRef.current?.play().catch(e => console.error(e));
  };

  const handleDragEnd = () => {
    rewindRef.current?.pause();
    if (isPlaying) {
      audioRef.current?.play().catch(e => console.error(e));
    }
  };

  return (
    <div className="relative z-50">
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.button
            key="start-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleStart}
            className="bg-rose-500 text-white font-playful px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 border-2 border-rose-200"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>กดเพื่อเล่นเพลงจร้า</span>
          </motion.button>
        ) : (
          <motion.div
            key="player"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3 bg-white/60 backdrop-blur-md p-2 rounded-full shadow-lg border border-rose-100"
          >
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ 
                rotate: isPlaying ? { repeat: Infinity, duration: 4, ease: "linear" } : { duration: 0.5, ease: "easeOut" } 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-14 h-14 rounded-full relative cursor-pointer overflow-hidden border-4 border-gray-900 flex items-center justify-center bg-gray-900 shadow-inner shrink-0"
              style={{ touchAction: 'none' }}
            >
              <img 
                src={imgSrc} 
                alt="Album" 
                className="w-full h-full object-cover opacity-90 absolute inset-0 rounded-full"
                onError={(e) => {
                  if (imgSrc === '/hai_ther_cover.jpg.jpg') {
                    setImgSrc('/hai_ther_cover.jpg');
                  } else {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }
                }}
              />
              {/* Vinyl grooves */}
              <div className="absolute inset-0 rounded-full border border-white/10 m-1 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-full border border-white/10 m-2 pointer-events-none"></div>
              <div className="absolute inset-0 rounded-full border border-white/5 m-3 pointer-events-none"></div>
              
              {/* Center hole */}
              <div className="w-3 h-3 bg-rose-50 rounded-full z-10 border border-gray-400 shadow-sm relative flex items-center justify-center">
                <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
              </div>
            </motion.div>
            <div className="pr-4 pl-1">
              <p className="text-sm font-playful font-bold text-rose-600 leading-tight">ให้เธอ</p>
              <p className="text-[10px] text-rose-400 font-playful leading-tight">โต๊ะ วสันต์</p>
              <p className="text-[8px] text-gray-400 font-playful mt-1 max-w-[80px] leading-tight">
                {isPlaying ? 'Playing...' : 'Tap to play, drag to scratch!'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
