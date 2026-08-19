// src/components/ExperienceSection.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface RouteStop {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
}

// Cybersecurity journey — derived from GitHub activity (shubham-vishwakarma5606).
// Add education/certifications from your resume PDF once shared.
const journey: RouteStop[] = [
  {
    id: '01',
    year: 'AUG 2026',
    title: 'SERIES-HUB LAUNCH',
    organization: 'CONSUMER STREAMING BUILD',
    description: 'Shipped a streaming-style web platform for browsing and watching series — full catalog UI, content discovery, and smooth playback experience.',
  },
  {
    id: '02',
    year: 'JUL 2026',
    title: 'CITADEL-NEXSUS',
    organization: 'WAF ENGINEERING',
    description: 'Designed and built a Web Application Firewall with custom rule pipelines for inspecting, classifying, and blocking malicious HTTP traffic.',
  },
  {
    id: '03',
    year: 'JUL 2026',
    title: 'KAVACH360',
    organization: 'CYBERSECURITY AWARENESS',
    description: 'Built an interactive cybersecurity awareness, training, and simulation platform with scenario-based learning modules for threat recognition and phishing defense.',
  },
  {
    id: '04',
    year: 'JUL 2025',
    title: 'CYBERS3AN ECOSYSTEM',
    organization: 'DEFENSE TOOLING + REMOTE ACCESS',
    description: 'Launched the CyberS3an ecosystem — Deftools (defensive utilities), Nightgrid (security toolkit), and CyberS3anRemoteAccess (controlled remote-access framework).',
  },
  {
    id: '05',
    year: 'OCT 2023',
    title: 'JOURNEY STARTED',
    organization: 'OPEN-SOURCE SECURITY BUILDER',
    description: 'Began publishing security-focused repositories as open source on GitHub — building in public across offensive research, defensive engineering, and awareness.',
  },
];

export const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 70%', 'end 90%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#C41E3A] selection:text-[#F2EDE8] pt-4 pb-24 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#C41E3A]/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
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
            04 / JOURNEY
          </span>
          <div className="w-20 h-[1px] bg-gradient-to-r from-[#C41E3A]/80 via-[#5A1F2C]/40 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#C8BDB4] to-[#3A3030] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              CYBERS3AN
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#E8DFD8] via-[#B03A48] to-[#3A0F14] drop-shadow-[0_8px_25px_rgba(176,58,72,0.35)]">
              TIMELINE.
            </span>
          </h2>
        </motion.div>

        <div className="relative w-full">
          <div className="absolute left-[19px] md:left-[140px] top-4 bottom-8 w-[1px] bg-[#5A1F2C]/20" />

          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[19px] md:left-[140px] top-4 w-[2px] bg-gradient-to-b from-[#C41E3A] via-[#B03A48] to-[#5A1F2C]/10 shadow-[0_0_10px_#C41E3A] origin-top"
          />

          <div className="space-y-12">
            {journey.map((stop, idx) => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className="relative flex flex-col md:flex-row items-start group"
              >
                <div className="hidden md:block w-[140px] shrink-0 pr-8 pt-0.5 text-right">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#5A1F2C] group-hover:text-[#C41E3A] transition-colors">
                    {stop.year}
                  </span>
                </div>

                <div className="absolute left-[19px] md:left-[140px] top-1.5 -translate-x-1/2 flex items-center justify-center">
                  <div className="absolute w-6 h-6 rounded-full border border-[#C41E3A]/0 group-hover:border-[#C41E3A]/40 group-hover:scale-150 transition-all duration-700 ease-out" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#140A0E] border border-[#5A1F2C] group-hover:bg-[#C41E3A] group-hover:border-[#C41E3A] group-hover:shadow-[0_0_12px_#C41E3A] transition-colors duration-300" />
                </div>

                <div className="ml-14 md:ml-12 pl-2">
                  <div className="md:hidden mb-1.5">
                    <span className="text-[10px] font-mono tracking-[0.2em] text-[#C41E3A]">
                      {stop.year}
                    </span>
                  </div>

                  <h3
                    className="text-3xl sm:text-4xl tracking-wide text-white group-hover:text-[#E8DFD8] transition-colors mb-1 leading-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {stop.title}
                  </h3>

                  <span
                    className="block text-[10px] font-medium tracking-[0.2em] uppercase text-[#5A1F2C] mb-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {stop.organization}
                  </span>

                  <p
                    className="text-xs sm:text-[13px] font-light text-[#9C8F8A] leading-[1.7] max-w-lg group-hover:text-[#C8BDB4] transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {stop.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
