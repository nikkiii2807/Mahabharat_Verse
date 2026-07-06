import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { characters } from '../data/characters';
import type { Character } from '../data/characters';
import { CharacterModal, sideColors } from './CharacterModal';

// Tree node definition
interface TreeNode {
  id: string;
  name: string;
  relationText?: string;
  generation: number;
  branch: 'kuru' | 'kaurava' | 'pandava' | 'neutral' | 'divine';
}

const familyNodes: TreeNode[] = [
  // Generation 1: Founders
  { id: 'ganga', name: 'Ganga', relationText: 'First Wife of Shantanu', generation: 1, branch: 'divine' },
  { id: 'shantanu', name: 'Shantanu', relationText: 'Kuru Patriarch King', generation: 1, branch: 'neutral' },
  { id: 'satyavati', name: 'Satyavati', relationText: 'Second Wife of Shantanu', generation: 1, branch: 'neutral' },

  // Generation 2: The Patriarchs / Elders
  { id: 'bhishma', name: 'Bhishma', relationText: 'Celibate son of Ganga', generation: 2, branch: 'kaurava' },
  { id: 'vyasa', name: 'Sage Vyasa', relationText: 'Son of Satyavati & Parashara', generation: 2, branch: 'divine' },
  { id: 'chitrangada', name: 'Chitrangada', relationText: 'Son of Satyavati (Died in duel)', generation: 2, branch: 'neutral' },
  { id: 'vichitravirya', name: 'Vichitravirya', relationText: 'Son of Satyavati (Died childless)', generation: 2, branch: 'neutral' },
  { id: 'amba', name: 'Amba', relationText: 'Kashi Princess (Reborn as Shikhandi)', generation: 2, branch: 'neutral' },
  { id: 'ambika', name: 'Ambika', relationText: 'Vichitravirya\'s Queen (Niyoga)', generation: 2, branch: 'kaurava' },
  { id: 'ambalika', name: 'Ambalika', relationText: 'Vichitravirya\'s Queen (Niyoga)', generation: 2, branch: 'pandava' },

  // Generation 3: The Parents
  { id: 'dhritarashtra', name: 'Dhritarashtra', relationText: 'Vyasa\'s son (Niyoga), Blind King', generation: 3, branch: 'kaurava' },
  { id: 'gandhari', name: 'Gandhari', relationText: 'Wife of Dhritarashtra', generation: 3, branch: 'kaurava' },
  { id: 'vidura', name: 'Vidura', relationText: 'Vyasa\'s son with Maid', generation: 3, branch: 'pandava' },
  { id: 'pandu', name: 'Pandu', relationText: 'Vyasa\'s son, Pale King', generation: 3, branch: 'pandava' },
  { id: 'kunti', name: 'Kunti', relationText: 'First Wife of Pandu', generation: 3, branch: 'pandava' },
  { id: 'madri', name: 'Madri', relationText: 'Second Wife of Pandu', generation: 3, branch: 'pandava' },

  // Generation 4: The Cousins & Spouses
  { id: 'duryodhana', name: 'Duryodhana', relationText: 'Eldest Kaurava Prince', generation: 4, branch: 'kaurava' },
  { id: 'shakuni', name: 'Shakuni', relationText: 'Kaurava Uncle / Strategist', generation: 4, branch: 'kaurava' },
  { id: 'karna', name: 'Karna', relationText: 'Kunti\'s Firstborn (Surya)', generation: 4, branch: 'kaurava' },
  { id: 'yudhishthira', name: 'Yudhishthira', relationText: 'Eldest Pandava (Dharma)', generation: 4, branch: 'pandava' },
  { id: 'bhima', name: 'Bhima', relationText: 'Second Pandava (Vayu)', generation: 4, branch: 'pandava' },
  { id: 'arjuna', name: 'Arjuna', relationText: 'Third Pandava (Indra)', generation: 4, branch: 'pandava' },
  { id: 'draupadi', name: 'Draupadi', relationText: 'Shared Wife of Pandavas', generation: 4, branch: 'pandava' },
  { id: 'subhadra', name: 'Subhadra', relationText: 'Arjuna\'s Wife (Krishna\'s Sister)', generation: 4, branch: 'pandava' },
  { id: 'nakula', name: 'Nakula', relationText: 'Fourth Pandava (Ashwini)', generation: 4, branch: 'pandava' },
  { id: 'sahadeva', name: 'Sahadeva', relationText: 'Fifth Pandava (Ashwini)', generation: 4, branch: 'pandava' },

  // Generation 5: The Descendants
  { id: 'lakshmana', name: 'Lakshmana', relationText: 'Son of Duryodhana', generation: 5, branch: 'kaurava' },
  { id: 'abhimanyu', name: 'Abhimanyu', relationText: 'Son of Arjuna & Subhadra', generation: 5, branch: 'pandava' },
  { id: 'uttara', name: 'Uttara', relationText: 'Wife of Abhimanyu', generation: 5, branch: 'pandava' },

  // Generation 6: The Dynasty Successor
  { id: 'parikshit', name: 'Parikshit', relationText: 'Son of Abhimanyu & Uttara, King of Hastinapur', generation: 6, branch: 'pandava' }
];

