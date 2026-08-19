// src/components/ContactSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-black text-[#E8DFD8] font-sans selection:bg-[#C41E3A] selection:text-[#F2EDE8] pt-16 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-4 mb-5"
              >
                <span
                  className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#C41E3A]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  05 / CONTACT
                </span>
                <div className="w-16 h-[1px] bg-gradient-to-r from-[#C41E3A]/80 via-[#5A1F2C]/40 to-transparent" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.85] select-none"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#C8BDB4] to-[#3A3030] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                    INITIALIZE
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#E8DFD8] via-[#B03A48] to-[#3A0F14] drop-shadow-[0_8px_25px_rgba(176,58,72,0.35)]">
                    TRANSMISSION.
                  </span>
                </h2>
              </motion.div>

              <p
                className="text-xs sm:text-[13px] font-light text-[#9C8F8A] leading-relaxed max-w-md"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Have an ambitious system to architect, an engineering opportunity, or a collaborative inquiry? Send a direct dispatch below.
              </p>

              {/* Direct Contact Info */}
              <div className="mt-10 space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#5A1F2C] min-w-[80px]">
                    EMAIL
                  </span>
                  <a
                    href="mailto:your-email@example.com"
                    className="text-[11px] font-light text-[#AFA39D] hover:text-[#C41E3A] transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    your-email@example.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#5A1F2C] min-w-[80px]">
                    GITHUB
                  </span>
                  <a
                    href="https://github.com/shubham-vishwakarma5606"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-light text-[#AFA39D] hover:text-[#C41E3A] transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    github.com/shubham-vishwakarma5606 ↗
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#5A1F2C] min-w-[80px]">
                    LINKEDIN
                  </span>
                  <a
                    href="https://www.linkedin.com/in/your-username/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-light text-[#AFA39D] hover:text-[#C41E3A] transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    linkedin.com/in/your-username ↗
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#5A1F2C] min-w-[80px]">
                    LEETCODE
                  </span>
                  <a
                    href="https://leetcode.com/u/your-username/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-light text-[#AFA39D] hover:text-[#C41E3A] transition-colors"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    leetcode.com/u/your-username ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Monolith Terminal Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative w-full rounded-sm border border-[#5A1F2C]/40 bg-[#090609] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Top Gold Horizon Edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C41E3A]/70 to-transparent" />
            
            {/* Precision Corner Crosshairs */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#C41E3A]/60" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#C41E3A]/60" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#C41E3A]/60" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#C41E3A]/60" />

            {sent ? (
              <div className="py-16 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#C41E3A] text-[#C41E3A] text-sm">
                  ✓
                </div>
                <h3 className="text-3xl text-white font-normal uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  PACKET DELIVERED
                </h3>
                <p className="text-xs text-[#9C8F8A] font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Transmission registered successfully.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#5A1F2C] mb-2">
                      // SENDER
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter name"
                      className="w-full bg-[#140A0E] border border-[#5A1F2C]/30 focus:border-[#C41E3A] text-xs text-white placeholder-[#5A1F2C]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>

                  <div>
                    <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#5A1F2C] mb-2">
                      // CHANNEL
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter email"
                      className="w-full bg-[#140A0E] border border-[#5A1F2C]/30 focus:border-[#C41E3A] text-xs text-white placeholder-[#5A1F2C]/50 px-4 py-3 outline-none rounded-sm transition-colors"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <span className="block text-[9.5px] font-mono tracking-[0.2em] uppercase text-[#5A1F2C] mb-2">
                    // PAYLOAD
                  </span>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter transmission payload..."
                    className="w-full bg-[#140A0E] border border-[#5A1F2C]/30 focus:border-[#C41E3A] text-xs text-white placeholder-[#5A1F2C]/50 p-4 outline-none rounded-sm transition-colors resize-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 border border-[#5A1F2C]/50 bg-[#1A1013] hover:border-[#C41E3A] hover:bg-[#211519] text-[#E8DFD8] hover:text-[#E8DFD8] text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  EXECUTE DISPATCH ↗
                </button>

              </form>
            )}
          </motion.div>

        </div>

        {/* System Footer Line */}
        <div className="pt-16 mt-16 border-t border-[#5A1F2C]/15 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-[10px] font-mono tracking-widest text-[#5A1F2C] uppercase">
              PORTFOLIO // EDITION 2026
            </span>
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/shubham-vishwakarma5606"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono tracking-wider text-[#5A1F2C] hover:text-[#C41E3A] transition-colors uppercase"
              >
                GitHub ↗
              </a>
              <span className="text-[#5A1F2C]/40">|</span>
              <a
                href="https://www.linkedin.com/in/your-username/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-mono tracking-wider text-[#5A1F2C] hover:text-[#C41E3A] transition-colors uppercase"
              >
                LinkedIn ↗
              </a>
              <span className="text-[#5A1F2C]/40">|</span>
              <a
                href="mailto:your-email@example.com"
                className="text-[10px] font-mono tracking-wider text-[#5A1F2C] hover:text-[#C41E3A] transition-colors uppercase"
              >
                Email ↗
              </a>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#5A1F2C]">
            © {new Date().getFullYear()} • ENGINEERED WITH PRECISION
          </span>
        </div>

      </div>
    </footer>
  );
};

export default ContactSection;