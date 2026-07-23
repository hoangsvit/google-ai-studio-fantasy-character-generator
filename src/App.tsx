import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Dices, 
  History, 
  ShieldAlert, 
  Compass, 
  Wand2, 
  CheckCircle2,
  Crown
} from 'lucide-react';
import { FantasyCharacter, GenerationFilterLocks } from './types';
import { generateCharacter } from './utils/characterGenerator';
import { playDiceRollSound, playClickSound } from './utils/audio';
import { CharacterCard } from './components/CharacterCard';
import { GeneratorControls } from './components/GeneratorControls';
import { PartyDrawer } from './components/PartyDrawer';
import { ClassIcon } from './components/ClassIcon';

export default function App() {
  const [character, setCharacter] = useState<FantasyCharacter | null>(null);
  const [history, setHistory] = useState<FantasyCharacter[]>([]);
  const [party, setParty] = useState<FantasyCharacter[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPartyOpen, setIsPartyOpen] = useState(false);
  const [locks, setLocks] = useState<GenerationFilterLocks>({
    classLocked: false,
    raceLocked: false,
  });

  // Initial character generation on page load
  useEffect(() => {
    const initialChar = generateCharacter();
    setCharacter(initialChar);
    setHistory([initialChar]);
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    playDiceRollSound(isMuted);

    setTimeout(() => {
      const newChar = generateCharacter(locks);
      setCharacter(newChar);
      setHistory((prev) => [newChar, ...prev.slice(0, 9)]);
      setIsGenerating(false);
    }, 350);
  };

  const handleSaveToParty = (charToSave: FantasyCharacter) => {
    if (party.some((p) => p.id === charToSave.id)) return;
    playClickSound(isMuted);
    setParty((prev) => [...prev, charToSave]);
  };

  const handleRemoveFromParty = (id: string) => {
    playClickSound(isMuted);
    setParty((prev) => prev.filter((c) => c.id !== id));
  };

  const handleClearParty = () => {
    playClickSound(isMuted);
    setParty([]);
  };

  const handleRerollSingleAttr = (type: 'stats' | 'ability' | 'backstory') => {
    if (!character) return;
    playClickSound(isMuted);

    if (type === 'stats') {
      const reRolled = generateCharacter({
        classLocked: true,
        lockedClass: character.characterClass,
        raceLocked: true,
        lockedRace: character.race,
      });

      setCharacter({
        ...character,
        stats: reRolled.stats,
        hitPoints: reRolled.hitPoints,
        armorClass: reRolled.armorClass,
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 font-sans">
      {/* Background Decorative Ambient Flares */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[140px]" />
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-100 flex items-center gap-2">
                Fantasy Character Generator
              </h1>
              <p className="text-xs text-slate-400">Instant RPG Hero & NPC Creator</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/80 border border-slate-700 text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Randomized Lore & Stats
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12 flex-1 w-full space-y-8">
        
        {/* Controls Section */}
        <GeneratorControls
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          locks={locks}
          onUpdateLocks={setLocks}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(!isMuted)}
          partyCount={party.length}
          onOpenParty={() => setIsPartyOpen(true)}
        />

        {/* Display Active Character Card */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {character && (
              <CharacterCard
                key={character.id}
                character={character}
                onSaveParty={handleSaveToParty}
                isSaved={party.some((p) => p.id === character.id)}
                onRerollSingleAttr={handleRerollSingleAttr}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Session History Strip */}
        {history.length > 1 && (
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className="flex items-center gap-2">
                <History className="w-4 h-4 text-amber-400" />
                Recently Rolled Heroes
              </span>
              <span className="text-[11px] text-slate-500">{history.length} in history</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {history.map((hero) => {
                const isActive = character?.id === hero.id;
                return (
                  <button
                    key={hero.id}
                    onClick={() => {
                      playClickSound(isMuted);
                      setCharacter(hero);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-950/40 border-amber-500/50 text-amber-300 shadow-md'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <ClassIcon characterClass={hero.characterClass} className="w-4 h-4 shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold truncate">{hero.firstName}</p>
                      <p className="text-[10px] text-slate-500 truncate">{hero.characterClass}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>Fantasy Character Generator • Crafting Legendary Heroes, Names & Classes</p>
      </footer>

      {/* Party Drawer */}
      <PartyDrawer
        isOpen={isPartyOpen}
        onClose={() => setIsPartyOpen(false)}
        party={party}
        onRemoveCharacter={handleRemoveFromParty}
        onSelectCharacter={(char) => setCharacter(char)}
        onClearParty={handleClearParty}
      />
    </div>
  );
}
