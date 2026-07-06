import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ====== TIMELINE ======
const timelineEvents = [
  { year: 'Origin', era: 'Mythic', event: 'Birth of Bharata Dynasty', char: 'Bharata', category: 'birth', color: '#D4AF37' },
  { year: 'Dawn', era: 'Early', event: 'Shantanu weds Ganga', char: 'Shantanu', category: 'marriage', color: '#1e3a8a' },
  { year: 'Dawn', era: 'Early', event: 'Birth of Devavrata (Bhishma)', char: 'Bhishma', category: 'birth', color: '#6366f1' },
  { year: 'Dawn', era: 'Early', event: 'Bhishma\'s Terrible Oath', char: 'Bhishma', category: 'event', color: '#7c3aed' },
  { year: 'Dawn', era: 'Early', event: 'Birth of Dhritarashtra & Pandu', char: 'Both', category: 'birth', color: '#065f46' },
  { year: 'Early', era: 'Middle', event: 'Birth of Kauravas (100 sons)', char: 'Gandhari', category: 'birth', color: '#dc2626' },
  { year: 'Early', era: 'Middle', event: 'Birth of Pandavas', char: 'Kunti', category: 'birth', color: '#2563eb' },
  { year: 'Early', era: 'Middle', event: 'Drona becomes royal guru', char: 'Drona', category: 'event', color: '#7c2d12' },
  { year: 'Early', era: 'Middle', event: 'Ekalavya\'s thumb — Drona\'s demand', char: 'Drona', category: 'event', color: '#78350f' },
  { year: 'Middle', era: 'Crisis', event: 'Lakshagriha — House of Wax', char: 'Duryodhana', category: 'battle', color: '#991b1b' },
  { year: 'Middle', era: 'Crisis', event: 'Draupadi Swayamvara', char: 'Arjuna', category: 'marriage', color: '#831843' },
  { year: 'Middle', era: 'Crisis', event: 'Indraprastha established', char: 'Yudhishthira', category: 'event', color: '#92400e' },
  { year: 'Middle', era: 'Crisis', event: 'Rajasuya Yajna', char: 'Yudhishthira', category: 'event', color: '#D4AF37' },
  { year: 'Middle', era: 'Fall', event: 'The Dice Game — Pandavas lose everything', char: 'Shakuni', category: 'event', color: '#7f1d1d' },
  { year: 'Exile', era: 'Fall', event: 'Draupadi\'s Disrobing — Bhima\'s Oath', char: 'Bhima', category: 'event', color: '#7f1d1d' },
  { year: 'Exile', era: 'Vanavas', event: '12 Years of Forest Exile begins', char: 'Pandavas', category: 'exile', color: '#14532d' },
  { year: 'Exile', era: 'Vanavas', event: 'Arjuna receives divine weapons', char: 'Arjuna', category: 'event', color: '#2563eb' },
  { year: 'Exile', era: 'Vanavas', event: 'Yaksha Prashna — Dharma tests Yudhishthira', char: 'Yudhishthira', category: 'event', color: '#10b981' },
  { year: 'Disguise', era: 'Ajnatavasa', event: '13th Year — Pandavas in Virata', char: 'Pandavas', category: 'exile', color: '#1e3a8a' },
  { year: 'Pre-War', era: 'Negotiations', event: 'Krishna\'s peace mission fails', char: 'Krishna', category: 'event', color: '#7c3aed' },
  { year: 'Pre-War', era: 'Negotiations', event: 'Kunti reveals Karna\'s birth', char: 'Kunti', category: 'event', color: '#a78bfa' },
  { year: 'War', era: 'Kurukshetra', event: 'Bhagavad Gita — Day 1', char: 'Krishna', category: 'battle', color: '#D4AF37' },
  { year: 'War', era: 'Kurukshetra', event: 'Bhishma falls — Day 10', char: 'Bhishma', category: 'death', color: '#6366f1' },
  { year: 'War', era: 'Kurukshetra', event: 'Abhimanyu killed — Day 13', char: 'Abhimanyu', category: 'death', color: '#f97316' },
  { year: 'War', era: 'Kurukshetra', event: 'Drona killed — Day 15', char: 'Drona', category: 'death', color: '#7c2d12' },
  { year: 'War', era: 'Kurukshetra', event: 'Karna killed by Arjuna — Day 17', char: 'Karna', category: 'death', color: '#f59e0b' },
  { year: 'War', era: 'Kurukshetra', event: 'Duryodhana falls — Day 18', char: 'Duryodhana', category: 'death', color: '#dc2626' },
  { year: 'Post-War', era: 'Aftermath', event: 'Pandavas crowned in Hastinapur', char: 'Yudhishthira', category: 'event', color: '#D4AF37' },
  { year: 'Post-War', era: 'Aftermath', event: 'Bhishma\'s final teachings on bed of arrows', char: 'Bhishma', category: 'event', color: '#6366f1' },
  { year: 'Twilight', era: 'End', event: 'Krishna\'s departure — Yadava civil war', char: 'Krishna', category: 'death', color: '#7c3aed' },
  { year: 'Twilight', era: 'End', event: 'Pandavas\' Great Journey — Mahaprasthanika', char: 'Pandavas', category: 'death', color: '#1e3a8a' },
];

