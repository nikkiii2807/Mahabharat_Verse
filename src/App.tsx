import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import GitaSection from './components/GitaSection';
import VishwaroopSection from './components/VishwaroopSection';
import CharactersSection from './components/CharactersSection';
import { KingdomMap, WarCommandCenter } from './components/WorldSections';
import { TimelineSection, AIGuruSection, AlternateHistorySection } from './components/AdvancedSections';
import Footer from './components/Footer';
import { meditativeSynth } from './utils/audio';
import './index.css';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showSoundPrompt, setShowSoundPrompt] = useState(false);
  const [activeTrack, setActiveTrack] = useState<'flute' | 'war'>('flute');
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    // Show sound prompt after loading
    if (!loading) {
      setTimeout(() => setShowSoundPrompt(true), 500);
    }
  }, [loading]);

  useEffect(() => {
    if (soundEnabled) {
      meditativeSynth.start();
      meditativeSynth.setTrack(activeTrack);
      meditativeSynth.setVolume(volume);
    } else {
      meditativeSynth.stop();
    }
    return () => {
      meditativeSynth.stop();
    };
  }, [soundEnabled]);

  useEffect(() => {
    if (soundEnabled) {
      meditativeSynth.setTrack(activeTrack);
    }
  }, [activeTrack, soundEnabled]);

  useEffect(() => {
    if (soundEnabled) {
      meditativeSynth.setVolume(volume);
    }
  }, [volume, soundEnabled]);

  // Sync state if audio player changes track internally (e.g., triggered on scroll)
  useEffect(() => {
    const unsubscribe = meditativeSynth.onChange((track) => {
      setActiveTrack(track);
    });
    return unsubscribe;
  }, []);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen" style={{ background: '#050e1a' }}>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Sound toggle */}
            <motion.button
              className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center text-lg glass-dark gold-border transition-all hover:scale-110"
              style={{ boxShadow: '0 0 20px rgba(212,175,55,0.2)' }}
              onClick={() => setSoundEnabled(!soundEnabled)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, type: 'spring' }}
              title={soundEnabled ? 'Mute ambient sounds' : 'Enable ambient sounds'}
            >
              {soundEnabled ? '🔊' : '🔇'}
            </motion.button>

            {/* Track selector menu */}
            <AnimatePresence>
              {soundEnabled && (
                <motion.div
                  className="fixed bottom-6 right-20 z-50 glass-dark rounded-full px-4 py-2 flex items-center gap-3 border"
                  style={{ borderColor: 'rgba(212,175,55,0.3)', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <button
                    onClick={() => setActiveTrack('flute')}
                    className={`font-display text-[10px] tracking-wider transition-all px-2.5 py-1 rounded-full cursor-pointer ${
                      activeTrack === 'flute'
                        ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
                        : 'text-white/40 hover:text-white/70 border border-transparent'
                    }`}
                  >
                    🪈 Gita Flute
                  </button>
                  <div className="w-[1px] h-3 bg-white/10" />
                  <button
                    onClick={() => setActiveTrack('war')}
                    className={`font-display text-[10px] tracking-wider transition-all px-2.5 py-1 rounded-full cursor-pointer ${
                      activeTrack === 'war'
                        ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
                        : 'text-white/40 hover:text-white/70 border border-transparent'
                    }`}
                  >
                    ⚔️ War Theme
                  </button>
                  <div className="w-[1px] h-3 bg-white/10" />
                  <div className="flex items-center gap-1.5 pl-1">
                    <button
                      onClick={() => setVolume(prev => Math.max(0, prev - 0.1))}
                      className="text-white/40 hover:text-white/80 transition-all text-xs w-5 h-5 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                      title="Volume Down"
                    >
                      ➖
                    </button>
                    <span className="font-display text-[9px] text-yellow-400/80 w-8 text-center select-none">
                      {Math.round(volume * 100)}%
                    </span>
                    <button
                      onClick={() => setVolume(prev => Math.min(1.0, prev + 0.1))}
                      className="text-white/40 hover:text-white/80 transition-all text-xs w-5 h-5 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 cursor-pointer"
                      title="Volume Up"
                    >
                      ➕
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sound prompt */}
            <AnimatePresence>
              {showSoundPrompt && !soundEnabled && (
                <motion.div
                  className="fixed bottom-20 right-6 z-50 glass-dark rounded-xl p-3 max-w-48"
                  style={{ border: '1px solid rgba(212,175,55,0.2)' }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <p className="font-serif text-xs text-white/60 mb-2">Enable ambient sounds & Mahabharat serial theme?</p>
                  <div className="flex gap-2">
                    <button
                      className="btn-gold text-xs px-3 py-1"
                      onClick={() => { setSoundEnabled(true); setShowSoundPrompt(false); }}
                    >
                      Enable
                    </button>
                    <button
                      className="text-white/30 text-xs hover:text-white/60 transition-colors"
                      onClick={() => setShowSoundPrompt(false)}
                    >
                      Skip
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <Navbar />

            {/* Sections */}
            <main>
              <HeroSection />
              <StorySection />
              <GitaSection />
              <VishwaroopSection />
              <CharactersSection />
              <KingdomMap />
              <WarCommandCenter />
              <TimelineSection />
              <AIGuruSection />
              <AlternateHistorySection />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