// Relationship mapping function
const getRelationType = (nodeId: string, hoveredId: string): 'self' | 'parent' | 'spouse' | 'child' | 'sibling' | null => {
  if (nodeId === hoveredId) return 'self';

  const relationships: Record<string, { parents?: string[]; spouse?: string[]; children?: string[]; siblings?: string[] }> = {
    shantanu: { spouse: ['ganga', 'satyavati'], children: ['bhishma', 'chitrangada', 'vichitravirya'] },
    ganga: { spouse: ['shantanu'], children: ['bhishma'] },
    satyavati: { spouse: ['shantanu'], children: ['vyasa', 'chitrangada', 'vichitravirya'] },
    bhishma: { parents: ['shantanu', 'ganga'], siblings: ['chitrangada', 'vichitravirya'] },
    vyasa: { parents: ['satyavati'], siblings: ['chitrangada', 'vichitravirya'], spouse: ['ambika', 'ambalika'], children: ['dhritarashtra', 'pandu', 'vidura'] },
    chitrangada: { parents: ['shantanu', 'satyavati'], siblings: ['bhishma', 'vyasa', 'vichitravirya'] },
    vichitravirya: { parents: ['shantanu', 'satyavati'], siblings: ['bhishma', 'chitrangada'], spouse: ['ambika', 'ambalika'] },
    amba: { siblings: ['ambika', 'ambalika'] },
    ambika: { spouse: ['vichitravirya', 'vyasa'], children: ['dhritarashtra'], siblings: ['amba', 'ambalika'] },
    ambalika: { spouse: ['vichitravirya', 'vyasa'], children: ['pandu'], siblings: ['amba', 'ambika'] },
    dhritarashtra: { parents: ['vyasa', 'ambika'], spouse: ['gandhari'], children: ['duryodhana', 'dushasana'], siblings: ['pandu', 'vidura'] },
    gandhari: { spouse: ['dhritarashtra'], children: ['duryodhana', 'dushasana'] },
    pandu: { parents: ['vyasa', 'ambalika'], spouse: ['kunti', 'madri'], children: ['karna', 'yudhishthira', 'bhima', 'arjuna', 'nakula', 'sahadeva'], siblings: ['dhritarashtra', 'vidura'] },
    kunti: { spouse: ['pandu'], children: ['karna', 'yudhishthira', 'bhima', 'arjuna'] },
    madri: { spouse: ['pandu'], children: ['nakula', 'sahadeva'] },
    vidura: { parents: ['vyasa'], siblings: ['dhritarashtra', 'pandu'] },
    duryodhana: { parents: ['dhritarashtra', 'gandhari'], siblings: ['dushasana'], children: ['lakshmana'] },
    dushasana: { parents: ['dhritarashtra', 'gandhari'], siblings: ['duryodhana'] },
    karna: { parents: ['kunti'], siblings: ['yudhishthira', 'bhima', 'arjuna'] },
    yudhishthira: { parents: ['pandu', 'kunti'], siblings: ['karna', 'bhima', 'arjuna', 'nakula', 'sahadeva'], spouse: ['draupadi'] },
    bhima: { parents: ['pandu', 'kunti'], siblings: ['karna', 'yudhishthira', 'arjuna', 'nakula', 'sahadeva'], spouse: ['draupadi', 'hidimbi'] },
    arjuna: { parents: ['pandu', 'kunti'], siblings: ['karna', 'yudhishthira', 'bhima', 'nakula', 'sahadeva'], spouse: ['draupadi', 'subhadra'], children: ['abhimanyu'] },
    subhadra: { spouse: ['arjuna'], children: ['abhimanyu'] },
    draupadi: { spouse: ['yudhishthira', 'bhima', 'arjuna', 'nakula', 'sahadeva'] },
    nakula: { parents: ['pandu', 'madri'], siblings: ['yudhishthira', 'bhima', 'arjuna', 'sahadeva'], spouse: ['draupadi'] },
    sahadeva: { parents: ['pandu', 'madri'], siblings: ['yudhishthira', 'bhima', 'arjuna', 'nakula'], spouse: ['draupadi'] },
    lakshmana: { parents: ['duryodhana'] },
    abhimanyu: { parents: ['arjuna', 'subhadra'], spouse: ['uttara'], children: ['parikshit'] },
    uttara: { spouse: ['abhimanyu'], children: ['parikshit'] },
    parikshit: { parents: ['abhimanyu', 'uttara'] }
  };

  const rel = relationships[hoveredId];
  if (!rel) return null;

  if (rel.parents?.includes(nodeId)) return 'parent';
  if (rel.spouse?.includes(nodeId)) return 'spouse';
  if (rel.children?.includes(nodeId)) return 'child';
  if (rel.siblings?.includes(nodeId)) return 'sibling';

  // Inverse relationship check
  const nodeRel = relationships[nodeId];
  if (nodeRel) {
    if (nodeRel.parents?.includes(hoveredId)) return 'child';
    if (nodeRel.children?.includes(hoveredId)) return 'parent';
    if (nodeRel.spouse?.includes(hoveredId)) return 'spouse';
    if (nodeRel.siblings?.includes(hoveredId)) return 'sibling';
  }

  return null;
};

