import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { characters } from '../data/characters';
import type { Character } from '../data/characters';

export const sideColors = {
  pandava: { bg: 'rgba(37,99,235,0.15)', border: 'rgba(37,99,235,0.4)', text: '#93c5fd', label: 'PANDAVA' },
  kaurava: { bg: 'rgba(220,38,38,0.15)', border: 'rgba(220,38,38,0.4)', text: '#fca5a5', label: 'KAURAVA' },
  neutral: { bg: 'rgba(212,175,55,0.15)', border: 'rgba(212,175,55,0.4)', text: '#D4AF37', label: 'NEUTRAL' },
  divine: { bg: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.4)', text: '#c4b5fd', label: 'DIVINE' },
};

// Relationship graph
export const RelationshipGraph: React.FC<{ centerId: string }> = ({ centerId }) => {
  const center = characters.find(c => c.id === centerId);
  if (!center) return null;

  const related = [
    ...center.allies.slice(0, 4).map(a => ({ name: a, type: 'ally' })),
    ...center.enemies.slice(0, 3).map(e => ({ name: e, type: 'enemy' })),
  ];

  return (
    <div className="relative h-48 flex items-center justify-center">
      {/* Center character */}
      <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl z-10 relative"
        style={{ background: `radial-gradient(circle, ${center.color}66, ${center.color}22)`, border: `2px solid ${center.color}`, boxShadow: `0 0 20px ${center.color}66` }}>
        {center.symbol}
      </div>

      {/* Related characters orbiting */}
      {related.map((rel, i) => {
        const angle = (i / related.length) * 2 * Math.PI - Math.PI / 2;
        const r = 90;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        const color = rel.type === 'ally' ? '#3b82f6' : '#ef4444';

        return (
          <div key={i} className="absolute" style={{ transform: `translate(${x}px, ${y}px)` }}>
            <div className="absolute inset-0 w-0.5 h-0.5 bg-transparent" style={{
              boxShadow: `${-x}px ${-y}px 0 0 ${color}40`,
            }} />
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-display text-center"
              style={{ background: `${color}22`, border: `1px solid ${color}66`, color, fontSize: '0.6rem', padding: '2px' }}>
              {rel.name.split(' ')[0].slice(0, 4)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const CharacterModal: React.FC<{ character: Character; onClose: () => void }> = ({ character, onClose }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'relations' | 'events' | 'quotes'>('bio');
  const side = sideColors[character.side] || sideColors.neutral;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/92" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${character.color}18 0%, #0A1628 50%, #050e1a 100%)`,
          border: `1px solid ${character.color}44`,
          boxShadow: `0 0 80px ${character.color}22`,
        }}
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 px-8 py-6"
          style={{ background: `${character.color}12`, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${character.color}22` }}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <motion.div
                className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                style={{
                  background: `radial-gradient(circle, ${character.color}44, ${character.color}11)`,
                  border: `2px solid ${character.color}66`,
                  boxShadow: `0 0 30px ${character.color}44`,
                }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                {character.symbol}
              </motion.div>
              <div>
                <div className="font-devanagari text-yellow-400/80 text-2xl mb-0.5">{character.sanskritName}</div>
                <h2 className="font-display text-2xl text-white mb-1">{character.name}</h2>
                <p className="font-serif italic" style={{ color: side.text }}>{character.title}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded font-display text-xs tracking-widest"
                    style={{ background: side.bg, border: `1px solid ${side.border}`, color: side.text }}>
                    {side.label}
                  </span>
                  <span className="font-serif text-white/40 text-sm">{character.role}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 transition-all text-xl">
              ×
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-5 flex-wrap">
            {[
              { key: 'bio', label: '📖 Biography' },
              { key: 'relations', label: '🔗 Relationships' },
              { key: 'events', label: '⚔️ Key Events' },
              { key: 'quotes', label: '💬 Quotes' },
            ].map(tab => (
              <button key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-4 py-1.5 rounded-full font-display text-xs tracking-wider transition-all ${
                  activeTab === tab.key
                    ? 'text-white border'
                    : 'text-white/40 hover:text-white/70 border border-transparent'
                }`}
                style={activeTab === tab.key ? { background: `${character.color}30`, borderColor: `${character.color}60` } : {}}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-8 py-6">
          <AnimatePresence mode="wait">
            {activeTab === 'bio' && (
              <motion.div key="bio" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                <p className="font-serif text-white/75 text-lg leading-relaxed">{character.bio}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="font-display text-xs tracking-widest text-white/30 mb-2">BORN</div>
                    <p className="font-serif text-white/70">{character.born}</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="font-display text-xs tracking-widest text-white/30 mb-2">FATE</div>
                    <p className="font-serif text-white/70">{character.died}</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl" style={{ background: `${character.color}0a`, border: `1px solid ${character.color}22` }}>
                  <div className="font-display text-xs tracking-widest mb-3" style={{ color: `${character.color}` }}>⚖️ MORAL DILEMMA</div>
                  <p className="font-serif text-white/75 leading-relaxed italic">{character.moralDilemma}</p>
                </div>

                <div>
                  <div className="font-display text-xs tracking-widest text-white/30 mb-3">🗡️ WEAPONS & POWERS</div>
                  <div className="flex flex-wrap gap-2">
                    {character.weapons.map((w, i) => (
                      <span key={i} className="px-3 py-1 rounded-full font-sans text-xs text-white/70"
                        style={{ background: `${character.color}18`, border: `1px solid ${character.color}30` }}>
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'relations' && (
              <motion.div key="relations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
                <RelationshipGraph centerId={character.id} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl" style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)' }}>
                    <div className="font-display text-xs tracking-widest text-blue-400 mb-3">👥 ALLIES</div>
                    <div className="space-y-1.5">
                      {character.allies.length > 0 ? (
                        character.allies.map((a, i) => (
                          <div key={i} className="font-serif text-white/70 flex items-center gap-2">
                            <span className="text-blue-400/50">•</span> {a}
                          </div>
                        ))
                      ) : (
                        <span className="font-serif text-white/40 italic">None recorded</span>
                      )}
                    </div>
                  </div>
                  <div className="p-5 rounded-xl" style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}>
                    <div className="font-display text-xs tracking-widest text-red-400 mb-3">⚔️ RIVALS</div>
                    <div className="space-y-1.5">
                      {character.enemies.length > 0 ? (
                        character.enemies.map((e, i) => (
                          <div key={i} className="font-serif text-white/70 flex items-center gap-2">
                            <span className="text-red-400/50">•</span> {e}
                          </div>
                        ))
                      ) : (
                        <span className="font-serif text-white/40 italic">None recorded</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-5 rounded-xl" style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}>
                  <div className="font-display text-xs tracking-widest text-yellow-400/60 mb-3">👨‍👩‍👧 FAMILY</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {character.family.map((f, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="font-display text-xs text-yellow-400/50 min-w-24">{f.relation}</span>
                        <span className="font-serif text-white/70 text-sm">{f.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'events' && (
              <motion.div key="events" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="space-y-3">
                  {character.keyEvents.length > 0 ? (
                    character.keyEvents.map((event, i) => (
                      <motion.div key={i} className="flex items-start gap-4 p-4 rounded-xl"
                        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-sm flex-shrink-0"
                          style={{ background: `${character.color}22`, color: character.color, border: `1px solid ${character.color}44` }}>
                          {i + 1}
                        </div>
                        <p className="font-serif text-white/75 leading-relaxed">{event}</p>
                      </motion.div>
                    ))
                  ) : (
                    <span className="font-serif text-white/40 italic">No events recorded</span>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'quotes' && (
              <motion.div key="quotes" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="space-y-4">
                  {character.quotes.length > 0 ? (
                    character.quotes.map((quote, i) => (
                      <motion.div key={i} className="p-6 rounded-xl relative"
                        style={{ background: `${character.color}0a`, border: `1px solid ${character.color}20` }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <div className="text-5xl font-serif absolute top-3 left-4 opacity-10" style={{ color: character.color }}>"</div>
                        <p className="font-serif text-white/80 text-lg leading-relaxed italic pl-4">"{quote}"</p>
                        <div className="mt-3 pt-3 flex items-center gap-2" style={{ borderTop: `1px solid ${character.color}15` }}>
                          <span className="text-lg">{character.symbol}</span>
                          <span className="font-display text-xs tracking-widest" style={{ color: character.color }}>
                            — {character.name}
                          </span>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <span className="font-serif text-white/40 italic">No quotes recorded</span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};
