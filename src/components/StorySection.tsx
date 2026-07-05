import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { storyArcs } from '../data/story';
import type { StoryArc } from '../data/story';

const StoryArcCard: React.FC<{ arc: StoryArc; index: number; onClick: () => void }> = ({ arc, index, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="chapter-card glass-card cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1 }}
      onClick={onClick}
      style={{
        background: `linear-gradient(135deg, ${arc.gradientFrom}88 0%, ${arc.gradientTo}44 100%)`,
        border: '1px solid rgba(212,175,55,0.15)',
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
              style={{ background: `${arc.color}44`, border: `1px solid ${arc.color}66` }}
            >
              {arc.icon}
            </div>
            <span className="font-display text-xs tracking-widest text-yellow-400/50">
              CHAPTER {arc.number}
            </span>
          </div>
          <span className="font-serif text-xs text-yellow-400/40 italic">{arc.era}</span>
        </div>

        <h3 className="font-display text-lg gold-text mb-2 leading-tight">{arc.title}</h3>
        <p className="font-serif text-yellow-400/60 text-sm mb-4 italic">{arc.subtitle}</p>

        <p className="font-serif text-yellow-100/70 text-sm leading-relaxed line-clamp-3 mb-4">
          {arc.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
          <div className="flex gap-1 flex-wrap">
            {arc.characters.slice(0, 3).map(c => (
              <span key={c} className="px-2 py-0.5 rounded-full font-sans text-xs capitalize"
                style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37' }}>
                {c}
              </span>
            ))}
          </div>
          <span className="text-yellow-400/50 text-xl">→</span>
        </div>
      </div>
    </motion.div>
  );
};

const ArcDetailModal: React.FC<{ arc: StoryArc; onClose: () => void }> = ({ arc, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${arc.gradientFrom} 0%, #0A1628 60%)`,
          border: '1px solid rgba(212,175,55,0.3)',
          boxShadow: '0 0 80px rgba(0,0,0,0.8)',
        }}
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-8 py-6 flex items-center justify-between"
          style={{ background: `${arc.gradientFrom}ee`, backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
          <div className="flex items-center gap-4">
            <span className="text-3xl">{arc.icon}</span>
            <div>
              <div className="font-display text-xs tracking-widest text-yellow-400/50 mb-1">CHAPTER {arc.number} • {arc.era}</div>
              <h2 className="font-display text-xl gold-text">{arc.title}</h2>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-yellow-400/60 hover:text-yellow-400 hover:bg-yellow-400/10 transition-all text-xl">
            ×
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 space-y-6">
          <p className="font-serif text-yellow-100/80 text-lg leading-relaxed italic">"{arc.subtitle}"</p>
          <p className="font-serif text-yellow-100/70 leading-relaxed">{arc.description}</p>

          <div>
            <div className="section-divider mb-4">
              <span className="section-divider-icon">⚔️</span>
              <span className="font-display text-xs tracking-widest text-yellow-400/60">KEY EVENTS</span>
            </div>
            <ul className="space-y-3">
              {arc.keyEvents.map((event, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span className="text-yellow-400 mt-1 text-sm flex-shrink-0">◆</span>
                  <span className="font-serif text-yellow-100/70">{event}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <div className="section-divider mb-4">
              <span className="section-divider-icon">👥</span>
              <span className="font-display text-xs tracking-widest text-yellow-400/60">KEY CHARACTERS</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {arc.characters.map(c => (
                <span key={c} className="px-3 py-1 rounded-full font-display text-xs capitalize gold-text"
                  style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl" style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.1)' }}>
            <span className="font-display text-xs tracking-widest text-yellow-400/50">MOOD</span>
            <p className="font-serif text-yellow-100/70 mt-1 italic">{arc.mood}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const StorySection: React.FC = () => {
  const [selectedArc, setSelectedArc] = useState<StoryArc | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="story" className="relative py-24 px-4">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 30% 50%, rgba(120,53,15,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(30,58,95,0.15) 0%, transparent 50%)',
      }} />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            className="font-devanagari text-yellow-400/50 text-2xl mb-4"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            महाभारत कथा
          </motion.div>
          <motion.h2
            className="section-heading font-display mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="gold-text">The Great Story</span>
          </motion.h2>
          <motion.p
            className="font-serif text-xl text-yellow-100/60 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Journey through 13 epic chapters spanning centuries, from the founding of the Kuru dynasty 
            to the aftermath of the greatest war the world has ever known.
          </motion.p>

          <motion.div
            className="section-divider mt-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={headerInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <span className="section-divider-icon">⚔️</span>
          </motion.div>
        </div>

        {/* Story Arc Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storyArcs.map((arc, i) => (
            <StoryArcCard
              key={arc.id}
              arc={arc}
              index={i}
              onClick={() => setSelectedArc(arc)}
            />
          ))}
        </div>
      </div>

      {/* Arc Detail Modal */}
      <AnimatePresence>
        {selectedArc && (
          <ArcDetailModal arc={selectedArc} onClose={() => setSelectedArc(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default StorySection;
