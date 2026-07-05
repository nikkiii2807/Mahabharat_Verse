import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gitaChapters } from '../data/gita';
import type { GitaChapter } from '../data/gita';
import { gitaVerses } from '../data/gitaVerses';
import type { GitaVerse } from '../data/gitaVerses';

// Cosmic star field for Gita section
const CosmicStars: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 3000;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const GitaChapterCard: React.FC<{
  chapter: GitaChapter;
  index: number;
  onClick: () => void;
}> = ({ chapter, index, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="verse-card cursor-pointer group relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08 }}
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
    >
      {/* Chapter number bg */}
      <div className="absolute top-0 right-0 font-display text-8xl font-black text-white/3 leading-none select-none">
        {chapter.number}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-display text-xs tracking-[0.2em] text-purple-400/60">
            CHAPTER {chapter.number}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-sans"
            style={{ background: `${chapter.color}33`, color: chapter.color, border: `1px solid ${chapter.color}44` }}>
            {chapter.verses} verses
          </span>
        </div>

        <div className="font-devanagari text-yellow-400 text-xl mb-1 leading-relaxed"
          style={{ textShadow: '0 0 20px rgba(212,175,55,0.4)' }}>
          {chapter.sanskritName}
        </div>
        <div className="font-serif text-purple-300/80 text-sm italic mb-3">{chapter.transliteration}</div>
        <h3 className="font-display text-sm text-white/90 mb-3 tracking-wide">{chapter.englishName}</h3>

        <p className="font-serif text-white/50 text-sm leading-relaxed line-clamp-3 mb-4">{chapter.summary}</p>

        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(139,92,246,0.15)' }}>
          <span className="font-display text-xs tracking-widest text-purple-400/50 uppercase">{chapter.theme}</span>
          <span className="text-purple-400/60 group-hover:text-purple-400 transition-colors">→</span>
        </div>
      </div>
    </motion.div>
  );
};

