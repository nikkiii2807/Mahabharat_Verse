import React, { useRef, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Universe Holding Model (Rotating Solar System at His hand level)
interface UniverseModelProps {
  cosmicIntensity: number;
}

const UniverseModel: React.FC<UniverseModelProps> = ({ cosmicIntensity }) => {
  const universeRef = useRef<THREE.Group>(null);
  const planet1Ref = useRef<THREE.Mesh>(null);
  const planet2Ref = useRef<THREE.Mesh>(null);
  const planet3Ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const speed = 0.12 + cosmicIntensity * 0.18;
    
    if (universeRef.current) {
      universeRef.current.rotation.y = t * 0.25 * speed;
    }

    if (planet1Ref.current) {
      planet1Ref.current.position.x = Math.sin(t * 0.9 * speed) * 1.2;
      planet1Ref.current.position.z = Math.cos(t * 0.9 * speed) * 1.2;
    }
    if (planet2Ref.current) {
      planet2Ref.current.position.x = Math.sin(t * 0.5 * speed + 2) * 1.8;
      planet2Ref.current.position.z = Math.cos(t * 0.5 * speed + 2) * 1.8;
    }
    if (planet3Ref.current) {
      planet3Ref.current.position.x = Math.sin(t * 0.3 * speed + 4) * 2.4;
      planet3Ref.current.position.z = Math.cos(t * 0.3 * speed + 4) * 2.4;
    }
  });

  return (
    // Positioned floating in front of His body/hands
    <group position={[0, -0.6, 1.2]}>
      {/* Orbital path lines */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.006, 8, 64]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2.1, 0.08, 0]}>
        <torusGeometry args={[1.8, 0.006, 8, 64]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[Math.PI / 1.9, -0.08, 0]}>
        <torusGeometry args={[2.4, 0.006, 8, 64]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.12} />
      </mesh>

      {/* Central glowing Earth / cosmic system core */}
      <group ref={universeRef}>
        <mesh>
          <sphereGeometry args={[0.36, 32, 32]} />
          <meshBasicMaterial color="#1E40AF" transparent opacity={0.8} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.38, 16, 16]} />
          <meshBasicMaterial color="#10B981" transparent opacity={0.35} wireframe />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.44, 16, 16]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.15 + cosmicIntensity * 0.15} />
        </mesh>
      </group>

      {/* Orbiting Planet 1 (Inner - Firey) */}
      <mesh ref={planet1Ref}>
        <sphereGeometry args={[0.075, 12, 12]} />
        <meshBasicMaterial color="#EF4444" />
      </mesh>

      {/* Orbiting Planet 2 (Middle - Gold) */}
      <mesh ref={planet2Ref}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color="#F59E0B" />
      </mesh>

      {/* Orbiting Planet 3 (Outer - Sky) */}
      <mesh ref={planet3Ref}>
        <sphereGeometry args={[0.13, 12, 12]} />
        <meshBasicMaterial color="#8B5CF6" />
      </mesh>
    </group>
  );
};

// Cosmic Vishwaroop Scene with blazing sunburst fire particles
interface VishwaroopModelProps {
  radiance: number;
  timeWarp: number;
  spinSpeed: number;
}