const categoryColors: Record<string, string> = {
  birth: '#10b981',
  marriage: '#ec4899',
  event: '#D4AF37',
  battle: '#ef4444',
  death: '#6b7280',
  exile: '#14532d',
};

const TimelineSection: React.FC = () => {
  const [selected, setSelected] = useState<typeof timelineEvents[0] | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  const filtered = filter === 'all' ? timelineEvents : timelineEvents.filter(e => e.category === filter);

  return (
    <section id="timeline" className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.1) 0%, transparent 70%)',
      }} />
      <div className="relative max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-12">
          <motion.div className="font-devanagari text-yellow-400/50 text-2xl mb-4"
            initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}}>
            कालरेखा
          </motion.div>
          <motion.h2 className="section-heading font-display mb-4"
            initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <span className="gold-text">Timeline Explorer</span>
          </motion.h2>
          <motion.p className="font-serif text-xl text-yellow-100/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
            Navigate the complete arc of the Mahabharata — from the divine origins to the twilight of the Pandavas.
          </motion.p>
          <div className="section-divider mt-8"><span className="section-divider-icon">⏳</span></div>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['all', 'birth', 'marriage', 'event', 'battle', 'death', 'exile'].map(cat => (
            <button key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 rounded-full font-display text-xs tracking-wider transition-all capitalize border ${
                filter === cat
                  ? 'text-white border-transparent'
                  : 'border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
              }`}
              style={filter === cat ? { background: categoryColors[cat] || '#D4AF37', borderColor: 'transparent' } : {}}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Timeline horizontal scroll */}
        <div ref={scrollRef} className="timeline-container pb-8">
          <div className="timeline-track px-12 py-8" style={{ gap: '0' }}>
            {filtered.map((event, i) => (
              <motion.div
                key={i}
                className="timeline-event"
                style={{ paddingTop: i % 2 === 0 ? '0' : '140px', paddingBottom: i % 2 === 0 ? '140px' : '0' }}
                initial={{ opacity: 0, y: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                onClick={() => setSelected(event === selected ? null : event)}
              >
                {/* Above dot content (even) */}
                {i % 2 === 0 && (
                  <motion.div
                    className="mb-4 cursor-pointer"
                    whileHover={{ y: -4 }}
                  >
                    <div className="px-3 py-2 rounded-lg glass-dark text-center max-w-[140px]"
                      style={{ border: `1px solid ${event.color}33` }}>
                      <div className="font-display text-xs tracking-widest mb-1" style={{ color: event.color }}>
                        {event.category.toUpperCase()}
                      </div>
                      <div className="font-serif text-white/70 text-xs leading-tight">{event.event}</div>
                      <div className="font-display text-xs mt-1 text-white/30">{event.char}</div>
                    </div>
                  </motion.div>
                )}

                {/* Dot */}
                <div className="timeline-dot" style={{
                  background: event.color,
                  boxShadow: `0 0 12px ${event.color}80`,
                  borderColor: '#0A1628',
                }} />

                {/* Below dot content (odd) */}
                {i % 2 !== 0 && (
                  <motion.div className="mt-4 cursor-pointer" whileHover={{ y: 4 }}>
                    <div className="px-3 py-2 rounded-lg glass-dark text-center max-w-[140px]"
                      style={{ border: `1px solid ${event.color}33` }}>
                      <div className="font-display text-xs tracking-widest mb-1" style={{ color: event.color }}>
                        {event.category.toUpperCase()}
                      </div>
                      <div className="font-serif text-white/70 text-xs leading-tight">{event.event}</div>
                      <div className="font-display text-xs mt-1 text-white/30">{event.char}</div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selected event detail */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="mt-6 glass-card p-6 rounded-2xl"
              style={{ border: `1px solid ${selected.color}33`, background: `linear-gradient(135deg, ${selected.color}0a, rgba(10,22,40,0.9))` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-display text-xs tracking-widest mb-1" style={{ color: selected.color }}>
                    {selected.era.toUpperCase()} • {selected.category.toUpperCase()}
                  </div>
                  <h3 className="font-display text-xl text-white">{selected.event}</h3>
                  <p className="font-serif italic text-white/50">{selected.char}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white/70 text-2xl">×</button>
              </div>
              <p className="font-serif text-white/70 leading-relaxed">
                This moment in the Mahabharata marks a pivotal turning point. Every event in this great epic is connected — 
                what happened here shaped the destiny of all characters and ultimately led to the war of Kurukshetra.
                Explore other sections to understand the full context of this event.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// ====== AI GURU ======
interface Message {
  role: 'user' | 'ai';
  content: string;
}

const aiResponses: Record<string, string> = {
  default: "I am here to guide you through the vast wisdom of the Mahabharata. Ask me about characters, events, philosophical dilemmas, or the teachings of the Bhagavad Gita. What would you like to explore?",
  karna: "Karna's support for Duryodhana springs from the deepest human loyalty — gratitude. When the entire world denied him respect due to his birth, Duryodhana alone gave him a kingdom and treated him as equal. To Karna, abandoning Duryodhana would be the ultimate betrayal. He knew the Pandavas were his brothers. He knew his side might lose. Yet he stayed. This is what makes Karna the most beloved tragic figure — not weakness, but an impossible choice between loyalty and righteousness, made with full awareness of the cost.",
  dharma: "The Mahabharata's central question is: what is dharma? The epic's answer is profoundly complex — there is no single dharma. Bhishma's dharma demanded loyalty to the throne even while fighting for the unjust side. Arjuna's dharma was to fight despite personal anguish. Yudhishthira's dharma was truth, yet he gambled his wife. Each character's dharma conflicts with another's. The Gita teaches: your swadharma (own duty) is unique to your nature and situation. Better to perform your own duty imperfectly than another's perfectly.",
  war: "The Kurukshetra War was not merely a political conflict — it was a cosmic event, the culmination of centuries of karma. The 18-day war resulted in the near-total destruction of the warrior class of the entire subcontinent. Hundreds of thousands of warriors fell. The Pandavas won but ruled over a devastated world. Victory itself became indistinguishable from defeat. This is the Mahabharata's deepest teaching: the consequences of adharma ultimately destroy everyone, including the victors.",
  gita: "The Bhagavad Gita begins with Arjuna's breakdown — his refusal to fight. In that moment of crisis, Krishna reveals the eternal philosophy. The Gita's core teachings: (1) The soul is eternal and cannot be destroyed. (2) Do your duty without attachment to results. (3) Offer all actions to the Divine. (4) Devotion is the highest path. (5) Complete surrender to God frees you from all karma. The Gita is not just for warriors — it is the ultimate guide for anyone facing an impossible choice.",
  bhishma: "Bhishma's vow — the Bhishma Pratigya — was the single most consequential act in the entire Mahabharata. By swearing celibacy and surrendering the throne, he secured his father's happiness but created the political vacuum that allowed Dhritarashtra's rule, Duryodhana's ambition, and ultimately the great war. His loyalty to the throne over dharma — fighting for Kauravas while knowing they were wrong — is the great paradox of his character. On his death-bed of arrows, he taught Yudhishthira 150 chapters of wisdom, having spent his entire life unable to act on that wisdom.",
};

const AIGuruSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: aiResponses.default }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  const suggestedQuestions = [
    { q: 'Why did Karna support Duryodhana?', key: 'karna' },
    { q: 'What is the meaning of dharma?', key: 'dharma' },
    { q: 'What caused the Kurukshetra War?', key: 'war' },
    { q: 'Summarize the Bhagavad Gita', key: 'gita' },
    { q: 'Explain Bhishma\'s vow', key: 'bhishma' },
  ];

  const getAIResponse = (query: string): string => {
    const lower = query.toLowerCase();
    if (lower.includes('karna') || lower.includes('duryodhana')) return aiResponses.karna;
    if (lower.includes('dharma') || lower.includes('moral') || lower.includes('right')) return aiResponses.dharma;
    if (lower.includes('war') || lower.includes('kurukshetra') || lower.includes('battle')) return aiResponses.war;
    if (lower.includes('gita') || lower.includes('bhagavad') || lower.includes('krishna')) return aiResponses.gita;
    if (lower.includes('bhishma') || lower.includes('vow') || lower.includes('oath')) return aiResponses.bhishma;
    return "That is a profound question about the Mahabharata. The epic teaches us that every action has consequences — and that the greatest battles are fought within the self. The Bhagavad Gita's answer is always to act according to your highest dharma, with detachment from results, and surrender to the Divine. What specific aspect would you like to explore further?";
  };

  const sendMessage = async (query: string) => {
    if (!query.trim()) return;
    const userMsg: Message = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    const response = getAIResponse(query);
    setMessages(prev => [...prev, { role: 'ai', content: response }]);
    setIsTyping(false);
  };

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <section id="ai-guru" className="relative py-24 px-4">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(45,27,105,0.3) 0%, transparent 70%)',
      }} />
      <div className="relative max-w-4xl mx-auto">
        <div ref={headerRef} className="text-center mb-12">
          <motion.div className="font-devanagari text-purple-400/60 text-3xl mb-4"
            initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}}>
            🪈
          </motion.div>
          <motion.h2 className="section-heading font-display mb-4"
            initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AI Mahabharata Guru
            </span>
          </motion.h2>
          <motion.p className="font-serif text-xl text-purple-200/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
            Ask Krishna anything. Explore the deepest questions of dharma, war, loyalty, and wisdom from the world's greatest epic.
          </motion.p>
          <div className="section-divider mt-8"><span className="section-divider-icon">🕉️</span></div>
        </div>

        {/* Chat interface */}
        <motion.div
          className="rounded-2xl overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(45,27,105,0.2), rgba(10,22,40,0.95))', border: '1px solid rgba(139,92,246,0.3)', boxShadow: '0 0 60px rgba(139,92,246,0.1)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Chat header */}
          <div className="px-6 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4), rgba(45,27,105,0.2))', border: '2px solid rgba(139,92,246,0.5)', boxShadow: '0 0 20px rgba(139,92,246,0.4)' }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🪈
            </motion.div>
            <div>
              <div className="font-display text-white text-sm tracking-wider">Krishna — AI Mahabharata Guru</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-serif text-green-400/60 text-xs">Awaiting your questions</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages" style={{ minHeight: '350px', maxHeight: '400px', overflowY: 'auto' }}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                className={`chat-bubble-${msg.role}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {msg.role === 'ai' && (
                  <div className="font-display text-xs tracking-widest text-purple-400/60 mb-2">🪈 KRISHNA</div>
                )}
                <p className="font-serif leading-relaxed">{msg.content}</p>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div className="chat-bubble-ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="font-display text-xs tracking-widest text-purple-400/60 mb-2">🪈 KRISHNA</div>
                <div className="flex gap-1.5 items-center py-1">
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} className="w-2 h-2 rounded-full bg-purple-400"
                      animate={{ y: [-2, 2, -2] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggested questions */}
          <div className="px-4 py-3 flex flex-wrap gap-2" style={{ borderTop: '1px solid rgba(139,92,246,0.1)' }}>
            {suggestedQuestions.map(sq => (
              <button key={sq.key}
                onClick={() => sendMessage(sq.q)}
                className="px-3 py-1.5 rounded-full font-serif text-xs text-purple-300/70 hover:text-purple-200 transition-all"
                style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
                {sq.q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-4 pb-4">
            <div className="flex gap-2 rounded-xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(139,92,246,0.2)' }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                placeholder="Ask anything about the Mahabharata..."
                className="flex-1 bg-transparent px-4 py-3 font-serif text-white/80 text-sm outline-none placeholder-white/20"
              />
              <motion.button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping}
                className="px-5 font-display text-xs tracking-wider disabled:opacity-40 transition-all"
                style={{ background: 'rgba(139,92,246,0.3)', color: '#c4b5fd', borderLeft: '1px solid rgba(139,92,246,0.2)' }}
                whileHover={{ background: 'rgba(139,92,246,0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                ASK
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ====== ALTERNATE HISTORY ======
const alternateScenarios = [
  {
    id: 'karna-pandava',
    title: 'What if Karna Joined the Pandavas?',
    icon: '☀️',
    color: '#f59e0b',
    consequences: [
      'The Pandavas would have had both Arjuna AND Karna — the two greatest archers alive',
      'Duryodhana would have almost certainly lost the war quickly, possibly without 18 days of bloodshed',
      'Karna and Arjuna might have reconciled their rivalry as brothers',
      'The Kaurava army would have been demoralized — Karna was their greatest warrior',
      'But Karna would have betrayed his one true friend — Duryodhana. His soul would have been diminished.',
    ],
    analysis: 'While Karna joining the Pandavas would have been the strategically correct and arguably dharmic choice (they were his brothers), it would have violated the deepest moral code he lived by: loyalty. Karna often said he would rather die as Duryodhana\'s friend than live as anyone\'s king. This was not weakness — it was a profound choice of personal dharma over political dharma. The Mahabharata suggests some tragedies cannot and should not be avoided.',
  },
  {
    id: 'duryodhana-peace',
    title: 'What if Duryodhana Accepted Peace?',
    icon: '🕊️',
    color: '#10b981',
    consequences: [
      'The Pandavas would have received their five villages — a humiliating but peaceful settlement',
      'Tens of millions of warriors would have lived',
      'The knowledge and wisdom of an entire civilization would not have been lost',
      'Bhishma, Drona, and Karna — the greatest warriors ever — would have lived out their natural lives',
      'But Duryodhana\'s pride — his very identity — would have been shattered',
    ],
    analysis: 'Krishna\'s peace mission failed not because Duryodhana was evil, but because he genuinely believed the Pandavas had no right to Hastinapur\'s throne. His refusal was rooted in a different reading of dharma — that the throne belonged to him by birth. The war was perhaps inevitable not because of wickedness but because of irreconcilable worldviews. Even Bhishma knew this: "There can be no peace where there is pride without wisdom."',
  },
  {
    id: 'abhimanyu-survived',
    title: 'What if Abhimanyu Survived?',
    icon: '⚡',
    color: '#f97316',
    consequences: [
      'Abhimanyu would have been the undisputed greatest warrior of the next generation',
      'He would have inherited the Pandava legacy — a warrior who combined Arjuna\'s skill with Krishna\'s strategic mind',
      'His son Parikshit would have had a living father — changing the Pandava legacy entirely',
      'Arjuna\'s grief and rage (which led to the killing of Jayadratha on Day 14) would not have consumed him',
      'The emotional devastation of Day 13 — which broke Draupadi\'s spirit permanently — would not have occurred',
    ],
    analysis: 'Abhimanyu\'s death is described as karma — even from a previous life. Krishna, who could have saved him, chose not to intervene. Some scholars argue this was Krishna\'s most controversial act. But from the divine perspective: Abhimanyu\'s brief, blazing life — his impossible courage against impossible odds — was complete in itself. He needed no longer story. His death galvanized the Pandavas into ending the war decisively.',
  },
  {
    id: 'draupadi-no-insult',
    title: 'What if Draupadi Was Never Insulted?',
    icon: '🔥',
    color: '#ec4899',
    consequences: [
      'Bhima\'s oath to drink Dushasana\'s blood and break Duryodhana\'s thigh would never have been made',
      'The 13 years of exile might have been used for peaceful negotiation',
      'Draupadi\'s fire of revenge — which kept Pandava resolve alive through exile — would not have burned',
      'Perhaps the Pandavas, without that burning wound, might have accepted lesser terms',
      'But Duryodhana\'s arrogance would have found another outlet — another provocation was inevitable',
    ],
    analysis: 'The disrobing of Draupadi in the Kuru court is not just a personal tragedy — it is the moment dharma itself publicly collapsed. Bhishma, Drona, Vidura, and a hundred wise men sat silent while a righteous woman was violated. That silence — of good men choosing safety over justice — is what made war not just inevitable but necessary. Without that wound, the Pandavas might have accepted a diminished peace, and dharma would have died not in war but in compromise.',
  },
];

const AlternateHistorySection: React.FC = () => {
  const [selected, setSelected] = useState<typeof alternateScenarios[0] | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="alternate" className="relative py-24 px-4">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(120,53,15,0.15) 0%, transparent 70%)',
      }} />
      <div className="relative max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-12">
          <motion.div className="font-devanagari text-yellow-400/50 text-2xl mb-4"
            initial={{ opacity: 0 }} animate={headerInView ? { opacity: 1 } : {}}>
            यदि... अगर...
          </motion.div>
          <motion.h2 className="section-heading font-display mb-4"
            initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <span className="gold-text">What If Engine</span>
          </motion.h2>
          <motion.p className="font-serif text-xl text-yellow-100/60 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}>
            Explore alternate timelines — what if one decision had been different? The Mahabharata shows us that destiny is shaped by choices.
          </motion.p>
          <div className="section-divider mt-8"><span className="section-divider-icon">⚡</span></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {alternateScenarios.map((scenario, i) => (
            <motion.div
              key={scenario.id}
              className="glass-card cursor-pointer p-6"
              style={{
                background: selected?.id === scenario.id
                  ? `linear-gradient(135deg, ${scenario.color}15, rgba(10,22,40,0.95))`
                  : 'rgba(255,255,255,0.02)',
                border: `1px solid ${selected?.id === scenario.id ? scenario.color + '44' : 'rgba(212,175,55,0.1)'}`,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelected(selected?.id === scenario.id ? null : scenario)}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{ background: `${scenario.color}22`, border: `2px solid ${scenario.color}44` }}>
                  {scenario.icon}
                </div>
                <h3 className="font-display text-base text-white leading-tight">{scenario.title}</h3>
              </div>

              <AnimatePresence>
                {selected?.id === scenario.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-4 pt-2">
                      <div>
                        <div className="font-display text-xs tracking-widest mb-2" style={{ color: scenario.color }}>CHAIN OF CONSEQUENCES</div>
                        <ul className="space-y-2">
                          {scenario.consequences.map((c, j) => (
                            <li key={j} className="flex items-start gap-2">
                              <span style={{ color: scenario.color }} className="mt-1 text-xs flex-shrink-0">◆</span>
                              <span className="font-serif text-white/70 text-sm">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 rounded-xl" style={{ background: 'rgba(0,0,0,0.3)', border: `1px solid ${scenario.color}22` }}>
                        <div className="font-display text-xs tracking-widest mb-2 text-yellow-400/60">ANALYSIS</div>
                        <p className="font-serif text-white/70 text-sm leading-relaxed">{scenario.analysis}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {selected?.id !== scenario.id && (
                <p className="font-serif text-white/40 text-sm">
                  Click to explore this alternate timeline →
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { TimelineSection, AIGuruSection, AlternateHistorySection };