// Chapter Detail Modal with upgraded verse selector and word-by-word translation
const ChapterDetailModal: React.FC<{ chapter: GitaChapter; onClose: () => void }> = ({ chapter, onClose }) => {
  const [tab, setTab] = useState<'verse' | 'teachings' | 'life'>('verse');
  
  // Get all detailed verses for this chapter
  const chapterVerses = gitaVerses.filter(v => v.chapter === chapter.number);
  const [selectedVerseIndex, setSelectedVerseIndex] = useState(0);
  const activeVerse: GitaVerse | undefined = chapterVerses[selectedVerseIndex];

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

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
          background: 'linear-gradient(135deg, #1a0a2e 0%, #0A1628 60%)',
          border: '1px solid rgba(139,92,246,0.4)',
          boxShadow: '0 0 80px rgba(139,92,246,0.2)',
        }}
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Starfield bg */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.4 + 0.1,
              }} />
          ))}
        </div>

        {/* Header */}
        <div className="sticky top-0 z-10 px-8 py-6"
          style={{ background: 'rgba(26,10,46,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="font-display text-xs tracking-[0.2em] text-purple-400/50 mb-2">
                CHAPTER {chapter.number} • {chapter.verses} VERSES
              </div>
              <div className="font-devanagari text-yellow-400 text-2xl mb-1">{chapter.sanskritName}</div>
              <div className="font-serif text-purple-300 italic">{chapter.englishName}</div>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-purple-400/60 hover:text-purple-400 hover:bg-purple-400/10 transition-all text-xl mt-1">
              ×
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-5">
            {[
              { key: 'verse', label: 'Verse Explorer' },
              { key: 'teachings', label: 'Teachings' },
              { key: 'life', label: 'Life Application' },
            ].map(tab_item => (
              <button
                key={tab_item.key}
                onClick={() => setTab(tab_item.key as typeof tab)}
                className={`px-4 py-1.5 rounded-full font-display text-xs tracking-wider transition-all ${
                  tab === tab_item.key
                    ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50'
                    : 'text-purple-400/40 hover:text-purple-400/70 border border-transparent'
                }`}
              >
                {tab_item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="relative px-8 py-6">
          <AnimatePresence mode="wait">
            {tab === 'verse' && (
              <motion.div key="verse"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <p className="font-serif text-white/60 leading-relaxed text-sm">{chapter.summary}</p>

                {/* Verse Pagination */}
                {chapterVerses.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 py-2" style={{ borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                    <span className="font-display text-xs text-yellow-400/50 tracking-wider mr-2">SELECT KEY VERSE:</span>
                    {chapterVerses.map((v, i) => (
                      <button
                        key={v.verse}
                        onClick={() => setSelectedVerseIndex(i)}
                        className={`px-3 py-1 rounded text-xs font-display tracking-widest transition-all ${
                          selectedVerseIndex === i
                            ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/40'
                            : 'text-white/40 hover:text-white/70 border border-transparent'
                        }`}
                      >
                        Verse {v.chapter}.{v.verse}
                      </button>
                    ))}
                  </div>
                )}

                {activeVerse ? (
                  <div className="space-y-6">
                    {/* Sanskrit verse */}
                    <div className="rounded-xl p-6 text-center"
                      style={{ background: 'rgba(212,175,55,0.03)', border: '1px solid rgba(212,175,55,0.15)', boxShadow: 'inset 0 0 20px rgba(212,175,55,0.02)' }}>
                      
                      <div className="font-devanagari text-yellow-400 text-xl leading-loose mb-3 whitespace-pre-line"
                        style={{ textShadow: '0 0 20px rgba(212,175,55,0.4)' }}>
                        {activeVerse.sanskrit}
                      </div>

                      <p className="font-serif text-purple-300/80 italic text-sm mb-4 leading-relaxed whitespace-pre-line">
                        {activeVerse.transliteration}
                      </p>

                      <div className="section-divider my-4">
                        <span className="section-divider-icon text-sm">🕉️</span>
                      </div>

                      {/* Word-by-Word Translation Grid */}
                      <div className="my-6 text-left">
                        <div className="font-display text-xs tracking-widest text-yellow-400/60 mb-3 text-center">
                          WORD-BY-WORD TRANSLATION
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {activeVerse.words.map((w, index) => (
                            <div key={index} className="px-3 py-2 rounded bg-purple-950/20 border border-purple-500/10 text-center min-w-[100px] flex-grow max-w-[150px]">
                              <div className="font-devanagari text-yellow-400 text-sm font-medium leading-none mb-1">
                                {w.word}
                              </div>
                              <div className="text-white/70 text-xs mt-1.5 leading-snug">
                                {w.meaning}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="section-divider my-4">
                        <span className="section-divider-icon text-sm">🕉️</span>
                      </div>

                      <p className="font-serif text-white/90 leading-relaxed text-lg italic max-w-2xl mx-auto">
                        "{activeVerse.translation}"
                      </p>

                      <button
                        onClick={() => speak(activeVerse.translation)}
                        className="btn-outline-gold text-xs mt-6 py-2 px-5"
                      >
                        🔊 Listen to Verse
                      </button>
                    </div>

                    {/* Commentary */}
                    <div className="rounded-xl p-5"
                      style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.15)' }}>
                      <div className="font-display text-xs tracking-widest text-purple-400/60 mb-3">SPIRITUAL COMMENTARY</div>
                      <p className="font-serif text-white/70 leading-relaxed text-sm">{activeVerse.commentary}</p>
                    </div>
                  </div>
                ) : (
                  // Fallback if no verses loaded
                  <div className="rounded-xl p-6 text-center"
                    style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.15)' }}>
                    <div className="font-devanagari text-yellow-400 text-xl leading-loose mb-4">
                      {chapter.openingVerse.sanskrit}
                    </div>
                    <p className="font-serif text-purple-300/80 italic text-sm mb-4">
                      {chapter.openingVerse.transliteration}
                    </p>
                    <p className="font-serif text-white/85 leading-relaxed text-lg">
                      "{chapter.openingVerse.translation}"
                    </p>
                    <p className="font-serif text-white/50 text-sm mt-4">{chapter.openingVerse.commentary}</p>
                  </div>
                )}
              </motion.div>
            )}

            {tab === 'teachings' && (
              <motion.div key="teachings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="font-display text-xs tracking-widest text-purple-400/60 mb-4">
                  MAIN TEACHINGS OF CHAPTER {chapter.number}
                </div>
                {chapter.teachings.map((teaching, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl"
                    style={{ background: 'rgba(139,92,246,0.05)', border: '1px solid rgba(139,92,246,0.1)' }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-display text-sm"
                      style={{ background: 'rgba(139,92,246,0.2)', color: '#a78bfa' }}>
                      {i + 1}
                    </div>
                    <p className="font-serif text-white/80 leading-relaxed text-sm">{teaching}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {tab === 'life' && (
              <motion.div key="life"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="rounded-2xl p-8"
                  style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(139,92,246,0.05))', border: '1px solid rgba(212,175,55,0.15)' }}>
                  <div className="font-display text-xs tracking-widest text-yellow-400/60 mb-4">
                    🌱 HOW TO APPLY THIS IN YOUR LIFE
                  </div>
                  <p className="font-serif text-white/85 text-base leading-relaxed">{chapter.lifeApplication}</p>
                </div>

                <div className="p-4 rounded-xl text-center"
                  style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.1)' }}>
                  <div className="font-devanagari text-yellow-400/60 text-lg mb-2">ॐ तत् सत्</div>
                  <div className="font-serif text-yellow-400/40 text-sm italic">Om Tat Sat — This is the truth</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- DATA FOR SEEK COUNSEL WIDGET ---
interface CounselMood {
  mood: string;
  icon: string;
  id: string;
  description: string;
  verseKey: { chapter: number; verse: number };
  reflection: string;
  action: string;
}

const counselMoods: CounselMood[] = [
  {
    mood: "Fear & Anxiety",
    icon: "😟",
    id: "fear",
    description: "When you feel anxious about the future or overwhelmed by fear of loss, Krishna reminds you of the indestructible nature of your true self.",
    verseKey: { chapter: 2, verse: 20 },
    reflection: "Close your eyes and breathe. Realize that your true essence—your consciousness—cannot be cut, burned, or destroyed. The changes around you are just passing weather on the mountain of your being.",
    action: "Practice focusing only on the present moment, letting go of future scenarios you cannot control."
  },
  {
    mood: "Confusion & Doubt",
    icon: "😕",
    id: "confusion",
    description: "When you face difficult choices and do not know which path is right, take refuge in humility. Admit you don't have all answers, drop your pride, and consult your highest intelligence.",
    verseKey: { chapter: 2, verse: 7 },
    reflection: "Like Arjuna, surrender the need to be right. Ask yourself: 'What is my duty here, separate from my personal likes and dislikes?' Duty (Dharma) is always clearer than desire.",
    action: "Write down your choices, filter them by which serves the higher good (dharma), and make a decision without fear."
  },
  {
    mood: "Grief & Loss",
    icon: "💔",
    id: "grief",
    description: "When you lose a loved one, a job, or an important dream, the pain can feel unbearable. Krishna teaches that change is the law of the universe. What is born must perish, but what is real never dies.",
    verseKey: { chapter: 2, verse: 13 },
    reflection: "Just as we change clothes, the soul passes through childhood, youth, old age, and eventually a new body. The love and connection you felt are real and eternal; the physical form was temporary.",
    action: "Honor your grief, but try to shift your focus from what was lost to the eternal presence of love in your heart."
  },
  {
    mood: "Anger & Resentment",
    icon: "😡",
    id: "anger",
    description: "Anger arises when our selfish desires are blocked. It clouds our memory and destroys our intellect, leading to regretful actions. Krishna terms anger a gate to self-destruction.",
    verseKey: { chapter: 16, verse: 21 },
    reflection: "Observe your anger. It is almost always a reaction to a boundary or expectation that wasn't met. Ask: 'What expectation am I holding onto?' Letting go of the expectation dissolves the anger.",
    action: "Before reacting in anger, take a 10-second pause, drink water, and ask if this anger serves your highest self."
  },
  {
    mood: "Restlessness & Distraction",
    icon: "🎯",
    id: "focus",
    description: "When your mind is racing and you cannot concentrate, do not fight it with force. The mind is restless like the wind, but it can be trained through gradual practice and detachment.",
    verseKey: { chapter: 6, verse: 26 },
    reflection: "Do not judge yourself for being distracted. The mind's nature is to wander. Spiritual strength lies in the act of gently bringing it back, again and again.",
    action: "Set a timer for 10 minutes. Focus solely on your breath. Each time a thought drifts in, label it 'thinking' and return to the breath."
  },
  {
    mood: "Duty & Career",
    icon: "⚔️",
    id: "duty",
    description: "When you feel unmotivated or conflicted about your career and responsibilities, look at your unique nature. It is better to perform your own natural duty, even if imperfectly, than to perform another's duty perfectly.",
    verseKey: { chapter: 3, verse: 35 },
    reflection: "Are you running after a career just for status, or does it fit who you truly are? Align your work with your natural inclinations (Swadharma) and execute it as an offering without obsessing over outcomes.",
    action: "Do one act of selfless service or work today, focusing 100% on the quality of the work and 0% on who will praise you for it."
  }
];

// Seek Counsel Widget
const SeekCounselWidget: React.FC<{ onNavigateToChapter: (chNum: number) => void }> = ({ onNavigateToChapter }) => {
  const [selectedMoodId, setSelectedMoodId] = useState<string>(counselMoods[0].id);
  const activeMood = counselMoods.find(m => m.id === selectedMoodId) || counselMoods[0];
  
  // Find matching verse in database
  const matchingVerse = gitaVerses.find(
    v => v.chapter === activeMood.verseKey.chapter && v.verse === activeMood.verseKey.verse
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Mood Selector Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:col-span-1">
        {counselMoods.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelectedMoodId(m.id)}
            className={`flex items-center gap-3 p-4 rounded-xl text-left font-display text-xs tracking-wider transition-all border ${
              selectedMoodId === m.id
                ? 'bg-purple-950/30 text-yellow-400 border-yellow-500/40 shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                : 'bg-white/3 border-white/5 text-white/50 hover:text-white/80 hover:bg-white/5'
            }`}
          >
            <span className="text-2xl">{m.icon}</span>
            <span>{m.mood}</span>
          </button>
        ))}
      </div>

      {/* Counsel Result Display */}
      <div className="lg:col-span-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMoodId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl p-6 lg:p-8 space-y-6"
            style={{
              background: 'linear-gradient(135deg, rgba(45,27,105,0.2) 0%, rgba(10,22,40,0.9) 100%)',
              border: '1px solid rgba(139,92,246,0.3)',
              boxShadow: '0 0 40px rgba(139,92,246,0.15)'
            }}
          >
            <div className="flex items-center gap-3" style={{ borderBottom: '1px solid rgba(139,92,246,0.15)', paddingBottom: '1rem' }}>
              <span className="text-3xl">{activeMood.icon}</span>
              <div>
                <h3 className="font-display text-sm tracking-wider text-purple-300">COUNSEL FOR</h3>
                <h2 className="font-display text-lg text-yellow-400">{activeMood.mood}</h2>
              </div>
            </div>

            <p className="font-serif text-white/80 leading-relaxed text-sm">{activeMood.description}</p>

            {matchingVerse && (
              <div className="rounded-xl p-5 border border-yellow-400/20 bg-yellow-400/3 space-y-3">
                <div className="font-display text-xs tracking-widest text-yellow-400/50">KRISHNA'S WORDS</div>
                <div className="font-devanagari text-yellow-400 text-lg leading-loose text-center whitespace-pre-line">
                  {matchingVerse.sanskrit}
                </div>
                <div className="font-serif text-white/90 text-center italic text-sm">
                  "{matchingVerse.translation}"
                </div>
                <div className="text-right">
                  <span className="font-display text-[10px] tracking-widest text-yellow-400/40">
                    — GITA {matchingVerse.chapter}.{matchingVerse.verse}
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/10">
                <div className="font-display text-[10px] tracking-widest text-purple-400 mb-2">🧘 SHLOKA REFLECTION</div>
                <p className="font-serif text-white/70 text-xs leading-relaxed">{activeMood.reflection}</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/10">
                <div className="font-display text-[10px] tracking-widest text-purple-400 mb-2">🌱 DAILY APPLICATION</div>
                <p className="font-serif text-white/70 text-xs leading-relaxed">{activeMood.action}</p>
              </div>
            </div>

            <div className="flex justify-end pt-4" style={{ borderTop: '1px solid rgba(139,92,246,0.15)' }}>
              <button
                onClick={() => onNavigateToChapter(activeMood.verseKey.chapter)}
                className="btn-outline-gold text-xs py-2 px-5"
              >
                Read Chapter {activeMood.verseKey.chapter} teachings →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- DATA FOR GUNA QUIZ ---
interface QuizQuestion {
  id: number;
  question: string;
  options: { text: string; type: 'sattva' | 'rajas' | 'tamas' }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "How do you react to a major setback or failure?",
    options: [
      { text: "Accept it calmly, analyze the lessons, and remain peaceful.", type: "sattva" },
      { text: "Feel angry or anxious, blame others, and strive to force a different result.", type: "rajas" },
      { text: "Feel hopeless, give up, and withdraw or sleep to ignore it.", type: "tamas" }
    ]
  },
  {
    id: 2,
    question: "What kind of food are you most naturally drawn to?",
    options: [
      { text: "Fresh, light, simple, organic, nutritious, and vegetarian food.", type: "sattva" },
      { text: "Spicy, salty, deep-fried, pungent, or highly stimulating food.", type: "rajas" },
      { text: "Stale, heavy, processed, fast-food, or left-over food.", type: "tamas" }
    ]
  },
  {
    id: 3,
    question: "What is your primary motivation when working or studying?",
    options: [
      { text: "Self-growth, serving others, and performing my duty with joy.", type: "sattva" },
      { text: "Achieving wealth, fame, status, power, and outperforming competitors.", type: "rajas" },
      { text: "Just getting by, avoiding effort, or because of pressure from others.", type: "tamas" }
    ]
  },
  {
    id: 4,
    question: "How would you describe your sleep patterns and morning state?",
    options: [
      { text: "Sleep peacefully (6-7 hours), wake up early easily, and feel fresh.", type: "sattva" },
      { text: "Restless sleep, mind racing at night, wake up feeling hyper or tired.", type: "rajas" },
      { text: "Heavy, long sleep (8+ hours), hard to wake up, feel sluggish for hours.", type: "tamas" }
    ]
  },
  {
    id: 5,
    question: "When someone criticizes or insults you, what is your initial response?",
    options: [
      { text: "Remain calm, evaluate if there is truth in it, and forgive them.", type: "sattva" },
      { text: "Get defensive, snap back, or plan how to prove them wrong.", type: "rajas" },
      { text: "Feel deeply hurt, sink into self-pity, or ignore it with apathy.", type: "tamas" }
    ]
  },
  {
    id: 6,
    question: "How do you approach learning a new skill or topic?",
    options: [
      { text: "With focus, patience, and a deep interest in understanding the principles.", type: "sattva" },
      { text: "Impatiently, looking for quick hacks and immediate practical rewards.", type: "rajas" },
      { text: "Procrastinate, feel overwhelmed, and think it takes too much energy.", type: "tamas" }
    ]
  }
];

// Guna Assessment Quiz Component
const GunaQuizWidget: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'question' | 'result'>('intro');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<('sattva' | 'rajas' | 'tamas')[]>([]);

  const handleStart = () => {
    setAnswers([]);
    setCurrentQIndex(0);
    setStep('question');
  };

  const handleSelectOption = (type: 'sattva' | 'rajas' | 'tamas') => {
    const nextAnswers = [...answers, type];
    setAnswers(nextAnswers);

    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setStep('result');
    }
  };

  // Calculate results
  const total = quizQuestions.length;
  const sattvaCount = answers.filter(a => a === 'sattva').length;
  const rajasCount = answers.filter(a => a === 'rajas').length;
  const tamasCount = answers.filter(a => a === 'tamas').length;

  const sattvaPct = Math.round((sattvaCount / total) * 100);
  const rajasPct = Math.round((rajasCount / total) * 100);
  const tamasPct = Math.round((tamasCount / total) * 100);

  // Determine dominant Guna
  let dominantGuna: 'sattva' | 'rajas' | 'tamas' = 'sattva';
  let maxCount = sattvaCount;
  if (rajasCount > maxCount) {
    dominantGuna = 'rajas';
    maxCount = rajasCount;
  }
  if (tamasCount > maxCount) {
    dominantGuna = 'tamas';
  }

  return (
    <div className="max-w-3xl mx-auto rounded-2xl p-6 lg:p-10"
      style={{
        background: 'linear-gradient(135deg, rgba(45,27,105,0.15) 0%, rgba(10,22,40,0.95) 100%)',
        border: '1px solid rgba(212,175,55,0.15)',
        boxShadow: '0 0 50px rgba(0,0,0,0.5)'
      }}>
      
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center space-y-6"
          >
            <div className="font-devanagari text-yellow-400/80 text-4xl">त्रिगुण</div>
            <h2 className="font-display text-xl text-yellow-400">Discover Your Dominant Guna</h2>
            <p className="font-serif text-white/80 leading-relaxed text-sm max-w-xl mx-auto">
              In Chapter 14 of the Gita, Krishna explains that all human actions, thoughts, foods, and habits 
              are governed by three primal forces of nature: **Sattva** (purity, peace), **Rajas** (passion, action), 
              and **Tamas** (ignorance, inertia).
              <br /><br />
              Take this brief 6-question assessment to see which Guna currently dominates your lifestyle 
              and receive personalized guidance from Krishna to elevate your consciousness.
            </p>
            <div className="pt-4">
              <button onClick={handleStart} className="btn-gold text-xs">
                Begin Assessment 🕉️
              </button>
            </div>
          </motion.div>
        )}

        {step === 'question' && (
          <motion.div
            key={`q-${currentQIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between font-display text-[10px] text-white/40 tracking-wider">
                <span>GUNA ASSESSMENT</span>
                <span>QUESTION {currentQIndex + 1} OF {total}</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 transition-all duration-300" style={{ width: `${((currentQIndex + 1) / total) * 100}%` }} />
              </div>
            </div>

            {/* Question Title */}
            <h3 className="font-serif text-white/95 text-lg font-medium pt-2">
              {quizQuestions[currentQIndex].question}
            </h3>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {quizQuestions[currentQIndex].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt.type)}
                  className="w-full text-left p-4 rounded-xl bg-white/3 hover:bg-white/6 border border-white/5 hover:border-yellow-400/30 transition-all font-serif text-white/80 text-sm flex items-start gap-3 hover:translate-x-1 duration-200"
                >
                  <span className="font-display text-xs text-yellow-400/40 mt-0.5">{String.fromCharCode(65 + i)}.</span>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="text-center">
              <div className="font-display text-[10px] tracking-widest text-yellow-400/60 mb-2">ASSESSMENT COMPLETE</div>
              <h2 className="font-display text-xl text-white">Your Guna Profile</h2>
            </div>

            {/* Progress Bars */}
            <div className="space-y-4 max-w-md mx-auto">
              {/* Sattva */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-display tracking-widest text-yellow-400">
                  <span>🟡 Sattva (Purity & Harmony)</span>
                  <span>{sattvaPct}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${sattvaPct}%` }} />
                </div>
              </div>

              {/* Rajas */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-display tracking-widest text-orange-400">
                  <span>🟠 Rajas (Passion & Ambition)</span>
                  <span>{rajasPct}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${rajasPct}%` }} />
                </div>
              </div>

              {/* Tamas */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-display tracking-widest text-slate-400">
                  <span>⚫ Tamas (Inertia & Lethargy)</span>
                  <span>{tamasPct}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-500 rounded-full" style={{ width: `${tamasPct}%` }} />
                </div>
              </div>
            </div>

            {/* Counsel Panel */}
            <div className="rounded-xl p-6 bg-purple-950/20 border border-purple-500/10 space-y-4">
              <div className="font-display text-xs text-yellow-400/80 tracking-widest">
                dominant profile: {dominantGuna.toUpperCase()}
              </div>

              <div className="font-serif text-white/90 text-sm leading-relaxed">
                {dominantGuna === 'sattva' && (
                  <p>
                    Your thoughts and habits are dominated by **Sattva Guna**. You exhibit a peaceful, clean, and harmonious disposition. 
                    You seek clarity, perform your tasks diligently, and try to learn objectively. 
                    <br /><br />
                    <strong className="text-yellow-400">Krishna's Counsel:</strong> This is a wonderful and highly elevated state. 
                    However, Krishna warns in Chapter 14 that Sattva can also bind the soul through attachment to knowledge, 
                    comfort, and intellectual pride. Do not grow complacent. Seek to transcend even Sattva (become a *Gunatita*) 
                    by surrendering all actions and knowledge to the Divine with pure devotion.
                  </p>
                )}
                {dominantGuna === 'rajas' && (
                  <p>
                    Your profile is dominated by **Rajas Guna**. You are dynamic, highly ambitious, active, and goal-oriented. 
                    However, you are also prone to stress, impatience, restlessness, and anxiety about the results of your actions.
                    <br /><br />
                    <strong className="text-yellow-400">Krishna's Counsel:</strong> Energy and action are vital, but when driven by ego, 
                    they drain the soul. Krishna advises practicing **Karma Yoga**: perform your duties with absolute dedication, 
                    but detach your mind from the anxiety of outcomes. Incorporate 10-15 minutes of silent meditation daily to calm 
                    the racing thoughts of Rajas and cultivate Sattva.
                  </p>
                )}
                {dominantGuna === 'tamas' && (
                  <p>
                    Your profile indicates a dominance of **Tamas Guna**. You are currently experiencing a state of inertia, 
                    procrastination, sluggishness, or confusion. The mind feels heavy, and taking action feels like a burden.
                    <br /><br />
                    <strong className="text-yellow-400">Krishna's Counsel:</strong> You cannot jump straight from Tamas to Sattva. 
                    The path out of darkness requires **action (Rajas)**. Krishna advises setting small, achievable goals, engaging in 
                    physical exercises, waking up earlier, consuming fresh foods, and carrying out your duties even when you do not 
                    feel like it. Action is the medicine that dispels inertia.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button onClick={handleStart} className="btn-outline-gold text-xs py-2 px-5">
                Retake Assessment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main GitaSection component
const GitaSection: React.FC = () => {
  const [selectedChapter, setSelectedChapter] = useState<GitaChapter | null>(null);
  const [activeTab, setActiveTab] = useState<'chapters' | 'counsel' | 'guna'>('chapters');
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  const handleNavigateToChapter = (chNum: number) => {
    const ch = gitaChapters.find(c => c.number === chNum);
    if (ch) {
      setSelectedChapter(ch);
      setActiveTab('chapters');
    }
  };

  return (
    <section id="gita" className="relative py-24 px-4 overflow-hidden">
      {/* Cosmic Three.js background */}
      <div className="absolute inset-0 z-0" style={{ height: '500px' }}>
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}
          style={{ background: 'transparent' }}>
          <CosmicStars />
          <ambientLight intensity={0.1} color="#8b5cf6" />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(45,27,105,0.4) 0%, transparent 60%), linear-gradient(180deg, #050e1a 0%, transparent 30%, transparent 70%, #050e1a 100%)'
      }} />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10">
          <motion.div
            className="font-devanagari text-purple-400/60 text-3xl mb-4"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            श्रीमद्भगवद्गीता
          </motion.div>
          <motion.h2
            className="section-heading font-display mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #c4b5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Bhagavad Gita
            </span>
          </motion.h2>
          <motion.p
            className="font-serif text-xl text-purple-200/60 max-w-2xl mx-auto leading-relaxed mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            The Song of the Divine. 700 verses. 18 chapters. A conversation between God and man 
            on the battlefield of life — and the most complete philosophical guide humanity has ever received.
          </motion.p>
          <motion.div
            className="font-devanagari text-yellow-400/50 text-lg"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
          </motion.div>
          <div className="section-divider mt-6">
            <span className="section-divider-icon">🕉️</span>
          </div>
        </div>

        {/* Gita Sub-Tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mb-12">
          {[
            { key: 'chapters', label: '📖 Chapters' },
            { key: 'counsel', label: '🪈 Seek Counsel' },
            { key: 'guna', label: '🟡 dominant Guna' }
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as typeof activeTab)}
              className={`px-4 py-2 rounded-full font-display text-xs tracking-wider transition-all border ${
                activeTab === t.key
                  ? 'bg-purple-500/25 text-purple-200 border-purple-500/40 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                  : 'border-white/5 text-white/40 hover:text-white/70 hover:bg-white/3'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content Rendering */}
        <AnimatePresence mode="wait">
          {activeTab === 'chapters' && (
            <motion.div
              key="chapters-grid"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {gitaChapters.map((chapter, i) => (
                <GitaChapterCard
                  key={chapter.number}
                  chapter={chapter}
                  index={i}
                  onClick={() => setSelectedChapter(chapter)}
                />
              ))}
            </motion.div>
          )}

          {activeTab === 'counsel' && (
            <motion.div
              key="seek-counsel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <SeekCounselWidget onNavigateToChapter={handleNavigateToChapter} />
            </motion.div>
          )}

          {activeTab === 'guna' && (
            <motion.div
              key="guna-quiz"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <GunaQuizWidget />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <motion.div
          className="text-center mt-16 p-6 rounded-2xl"
          style={{ background: 'rgba(139,92,246,0.03)', border: '1px solid rgba(139,92,246,0.1)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-serif text-purple-200/60 italic text-lg">
            "The Bhagavad Gita is a true scripture of the human race — a living creation rather than a book, 
            with a new message for every age and a new meaning for every civilization."
          </p>
          <p className="font-display text-xs tracking-widest text-purple-400/40 mt-3">— SRI AUROBINDO</p>
        </motion.div>
      </div>

      {/* Chapter Modal */}
      <AnimatePresence>
        {selectedChapter && (
          <ChapterDetailModal chapter={selectedChapter} onClose={() => setSelectedChapter(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default GitaSection;
