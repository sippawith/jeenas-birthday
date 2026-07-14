import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Image as ImageIcon } from 'lucide-react';

import { Placeholder } from '../types';

interface PolaroidStackProps {
  items: Placeholder[];
}

export function PolaroidStack({ items }: PolaroidStackProps) {
  // Store the order of items. The last item in the array is rendered on top.
  const [stack, setStack] = useState(items.map((item, index) => ({ id: index, content: item })));

  const handleTap = () => {
    setStack((prev) => {
      const newStack = [...prev];
      const topCard = newStack.pop();
      if (topCard) {
        newStack.unshift(topCard);
      }
      return newStack;
    });
  };

  return (
    <div className="relative w-full h-96 flex flex-col items-center justify-center cursor-pointer" onClick={handleTap}>
      <div className="relative w-full h-80 flex items-center justify-center">
        <AnimatePresence>
          {stack.map((item, index) => {
            // Performance optimization: only render the top 5 cards if there are many photos
            if (index < stack.length - 5) return null;

            const isTop = index === stack.length - 1;
            // Calculate rotation based on original id to keep it consistent
            const rotation = (item.id % 2 === 0 ? 1 : -1) * ((item.id % 3) * 4 + 2);
            
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ 
                  scale: isTop ? 1.05 : 1 - (stack.length - index) * 0.05,
                  opacity: 1 - (stack.length - index - 1) * 0.2,
                  y: (stack.length - index) * 10,
                  rotate: isTop ? rotation : rotation * 0.5,
                  zIndex: index
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute w-64 bg-white p-4 pb-12 polaroid-shadow rounded-sm border border-rose-100"
              >
                {/* Image Placeholder */}
                <div className="w-full h-56 bg-rose-50 flex flex-col items-center justify-center text-rose-300 rounded overflow-hidden relative">
                  {/* 
                    TODO for Poe: 
                    When you upload photos, name them exactly as shown below 
                    and put them in the /public folder.
                    Then uncomment the <img> tag below!
                  */}
                  {<img src={`/${item.content.filename}`} loading="lazy" className="w-full h-full object-cover absolute inset-0 z-10" />}
                  
                  <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                  <span className="text-xs font-playful font-medium px-4 text-center">
                    {item.content.label}
                  </span>
                  <span className="text-[10px] font-mono mt-2 opacity-60 bg-white/50 px-2 py-1 rounded">
                    {item.content.filename}
                  </span>
                  
                  {/* Film grain overlay just for the photo area */}
                  <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] mix-blend-overlay"></div>
                </div>
                
                {/* Tape effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/40 backdrop-blur-sm shadow-sm rotate-2"></div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      
      {/* Helper text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1 }}
        className="text-rose-400 font-playful text-sm text-center flex flex-col items-center mt-4"
      >
        <span>Tap photos to shuffle!</span>
        <span className="text-xs">(Upload images to /public folder)</span>
      </motion.p>
    </div>
  );
}
