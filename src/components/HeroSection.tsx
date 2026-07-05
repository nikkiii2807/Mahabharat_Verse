import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ====== THREE.JS PARTICLE SYSTEM ======
const BattlefieldParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;

  const { positions, velocities } = React.useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = Math.random() * 0.005;
      velocities[i * 3 + 2] = 0;
    }
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
      if (pos[i * 3] > 20) pos[i * 3] = -20;
      if (pos[i * 3] < -20) pos[i * 3] = 20;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#D4AF37"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Flying Arrows
const FlyingArrows: React.FC = () => {
  const arrowsRef = useRef<THREE.Group>(null);
  const arrowData = React.useMemo(() =>
    Array.from({ length: 12 }, () => ({
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 15,
      z: (Math.random() - 0.5) * 5,
      speed: 0.02 + Math.random() * 0.04,
      angle: (Math.random() - 0.5) * 0.3,
    })), []);

  useFrame(() => {
    if (!arrowsRef.current) return;
    arrowsRef.current.children.forEach((child, i) => {
      const d = arrowData[i];
      child.position.x += d.speed;
      child.position.y += d.angle * 0.1;
      if (child.position.x > 20) child.position.x = -20;
    });
  });

  return (
    <group ref={arrowsRef}>
      {arrowData.map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]} rotation={[0, 0, d.angle]}>
          <cylinderGeometry args={[0.01, 0.01, 0.4, 4]} />
          <meshBasicMaterial color="#8B7355" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
};

// Ground fog planes
const BattlefieldFog: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(clock.elapsedTime * 0.1) * 2;
    }
  });
  return (
    <mesh ref={meshRef} position={[0, -5, 2]}>
      <planeGeometry args={[60, 8, 1, 1]} />
      <meshBasicMaterial color="#1a2040" transparent opacity={0.4} />
    </mesh>
  );
};

