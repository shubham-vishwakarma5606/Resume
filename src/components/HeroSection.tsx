import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import watermarkImg from '../assets/watermark.png';
import { AnimatedCharacter } from './AnimatedCharacter';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.2,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const navItems = [
  { name: 'ABOUT', href: '#about' },
  { name: 'PROJECTS', href: '#work' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'JOURNEY', href: '#experience' },
  { name: 'CONTACT', href: '#contact' },
];

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-screen h-screen overflow-hidden bg-black text-[#E8DFD8] font-sans selection:bg-[#C41E3A] selection:text-[#F2EDE8]">
      {/* ================= 1. AMBIENT CINEMATIC GLOWS ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-1/6 w-[34rem] h-[34rem] bg-[#C41E3A] rounded-full blur-[190px]"
        />
        <motion.div
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/5 left-1/5 w-[28rem] h-[28rem] bg-[#5A1F2C] rounded-full blur-[170px]"
        />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black via-black/85 to-transparent pointer-events-none" />
      </div>

      {/* ================= 3. ANIMATED WATERMARK EMBLEM ================= */}
      <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-12 pointer-events-none flex items-center justify-center z-20">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-36 h-36 bg-black/85 rounded-full blur-xl" />
          <motion.div
            animate={{ y: [-3, 3, -3], scale: [1, 1.03, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex items-center justify-center"
          >
            <img
              src={watermarkImg}
              alt="Insignia"
              className="w-24 h-24 lg:w-28 lg:h-28 object-contain drop-shadow-[0_0_15px_rgba(196,30,58,0.3)]"
            />
          </motion.div>
        </div>
      </div>

      {/* ================= 4. CONTENT LAYER ================= */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full px-6 sm:px-12 lg:px-16 pt-6 pb-8 pointer-events-none">

        {/* Navigation Bar */}
        <header className="relative flex items-center justify-between w-full pointer-events-auto">
          <a
            href="#"
           
            className="text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase text-[#D9D0C8] hover:opacity-75 transition-opacity"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            SHUBHAM.
          </a>

          <nav
            className="hidden md:flex items-center space-x-8 lg:space-x-10 text-[11px] tracking-[0.28em] font-light uppercase text-[#AFA39D] absolute left-1/2 -translate-x-1/2"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
               
                className="relative group py-1 transition-colors duration-300 hover:text-[#F2EDE8]"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C41E3A]/50 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
           
            className="group flex items-center space-x-2 text-[11px] tracking-[0.24em] font-light uppercase py-2 px-4 border border-[#5A1F2C]/50 hover:border-[#C41E3A] text-[#D9D0C8] transition-all duration-300 backdrop-blur-sm ml-auto md:ml-0"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>LET&apos;S TALK</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
              ↗
            </span>
          </a>
        </header>

        {/* Main Hero Row */}
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full pt-4 pb-2 my-auto gap-8">

          {/* LEFT: Headline + Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[37rem] xl:max-w-[40rem] pointer-events-auto z-20"
          >
            <motion.div variants={fadeUpVariants} className="relative mb-3.5 select-none">
              <h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[7.8rem] tracking-tight uppercase leading-[0.83]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#C8BDB4] to-[#3A3030] drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                  I SECURE
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#E8DFD8] via-[#B03A48] to-[#3A0F14] drop-shadow-[0_8px_25px_rgba(176,58,72,0.35)]">
                  DIGITAL
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#D8C9BE] via-[#7A2431] to-[#1F0A0D] drop-shadow-[0_10px_30px_rgba(122,36,49,0.4)]">
                  FRONTIERS.
                </span>
              </h1>
            </motion.div>

            <motion.div variants={fadeUpVariants} className="mb-4">
              <p
                className="text-[10px] sm:text-[11px] md:text-xs font-normal tracking-[0.28em] uppercase text-[#AFA39A]"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                CYBERSECURITY SPECIALIST <span className="text-[#5A1F2C] mx-1">•</span> SECURITY RESEARCHER <span className="text-[#5A1F2C] mx-1">•</span> TOOL BUILDER
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="text-xs sm:text-sm md:text-[13.5px] font-light text-[#9C8F8A] leading-[1.8] tracking-wide max-w-lg mb-6 space-y-1"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <p>
                I build defensive tools, simulate attacks, and engineer awareness platforms.
                <br />
                Where offensive research meets resilient defense — and the grid stays one step ahead.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="flex flex-row items-center gap-4 sm:gap-6"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <motion.a
                href="#work"
               
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center space-x-3 px-6 sm:px-7 py-3.5 border border-[#5A1F2C] bg-[#140A0E]/80 hover:border-[#C41E3A] text-[#D9D0C8] hover:text-[#F2EDE8] text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(196,30,58,0.18)]"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D9D0C8]/40 to-transparent pointer-events-none" />
                <span>EXPLORE MY WORK</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-xs">
                  ↗
                </span>
              </motion.a>

              <motion.a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
               
                whileHover={{ scale: 1.02 }}
                className="relative inline-flex items-center space-x-2 px-6 sm:px-7 py-3.5 border border-[#5A1F2C]/40 hover:border-[#5A1F2C] text-[#B0A39A] hover:text-[#D9D0C8] text-[11px] font-medium tracking-[0.24em] uppercase transition-all duration-300"
              >
                <span>DOWNLOAD RESUME</span>
                <span className="transform transition-transform duration-300 group-hover:translate-y-0.5 text-xs">
                  ↓
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Animated Character with boot sequence */}
          <div className="hidden lg:block w-[340px] xl:w-[380px] h-[460px] xl:h-[500px] shrink-0 pointer-events-auto z-10 relative">
            <AnimatedCharacter />
          </div>
        </div>

        <div className="h-2" />
      </div>
    </section>
  );
};

export default HeroSection;