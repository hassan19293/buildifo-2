import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CursorState } from '../types';

interface CursorProps {
  cursorState: CursorState;
  cursorText?: string;
}

export const Cursor: React.FC<CursorProps> = ({ cursorState, cursorText }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  const isText = cursorState === 'view' || cursorState === 'inspect' || cursorState === 'enter' || cursorState === 'close';
  const label = cursorText || (
    cursorState === 'view' ? 'VIEW' :
    cursorState === 'inspect' ? 'INSPECT' :
    cursorState === 'enter' ? 'ENTER' :
    cursorState === 'close' ? 'CLOSE' : ''
  );

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      animate={{
        x: pos.x,
        y: pos.y,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 350,
        mass: 0.35
      }}
    >
      {isText ? (
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          className="px-2.5 py-1 bg-[#F5F3EE] text-[#080808] text-[10px] font-mono-tech tracking-widest font-semibold border border-[#080808]/20 shadow-sm"
        >
          {label}
        </motion.div>
      ) : (
        <div className="relative flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#F5F3EE]" />
        </div>
      )}
    </motion.div>
  );
};