const VishwaroopModel: React.FC<VishwaroopModelProps> = ({ radiance, timeWarp, spinSpeed }) => {
  const groupRef = useRef<THREE.Group>(null);
  const chakraRef = useRef<THREE.Mesh>(null);
  const fireParticlesRef = useRef<THREE.Points>(null);

  // Load the generated high-fidelity Vishwaroop Sprite texture
  const texture = useMemo(() => {
    return new THREE.TextureLoader().load('/vishwaroop_hologram.png');
  }, []);

  // Generate 3,500 blazing fire particles rising behind Him (golden background like TV show)
  const fireCount = 3500;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(fireCount * 3);
    const cols = new Float32Array(fireCount * 3);

    const palette = [
      [1.0, 0.8, 0.1],   // gold
      [1.0, 0.5, 0.0],   // orange fire
      [0.9, 0.25, 0.05], // red flame
      [1.0, 0.9, 0.5]    // yellow sunbeam
    ];

    for (let i = 0; i < fireCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 2.8 + Math.random() * 7.5;
      const z = -2.0 - Math.random() * 1.5;
      
      pos[i * 3] = r * Math.cos(angle);
      pos[i * 3 + 1] = (Math.random() - 0.4) * 10.0;
      pos[i * 3 + 2] = z;

      const c = palette[Math.floor(Math.random() * palette.length)];
      cols[i * 3] = c[0];
      cols[i * 3 + 1] = c[1];
      cols[i * 3 + 2] = c[2];
    }
    return [pos, cols];
  }, []);

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime;
    const slowDrift = Math.sin(t * (0.02 + timeWarp * 0.06)) * 0.04;

    if (groupRef.current) {
      // Keeps the figure facing front, tilting elegantly with mouse drag/movement and slow drift
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, slowDrift + mouse.x * 0.35, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2 + Math.sin(t * 0.3) * 0.015, 0.05);
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.08;
    }

    if (chakraRef.current) {
      // Sudarshana Chakra spins behind His heads
      chakraRef.current.rotation.z = -t * (1.8 + spinSpeed * 2.2);
    }

    if (fireParticlesRef.current) {
      fireParticlesRef.current.rotation.z = t * 0.015;
    }
  });

  return (
    <group>
      {/* Blazing fire background particles (Mahabharat Star Plus Backdrop) */}
      <points ref={fireParticlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.1} vertexColors transparent opacity={0.5 + radiance * 0.3} sizeAttenuation />
      </points>

      {/* Main Divine Group representing Lord Krishna */}
      <group ref={groupRef}>
        
        {/* Ornate Sudarshana Chakra Halo compact behind His main head */}
        <mesh ref={chakraRef} position={[0, 0.65, -0.65]}>
          <torusGeometry args={[1.3, 0.025, 8, 48]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.65} wireframe />
        </mesh>
        
        {/* Divine Sunbeams radiating from Chakra compact halo */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <mesh key={i} position={[0, 0.65, -0.7]} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.02, 2.6, 0.008]} />
              <meshBasicMaterial color="#FFD700" transparent opacity={0.12 + radiance * 0.15} />
            </mesh>
          );
        })}

        {/* 3D Sprite Plane rendering television-accurate Lord Krishna with Additive Blending */}
        <mesh position={[0, -0.2, 0]}>
          <planeGeometry args={[4.8, 4.8]} />
          <meshBasicMaterial 
            map={texture} 
            transparent={true} 
            blending={THREE.AdditiveBlending} 
            depthWrite={false}
          />
        </mesh>

        {/* Floating 3D universe planetarium held in front of Him */}
        <UniverseModel cosmicIntensity={radiance} />
      </group>

      {/* Lighting elements */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 3.5]} intensity={2.5 + radiance * 4} color="#FFD700" />
      <pointLight position={[-4, 4, 1.5]} intensity={1.5} color="#00f0ff" />
      <pointLight position={[4, -4, 1.5]} intensity={1.5} color="#8b5cf6" />
    </group>
  );
};

const vishwaroopVerses = [
  {
    sanskrit: 'पश्य मे पार्थ रूपाणि शतशोऽथ सहस्रशः',
    transliteration: 'paśya me pārtha rūpāṇi śataśo \'tha sahasraśaḥ',
    translation: 'O Arjuna, behold My forms in hundreds and thousands — divine, various in kind and color and shape.',
    chapter: 'Chapter 11, Verse 5',
  },
  {
    sanskrit: 'कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्तः',
    transliteration: 'kālo \'smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ',
    translation: 'I am Time, the destroyer of worlds, and I have come here to destroy all people. Even without your participation, all the warriors standing here shall cease to exist.',
    chapter: 'Chapter 11, Verse 32',
  },
  {
    sanskrit: 'नभःस्पृशं दीप्तमनेकवर्णं व्यात्ताननं दीप्तविशालनेत्रम्',
    transliteration: 'nabhaḥ-spṛśaṁ dīptam aneka-varṇaṁ vyāttānanaṁ dīpta-viśāla-netram',
    translation: 'Touching the sky, blazing, of many colors, with open mouths, with blazing, vast eyes — thus I see You, with trembling heart, my tranquility lost, O Vishnu.',
    chapter: 'Chapter 11, Verse 24',
  },
];

