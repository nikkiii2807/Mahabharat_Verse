import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Story', href: '#story', icon: '📜' },
  { label: 'Bhagavad Gita', href: '#gita', icon: '🕉️' },
  { label: 'Characters', href: '#characters', icon: '⚔️' },
  { label: 'Kingdom Map', href: '#map', icon: '🗺️' },
  { label: 'Kurukshetra', href: '#war', icon: '🔱' },
  { label: 'Timeline', href: '#timeline', icon: '⏳' },
  { label: 'AI Guru', href: '#ai-guru', icon: '🪈' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);

      // Find active section
      const sections = navLinks.map(l => l.href.slice(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`nav-glass ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Logo */}
        <motion.a
          href="#"
          className="flex items-center gap-3 no-underline"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-2xl font-devanagari text-yellow-400" style={{ textShadow: '0 0 20px rgba(212,175,55,0.8)' }}>
            ॐ
          </span>
          <div>
            <div className="font-display text-sm tracking-widest gold-text leading-none">
              MAHABHARATA
            </div>
            <div className="font-display text-xs tracking-[0.2em] text-yellow-600/70 leading-none mt-0.5">
              VERSE
            </div>
          </div>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, i) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 font-display text-xs tracking-wider transition-all duration-300 no-underline rounded-sm ${
                  isActive
                    ? 'text-yellow-400'
                    : 'text-yellow-400/60 hover:text-yellow-400'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                whileHover={{ y: -1 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-sm"
                    style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </motion.a>
            );
          })}
        </div>

        {/* Begin Journey CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <motion.a
            href="#story"
            onClick={(e) => handleNavClick(e, '#story')}
            className="btn-gold text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Begin Journey
          </motion.a>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="h-0.5 bg-yellow-400"
              style={{ width: i === 1 ? 20 : 24 }}
              animate={{
                width: menuOpen ? 20 : i === 1 ? 20 : 24,
                rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                y: menuOpen ? (i === 0 ? 8 : i === 2 ? -8 : 0) : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 glass-dark p-8 flex flex-col gap-2"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="font-display text-yellow-400 text-sm tracking-widest">NAVIGATE</span>
                <button onClick={() => setMenuOpen(false)} className="text-yellow-400/60 hover:text-yellow-400 text-2xl">&times;</button>
              </div>

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center gap-3 py-3 px-4 rounded-lg font-display text-sm tracking-wider text-yellow-400/70 hover:text-yellow-400 hover:bg-yellow-400/5 transition-all no-underline"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </motion.a>
              ))}

              <div className="mt-auto">
                <a
                  href="#story"
                  onClick={(e) => handleNavClick(e, '#story')}
                  className="btn-gold w-full justify-center text-xs"
                >
                  Begin Journey
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
