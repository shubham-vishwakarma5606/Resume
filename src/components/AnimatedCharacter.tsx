import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import aboutImg from '../assets/about.png';

// Funky terminal boot sequence — runs once on mount, then character reveals.
const bootLines = [
  '> Establishing secure handshake..........',
  '> Loading CyberS3an kernel v2026.08......',
  '> Mounting /defense/systems.............',
  '> Brewing coffee.exe.................... [OK]',
  '> Deploying sarcasm.dll................. [OK]',
  '> Calibrating threat intelligence.......',
  '> Initializing WAF engine...............',
  '> Injecting personality.sh.............. [OK]',
  '> System ready. Welcome, Shubham.',
];

// Cumulative per-line delay (ms) before each line appears.
const lineDurations = [220, 420, 320, 260, 310, 400, 360, 310, 240];

export const AnimatedCharacter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let acc = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    lineDurations.forEach((d, i) => {
      acc += d;
      timers.push(
        setTimeout(() => {
          setCount(i + 1);
          if (i === lineDurations.length - 1) {
            timers.push(setTimeout(() => setDone(true), 700));
          }
        }, acc)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-sm border border-[#8C6D4F]/45 bg-[#0A0806] shadow-[0_25px_70px_rgba(0,0,0,0.95)]">
      {/* Ambient gold radial glow behind everything */}
      <div className="absolute -inset-12 bg-[radial-gradient(circle_at_center,#D4AF37_0%,transparent_55%)] opacity-25 blur-2xl pointer-events-none" />

      {/* Character image — hidden during boot, revealed with filter + scan */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1, filter: 'brightness(0) blur(14px) saturate(0)' }}
        animate={{
          opacity: done ? 1 : 0,
          scale: done ? 1 : 1.1,
          filter: done
            ? 'brightness(0.96) blur(0px) saturate(1.05) contrast(1.06)'
            : 'brightness(0) blur(14px) saturate(0)',
        }}
        transition={{ delay: 1.7, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full h-full"
      >
        <motion.img
          src={aboutImg}
          alt="Shubham Vishwakarma"
          className="w-full h-full object-cover"
          animate={done ? { y: [0, -10, 0] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Cinematic vignette + left-edge fade so it blends into the page */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Scan-line sweep during boot */}
      <AnimatePresence>
        {!done && (
          <motion.div
            key="scan"
            initial={{ y: '-25%', opacity: 0 }}
            animate={{ y: '125%', opacity: [0, 0.8, 0] }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 1.6, ease: 'linear' }}
            className="absolute inset-x-0 h-1/3 pointer-events-none z-20 mix-blend-screen"
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, rgba(212,175,55,0.6) 50%, transparent 100%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Funky terminal boot overlay */}
      <AnimatePresence>
        {!done && (
          <motion.div
            key="terminal"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-30 flex flex-col justify-end p-5 sm:p-7 bg-black/80 backdrop-blur-[2px] pointer-events-none"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            <div className="text-[10.5px] sm:text-[12.5px] leading-[1.75] text-[#D4AF37] tracking-[0.04em]">
              {bootLines.slice(0, count).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {line}
                </motion.div>
              ))}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
                className="inline-block"
              >
                █
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gold corner brackets appear after boot */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom status badge after boot */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 border border-[#D4AF37]/50 bg-black/75 backdrop-blur-sm pointer-events-none"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            <span className="text-[9.5px] tracking-[0.22em] uppercase text-[#D4AF37]">
              ◉ CyberS3an // Online
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedCharacter;
