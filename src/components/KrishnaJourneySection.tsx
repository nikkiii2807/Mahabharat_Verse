import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LifePhase {
  id: string;
  title: string;
  sanskrit: string;
  location: string;
  icon: string;
  duration: string;
  bgGlow: string;
  description: string;
  keyDeeds: string[];
  quote: string;
  characterSymbol: string;
}

const krishnaPhases: LifePhase[] = [
  {
    id: 'birth-gokul',
    title: 'Divine Birth & Escape to Gokul',
    sanskrit: 'जन्म और गोकुल लीला',
    location: 'Mathura & Gokul',
    icon: '🥛',
    duration: 'Infancy',
    bgGlow: 'rgba(56,189,248,0.15)', // Blue water glow
    description: 'Born in the dark cells of Mathura to Devaki and Vasudeva under a torrential storm, Krishna was miraculously carried across the raging Yamuna river by his father to the safety of Gokul. Raised by foster parents Yashoda and Nanda, his infancy was filled with magical playfulness, butter-stealing, and the slaying of Kamsa\'s demonic assassins like Putana and Shakatasura.',
    keyDeeds: [
      'Midnight birth in Mathura prison cell during Rohini Nakshatra',
      'Vasudeva carrying baby Krishna across the divided Yamuna river',
      'Butter-stealing (Makhan Chor) leelas with village children',
      'Slaying of Putana (the poison-nurse demoness)',
      'Subduing the whirlwind demon Trinavarta',
    ],
    quote: 'The Supreme Divine takes human form not just to show power, but to show how to love without boundaries.',
    characterSymbol: '👶'
  },
  {
    id: 'vrindavan',
    title: 'The Vrindavan Leela',
    sanskrit: 'वृंदावन रासलीला',
    location: 'Vrindavan & Govardhan',
    icon: '🪈',
    duration: 'Youth & Adulthood',
    bgGlow: 'rgba(34,197,94,0.15)', // Forest green glow
    description: 'In the lush groves of Vrindavan, Krishna enchanted the cowherds (Gopas) and milkmaids (Gopis) with the divine melody of his flute. This era represents the pinnacle of pure devotion, highlighted by the divine dance (Maharaas) and miracles like subduing the multi-headed serpent Kaliya in the Yamuna and lifting the massive Mount Govardhan on his little finger to shield the villagers from Indra\'s wrath.',
    keyDeeds: [
      'Playing the divine flute (Murali) that enchanted nature and Gopikas',
      'Kaliya Dahan — subduing and dancing on the heads of serpent Kaliya',
      'Lifting Mount Govardhan on a finger for 7 days to protect villagers from storms',
      'Maharaas — the dance of cosmic love and union in Vrindavan',
      'Vanquishing demons like Bakasura (crane), Aghasura (python), and Aristasura (bull)',
    ],
    quote: 'When you offer your love in absolute surrender, I manifest in every form you seek.',
    characterSymbol: '🪈'
  },
  {
    id: 'mathura',
    title: 'Mathura Return & Slaying of Kamsa',
    sanskrit: 'मथुरा गमन',
    location: 'Mathura',
    icon: '👑',
    duration: 'Adolescence',
    bgGlow: 'rgba(234,179,8,0.15)', // Royal gold glow
    description: 'Departing the idyllic woods of Vrindavan, Krishna returned to Mathura to fulfill his primary avataric purpose. He entered Kamsa\'s fortress, broke the bows of power, defeated the royal wrestlers, and slew the tyrant king Kamsa, freeing his biological parents Devaki and Vasudeva from their chains and restoring the righteous Ugrasena to the throne.',
    keyDeeds: [
      'Departing Vrindavan (breaking the hearts of Gopikas and Yashoda)',
      'Breaking Kamsa\'s bow and subduing the mad elephant Kuvalayapida',
      'Slaying the demonic wrestlers Chanura and Mushtika',
      'Dragging Kamsa off the throne and ending his tyranny',
      'Freeing Devaki and Vasudeva from prison cells',
    ],
    quote: 'Tyranny may build massive walls, but righteousness breaks them with bare hands.',
    characterSymbol: '⚔️'
  },
  {
    id: 'dwarka',
    title: 'The Golden Empire of Dwarka',
    sanskrit: 'द्वारकाधीश साम्राज्य',
    location: 'Dwarka (Gujarat Coast)',
    icon: '🌊',
    duration: 'King & Householder',
    bgGlow: 'rgba(14,165,233,0.15)', // Sea blue glow
    description: 'To protect the Yadavas from repeated attacks by Jarasandha, Krishna constructed the legendary golden city of Dwarka off the western coast of India, reclaiming land from the ocean. As Dwarkadhish (Lord of Dwarka), he ruled with supreme justice, married Rukmini (an incarnation of Lakshmi) and other queens, and established Dwarka as the wealthiest and most glorious maritime kingdom on earth.',
    keyDeeds: [
      'Reclaiming land from the sea god to build the golden fortress city',
      'Abducting and marrying Princess Rukmini by her secret letter of love',
      'Defeating Jarasandha and slaying Kalayavana',
      'Killing Narakasura and freeing 16,000 captive princesses',
      'Receiving Sudarshana Chakra from Agni Dev during Khandava forest burning',
    ],
    quote: 'Real wealth is not gold; it is the peace and security of the citizens who trust in dharma.',
    characterSymbol: '🏰'
  },
  {
    id: 'kurukshetra',
    title: 'The Envoy & Charioteer of Gita',
    sanskrit: 'कुरुक्षेत्र उपदेश',
    location: 'Kurukshetra',
    icon: '🏹',
    duration: 'The Great War',
    bgGlow: 'rgba(239,68,68,0.15)', // War red/amber glow
    description: 'During the Kuru crisis, Krishna served as the ultimate peace ambassador, offering five villages to avoid bloodshed. When Duryodhana tried to arrest him, Krishna revealed his divine cosmic form (Vishwaroop). During the war, he served as Arjuna\'s charioteer, delivering the Bhagavad Gita on Day 1 to guide Arjuna out of grief and doubt. His strategy and guidance steered the Pandavas to victory.',
    keyDeeds: [
      'Serving as the peace envoy (Shanti Doot) to Hastinapur court',
      'Revealing his Vishwaroop cosmic form to Duryodhana\'s court',
      'Driving the chariot (Parthasarthy) of Arjuna in battle',
      'Delivering the Bhagavad Gita on the field of Kurukshetra',
      'Shielding Arjuna from the Vaishnavastra, Nagastra, and Brahmastra',
    ],
    quote: 'Perform your duty with absolute detachment. Focus on your actions, not the fruits thereof.',
    characterSymbol: '🕉️'
  },
  {
    id: 'ascent',
    title: 'The Divine Ascent (Prabhasa)',
    sanskrit: 'महाप्रयाण धाम',
    location: 'Prabhasa (Saurashtra)',
    icon: '🌅',
    duration: 'Final Days',
    bgGlow: 'rgba(139,92,246,0.15)', // Cosmic violet glow
    description: 'Following the fulfillment of his earthly mission and the tragic civil war of the Yadava clan (foretold by Gandhari\'s curse), Krishna retired to the forests of Prabhasa. Resting under a Peepal tree, his foot was mistaken for a deer by the hunter Jara, who shot a poisoned arrow. Absorbing the curse and accepting the hunter\'s grief, Krishna cast off his human form, returning in full glory to his supreme divine abode.',
    keyDeeds: [
      'Accepting Gandhari\'s curse with a calm smile',
      'Witnessing the self-destruction of Yadava clan due to arrogance and curses',
      'Submerging the golden city of Dwarka back into the ocean',
      'Resting in meditation under the holy Peepal tree at Prabhasa',
      'Departing the mortal world, leaving behind the teachings of Gita',
    ],
    quote: 'The body is but a garment cast off by the soul. I am never born, nor do I ever die.',
    characterSymbol: '🌅'
  }
];

