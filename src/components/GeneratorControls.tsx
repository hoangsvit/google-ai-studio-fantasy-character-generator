import React from 'react';
import { motion } from 'motion/react';
import { 
  Dices, 
  Lock, 
  Unlock, 
  Volume2, 
  VolumeX, 
  Filter, 
  Sparkles,
  Layers
} from 'lucide-react';
import { CharacterClassType, CharacterRace, GenerationFilterLocks } from '../types';
import { CHARACTER_CLASSES, CHARACTER_RACES } from '../data/fantasyData';

interface GeneratorControlsProps {
  onGenerate: () => void;
  isGenerating: boolean;
  locks: GenerationFilterLocks;
  onUpdateLocks: (updated: GenerationFilterLocks) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  partyCount: number;
  onOpenParty: () => void;
}

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  onGenerate,
  isGenerating,
  locks,
  onUpdateLocks,
  isMuted,
  onToggleMute,
  partyCount,
  onOpenParty,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
      {/* Primary Action Hero Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 md:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
        
        {/* Main Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full sm:w-auto flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 text-slate-950 font-black text-lg shadow-xl shadow-amber-900/30 hover:brightness-110 active:brightness-95 transition-all cursor-pointer"
        >
          <motion.div
            animate={isGenerating ? { rotate: 360 } : { rotate: 0 }}
            transition={isGenerating ? { repeat: Infinity, duration: 0.6, ease: 'linear' } : {}}
          >
            <Dices className="w-6 h-6" />
          </motion.div>
          <span>{isGenerating ? 'Rolling Dice...' : 'Generate Fantasy Hero'}</span>
          <Sparkles className="w-5 h-5 text-slate-950/80" />
        </motion.button>

        {/* Secondary Utility Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Audio Mute Toggle */}
          <button
            onClick={onToggleMute}
            className={`p-3.5 rounded-2xl border transition-all ${
              isMuted
                ? 'bg-slate-950/60 border-slate-800 text-slate-500 hover:text-slate-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
            }`}
            title={isMuted ? 'Unmute dice roll audio' : 'Mute dice roll audio'}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          {/* Deck Drawer Button */}
          <button
            onClick={onOpenParty}
            className="relative flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm font-black transition-all cursor-pointer"
          >
            <Layers className="w-5 h-5 text-amber-400" />
            <span className="hidden sm:inline">My Deck</span>
            {partyCount > 0 && (
              <span className="flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black shadow-md">
                {partyCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Lock & Customizer Options */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          Generation Locks (Optional)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          
          {/* Class Lock */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
            <button
              onClick={() => onUpdateLocks({ ...locks, classLocked: !locks.classLocked })}
              className={`p-2 rounded-lg transition-colors ${
                locks.classLocked
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              {locks.classLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </button>

            <span className="text-xs font-medium text-slate-300 w-16">Class:</span>

            <select
              disabled={!locks.classLocked}
              value={locks.lockedClass || 'Warrior'}
              onChange={(e) =>
                onUpdateLocks({
                  ...locks,
                  lockedClass: e.target.value as CharacterClassType,
                })
              }
              className={`flex-1 bg-slate-900 text-xs font-semibold rounded-lg p-2 border transition-all ${
                locks.classLocked
                  ? 'border-amber-500/50 text-amber-300'
                  : 'border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              {(Object.keys(CHARACTER_CLASSES) as CharacterClassType[]).map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Race Lock */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800">
            <button
              onClick={() => onUpdateLocks({ ...locks, raceLocked: !locks.raceLocked })}
              className={`p-2 rounded-lg transition-colors ${
                locks.raceLocked
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              {locks.raceLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </button>

            <span className="text-xs font-medium text-slate-300 w-16">Race:</span>

            <select
              disabled={!locks.raceLocked}
              value={locks.lockedRace || 'Human'}
              onChange={(e) =>
                onUpdateLocks({
                  ...locks,
                  lockedRace: e.target.value as CharacterRace,
                })
              }
              className={`flex-1 bg-slate-900 text-xs font-semibold rounded-lg p-2 border transition-all ${
                locks.raceLocked
                  ? 'border-amber-500/50 text-amber-300'
                  : 'border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              {CHARACTER_RACES.map((race) => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>
    </div>
  );
};