const VishwaroopSection: React.FC = () => {
  const radiance = 0.55;
  const timeWarp = 0.25;
  const spinSpeed = 0.15;
  const [currentVerse, setCurrentVerse] = useState(0);

  const handleNextVerse = () => {
    setCurrentVerse((prev) => (prev + 1) % vishwaroopVerses.length);
  };

  const handlePrevVerse = () => {
    setCurrentVerse((prev) => (prev - 1 + vishwaroopVerses.length) % vishwaroopVerses.length);
  };

  const verse = vishwaroopVerses[currentVerse];

  return (
    <section id="vishwaroop" className="relative min-h-screen overflow-hidden flex flex-col justify-between">
      {/* Full-screen 3D canvas background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 7.8], fov: 70 }}
          style={{ background: 'radial-gradient(ellipse at center, #1b0c05 0%, #030408 100%)' }}
        >
          <VishwaroopModel radiance={radiance} timeWarp={timeWarp} spinSpeed={spinSpeed} />
        </Canvas>
      </div>

      {/* Decorative gradient shadows */}
      <div className="absolute inset-0 z-1 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(3,4,8,0.85) 100%)',
      }} />
      <div className="absolute top-0 left-0 right-0 h-32 z-1 pointer-events-none" style={{ background: 'linear-gradient(180deg, #030408, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-32 z-1 pointer-events-none" style={{ background: 'linear-gradient(0deg, #030408, transparent)' }} />

      {/* Header Overlay */}
      <div className="relative z-10 text-center pt-16 px-4 pointer-events-none">
        <motion.div
          className="font-devanagari text-yellow-400 text-3xl mb-1.5 select-none"
          style={{ textShadow: '0 0 25px rgba(245,158,11,0.8), 0 0 50px rgba(245,158,11,0.4)' }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          विश्वरूप दर्शन
        </motion.div>
        <h2 className="font-display text-2xl font-black tracking-widest text-white uppercase select-none"
          style={{ textShadow: '0 0 20px rgba(245,158,11,0.4)' }}>
          Krishna's Vishwaroop
        </h2>
        <p className="font-serif text-[11px] uppercase tracking-wider text-yellow-100/50 max-w-md mx-auto mt-2">
          Click and drag to rotate/tilt Lord Krishna & the rotating solar system in 3D.
        </p>
      </div>

      {/* Verse Carousel Board (Centered) */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 pb-8">
        <motion.div
          className="p-5 rounded-2xl border glass-dark relative overflow-hidden"
          style={{ borderColor: 'rgba(245,158,11,0.25)', background: 'rgba(15,8,3,0.85)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute top-2 right-4 text-[7px] font-display tracking-widest text-yellow-400/40 uppercase">
            REVEALED IN GITA • {currentVerse + 1} / {vishwaroopVerses.length}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentVerse}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-3 pr-8 min-h-[110px] flex flex-col justify-center"
            >
              <div className="font-devanagari text-yellow-400 text-base md:text-lg leading-relaxed font-bold"
                style={{ textShadow: '0 0 15px rgba(245,158,11,0.4)' }}>
                {verse.sanskrit}
              </div>
              <p className="font-serif text-white/80 text-xs md:text-sm leading-relaxed italic">
                "{verse.translation}"
              </p>
              <div className="flex justify-between items-center text-[8px] font-display text-white/30 tracking-widest uppercase">
                <span>{verse.chapter}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel controls */}
          <div className="absolute right-4 bottom-4 flex gap-1">
            <button
              onClick={handlePrevVerse}
              className="w-6 h-6 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center text-xs cursor-pointer transition-all hover:scale-105"
            >
              ◀
            </button>
            <button
              onClick={handleNextVerse}
              className="w-6 h-6 rounded bg-white/5 hover:bg-white/15 border border-white/10 text-white flex items-center justify-center text-xs cursor-pointer transition-all hover:scale-105"
            >
              ▶
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VishwaroopSection;
