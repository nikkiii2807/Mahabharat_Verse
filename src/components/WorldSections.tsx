import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { warDays } from '../data/story';
import { meditativeSynth } from '../utils/audio';

const kingdoms = [
  {
    id: 'hastinapur',
    name: 'Hastinapur',
    x: 52, y: 28,
    color: '#DC2626',
    rulers: 'Dhritarashtra (Kauravas), later Yudhishthira',
    significance: 'Capital of the Kuru kingdom — the seat of the great war\'s political intrigue',
    events: ['Seat of Kuru dynasty', 'Dice game of Yudhishthira', 'Final capital after war'],
    symbol: '👑',
  },
  {
    id: 'indraprastha',
    name: 'Indraprastha',
    x: 47, y: 35,
    color: '#2563EB',
    rulers: 'Yudhishthira and the Pandavas',
    significance: 'The magnificent city built by the Pandavas on barren Khandavaprastha — symbol of Pandava glory',
    events: ['Built by Maya Danava', 'Palace of Illusions', 'Rajasuya Yajna of Yudhishthira'],
    symbol: '🏛️',
  },
  {
    id: 'dwarka',
    name: 'Dwarka',
    x: 18, y: 60,
    color: '#7C3AED',
    rulers: 'Krishna, King of Yadavas',
    significance: 'The divine kingdom of Krishna, built in the sea — submerged after Krishna\'s departure',
    events: ['Krishna\'s kingdom', 'Alliance with Pandavas', 'Submerged in the ocean after Yadava civil war'],
    symbol: '🌊',
  },
  {
    id: 'gandhara',
    name: 'Gandhara',
    x: 22, y: 18,
    color: '#78350F',
    rulers: 'King Subala, then Shakuni',
    significance: 'Kingdom of Gandhari and Shakuni — the origins of manipulation and the dice game',
    events: ['Homeland of Gandhari', 'Shakuni\'s vengeful scheming', 'Subala imprisoned by Hastinapur'],
    symbol: '🎲',
  },
  {
    id: 'panchala',
    name: 'Panchala',
    x: 60, y: 38,
    color: '#831843',
    rulers: 'King Drupada, then Dhrishtadyumna',
    significance: 'Kingdom of Draupadi and Dhrishtadyumna — born from fire, destined for war',
    events: ['Draupadi Swayamvara', 'Birth of Draupadi from fire', 'Alliance with Pandavas'],
    symbol: '🔥',
  },
  {
    id: 'matsya',
    name: 'Matsya',
    x: 42, y: 48,
    color: '#065F46',
    rulers: 'King Virata',
    significance: 'Where Pandavas spent their 13th year incognito — Arjuna as Brihannala',
    events: ['Pandavas\' year of disguise', 'Kichaka killed by Bhima', 'Arjuna single-handedly defeats Kauravas'],
    symbol: '🐟',
  },
  {
    id: 'magadha',
    name: 'Magadha',
    x: 72, y: 45,
    color: '#1E3A8A',
    rulers: 'Jarasandha, then Sahadeva',
    significance: 'Powerful kingdom whose tyrant Jarasandha was killed by Bhima in the most epic wrestling bout',
    events: ['Jarasandha\'s reign of terror', 'Bhima kills Jarasandha — Rajasuya possible', 'Submission to Pandavas'],
    symbol: '💪',
  },
  {
    id: 'kurukshetra',
    name: 'Kurukshetra',
    x: 50, y: 22,
    color: '#D4AF37',
    rulers: 'Sacred field — Dharmakshetra',
    significance: 'The most sacred battlefield on earth — where the Bhagavad Gita was revealed and the great war decided',
    events: ['Bhagavad Gita spoken here', '18 days of the great war', 'Billions of warriors fell'],
    symbol: '⚔️',
  },
];

