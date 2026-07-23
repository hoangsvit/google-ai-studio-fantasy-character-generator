import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trash2, 
  Layers, 
  Download, 
  Eye,
  Heart,
  Flame,
  Swords
} from 'lucide-react';
import { FantasyCharacter } from '../types';
import { ClassIcon } from './ClassIcon';
import { CHARACTER_CLASSES } from '../data/fantasyData';

interface PartyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  party: FantasyCharacter[];
  onRemoveCharacter: (id: string) => void;
  onSelectCharacter: (char: FantasyCharacter) => void;
  onClearParty: () => void;
}

export const PartyDrawer: React.FC<PartyDrawerProps> = ({
  isOpen,
  onClose,
  party,
  onRemoveCharacter,
  onSelectCharacter,
  onClearParty,
}) => {
  if (!isOpen) return null;

  const handleExportParty = () => {
    const text = party
      .map(
        (c) =>
          `• ${c.fullName} (${c.title}) - Level ${c.level} ${c.race} ${c.characterClass} [HP: ${c.health}, MP: ${c.mana}, STR: ${c.strength}]`
      )
      .join('\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my_player_card_deck_${party.length}_cards.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative z-10 w-full max-w-md h-full bg-slate-950 border-l border-amber-500/40 p-6 flex flex-col justify-between shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <Layers className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-black text-slate-100">My Deck</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {party.length} {party.length === 1 ? 'Card' : 'Cards'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Player Cards Deck List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {party.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-6">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-600 mb-3">
                  <Layers className="w-10 h-10" />
                </div>
                <p className="text-sm font-bold text-slate-300">Your Deck is Empty</p>
                <p className="text-xs text-slate-500 mt-1 max-w-[240px]">
                  Click <span className="text-amber-400 font-semibold">Save to Deck</span> on any player card to collect heroes in your deck.
                </p>
              </div>
            ) : (
              party.map((hero) => {
                const classInfo = CHARACTER_CLASSES[hero.characterClass];
                return (
                  <div
                    key={hero.id}
                    className="group flex flex-col gap-2 p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 hover:border-amber-500/60 transition-all shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2.5 rounded-xl border ${classInfo.themeColor.border} ${classInfo.themeColor.bg} ${classInfo.themeColor.text}`}
                        >
                          <ClassIcon characterClass={hero.characterClass} className="w-5 h-5" />
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                            {hero.fullName}
                          </h4>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <span>{hero.race}</span>
                            <span>•</span>
                            <span className="text-amber-400/90 font-medium">{hero.characterClass}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            onSelectCharacter(hero);
                            onClose();
                          }}
                          className="p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-slate-800 transition-colors"
                          title="View Player Card"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onRemoveCharacter(hero.id)}
                          className="p-2 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-950/50 transition-colors"
                          title="Remove from Deck"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Stats summary pill strip */}
                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-800/80 text-[10px] font-bold">
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-red-950/40 text-red-300 border border-red-800/40">
                        <Heart className="w-3 h-3 text-red-400 fill-red-500/20" />
                        <span>{hero.health} HP</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-blue-950/40 text-blue-300 border border-blue-800/40">
                        <Flame className="w-3 h-3 text-blue-400 fill-blue-500/20" />
                        <span>{hero.mana} MP</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 rounded bg-amber-950/40 text-amber-300 border border-amber-800/40">
                        <Swords className="w-3 h-3 text-amber-400" />
                        <span>{hero.strength} STR</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Actions */}
          {party.length > 0 && (
            <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
              <button
                onClick={handleExportParty}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
              >
                <Download className="w-4 h-4 text-amber-400" />
                Export My Deck
              </button>

              <button
                onClick={onClearParty}
                className="p-3 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 text-xs font-bold transition-colors"
                title="Clear Entire Deck"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
