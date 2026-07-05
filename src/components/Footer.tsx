import React from 'react';

const Footer: React.FC = () => {
  const sections = [
    { label: 'Story', href: '#story' },
    { label: 'Bhagavad Gita', href: '#gita' },
    { label: 'Vishwaroop', href: '#vishwaroop' },
    { label: 'Characters', href: '#characters' },
    { label: 'Kingdom Map', href: '#map' },
    { label: 'Kurukshetra War', href: '#war' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'AI Guru', href: '#ai-guru' },
    { label: 'What If Engine', href: '#alternate' },
  ];

  const quotes = [
    '"The Mahabharata is the story of all of us."',
    '"There is no dharma higher than truth."',
    '"A man is born alone and dies alone."',
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-20 pb-10 px-4 overflow-hidden"
      style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}>
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 0%, rgba(45,27,105,0.2) 0%, transparent 60%)',
      }} />

      <div className="relative max-w-7xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-devanagari text-3xl text-yellow-400"
                style={{ textShadow: '0 0 20px rgba(212,175,55,0.6)' }}>ॐ</span>
              <div>
                <div className="font-display text-sm tracking-widest gold-text">MAHABHARATAVERSE</div>
                <div className="font-serif text-yellow-400/40 text-xs italic">An Interactive Civilizational Experience</div>
              </div>
            </div>
            <p className="font-serif text-white/50 text-sm leading-relaxed">
              A world-class immersive experience combining the complete Mahabharata, 
              Bhagavad Gita, character universe, and AI-powered exploration.
            </p>
            <div className="font-devanagari text-yellow-400/40 text-sm italic">
              सत्यमेव जयते
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <div className="font-display text-xs tracking-[0.2em] text-yellow-400/50 mb-4">EXPLORE</div>
            <div className="grid grid-cols-2 gap-2">
              {sections.map(s => (
                <a key={s.href} href={s.href}
                  onClick={(e) => handleNavClick(e, s.href)}
                  className="font-serif text-white/40 hover:text-yellow-400/80 transition-colors text-sm no-underline">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div className="space-y-4">
            <div className="font-display text-xs tracking-[0.2em] text-yellow-400/50 mb-4">WORDS OF WISDOM</div>
            <div className="p-5 rounded-xl"
              style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.1)' }}>
              <p className="font-serif text-white/60 italic text-sm leading-relaxed mb-3">{randomQuote}</p>
              <div className="font-devanagari text-yellow-400/40 text-xl">ॐ</div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="section-divider mb-8">
          <span className="section-divider-icon text-sm">✦</span>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-serif text-white/25 text-sm text-center md:text-left">
            Built with reverence for one of humanity's greatest achievements.
            The Mahabharata — attributed to Sage Vyasa.
          </div>
          <div className="font-display text-xs tracking-widest text-yellow-400/30">
            MAHABHARATAVERSE © 2026
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