const KingdomMap: React.FC = () => {
  const [selectedKingdom, setSelectedKingdom] = useState<typeof kingdoms[0] | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="map" className="relative py-24 px-4">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(78, 53, 15, 0.2) 0%, transparent 70%)',
      }} />
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.div className="font-devanagari text-yellow-400/50 text-2xl mb-4"
            initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}}>
            प्राचीन भारत
          </motion.div>
          <motion.h2 className="section-heading font-display mb-4"
            initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <span className="gold-text">Kingdom Map</span>
          </motion.h2>
          <motion.p className="font-serif text-xl text-yellow-100/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
            Explore the kingdoms of ancient Bharatavarsha — click any kingdom to discover its rulers, significance, and role in the epic.
          </motion.p>
          <div className="section-divider mt-8"><span className="section-divider-icon">🗺️</span></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map */}
          <motion.div
            className="flex-1 relative rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0a1a0a 0%, #0d1a10 30%, #0a150d 60%, #080f0a 100%)',
              border: '1px solid rgba(212,175,55,0.2)',
              minHeight: '500px',
            }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Map background texture */}
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(120,100,40,0.4), transparent 50%), radial-gradient(circle at 70% 60%, rgba(20,60,20,0.4), transparent 50%)' }} />

            {/* Ancient India SVG outline */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
              {/* Simplified India shape */}
              <path
                d="M 25 10 L 80 10 L 85 20 L 80 30 L 85 40 L 80 50 L 75 55 L 70 65 L 65 75 L 60 85 L 55 92 L 50 95 L 45 90 L 40 80 L 30 70 L 20 60 L 15 50 L 15 40 L 18 30 L 20 20 Z"
                fill="rgba(30,50,20,0.4)"
                stroke="rgba(212,175,55,0.2)"
                strokeWidth="0.5"
              />
              {/* Rivers */}
              <path d="M 25 10 Q 40 25 35 45 Q 30 55 25 60" fill="none" stroke="rgba(37,99,235,0.3)" strokeWidth="0.8" />
              <path d="M 65 10 Q 60 30 55 40 Q 50 50 45 60" fill="none" stroke="rgba(37,99,235,0.3)" strokeWidth="0.8" />
              <path d="M 45 15 Q 50 20 55 35" fill="none" stroke="rgba(37,99,235,0.25)" strokeWidth="0.5" />

              {/* Himalaya range */}
              <path d="M 20 12 L 30 8 L 40 10 L 50 7 L 60 9 L 70 8 L 78 11"
                fill="none" stroke="rgba(200,200,200,0.3)" strokeWidth="1" />
              
              {/* Kingdom connection lines */}
              <line x1="52" y1="28" x2="47" y2="35" stroke="rgba(212,175,55,0.1)" strokeWidth="0.3" strokeDasharray="1,1" />
              <line x1="52" y1="28" x2="50" y2="22" stroke="rgba(212,175,55,0.2)" strokeWidth="0.4" />
            </svg>

            {/* Kingdom markers */}
            {kingdoms.map((kingdom, i) => (
              <motion.button
                key={kingdom.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${kingdom.x}%`, top: `${kingdom.y}%` }}
                onClick={() => setSelectedKingdom(selectedKingdom?.id === kingdom.id ? null : kingdom)}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 25 }}
                whileHover={{ scale: 1.3 }}
              >
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `2px solid ${kingdom.color}`, borderRadius: '50%', width: 40, height: 40, top: -8, left: -8 }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />

                {/* Marker */}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-sm relative z-10"
                  style={{
                    background: `radial-gradient(circle, ${kingdom.color}aa, ${kingdom.color}44)`,
                    border: `2px solid ${kingdom.color}`,
                    boxShadow: `0 0 12px ${kingdom.color}66, 0 0 24px ${kingdom.color}33`,
                  }}
                >
                  {kingdom.symbol === '⚔️' ? '✦' : '•'}
                </div>

                {/* Label */}
                <div
                  className="absolute top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded font-display text-xs opacity-0 group-hover:opacity-100 transition-opacity z-20"
                  style={{ background: 'rgba(5,14,26,0.95)', border: `1px solid ${kingdom.color}44`, color: kingdom.color }}
                >
                  {kingdom.name}
                </div>
              </motion.button>
            ))}

            {/* Map legend */}
            <div className="absolute bottom-4 left-4 glass-dark rounded-xl p-3 text-xs">
              <div className="font-display text-yellow-400/50 tracking-widest mb-2">LEGEND</div>
              {[
                { color: '#DC2626', label: 'Kaurava Kingdom' },
                { color: '#2563EB', label: 'Pandava Kingdom' },
                { color: '#7C3AED', label: 'Allied Kingdom' },
                { color: '#D4AF37', label: 'Sacred Site' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="font-serif text-white/50">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Kingdom detail panel */}
          <div className="lg:w-72 xl:w-80">
            <AnimatePresence mode="wait">
              {selectedKingdom ? (
                <motion.div
                  key={selectedKingdom.id}
                  className="glass-card h-full"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  style={{
                    background: `linear-gradient(135deg, ${selectedKingdom.color}12 0%, rgba(10,22,40,0.95) 100%)`,
                    border: `1px solid ${selectedKingdom.color}33`,
                  }}
                >
                  <div className="p-6 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                        style={{ background: `${selectedKingdom.color}22`, border: `2px solid ${selectedKingdom.color}66`, boxShadow: `0 0 20px ${selectedKingdom.color}44` }}>
                        {selectedKingdom.symbol}
                      </div>
                      <div>
                        <h3 className="font-display text-xl text-white">{selectedKingdom.name}</h3>
                        <p className="font-serif text-white/40 text-sm">Ancient Kingdom</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="font-display text-xs tracking-widest text-yellow-400/50 mb-2">👑 RULERS</div>
                      <p className="font-serif text-white/70 text-sm">{selectedKingdom.rulers}</p>
                    </div>

                    <div>
                      <div className="font-display text-xs tracking-widest text-yellow-400/50 mb-2">⭐ SIGNIFICANCE</div>
                      <p className="font-serif text-white/70 text-sm leading-relaxed">{selectedKingdom.significance}</p>
                    </div>

                    <div>
                      <div className="font-display text-xs tracking-widest text-yellow-400/50 mb-3">📜 KEY EVENTS</div>
                      <ul className="space-y-2">
                        {selectedKingdom.events.map((event, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-xs mt-1" style={{ color: selectedKingdom.color }}>◆</span>
                            <span className="font-serif text-white/60 text-sm">{event}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="glass-card h-full flex flex-col items-center justify-center p-8 text-center"
                  style={{ minHeight: 300 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <span className="text-4xl mb-4">🗺️</span>
                  <p className="font-display text-sm tracking-wider text-yellow-400/40">
                    Click any kingdom marker to explore its history
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

interface Combatant {
  name: string;
  side: 'Pandava' | 'Kaurava';
  health: number;
  weapon: string;
  isSlayed: boolean;
  avatar: string;
}

const getDuelists = (dayNum: number): { left: Combatant; right: Combatant } => {
  const defaultDuelists: Record<number, { left: Combatant; right: Combatant }> = {
    1: {
      left: { name: "Arjuna", side: "Pandava", health: 100, weapon: "Gandiva Bow", isSlayed: false, avatar: "🏹" },
      right: { name: "Bhishma", side: "Kaurava", health: 100, weapon: "Taladhwaja Bow", isSlayed: false, avatar: "🛡️" }
    },
    2: {
      left: { name: "Arjuna", side: "Pandava", health: 100, weapon: "Gandiva Bow", isSlayed: false, avatar: "🏹" },
      right: { name: "Bhishma & Drona", side: "Kaurava", health: 100, weapon: "Heavenly Weapons", isSlayed: false, avatar: "🛡️" }
    },
    3: {
      left: { name: "Bhima", side: "Pandava", health: 100, weapon: "Heavy Mace (Gada)", isSlayed: false, avatar: "⚔️" },
      right: { name: "Shakuni", side: "Kaurava", health: 100, weapon: "Magic Dice & Bow", isSlayed: false, avatar: "🎲" }
    },
    8: {
      left: { name: "Iravan (Arjuna's Son)", side: "Pandava", health: 0, weapon: "Sword & Shield", isSlayed: true, avatar: "🐉" },
      right: { name: "Alambusha", side: "Kaurava", health: 100, weapon: "Demonic Illusion", isSlayed: false, avatar: "👹" }
    },
    10: {
      left: { name: "Arjuna (Shikhandi)", side: "Pandava", health: 100, weapon: "Bow of Indra", isSlayed: false, avatar: "🏹" },
      right: { name: "Bhishma", side: "Kaurava", health: 0, weapon: "None (Laid down arms)", isSlayed: true, avatar: "🎯" }
    },
    12: {
      left: { name: "Arjuna", side: "Pandava", health: 100, weapon: "Gandiva Bow", isSlayed: false, avatar: "🏹" },
      right: { name: "King Bhagadatta", side: "Kaurava", health: 0, weapon: "Divine Elephant Weapon", isSlayed: true, avatar: "🐘" }
    },
    13: {
      left: { name: "Abhimanyu", side: "Pandava", health: 0, weapon: "Chariot Wheel / Sword", isSlayed: true, avatar: "☸️" },
      right: { name: "6 Kuru Maharathis", side: "Kaurava", health: 100, weapon: "Joint Bow Attack", isSlayed: false, avatar: "🏹" }
    },
    14: {
      left: { name: "Arjuna", side: "Pandava", health: 100, weapon: "Anjalikastra Arrow", isSlayed: false, avatar: "🏹" },
      right: { name: "Jayadratha", side: "Kaurava", health: 0, weapon: "Sword & Shield", isSlayed: true, avatar: "👑" }
    },
    15: {
      left: { name: "Dhrishtadyumna", side: "Pandava", health: 100, weapon: "Beheading Sword", isSlayed: false, avatar: "⚔️" },
      right: { name: "Dronacharya", side: "Kaurava", health: 0, weapon: "None (In deep Samadhi)", isSlayed: true, avatar: "👴" }
    },
    17: {
      left: { name: "Arjuna", side: "Pandava", health: 100, weapon: "Anjalikastra Arrow", isSlayed: false, avatar: "🏹" },
      right: { name: "Karna", side: "Kaurava", health: 0, weapon: "Vijaya Bow (Wheel stuck)", isSlayed: true, avatar: "☀️" }
    },
    18: {
      left: { name: "Bhima", side: "Pandava", health: 100, weapon: "Heavy Mace (Gada)", isSlayed: false, avatar: "⚔️" },
      right: { name: "Duryodhana", side: "Kaurava", health: 0, weapon: "Mace (Vajra Body)", isSlayed: true, avatar: "👑" }
    }
  };

  return defaultDuelists[dayNum] || {
    left: { name: "Pandava Frontline", side: "Pandava", health: 100, weapon: "Bows & Spears", isSlayed: false, avatar: "⚔️" },
    right: { name: "Kaurava Frontline", side: "Kaurava", health: 100, weapon: "Bows & Spears", isSlayed: false, avatar: "⚔️" }
  };
};

const forceStrength = [
  { p: 7.0, k: 11.0 }, // Day 1
  { p: 6.8, k: 10.7 }, // Day 2
  { p: 6.5, k: 10.3 }, // Day 3
  { p: 6.3, k: 9.9 },  // Day 4
  { p: 6.0, k: 9.5 },  // Day 5
  { p: 5.8, k: 9.0 },  // Day 6
  { p: 5.5, k: 8.5 },  // Day 7
  { p: 5.3, k: 8.1 },  // Day 8
  { p: 5.0, k: 7.6 },  // Day 9
  { p: 4.8, k: 7.2 },  // Day 10
  { p: 4.5, k: 6.8 },  // Day 11
  { p: 4.2, k: 6.5 },  // Day 12
  { p: 3.9, k: 6.0 },  // Day 13
  { p: 3.4, k: 5.1 },  // Day 14
  { p: 2.9, k: 4.0 },  // Day 15
  { p: 2.1, k: 2.8 },  // Day 16
  { p: 1.4, k: 1.6 },  // Day 17
  { p: 0.8, k: 0.8 },  // Day 18
];

interface FallenHero {
  name: string;
  side: 'Pandava' | 'Kaurava' | 'Both';
  slainBy: string;
  cause: string;
  avatar: string;
}

interface CasualtyReport {
  livesLost: string;
  akshauhinisLost: string;
  fallen: FallenHero[];
}

const getCasualtyReport = (dayNum: number): CasualtyReport => {
  const reports: Record<number, CasualtyReport> = {
    1: {
      livesLost: "Est. 30,000+ Warriors",
      akshauhinisLost: "0.2 Akshauhinis",
      fallen: [
        { name: "Prince Sweta", side: "Pandava", slainBy: "Bhishma", cause: "Vaporized by celestial fire storm arrows", avatar: "🏹" },
        { name: "Prince Uttara", side: "Pandava", slainBy: "Shalya", cause: "Spear thrown through heart in chariot duel", avatar: "🛡️" }
      ]
    },
    2: {
      livesLost: "Est. 55,000+ Warriors",
      akshauhinisLost: "0.3 Akshauhinis",
      fallen: [
        { name: "Kalinga Prince", side: "Kaurava", slainBy: "Bhima", cause: "Mace crash to head during chariot dash", avatar: "⚔️" },
        { name: "Kalinga Army Chiefs", side: "Kaurava", slainBy: "Bhima", cause: "Crushed under runaway war elephant stampede", avatar: "🐘" }
      ]
    },
    3: {
      livesLost: "Est. 70,000+ Warriors",
      akshauhinisLost: "0.4 Akshauhinis",
      fallen: [
        { name: "Unnamed Kuru Princes", side: "Kaurava", slainBy: "Bhima", cause: "Mace swing on hastinapur frontline", avatar: "⚔️" }
      ]
    },
    4: {
      livesLost: "Est. 90,000+ Warriors",
      akshauhinisLost: "0.5 Akshauhinis",
      fallen: [
        { name: "8 Kaurava Princes", side: "Kaurava", slainBy: "Bhima", cause: "Beheaded in close quarter mace frenzy", avatar: "💀" }
      ]
    },
    5: {
      livesLost: "Est. 80,000+ Warriors",
      akshauhinisLost: "0.45 Akshauhinis",
      fallen: [
        { name: "Matsya Commanders", side: "Pandava", slainBy: "Bhishma", cause: "Arrow strikes piercing the armor plates", avatar: "🏹" }
      ]
    },
    6: {
      livesLost: "Est. 100,000+ Warriors",
      akshauhinisLost: "0.6 Akshauhinis",
      fallen: [
        { name: "Frontline Infantry", side: "Both", slainBy: "Drona & Dhrishtadyumna", cause: "Brutal direct shield-line clash", avatar: "⚔️" }
      ]
    },
    7: {
      livesLost: "Est. 110,000+ Warriors",
      akshauhinisLost: "0.65 Akshauhinis",
      fallen: [
        { name: "Kuru Allies", side: "Kaurava", slainBy: "Satyaki", cause: "Bow shootout in chariot battlefield center", avatar: "🏹" }
      ]
    },
    8: {
      livesLost: "Est. 130,000+ Warriors",
      akshauhinisLost: "0.75 Akshauhinis",
      fallen: [
        { name: "Iravan (Arjuna's Son)", side: "Pandava", slainBy: "Alambusha", cause: "Beheaded by demon illusion tactics", avatar: "🐉" }
      ]
    },
    9: {
      livesLost: "Est. 160,000+ Warriors",
      akshauhinisLost: "0.9 Akshauhinis",
      fallen: [
        { name: "Pandava Frontline", side: "Pandava", slainBy: "Bhishma", cause: "Decimated in supreme commander arrow assault", avatar: "🏹" }
      ]
    },
    10: {
      livesLost: "Est. 180,000+ Warriors",
      akshauhinisLost: "1.0 Akshauhinis",
      fallen: [
        { name: "Bhishma (Fallen)", side: "Kaurava", slainBy: "Arjuna & Shikhandi", cause: "Pierced by infinite arrows; rests on a bed of arrows", avatar: "🎯" }
      ]
    },
    11: {
      livesLost: "Est. 150,000+ Warriors",
      akshauhinisLost: "0.85 Akshauhinis",
      fallen: [
        { name: "Vrishasena (Karna's Son)", side: "Kaurava", slainBy: "Abhimanyu", cause: "Pierced in archer duel", avatar: "🏹" }
      ]
    },
    12: {
      livesLost: "Est. 190,000+ Warriors",
      akshauhinisLost: "1.1 Akshauhinis",
      fallen: [
        { name: "King Bhagadatta", side: "Kaurava", slainBy: "Arjuna", cause: "Vaishnavastra divine shield broken, shot in head", avatar: "🐘" }
      ]
    },
    13: {
      livesLost: "Est. 250,000+ Warriors",
      akshauhinisLost: "1.4 Akshauhinis",
      fallen: [
        { name: "Abhimanyu", side: "Pandava", slainBy: "6 Kuru Maharathis", cause: "Cornered unarmed; bludgeoned with chariot wheel", avatar: "☸️" },
        { name: "Lakshmana", side: "Kaurava", slainBy: "Abhimanyu", cause: "Arrow through chest at vyuha entry gate", avatar: "🏹" }
      ]
    },
    14: {
      livesLost: "Est. 550,000+ Warriors",
      akshauhinisLost: "3.1 Akshauhinis",
      fallen: [
        { name: "Jayadratha", side: "Kaurava", slainBy: "Arjuna", cause: "Beheaded by Anjalikastra at eclipse sunset", avatar: "👑" },
        { name: "Demon Alambusha", side: "Kaurava", slainBy: "Ghatotkacha", cause: "Illusion magic battle (torn limb from limb)", avatar: "👹" },
        { name: "Bhurishravas", side: "Kaurava", slainBy: "Satyaki", cause: "Arm severed by Arjuna, beheaded by Satyaki", avatar: "⚔️" }
      ]
    },
    15: {
      livesLost: "Est. 450,000+ Warriors",
      akshauhinisLost: "2.5 Akshauhinis",
      fallen: [
        { name: "Drona (Supreme Commander)", side: "Kaurava", slainBy: "Dhrishtadyumna", cause: "Beheaded while sitting unarmed in deep meditation", avatar: "👴" },
        { name: "King Drupad", side: "Pandava", slainBy: "Drona", cause: "Archer duel during early morning raid", avatar: "👑" },
        { name: "King Virat", side: "Pandava", slainBy: "Drona", cause: "Chariot duel (speared through chest)", avatar: "👑" }
      ]
    },
    16: {
      livesLost: "Est. 300,000+ Warriors",
      akshauhinisLost: "1.7 Akshauhinis",
      fallen: [
        { name: "9 Kaurava Brothers", side: "Kaurava", slainBy: "Bhima", cause: "Shattered by mace strikes", avatar: "💀" }
      ]
    },
    17: {
      livesLost: "Est. 480,000+ Warriors",
      akshauhinisLost: "2.7 Akshauhinis",
      fallen: [
        { name: "Karna (Supreme Commander)", side: "Kaurava", slainBy: "Arjuna", cause: "Beheaded while lifting stuck chariot wheel from mud", avatar: "☀️" },
        { name: "Dushasana", side: "Kaurava", slainBy: "Bhima", cause: "Chest ripped open, blood drunk in oath fulfillment", avatar: "🩸" }
      ]
    },
    18: {
      livesLost: "Est. 220,000+ Warriors",
      akshauhinisLost: "1.2 Akshauhinis",
      fallen: [
        { name: "Duryodhana (Kaurava King)", side: "Kaurava", slainBy: "Bhima", cause: "Thighs shattered by illegal mace strike", avatar: "👑" },
        { name: "Shakuni", side: "Kaurava", slainBy: "Sahadeva", cause: "Beheaded with golden sword in hand-to-hand fight", avatar: "🎲" },
        { name: "King Shalya", side: "Kaurava", slainBy: "Yudhishthira", cause: "Spear thrown through torso", avatar: "🛡️" }
      ]
    }
  };

  return reports[dayNum] || {
    livesLost: "Est. 40,000+ Warriors",
    akshauhinisLost: "0.25 Akshauhinis",
    fallen: []
  };
};

interface DuelInfo {
  combatants: string;
  weapons: string;
  outcome: string;
  summary: string;
}

const getDuelForDay = (dayNum: number): DuelInfo => {
  const duels: Record<number, DuelInfo> = {
    1: {
      combatants: "Bhishma vs Arjuna",
      weapons: "Celestial Bows (Gandiva vs Taladhwaja)",
      outcome: "Draw (Indecisive clash at sunset)",
      summary: "Arjuna confronts his grandfather on the opening day. Hampered by affection, Arjuna holds back his ultimate weapons. Bhishma decimates the Pandava army divisions."
    },
    2: {
      combatants: "Arjuna vs Bhishma & Drona",
      weapons: "Divine Archery",
      outcome: "Pandava Advantage",
      summary: "Arjuna fights with fierce intensity, repelling both Kuru masters simultaneously and saving Yudhishthira from capture."
    },
    3: {
      combatants: "Bhima vs Shakuni & Kaurava Princes",
      weapons: "Mace & Bow",
      outcome: "Pandava Victory",
      summary: "Bhima charges the Kaurava lines, destroying chariots and scattering Shakuni's cavalry division, slaying multiple princes."
    },
    10: {
      combatants: "Arjuna & Shikhandi vs Bhishma",
      weapons: "Arrow Storm",
      outcome: "Bhishma Falls (Bed of Arrows)",
      summary: "Since Bhishma vowed never to fight a woman, Shikhandi acts as a shield. Arjuna shoots a storm of arrows from behind Shikhandi, piercing Bhishma until he falls, supported only by the arrows protruding from his body."
    },
    13: {
      combatants: "Abhimanyu vs Kuru Maharathis",
      weapons: "Bow, Sword, Chariot Wheel",
      outcome: "Kaurava Victory (Tragic Slaying)",
      summary: "The 16-year-old Abhimanyu enters the Chakravyuha alone. After his weapons are broken, he fights with a chariot wheel. Jayadratha blocks the other Pandavas from entering. Six Kaurava Maharathis encircle and slay him against the rules of war."
    },
    14: {
      combatants: "Arjuna vs Jayadratha",
      weapons: "Anjalikastra Bow",
      outcome: "Jayadratha Beheaded",
      summary: "Arjuna vows to enter pyre if he fails to kill Jayadratha before sunset. Krishna uses his Sudarshana to temporarily block the sun, tricking Kuru forces into celebrating. When Jayadratha looks up, Krishna tells Arjuna to shoot. Jayadratha's head is severed."
    },
    15: {
      combatants: "Dhrishtadyumna vs Dronacharya",
      weapons: "Sword & Bow",
      outcome: "Drona Beheaded",
      summary: "Yudhishthira speaks the half-truth 'Ashwatthama is dead (the elephant)'. Believing his son is dead, Drona drops his bow and enters Samadhi. Dhrishtadyumna slays the unarmed guru."
    },
    16: {
      combatants: "Karna vs Bhima",
      weapons: "Archery & Mace",
      outcome: "Karna Victory (Spares Bhima)",
      summary: "Karna defeats Bhima in close combat, but remembers his promise to Kunti to only kill Arjuna. He spares Bhima, humiliating him by touching him with his bow tip."
    },
    17: {
      combatants: "Arjuna vs Karna",
      weapons: "Gandiva vs Vijaya Bow",
      outcome: "Karna Slayed",
      summary: "The ultimate archer duel. Karna's chariot wheel sinks into the mud due to a curse. While Karna dismounts to lift the wheel, Krishna urges Arjuna to shoot. Arjuna fires the Anjalikastra, ending Karna's tragic life."
    },
    18: {
      combatants: "Bhima vs Duryodhana",
      weapons: "Heavy Mace (Gada)",
      outcome: "Bhima Victory",
      summary: "The final duel. Duryodhana's body is made of steel (from Gandhari's look), except his thighs. Bhima, prompted by Krishna, strikes Duryodhana on the thighs (violating mace-combat rules) to fulfill his oath."
    }
  };

  return duels[dayNum] || {
    combatants: "General Clash of Armies",
    weapons: "Swords, Spears, Bows",
    outcome: "Heavy Attrition",
    summary: `Day ${dayNum} consists of brutal, chaotic combat across all sectors. Kaurava divisions led by Drona/Bhishma exchange heavy fire with the Pandava forces led by Bhima and Satyaki.`
  };
};

const getTacticalLog = (dayNum: number): string[] => {
  return [
    "06:30 AM: Sunrise conch shells blown. Ceasefire ends; armies arrange themselves in Vyuhas and march to the center.",
    "09:30 AM: Clash of the infantry divisions. The sound of clashing bronze and war cries sweeps the plain.",
    `01:30 PM: Noon duel between commanders. ${getDuelForDay(dayNum).combatants} meet in a central engagement.`,
    "05:30 PM: Sunset conch blown. Ceasefire begins. Armies retreat to their camps to tend to the wounded and mourn the dead."
  ];
};

// Strategic Shifting Frontlines Radar Map
const TacticalRadarMap: React.FC<{ dayNum: number }> = ({ dayNum }) => {
  let frontlineY = 100;
  if (dayNum <= 5) frontlineY = 120;
  else if (dayNum <= 9) frontlineY = 135;
  else if (dayNum === 10) frontlineY = 90;
  else if (dayNum === 13) frontlineY = 110;
  else if (dayNum === 14) frontlineY = 70;
  else if (dayNum <= 17) frontlineY = 60;
  else if (dayNum === 18) frontlineY = 40;

  return (
    <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1b0707 0%, #050a14 100%)',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
      
      <svg className="w-full h-full" viewBox="0 0 400 200">
        {/* Kaurava Zone */}
        <path d={`M0,0 L400,0 L400,${frontlineY} L0,${frontlineY} Z`} fill="rgba(239, 68, 68, 0.08)" style={{ transition: 'all 0.5s ease' }} />
        
        {/* Pandava Zone */}
        <path d={`M0,${frontlineY} L400,${frontlineY} L400,200 L0,200 Z`} fill="rgba(59, 130, 246, 0.08)" style={{ transition: 'all 0.5s ease' }} />
        
        {/* Boundary */}
        <line x1="0" y1={frontlineY} x2="400" y2={frontlineY} stroke="rgba(239, 68, 68, 0.35)" strokeWidth="2.5" strokeDasharray="3,3" className="animate-pulse" style={{ transition: 'all 0.5s ease' }} />

        {/* Chakravyuha encirclement overlay (Day 13) */}
        {dayNum === 13 && (
          <g>
            <circle cx="200" cy="115" r="28" fill="rgba(239, 68, 68, 0.18)" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,2" />
            <circle cx="200" cy="115" r="4" fill="#3b82f6" className="animate-ping" style={{ transformOrigin: '200px 115px' }} />
            <circle cx="200" cy="115" r="2" fill="#3b82f6" />
            <text x="200" y="152" fill="#fca5a5" className="font-display text-[8px] font-bold" textAnchor="middle">
              ⚠️ CHAKRAVYUHA ENCLOSURE
            </text>
          </g>
        )}

        {/* Arjuna dash (Day 14) */}
        {dayNum === 14 && (
          <g>
            <path d="M200,185 L200,65" stroke="#3b82f6" strokeWidth="3" markerEnd="url(#arrow)" className="animate-pulse" />
            <text x="210" y="115" fill="#93c5fd" className="font-display text-[8px] font-bold">
              ARJUNA'S BREAKTHROUGH
            </text>
          </g>
        )}

        {/* Final mace clash (Day 18) */}
        {dayNum === 18 && (
          <g>
            <circle cx="200" cy="90" r="14" fill="rgba(212,175,55,0.15)" stroke="#d4af37" strokeWidth="1.5" className="animate-ping" style={{ transformOrigin: '200px 90px' }} />
            <text x="200" y="94" fill="#d4af37" className="text-xs font-bold" textAnchor="middle">⚔️</text>
            <text x="200" y="118" fill="#d4af37" className="font-display text-[8px] font-bold" textAnchor="middle">
              FINAL DURYODHANA VS BHIMA
            </text>
          </g>
        )}

        {/* Labels */}
        <text x="15" y="25" fill="#ef4444" opacity="0.6" className="font-display text-[7px] tracking-widest font-bold">
          KAURAVA SECTOR (NORTH)
        </text>
        <text x="15" y="185" fill="#3b82f6" opacity="0.6" className="font-display text-[7px] tracking-widest font-bold">
          PANDAVA SECTOR (SOUTH)
        </text>

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
          </marker>
        </defs>
      </svg>
      
      {/* Frontline Text Overlay */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 bg-slate-950/70 border border-white/5 rounded px-2 py-0.5 text-[8px] font-display text-white/50 tracking-wider select-none uppercase">
        Frontline Status: {
          dayNum <= 5 ? "Kauravas Pushing South" :
          dayNum <= 9 ? "Pandavas Under Heavy Siege" :
          dayNum === 10 ? "Pandava Breakthrough" :
          dayNum === 13 ? "Chakravyuha Encirclement" :
          dayNum === 14 ? "Arjuna Spearhead Dash" :
          dayNum <= 17 ? "Pandava Offensive push" :
          "Kaurava Last Stand"
        }
      </div>
    </div>
  );
};

// Fighting game style duel lobby / VS arena
const DuelArena: React.FC<{ dayNum: number }> = ({ dayNum }) => {
  const { left, right } = getDuelists(dayNum);

  return (
    <div className="p-4 rounded-xl border border-white/5 bg-slate-950/40 relative overflow-hidden flex flex-col items-center">
      <div className="absolute inset-0 opacity-5"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 80%)'
        }} />

      <div className="font-display text-[9px] tracking-widest text-yellow-400/50 mb-3 uppercase">ACTIVE HERO DUEL CLASH</div>
      
      <div className="w-full flex items-center justify-between gap-2 relative">
        {/* Left Hero Card */}
        <div className={`flex-1 p-3 rounded-lg border flex flex-col items-center text-center transition-all ${
          left.isSlayed 
            ? 'border-red-500/20 bg-red-950/10 opacity-60' 
            : 'border-blue-500/30 bg-blue-950/10'
        }`}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-white/5 border border-white/10 mb-2 relative">
            {left.avatar}
            {left.isSlayed && (
              <span className="absolute -bottom-1 -right-1 text-xs select-none">💀</span>
            )}
          </div>
          <div className="font-display text-xs text-white font-bold leading-tight">{left.name}</div>
          <div className="text-[8px] font-display px-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 mt-1 uppercase tracking-wider">
            {left.side}
          </div>
          
          {/* Health Bar */}
          <div className="w-full mt-3 space-y-1">
            <div className="flex justify-between text-[8px] font-display text-white/50">
              <span>HEALTH</span>
              <span>{left.health}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded overflow-hidden">
              <div className={`h-full transition-all duration-500 ${left.isSlayed ? 'bg-red-600' : 'bg-green-500'}`} style={{ width: `${left.health}%` }} />
            </div>
          </div>
          
          <div className="text-[8px] font-serif text-white/40 mt-2 italic leading-tight">Weapon: {left.weapon}</div>
          {left.isSlayed && (
            <div className="text-[8px] font-display text-red-500 font-extrabold uppercase mt-1 tracking-widest animate-pulse">SLAYED</div>
          )}
        </div>

        {/* VS Divider */}
        <div className="flex flex-col items-center px-2 z-10">
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-display text-xs font-black bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 shadow-[0_0_10px_rgba(212,175,55,0.2)] animate-pulse">
            VS
          </div>
        </div>

        {/* Right Hero Card */}
        <div className={`flex-1 p-3 rounded-lg border flex flex-col items-center text-center transition-all ${
          right.isSlayed 
            ? 'border-red-500/40 bg-red-950/20' 
            : 'border-red-500/10 bg-slate-900/40 opacity-60'
        }`}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl bg-white/5 border border-white/10 mb-2 relative">
            {right.avatar}
            {right.isSlayed && (
              <span className="absolute -bottom-1 -right-1 text-xs select-none">💀</span>
            )}
          </div>
          <div className="font-display text-xs text-white font-bold leading-tight">{right.name}</div>
          <div className="text-[8px] font-display px-1 rounded bg-red-500/10 text-red-400 border border-red-500/20 mt-1 uppercase tracking-wider">
            {right.side}
          </div>
          
          {/* Health Bar */}
          <div className="w-full mt-3 space-y-1">
            <div className="flex justify-between text-[8px] font-display text-white/50">
              <span>HEALTH</span>
              <span>{right.health}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-900 rounded overflow-hidden">
              <div className={`h-full transition-all duration-500 ${right.isSlayed ? 'bg-red-600' : 'bg-green-500'}`} style={{ width: `${right.health}%` }} />
            </div>
          </div>
          
          <div className="text-[8px] font-serif text-white/40 mt-2 italic leading-tight">Weapon: {right.weapon}</div>
          {right.isSlayed && (
            <div className="text-[8px] font-display text-red-500 font-extrabold uppercase mt-1 tracking-widest animate-pulse">SLAYED</div>
          )}
        </div>
      </div>
    </div>
  );
};

// ====== WAR COMMAND CENTER ======
const WarCommandCenter: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(1);
  const day = warDays[selectedDay - 1];
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  const sectionRef = useRef<HTMLDivElement>(null);
  const isSectionInView = useInView(sectionRef, { amount: 0.15 });

  useEffect(() => {
    if (isSectionInView) {
      meditativeSynth.setTrack('war');
    } else {
      meditativeSynth.setTrack('flute');
    }
  }, [isSectionInView]);

  const handleConch = () => {
    meditativeSynth.playConch();
  };

  const handleDrum = () => {
    meditativeSynth.playDrum();
  };

  const activeDuel = getDuelForDay(selectedDay);
  const activeLog = getTacticalLog(selectedDay);
  const forces = forceStrength[selectedDay - 1] || forceStrength[0];
  const casualtyReport = getCasualtyReport(selectedDay);

  return (
    <section ref={sectionRef} id="war" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(127,29,29,0.18) 0%, transparent 70%)',
      }} />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <motion.div className="font-devanagari text-red-500/50 text-2xl mb-4"
            initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}}>
            कुरुक्षेत्र महासंग्राम
          </motion.div>
          <motion.h2 className="section-heading font-display mb-4"
            initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <span style={{ background: 'linear-gradient(135deg, #ef4444, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              War Command Center
            </span>
          </motion.h2>
          <motion.p className="font-serif text-xl text-red-200/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
            18 days. 18 akshauhinis. The greatest battle in the ancient cosmos. 
            Select a day below to explore tactical formations, force counts, and duels.
          </motion.p>
          <div className="section-divider mt-8">
            <span className="section-divider-icon">🔱</span>
          </div>
        </div>

        {/* Day selector Slider */}
        <motion.div
          className="mb-8 p-4 rounded-2xl glass-dark"
          style={{ border: '1px solid rgba(239, 68, 68, 0.2)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="font-display text-[10px] tracking-widest text-red-400/60 mb-3 text-center">CHOOSE DAY OF THE CONFLICT</div>
          <div className="flex flex-wrap justify-center gap-2">
            {warDays.map((d, i) => (
              <motion.button
                key={i}
                className={`war-day-btn ${selectedDay === d.day ? 'active' : ''}`}
                style={selectedDay === d.day ? { borderColor: '#ef4444', color: '#ef4444', background: 'rgba(239,68,68,0.15)', boxShadow: '0 0 15px rgba(239,68,68,0.2)' } : {}}
                onClick={() => setSelectedDay(d.day)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {d.day}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Day detail dashboard */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDay}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Left side: Visual Battle Map & Duel Arena */}
            <div className="lg:col-span-2 space-y-4">
              <div className="glass-card p-4 space-y-4" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                <div className="flex items-center justify-between px-2">
                  <div>
                    <span className="font-display text-[10px] tracking-wider text-red-400/60">STRATEGIC SECTOR RADAR</span>
                    <h3 className="font-display text-base text-yellow-400 mt-0.5">{day.formation}</h3>
                  </div>
                  
                  {/* Sound generator buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={handleConch}
                      className="px-3 py-1.5 rounded bg-amber-500/10 border border-amber-500/30 font-display text-[9px] tracking-wider text-amber-400 hover:bg-amber-500/20 cursor-pointer transition-all hover:scale-105"
                    >
                      📢 Blow Shankha
                    </button>
                    <button
                      onClick={handleDrum}
                      className="px-3 py-1.5 rounded bg-red-500/10 border border-red-500/30 font-display text-[9px] tracking-wider text-red-400 hover:bg-red-500/20 cursor-pointer transition-all hover:scale-105"
                    >
                      🥁 Beat Drums
                    </button>
                  </div>
                </div>

                {/* Shifting Tactical Radar and Duel Arena side-by-side or grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TacticalRadarMap dayNum={selectedDay} />
                  <DuelArena dayNum={selectedDay} />
                </div>
              </div>

              {/* Akshauhini casualties counter */}
              <div className="glass-card p-5 space-y-4">
                <div className="font-display text-[10px] tracking-widest text-red-400/60">FORCE LEVEL COUNTERS (AKSHAUHINIS)</div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pandavas */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-display tracking-widest text-blue-400">
                      <span>🔵 Pandava Army (7 Max)</span>
                      <span>{forces.p.toFixed(1)} Akshauhinis</span>
                    </div>
                    <div className="h-2 bg-blue-950/20 rounded-full overflow-hidden border border-blue-500/10">
                      <motion.div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ boxShadow: '0 0 10px rgba(59,130,246,0.5)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(forces.p / 7.0) * 100}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>

                  {/* Kauravas */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-display tracking-widest text-red-400">
                      <span>🔴 Kaurava Army (11 Max)</span>
                      <span>{forces.k.toFixed(1)} Akshauhinis</span>
                    </div>
                    <div className="h-2 bg-red-950/20 rounded-full overflow-hidden border border-red-500/10">
                      <motion.div
                        className="h-full bg-red-500 rounded-full"
                        style={{ boxShadow: '0 0 10px rgba(239,68,68,0.5)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(forces.k / 11.0) * 100}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Fallen Heroes & Casualty Report */}
              <div className="glass-card p-5 border" style={{ borderColor: 'rgba(239, 68, 68, 0.35)', background: 'linear-gradient(135deg, rgba(127,29,29,0.08) 0%, rgba(10,22,40,0.95) 100%)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="font-display text-[10px] tracking-widest text-red-500 font-bold flex items-center gap-1.5 animate-pulse">
                    <span>🩸</span> DAILY CASUALTY REPORT
                  </div>
                  <span className="font-display text-[10px] bg-red-500/10 border border-red-500/30 text-red-400 px-2 py-0.5 rounded uppercase font-semibold">
                    {casualtyReport.livesLost} Slain
                  </span>
                </div>
                
                {casualtyReport.fallen.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {casualtyReport.fallen.map((hero, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-red-950/20 border border-red-900/30 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/15 border border-red-500/35 flex items-center justify-center text-lg select-none">
                          {hero.avatar}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="font-display text-xs text-white font-bold">{hero.name}</span>
                            <span className={`text-[8px] font-display px-1 rounded ${hero.side === 'Pandava' ? 'bg-blue-500/20 text-blue-300' : hero.side === 'Kaurava' ? 'bg-red-500/20 text-red-300' : 'bg-purple-500/20 text-purple-300'}`}>
                              {hero.side}
                            </span>
                          </div>
                          <p className="font-serif text-[10px] text-white/40">Slain by: <strong className="text-white/60">{hero.slainBy}</strong></p>
                          <p className="font-serif text-[10px] text-red-200/60 italic leading-snug">{hero.cause}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center rounded bg-white/3 border border-white/5 font-serif text-white/40 text-xs">
                    No major commanders fell today. Heavy frontline skirmishes and attrition in troop ranks.
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Combat duel details & Tactical feed */}
            <div className="space-y-4">
              {/* Day Header Info */}
              <div className="glass-card p-5" style={{ background: `linear-gradient(135deg, ${day.color}15, rgba(10,22,40,0.9))`, border: `1px solid ${day.color}33` }}>
                <div className="flex justify-between items-start mb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem' }}>
                  <div>
                    <div className="font-display text-[9px] tracking-widest text-white/40 uppercase">WAR DAY</div>
                    <h3 className="font-display text-2xl" style={{ color: day.color }}>DAY {day.day}</h3>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-[9px] tracking-widest text-white/40 uppercase">SUPREME COMMANDER</div>
                    <div className="font-display text-base text-white">{day.commander}</div>
                  </div>
                </div>
                <div className="font-display text-[10px] tracking-widest text-yellow-400/60 mb-2">KEY TURNING POINT</div>
                <p className="font-serif text-white/80 text-sm leading-relaxed">{day.keyEvent}</p>
              </div>

              {/* Heroic Duel Card */}
              <div className="glass-card p-5 border" style={{ borderColor: 'rgba(212,175,55,0.2)', background: 'linear-gradient(135deg, rgba(212,175,55,0.02) 0%, rgba(10,22,40,0.95) 100%)' }}>
                <div className="font-display text-[10px] tracking-widest text-yellow-400/60 mb-3 flex items-center gap-1.5">
                  <span>⚔️</span> HEROIC DUEL OF THE DAY
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-display text-sm text-white">{activeDuel.combatants}</h4>
                    <p className="font-serif text-white/40 text-[10px] tracking-wider italic mt-0.5">Weapons: {activeDuel.weapons}</p>
                  </div>
                  
                  <p className="font-serif text-white/70 text-xs leading-relaxed">{activeDuel.summary}</p>
                  
                  <div className="p-2.5 rounded bg-yellow-400/3 border border-yellow-400/10 text-xs text-yellow-300/80 font-serif">
                    <strong>Outcome:</strong> {activeDuel.outcome}
                  </div>
                </div>
              </div>

              {/* Hour-by-Hour Battle Logs */}
              <div className="glass-card p-5">
                <div className="font-display text-[10px] tracking-widest text-red-400/60 mb-4">TACTICAL FIELD CHRONICLES</div>
                
                <div className="space-y-4 relative pl-3 border-l border-white/10">
                  {activeLog.map((logItem, index) => {
                    const time = logItem.split(': ')[0];
                    const desc = logItem.split(': ').slice(1).join(': ');
                    return (
                      <div key={index} className="relative space-y-1">
                        {/* Timeline dot */}
                        <div className="absolute -left-[17px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-slate-950" />
                        <span className="font-display text-[9px] tracking-wider text-red-400/70">{time}</span>
                        <p className="font-serif text-white/60 text-xs leading-relaxed">{desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export { KingdomMap, WarCommandCenter };
