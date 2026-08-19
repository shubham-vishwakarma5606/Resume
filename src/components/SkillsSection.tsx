import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

// Cybersecurity-focused skill matrix (inferred from GitHub repos — confirm/edit)
const bentoCategories = [
  {
    title: 'DEFENSIVE SECURITY',
    badge: 'BLUE TEAM',
    items: ['WAF Engineering', 'Network Defense', 'Threat Modeling', 'System Hardening', 'Log Analysis'],
    description: 'Designing web application firewalls, hardening attack surfaces, and building defensive utilities that detect, log, and neutralize malicious payloads.',
    stat: 'WAF + DEFENSE',
    colSpan: 'lg:col-span-7',
  },
  {
    title: 'OFFENSIVE SECURITY',
    badge: 'RED TEAM',
    items: ['Penetration Testing', 'Recon & Enumeration', 'Exploit Research', 'Remote Access Tooling', 'Web App Exploitation'],
    description: 'Controlled offensive research, vulnerability discovery, and ethically-built remote access frameworks used for authorized testing and simulation.',
    stat: 'ETHICAL RESEARCH',
    colSpan: 'lg:col-span-5',
  },
  {
    title: 'SECURITY TOOLING & SCRIPTING',
    badge: 'BUILDING',
    items: ['JavaScript', 'TypeScript', 'Python', 'Bash', 'HTML/CSS'],
    description: 'Authoring defense utilities, simulation platforms, and tooling ecosystems with a focus on clarity, reproducibility, and open distribution.',
    stat: 'OPEN SOURCE',
    colSpan: 'lg:col-span-5',
  },
  {
    title: 'AWARENESS & TRAINING',
    badge: 'EDUCATION',
    items: ['Cyber Hygiene Training', 'Phishing Simulations', 'Awareness Modules', 'Scenario-Based Learning', 'Security Demos'],
    description: 'Building interactive cybersecurity awareness and training experiences that teach threat recognition, safe practices, and incident response basics.',
    stat: 'KAVACH360',
    colSpan: 'lg:col-span-7',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const SkillsSection: React.FC = () => {
  const [, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="skills"
      className="relative w-screen bg-black text-[#E8DFD8] font-sans selection:bg-[#C41E3A] selection:text-[#F2EDE8] pt-8 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute top-1/3 left-1/4 w-[34rem] h-[34rem] bg-[#C41E3A]/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[28rem] h-[28rem] bg-[#5A1F2C]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-7"
        >
          <span
            className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#C41E3A]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            03 / TECH MATRIX
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#C41E3A]/80 via-[#5A1F2C]/40 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#C8BDB4] to-[#3A3030] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              OFFENSE &amp; DEFENSE.
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#E8DFD8] via-[#B03A48] to-[#3A0F14] drop-shadow-[0_8px_25px_rgba(176,58,72,0.35)]">
              ENGINEERED TOGETHER.
            </span>
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          {bentoCategories.map((block, idx) => (
            <motion.div
              key={block.title}
              variants={cardVariants}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className={`${block.colSpan} relative p-8 sm:p-9 rounded-sm border border-[#5A1F2C]/35 bg-[#120A10]/85 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-[#C41E3A]/80 hover:shadow-[0_16px_45px_rgba(196,30,58,0.14)] cursor-pointer group`}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C41E3A]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#C41E3A]/40 group-hover:border-[#C41E3A] transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#C41E3A]/40 group-hover:border-[#C41E3A] transition-colors duration-300" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C41E3A] group-hover:text-[#E8DFD8] transition-colors">
                  {block.badge}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 border border-[#5A1F2C]/40 text-[#AFA39D] bg-[#1C1215] group-hover:border-[#C41E3A]/50 group-hover:text-white transition-all">
                  {block.stat}
                </span>
              </div>

              <h3
                className="text-3xl sm:text-4xl font-normal tracking-wide text-white mb-3 group-hover:text-[#E8DFD8] transition-colors"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {block.title}
              </h3>

              <p
                className="text-xs sm:text-sm text-[#9C8F8A] font-light leading-relaxed mb-7 max-w-xl group-hover:text-[#C8BDB4] transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {block.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#5A1F2C]/20">
                {block.items.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 text-[10.5px] font-medium tracking-[0.16em] uppercase rounded-sm border border-[#5A1F2C]/35 bg-[#1C1215] text-[#D9D0C8] group-hover:border-[#C41E3A]/50 group-hover:bg-[#261A1E] group-hover:text-white transition-all duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default SkillsSection;