// ====== HERO SECTION ======
const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, -150]);
  const y2 = useTransform(scrollY, [0, 600], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const handleBeginJourney = () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreGita = () => {
    document.getElementById('gita')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section" ref={containerRef}>
      {/* Three.js Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          style={{ background: 'linear-gradient(180deg, #050e1a 0%, #0A1628 50%, #0a0d18 100%)' }}
        >
          <BattlefieldParticles />
          <FlyingArrows />
          <BattlefieldFog />
          <ambientLight intensity={0.2} color="#D4AF37" />
          <pointLight position={[5, 5, 5]} intensity={1} color="#FF6B35" />
          <pointLight position={[-5, -5, 5]} intensity={0.5} color="#1a6b8a" />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-1" style={{
        background: 'radial-gradient(ellipse at 50% 100%, rgba(255,107,53,0.15) 0%, transparent 60%)'
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-40 z-1" style={{
        background: 'linear-gradient(180deg, transparent, #0A1628)'
      }} />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{ y: y1, opacity }}
      >
        {/* Sanskrit subtitle */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="font-devanagari text-yellow-400/60 text-lg tracking-wider"
            style={{ textShadow: '0 0 20px rgba(212,175,55,0.4)' }}>
            जय श्री कृष्ण • महाभारत • धर्मक्षेत्रे कुरुक्षेत्रे
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          className="section-heading font-display mb-6 leading-tight"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
        >
          <span className="gold-text" style={{ 
            filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.5))',
            fontSize: 'clamp(2rem, 6vw, 5rem)',
            display: 'block',
            lineHeight: 1.15,
          }}>
            Enter the Greatest
          </span>
          <span className="text-white" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
            Epic Ever Told
          </span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
          <span className="text-yellow-400 text-xl">✦</span>
          <div className="h-px flex-1 max-w-24" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
        </motion.div>

        {/* Subheading */}
        <motion.p
          className="font-serif text-lg md:text-xl text-yellow-100/70 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Explore the Mahabharata and Bhagavad Gita through immersive storytelling, 
          interactive maps, character universes, and AI-powered exploration of the 
          world's greatest civilizational epic.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <motion.button
            className="btn-gold"
            onClick={handleBeginJourney}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>⚔️</span> Begin the Journey
          </motion.button>
          <motion.button
            className="btn-outline-gold"
            onClick={handleExploreGita}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>🕉️</span> Explore Bhagavad Gita
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[
            { num: '100,000+', label: 'Verses' },
            { num: '18', label: 'Days of War' },
            { num: '15+', label: 'Major Characters' },
            { num: '700', label: 'Gita Shlokas' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + i * 0.1 }}
            >
              <div className="font-display text-2xl gold-text">{stat.num}</div>
              <div className="font-serif text-yellow-400/50 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Krishna & Arjuna Silhouette */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-5"
        style={{ y: y2 }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1.8 }}
      >
        <svg viewBox="0 0 800 300" className="w-full max-w-3xl" style={{ maxHeight: '280px' }}>
          {/* Ground */}
          <ellipse cx="400" cy="295" rx="400" ry="15" fill="rgba(212,175,55,0.05)" />
          
          {/* Chariot wheels */}
          <circle cx="250" cy="240" r="50" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="3" />
          <circle cx="250" cy="240" r="5" fill="rgba(212,175,55,0.5)" />
          {[0,45,90,135,180,225,270,315].map((angle, i) => (
            <line key={i}
              x1="250" y1="240"
              x2={250 + 50 * Math.cos(angle * Math.PI / 180)}
              y2={240 + 50 * Math.sin(angle * Math.PI / 180)}
              stroke="rgba(212,175,55,0.3)" strokeWidth="2"
            />
          ))}
          <circle cx="550" cy="240" r="50" fill="none" stroke="rgba(212,175,55,0.3)" strokeWidth="3" />
          <circle cx="550" cy="240" r="5" fill="rgba(212,175,55,0.5)" />
          {[0,45,90,135,180,225,270,315].map((angle, i) => (
            <line key={i}
              x1="550" y1="240"
              x2={550 + 50 * Math.cos(angle * Math.PI / 180)}
              y2={240 + 50 * Math.sin(angle * Math.PI / 180)}
              stroke="rgba(212,175,55,0.3)" strokeWidth="2"
            />
          ))}
          
          {/* Krishna silhouette (charioteer) */}
          <g fill="rgba(26, 107, 138, 0.8)">
            {/* Body */}
            <ellipse cx="360" cy="180" rx="18" ry="45" />
            {/* Head */}
            <circle cx="360" cy="125" r="20" />
            {/* Crown/peacock feather */}
            <ellipse cx="360" cy="105" rx="5" ry="15" fill="rgba(212,175,55,0.9)" />
            <circle cx="360" cy="92" r="5" fill="rgba(26,107,138,0.9)" />
            {/* Arm with reins */}
            <ellipse cx="335" cy="165" rx="25" ry="7" transform="rotate(-30, 335, 165)" />
            <ellipse cx="385" cy="165" rx="25" ry="7" transform="rotate(30, 385, 165)" />
          </g>
          
          {/* Arjuna silhouette (archer) */}
          <g fill="rgba(37, 99, 235, 0.8)">
            {/* Body */}
            <ellipse cx="440" cy="175" rx="20" ry="50" />
            {/* Head */}
            <circle cx="440" cy="118" r="22" />
            {/* Helmet */}
            <ellipse cx="440" cy="100" rx="22" ry="10" fill="rgba(212,175,55,0.6)" />
            {/* Bow arm - extended */}
            <ellipse cx="410" cy="160" rx="30" ry="8" transform="rotate(-20, 410, 160)" />
            {/* Arrow */}
            <line x1="380" y1="140" x2="300" y2="120" stroke="rgba(212,175,55,0.8)" strokeWidth="2" />
            {/* Bowstring */}
            <path d="M 395 130 Q 420 150 395 185" fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5" />
          </g>
          
          {/* Horses silhouettes */}
          {[-120, -40, 40, 120].map((offset, i) => (
            <g key={i} fill="rgba(212,175,55,0.15)">
              <ellipse cx={400 + offset - 60} cy="230" rx="35" ry="18" />
              <circle cx={400 + offset - 60} cy="210" r="12" />
              <line x1={400 + offset - 70} y1="215" x2={400 + offset - 70} y2="248" 
                stroke="rgba(212,175,55,0.15)" strokeWidth="4" strokeLinecap="round" />
              <line x1={400 + offset - 55} y1="215" x2={400 + offset - 55} y2="248" 
                stroke="rgba(212,175,55,0.15)" strokeWidth="4" strokeLinecap="round" />
            </g>
          ))}

          {/* Ground dust glow */}
          <ellipse cx="400" cy="295" rx="300" ry="8" fill="rgba(255,107,53,0.1)" />
        </svg>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="font-display text-xs tracking-[0.3em] text-yellow-400/40"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL TO EXPLORE
        </motion.div>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-yellow-400/60 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ transformOrigin: 'top' }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