const KrishnaJourneySection: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhase = krishnaPhases[activePhaseIndex];

  return (
    <section id="krishna-journey" className="relative py-28 px-4 overflow-hidden" style={{ background: '#050c18' }}>
      
      {/* Background auras */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] rounded-full blur-[160px] pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activePhase.bgGlow }} />
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-yellow-500/[0.02] blur-[80px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <div className="font-devanagari text-cyan-400/50 text-2xl mb-4">
            श्री कृष्ण चरित्र
          </div>
          <h2 className="section-heading font-display mb-4">
            <span className="gold-text">Life of Lord Krishna</span>
          </h2>
          <p className="font-serif text-lg text-yellow-100/60 max-w-2xl mx-auto leading-relaxed">
            Explore the divine journey of the eighth avatar of Vishnu — from his miraculous childhood in Vrindavan 
            to the golden empire of Dwarka, his teachings on the battlefield, and his final departure.
          </p>
          <div className="section-divider mt-8">
            <span className="section-divider-icon">🪈</span>
          </div>
        </div>

        {/* Invocation Shloka Banner */}
        <div className="max-w-2xl mx-auto mb-16 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-950/20 text-center relative overflow-hidden backdrop-blur-sm shadow-xl">
          {/* Peacock feather bg decoration */}
          <div className="absolute right-2 top-2 text-4xl opacity-10 select-none pointer-events-none">🪈</div>
          <div className="font-devanagari text-yellow-300 text-lg md:text-xl mb-3 leading-relaxed tracking-wide">
            कृष्णाय वासुदेवाय हरये परमात्मने |<br />
            प्रणतक्लेशनाशाय गोविन्दाय नमो नमः ||
          </div>
          <div className="font-serif text-[11px] text-cyan-400/70 italic mb-3">
            kṛṣṇāya vāsudevāya haraye paramātmane | praṇata-kleśa-nāśāya govindāya namo namaḥ
          </div>
          <p className="font-serif text-xs text-yellow-100/80 leading-relaxed max-w-lg mx-auto">
            "Obeisance to Lord Krishna, the son of Vasudeva, the dispeller of all suffering, 
            who takes away the afflictions of those who surrender to Him. Salutations to Govinda."
          </p>
        </div>

        {/* Journey Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Vertical Timeline Navigation (Takes 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-2 p-3 rounded-2xl glass-dark border border-yellow-400/10">
            <div className="px-4 py-2 border-b border-yellow-400/10 mb-2">
              <span className="font-display text-[10px] tracking-[0.2em] text-yellow-400/40 uppercase block">
                CHRONOLOGICAL LIFE PHASES
              </span>
            </div>
            
            {krishnaPhases.map((phase, idx) => {
              const isActive = activePhaseIndex === idx;
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-300 group border cursor-pointer ${
                    isActive
                      ? 'border-yellow-400/55 bg-gradient-to-r from-yellow-500/10 to-transparent text-yellow-400'
                      : 'border-transparent text-yellow-100/40 hover:text-yellow-100/70 hover:bg-white/[0.02]'
                  }`}
                >
                  {/* Phase Number/Symbol */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 font-display ${
                      isActive
                        ? 'bg-yellow-400/15 border-yellow-400/50 border text-yellow-400 shadow-lg'
                        : 'bg-white/5 border border-white/10 text-white/50 group-hover:border-white/20'
                    }`}
                  >
                    {phase.icon}
                  </div>

                  {/* Text details */}
                  <div className="flex-1 min-w-0">
                    <span className="font-display text-[9px] tracking-wider text-yellow-400/40 block leading-none mb-1">
                      PHASE {idx + 1} • {phase.duration.toUpperCase()}
                    </span>
                    <h4 className="font-serif text-sm font-semibold truncate">
                      {phase.location.split(' & ')[0]}
                    </h4>
                    <span className="font-display text-[8px] opacity-40 block truncate">
                      {phase.title}
                    </span>
                  </div>
                  
                  {/* Arrow Indicator */}
                  <span className={`text-xs transition-transform duration-300 ${
                    isActive ? 'translate-x-1 text-yellow-400' : 'opacity-0 -translate-x-1 group-hover:opacity-40'
                  }`}>
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Content Card (Takes 8 cols) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-2xl border bg-gradient-to-b from-cyan-950/10 to-black/35 relative overflow-hidden shadow-2xl border-yellow-400/20"
                style={{ minHeight: '420px' }}
              >
                {/* Devanagari background watermark */}
                <div className="absolute -bottom-8 -right-8 text-9xl opacity-[0.02] select-none font-serif font-black tracking-widest text-cyan-400 pointer-events-none">
                  {activePhase.location.split(' ')[0]}
                </div>

                {/* Top Badge & location info */}
                <div className="flex items-center justify-between border-b border-yellow-400/10 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{activePhase.icon}</span>
                    <div>
                      <span className="font-display text-[9px] tracking-widest text-yellow-400/50 uppercase block">
                        GEOGRAPHIC ABODE
                      </span>
                      <h3 className="font-serif text-base font-bold text-white leading-none mt-1">
                        {activePhase.location}
                      </h3>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded bg-yellow-400/5 border border-yellow-400/20 font-display text-[10px] tracking-widest text-yellow-400">
                    {activePhase.duration.toUpperCase()}
                  </span>
                </div>

                {/* Sanskrit name & Title */}
                <div className="mb-5">
                  <h4 className="font-devanagari text-2xl text-cyan-400/80 mb-0.5">
                    {activePhase.sanskrit}
                  </h4>
                  <h3 className="font-display text-xl text-white font-bold tracking-wide">
                    {activePhase.title}
                  </h3>
                </div>

                {/* Description Paragraph */}
                <p className="font-serif text-yellow-100/70 text-sm leading-relaxed mb-6">
                  {activePhase.description}
                </p>

                {/* Key Divine Deeds checklist */}
                <div className="mb-6">
                  <span className="font-display text-[9px] text-yellow-400/40 tracking-wider block mb-2">
                    🛡️ KEY DEEDS & MIRACLES
                  </span>
                  <div className="space-y-2">
                    {activePhase.keyDeeds.map((deed, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-3">
                        <span className="text-yellow-400 text-xs mt-1">✦</span>
                        <p className="font-serif text-xs text-yellow-100/85">
                          {deed}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Divine Quote Box */}
                <div className="p-4 rounded-xl border relative bg-cyan-500/[0.01] border-cyan-500/15">
                  <div className="text-4xl font-serif text-cyan-400/10 absolute left-3 top-2 pointer-events-none">"</div>
                  <p className="font-serif text-xs text-cyan-100/80 italic leading-relaxed pl-5 relative z-10">
                    "{activePhase.quote}"
                  </p>
                  <span className="font-display text-[8px] tracking-widest text-cyan-400/50 text-right block mt-2 relative z-10">
                    — SHRI KRISHNA LILA MESSAGE
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

    </section>
  );
};

export default KrishnaJourneySection;