// Relation highlight styles
const relationStyles = {
  self: { border: '#D4AF37', shadow: 'rgba(212,175,55,0.6)', bg: 'rgba(212,175,55,0.18)', label: 'SELECTED', text: '#D4AF37' },
  parent: { border: '#a78bfa', shadow: 'rgba(167,139,250,0.6)', bg: 'rgba(167,139,250,0.18)', label: 'PARENT', text: '#c4b5fd' },
  spouse: { border: '#ec4899', shadow: 'rgba(236,72,153,0.6)', bg: 'rgba(236,72,153,0.18)', label: 'SPOUSE', text: '#f472b6' },
  child: { border: '#10b981', shadow: 'rgba(16,185,129,0.6)', bg: 'rgba(16,185,129,0.18)', label: 'CHILD / SON', text: '#34d399' },
  sibling: { border: '#0d9488', shadow: 'rgba(13,148,136,0.6)', bg: 'rgba(13,148,136,0.18)', label: 'SIBLING / BROTHER', text: '#2dd4bf' },
};

const FamilyTreeSection: React.FC = () => {
  const [hoveredCharId, setHoveredCharId] = useState<string | null>(null);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [lineageFilter, setLineageFilter] = useState<'all' | 'pandava' | 'kaurava' | 'ancestors'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getCharDetails = (id: string): Character | undefined => {
    return characters.find(c => c.id === id);
  };

  const isNodeFiltered = (node: TreeNode): boolean => {
    if (lineageFilter === 'all') return true;
    if (lineageFilter === 'pandava') {
      const pandavaLine = [
        'pandu', 'kunti', 'madri', 'vidura',
        'yudhishthira', 'bhima', 'arjuna', 'draupadi', 'subhadra', 'nakula', 'sahadeva',
        'abhimanyu', 'uttara', 'parikshit'
      ];
      return pandavaLine.includes(node.id);
    }
    if (lineageFilter === 'kaurava') {
      const kauravaLine = [
        'dhritarashtra', 'gandhari', 'bhishma',
        'duryodhana', 'shakuni', 'karna', 'lakshmana'
      ];
      return kauravaLine.includes(node.id);
    }
    if (lineageFilter === 'ancestors') {
      const ancestorsLine = [
        'shantanu', 'ganga', 'satyavati', 'vyasa', 'vichitravirya'
      ];
      return ancestorsLine.includes(node.id);
    }
    return true;
  };

  const isSearchMatch = (node: TreeNode): boolean => {
    if (!searchQuery.trim()) return false;
    const lowerQ = searchQuery.toLowerCase();
    const char = getCharDetails(node.id);
    return (
      node.name.toLowerCase().includes(lowerQ) ||
      node.id.toLowerCase().includes(lowerQ) ||
      (char?.title?.toLowerCase().includes(lowerQ) ?? false) ||
      (char?.role?.toLowerCase().includes(lowerQ) ?? false)
    );
  };

  const activeHoveredDetails = hoveredCharId ? getCharDetails(hoveredCharId) : null;

  // Node Component
  const renderNode = (node: TreeNode) => {
    const charDetails = getCharDetails(node.id);
    const side = charDetails ? sideColors[charDetails.side] : sideColors.neutral;
    const isFilteredOut = !isNodeFiltered(node);
    const isMatched = searchQuery ? isSearchMatch(node) : false;

    // Check relationship to currently hovered card
    const relationType = hoveredCharId ? getRelationType(node.id, hoveredCharId) : null;
    const relationTheme = relationType ? relationStyles[relationType] : null;

    // Calculate node state
    const isHovered = hoveredCharId === node.id;
    const hasFocus = hoveredCharId !== null;
    const isDimmed = hasFocus && !relationType && !isHovered;

    // Border and background styling based on relationship highlights
    const nodeBorderColor = isMatched
      ? '#D4AF37'
      : relationTheme
      ? relationTheme.border
      : charDetails
      ? `${charDetails.color}44`
      : 'rgba(212,175,55,0.2)';

    const nodeBgColor = isMatched
      ? 'rgba(212,175,55,0.18)'
      : relationTheme
      ? relationTheme.bg
      : 'rgba(10,22,40,0.7)';

    return (
      <motion.div
        key={node.id}
        className={`relative flex flex-col items-center p-4 rounded-xl border text-center transition-all duration-300 select-none ${
          isFilteredOut ? 'opacity-20 blur-[1px] scale-95' : isDimmed ? 'opacity-15 blur-[0.5px] scale-95' : 'opacity-100'
        } ${charDetails ? 'cursor-pointer hover:scale-105' : 'cursor-default'}`}
        style={{
          background: nodeBgColor,
          borderColor: nodeBorderColor,
          boxShadow: isMatched || relationTheme
            ? `0 0 25px ${relationTheme?.shadow || 'rgba(212,175,55,0.3)'}`
            : 'none',
        }}
        onMouseEnter={() => setHoveredCharId(node.id)}
        onMouseLeave={() => setHoveredCharId(null)}
        onClick={() => charDetails && setSelectedChar(charDetails)}
        layoutId={`node-card-${node.id}`}
      >
        {/* Relationship Label Badge */}
        <AnimatePresence>
          {relationTheme && (
            <motion.span
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-3.5 px-2.5 py-0.5 rounded font-display text-[8px] font-black tracking-widest border shadow-lg z-20"
              style={{
                backgroundColor: '#050e1a',
                borderColor: relationTheme.border,
                color: relationTheme.text,
              }}
            >
              {relationTheme.label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Character Symbol/Photo */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2.5 border shadow-inner transition-transform duration-300"
          style={{
            background: charDetails ? `${charDetails.color}15` : 'rgba(255,255,255,0.05)',
            borderColor: relationTheme ? relationTheme.border : charDetails ? `${charDetails.color}35` : 'rgba(212,175,55,0.25)',
          }}
        >
          {charDetails?.symbol || '👤'}
        </div>

        {/* Name (Larger & bolder) */}
        <h4 className="font-display text-sm md:text-base text-white tracking-wide font-black mb-1">
          {charDetails?.name || node.name}
        </h4>

        {/* Relation Text (Larger, bold, colored badge) */}
        <div className="font-serif text-[11px] font-semibold text-yellow-300 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-0.5 rounded-full mt-1 inline-block">
          {node.relationText}
        </div>

        {/* Faction Badge */}
        {charDetails && (
          <span
            className="mt-2.5 px-2 py-0.5 rounded-[4px] font-display text-[9px] tracking-widest"
            style={{
              background: side.bg,
              border: `1px solid ${side.border}`,
              color: side.text,
            }}
          >
            {side.label}
          </span>
        )}
      </motion.div>
    );
  };

  return (
    <section id="characters" className="relative py-28 px-4 overflow-hidden" style={{ background: '#050e1a' }}>
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] rounded-full bg-red-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] rounded-full bg-yellow-950/10 blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="font-devanagari text-yellow-400/50 text-2xl mb-4">
            कुरु वंश वृक्ष
          </div>
          <h2 className="section-heading font-display mb-4">
            <span className="gold-text">Kuru Family Tree</span>
          </h2>
          <p className="font-serif text-lg text-yellow-100/60 max-w-3xl mx-auto leading-relaxed">
            Trace the bloodline from the divine founders and King Shantanu down to the epic clash of cousins 
            and the sole successor, Parikshit. **Hover over any character** to trace their immediate parents, 
            spouse, children, and siblings dynamically!
          </p>
          <div className="section-divider mt-8">
            <span className="section-divider-icon">👑</span>
          </div>
        </div>

        {/* Legend Panel & Controls */}
        <div className="flex flex-col gap-6 p-5 rounded-2xl glass-dark mb-12 border border-yellow-400/15">
          
          {/* Top Row: Legend Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 px-4 py-2 border-b border-yellow-400/10 pb-4">
            <span className="font-display text-[9px] tracking-[0.15em] text-yellow-400/40 uppercase">
              INTERACTIVE RELATION LEGEND:
            </span>
            <div className="flex flex-wrap gap-4 items-center text-xs font-serif text-yellow-100/80">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded border bg-yellow-400/20" style={{ borderColor: '#D4AF37' }} />
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded border bg-purple-400/20" style={{ borderColor: '#a78bfa' }} />
                <span>Parent</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded border bg-pink-400/20" style={{ borderColor: '#ec4899' }} />
                <span>Spouse</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded border bg-emerald-400/20" style={{ borderColor: '#10b981' }} />
                <span>Child / Descendant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded border bg-teal-400/20" style={{ borderColor: '#0d9488' }} />
                <span>Sibling / Brother</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: Search & Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search bar */}
            <div className="relative w-full md:w-80">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-yellow-400/40 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search characters, weapons, titles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-yellow-400/20 rounded-full py-2.5 pl-10 pr-4 text-xs font-serif text-yellow-100/90 placeholder-yellow-400/30 focus:outline-none focus:border-yellow-400/60 focus:ring-1 focus:ring-yellow-400/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400/50 hover:text-yellow-400 text-sm"
                >
                  ×
                </button>
              )}
            </div>

            {/* Lineage filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { key: 'all', label: 'All Dynasty' },
                { key: 'ancestors', label: '🔱 Ancestors' },
                { key: 'kaurava', label: '👑 Kaurava Branch' },
                { key: 'pandava', label: '⚔️ Pandava Branch' },
              ].map(f => (
                <button
                  key={f.key}
                  onClick={() => setLineageFilter(f.key as typeof lineageFilter)}
                  className={`px-4 py-2 rounded-full font-display text-[10px] tracking-wider transition-all cursor-pointer ${
                    lineageFilter === f.key
                      ? 'bg-yellow-500/20 border-yellow-400/60 text-yellow-400 border'
                      : 'border border-yellow-400/10 text-yellow-400/40 hover:border-yellow-400/30 hover:text-yellow-400/70'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Family Tree Layout Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Main Tree Grid (Takes 3 columns on large screens) */}
          <div className="lg:col-span-3 flex flex-col gap-14 relative">
            
            {/* Visual connector lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* SVG connection lines will render overlay paths */}
              </svg>
            </div>

            {/* Generation 1: Founders */}
            <div className="relative z-10 p-5 rounded-2xl border border-yellow-400/5 bg-black/10">
              <div className="text-[11px] font-display font-black tracking-[0.25em] text-yellow-400/45 mb-5 text-center">
                GENERATION 1 — THE DYNASTY FOUNDERS
              </div>
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                {familyNodes.filter(n => n.generation === 1).map(renderNode)}
              </div>
            </div>

            {/* Generation 2: Elders */}
            <div className="relative z-10 p-5 rounded-2xl border border-yellow-400/5 bg-black/10">
              <div className="text-[11px] font-display font-black tracking-[0.25em] text-yellow-400/45 mb-5 text-center">
                GENERATION 2 — THE ELDERS & SAGES
              </div>
              
              {/* Kuru Princes & Sages */}
              <div className="text-[9px] font-display font-bold tracking-widest text-yellow-400/30 mb-3 text-center">
                KURU PRINCES & ROYAL SAGES
              </div>
              <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mb-6">
                {familyNodes.filter(n => n.generation === 2 && !['amba', 'ambika', 'ambalika'].includes(n.id)).map(renderNode)}
              </div>

              {/* Princesses of Kashi */}
              <div className="text-[9px] font-display font-bold tracking-widest text-yellow-400/30 mb-3 text-center border-t border-yellow-400/5 pt-4">
                THE PRINCESSES OF KASHI
              </div>
              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                {familyNodes.filter(n => n.generation === 2 && ['amba', 'ambika', 'ambalika'].includes(n.id)).map(renderNode)}
              </div>
            </div>

            {/* Generation 3: Parents */}
            <div className="relative z-10 p-5 rounded-2xl border border-yellow-400/5 bg-black/10">
              <div className="text-[11px] font-display font-black tracking-[0.25em] text-yellow-400/45 mb-5 text-center">
                GENERATION 3 — THE ROYAL SUCCESSION
              </div>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-stretch max-w-5xl mx-auto">
                {/* Left: Kaurava parents */}
                <div className="md:col-span-3 grid grid-cols-2 gap-3 p-4 rounded-xl border border-red-500/10 bg-red-500/5 relative">
                  <div className="absolute top-2 left-3.5 text-[9px] font-display font-black tracking-widest text-red-400/50 uppercase">Kaurava Elders</div>
                  <div className="col-span-2 h-4" />
                  {familyNodes.filter(n => n.generation === 3 && n.branch === 'kaurava').map(renderNode)}
                </div>

                {/* Center: Prime Minister Advisor */}
                <div className="md:col-span-1 flex flex-col justify-center items-center p-2">
                  {familyNodes.filter(n => n.generation === 3 && n.id === 'vidura').map(renderNode)}
                </div>

                {/* Right: Pandava parents */}
                <div className="md:col-span-3 grid grid-cols-3 gap-3 p-4 rounded-xl border border-blue-500/10 bg-blue-500/5 relative">
                  <div className="absolute top-2 left-3.5 text-[9px] font-display font-black tracking-widest text-blue-400/50 uppercase">Pandava Elders</div>
                  <div className="col-span-3 h-4" />
                  {familyNodes.filter(n => n.generation === 3 && n.branch === 'pandava' && n.id !== 'vidura').map(renderNode)}
                </div>
              </div>
            </div>

            {/* Generation 4: Princes & Cousins */}
            <div className="relative z-10 p-5 rounded-2xl border border-yellow-400/5 bg-black/10">
              <div className="text-[11px] font-display font-black tracking-[0.25em] text-yellow-400/45 mb-5 text-center">
                GENERATION 4 — THE PRINCES, COUSINS & SPOUSES
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-7 gap-5 items-stretch max-w-5xl mx-auto">
                {/* Left: Kaurava Cousins */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-3 p-4 rounded-xl border border-red-500/10 bg-red-500/5 relative">
                  <div className="absolute top-2 left-3.5 text-[9px] font-display font-black tracking-widest text-red-400/50 uppercase">Kaurava Clan</div>
                  <div className="col-span-2 h-4" />
                  {familyNodes.filter(n => n.generation === 4 && n.branch === 'kaurava').map(renderNode)}
                </div>

                {/* Center: Shared Wife Draupadi */}
                <div className="lg:col-span-1 flex flex-col justify-center items-center p-2 relative">
                  <div className="w-[1px] lg:w-8 h-8 lg:h-[1px] bg-yellow-400/15 absolute -top-8 lg:top-1/2 left-1/2 lg:-left-8" />
                  <div className="w-[1px] lg:w-8 h-8 lg:h-[1px] bg-yellow-400/15 absolute -bottom-8 lg:top-1/2 left-1/2 lg:-right-8" />
                  {familyNodes.filter(n => n.generation === 4 && n.id === 'draupadi').map(renderNode)}
                </div>

                {/* Right: Pandava Cousins */}
                <div className="lg:col-span-4 grid grid-cols-3 gap-3 p-4 rounded-xl border border-blue-500/10 bg-blue-500/5 relative">
                  <div className="absolute top-2 left-3.5 text-[9px] font-display font-black tracking-widest text-blue-400/50 uppercase">Pandavas & Wives</div>
                  <div className="col-span-3 h-4" />
                  {familyNodes.filter(n => n.generation === 4 && n.branch === 'pandava' && n.id !== 'draupadi').map(renderNode)}
                </div>
              </div>
            </div>

            {/* Generation 5: Descendants */}
            <div className="relative z-10 p-5 rounded-2xl border border-yellow-400/5 bg-black/10">
              <div className="text-[11px] font-display font-black tracking-[0.25em] text-yellow-400/45 mb-5 text-center">
                GENERATION 5 — THE HEIRS & DESCENDANTS
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
                {/* Kaurava child line */}
                <div className="flex justify-center p-4 rounded-xl border border-red-500/10 bg-red-500/5 relative">
                  <div className="absolute top-2 left-3.5 text-[9px] font-display font-black tracking-widest text-red-400/50 uppercase">Kaurava Heir</div>
                  <div className="h-4" />
                  {familyNodes.filter(n => n.generation === 5 && n.branch === 'kaurava').map(renderNode)}
                </div>

                {/* Pandava child line */}
                <div className="grid grid-cols-2 gap-3 p-4 rounded-xl border border-blue-500/10 bg-blue-500/5 relative">
                  <div className="absolute top-2 left-3.5 text-[9px] font-display font-black tracking-widest text-blue-400/50 uppercase">Pandava Heirs</div>
                  <div className="col-span-2 h-4" />
                  {familyNodes.filter(n => n.generation === 5 && n.branch === 'pandava').map(renderNode)}
                </div>
              </div>
            </div>

            {/* Generation 6: Successor Parikshit */}
            <div className="relative z-10 p-5 rounded-2xl border border-yellow-400/5 bg-black/10">
              <div className="text-[11px] font-display font-black tracking-[0.25em] text-yellow-400/45 mb-5 text-center">
                GENERATION 6 — THE SUCCESSOR (SOLE SURVIVOR)
              </div>
              <div className="flex justify-center max-w-sm mx-auto">
                {familyNodes.filter(n => n.generation === 6).map(renderNode)}
              </div>
            </div>

          </div>

          {/* Right/Side Character Detail Scroll Overlay (Takes 1 column on large screens) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                {activeHoveredDetails ? (
                  <motion.div
                    key={`scroll-${activeHoveredDetails.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 rounded-2xl border bg-gradient-to-b from-yellow-500/5 to-yellow-950/20 text-yellow-100/90 relative shadow-2xl border-yellow-400/30"
                    style={{ boxShadow: `0 0 35px ${activeHoveredDetails.color}15` }}
                  >
                    {/* Watermark symbol background */}
                    <div className="absolute right-4 top-4 text-8xl opacity-[0.03] select-none font-serif">
                      {activeHoveredDetails.symbol}
                    </div>

                    <span className="font-display text-[9px] tracking-widest text-yellow-400/50 uppercase block mb-1">
                      {activeHoveredDetails.side.toUpperCase()} • {activeHoveredDetails.role.split(',')[0]}
                    </span>

                    <h3 className="font-devanagari text-2xl text-yellow-400 mb-1 leading-none">
                      {activeHoveredDetails.sanskritName}
                    </h3>
                    <h3 className="font-display text-lg text-white font-bold tracking-wide mb-2">
                      {activeHoveredDetails.name}
                    </h3>

                    <p className="font-serif text-xs text-yellow-100/60 italic mb-4 border-b border-yellow-400/10 pb-3">
                      "{activeHoveredDetails.title}"
                    </p>

                    <div className="space-y-4 text-xs font-serif leading-relaxed font-medium">
                      <div>
                        <span className="font-display text-[9px] text-yellow-400/40 tracking-wider block mb-0.5">BIOGRAPHY</span>
                        <p className="text-yellow-100/70">{activeHoveredDetails.bio}</p>
                      </div>

                      {activeHoveredDetails.weapons.length > 0 && (
                        <div>
                          <span className="font-display text-[9px] text-yellow-400/40 tracking-wider block mb-0.5">PRIMARY WEAPONS</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {activeHoveredDetails.weapons.map((w, idx) => (
                              <span key={idx} className="bg-yellow-400/5 border border-yellow-400/10 rounded px-1.5 py-0.5 text-[10px]">
                                {w}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="font-display text-[9px] text-yellow-400/40 tracking-wider block mb-0.5">⚖️ DHARMIC DILEMMA</span>
                        <p className="text-yellow-100/60 italic border-l-2 border-yellow-400/20 pl-2 bg-yellow-400/[0.01] py-1">
                          {activeHoveredDetails.moralDilemma}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-yellow-400/10 text-center">
                      <span className="text-[10px] text-yellow-400/40 italic block animate-pulse">
                        Click card to open full lore & events
                      </span>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div
                    key="no-scroll"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 rounded-2xl border border-dashed border-yellow-400/10 bg-black/10 text-yellow-400/30 text-center py-20 font-serif"
                  >
                    <div className="text-4xl mb-3">📜</div>
                    <p className="text-xs">Hover over any node in the family tree to summon the sacred character scroll.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>

      {/* Character Lore Modal */}
      <AnimatePresence>
        {selectedChar && (
          <CharacterModal character={selectedChar} onClose={() => setSelectedChar(null)} />
        )}
      </AnimatePresence>

    </section>
  );
};

export default FamilyTreeSection;
