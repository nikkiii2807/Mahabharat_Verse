import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'om' | 'text' | 'fade'>('om');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setPhase('fade'), 300);
          setTimeout(onComplete, 1200);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    setTimeout(() => setPhase('text'), 600);
    return () => clearInterval(interval);
  }, [onComplete]);

  const sanskritPhrases = [
    'ॐ नमो भगवते वासुदेवाय',
    'यदा यदा हि धर्मस्य...',
    'कर्मण्येवाधिकारस्ते...',
    'धृतराष्ट्र उवाच...',
  ];

  return (
    <AnimatePresence>
      {phase !== 'fade' ? (
        <motion.div
          key="loader"
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Stars */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 80 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: Math.random() * 3 + 1,
                  height: Math.random() * 3 + 1,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Rotating rings */}
          <div className="relative flex items-center justify-center mb-8">
            {[120, 90, 60].map((size, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-yellow-500/20"
                style={{ width: size, height: size }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 8 + i * 4, repeat: Infinity, ease: 'linear' }}
              />
            ))}

            {/* Om Symbol */}
            <motion.div
              className="loading-om relative z-10"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'backOut' }}
            >
              ॐ
            </motion.div>
          </div>

          {/* Sanskrit text */}
          <AnimatePresence mode="wait">
            {phase === 'text' && (
              <motion.div
                key="text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.p
                  className="font-devanagari text-xl text-yellow-400/80 mb-2"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {sanskritPhrases[Math.floor((progress / 100) * sanskritPhrases.length)]}
                </motion.p>
                <p className="font-display text-gold-500 text-sm tracking-widest uppercase">
                  Entering the Mahabharata Universe
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar */}
          <div className="mt-8 loading-bar">
            <motion.div
              className="loading-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <motion.p
            className="mt-3 text-yellow-400/40 text-xs font-display tracking-widest"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {progress}%
          </motion.p>

          {/* Bottom decorative text */}
          <div className="absolute bottom-8 text-center">
            <p className="font-serif text-yellow-400/30 text-sm italic">
              "The Mahabharata is not just a story — it is the story of all of us."
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingScreen;
