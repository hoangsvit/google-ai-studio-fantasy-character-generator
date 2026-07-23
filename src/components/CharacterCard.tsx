import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Shield, 
  BookmarkPlus, 
  Check, 
  Copy, 
  Sparkles, 
  Zap, 
  Dices, 
  Quote as QuoteIcon,
  Crown,
  ScrollText
} from 'lucide-react';
import { FantasyCharacter } from '../types';
import { CHARACTER_CLASSES } from '../data/fantasyData';
import { ClassIcon } from './ClassIcon';
import { CharacterPortrait } from './CharacterPortrait';
import { PortraitGenerator } from './PortraitGenerator';

interface CharacterCardProps {
  character: FantasyCharacter;
  onSaveParty?: (character: FantasyCharacter) => void;
  isSaved?: boolean;
  onRerollSingleAttr?: (type: 'stats' | 'ability' | 'backstory') => void;
  onUpdateBackstory?: (newBackstory: string) => void;
}

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Heart, 
  Shield, 
  Check, 
  Copy, 
  Sparkles, 
  Zap, 
  Dices, 
  Quote as QuoteIcon,
  Crown,
  ScrollText,
  Swords,
  Flame,
  Layers,
  BookmarkCheck
} from 'lucide-react';
import { FantasyCharacter } from '../types';
import { CHARACTER_CLASSES } from '../data/fantasyData';
import { ClassIcon } from './ClassIcon';
import { CharacterPortrait } from './CharacterPortrait';
import { PortraitGenerator } from './PortraitGenerator';

interface CharacterCardProps {
  character: FantasyCharacter;
  onSaveParty?: (character: FantasyCharacter) => void;
  isSaved?: boolean;
  onRerollSingleAttr?: (type: 'stats' | 'ability' | 'backstory') => void;
  onUpdateBackstory?: (newBackstory: string) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onSaveParty,
  isSaved = false,
  onRerollSingleAttr,
  onUpdateBackstory,
}) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
  const [currentBackstory, setCurrentBackstory] = useState(character.backstory);

  useEffect(() => {
    setCurrentBackstory(character.backstory);
  }, [character.id, character.backstory]);

  const classInfo = CHARACTER_CLASSES[character.characterClass];

  const handleGenerateBackstory = async () => {
    setIsGeneratingBackstory(true);
    try {
      const response = await fetch('/api/generate-backstory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: character.fullName,
          title: character.title,
          race: character.race,
          characterClass: character.characterClass,
          alignment: character.alignment,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.backstory) {
          setCurrentBackstory(data.backstory);
          character.backstory = data.backstory;
          if (onUpdateBackstory) {
            onUpdateBackstory(data.backstory);
          }
        }
      }
    } catch (err) {
      console.error('Failed to generate backstory:', err);
    } finally {
      setIsGeneratingBackstory(false);
    }
  };

  const handleCopy = () => {
    const text = `
🃏 PLAYER CARD: ${character.fullName} (${character.title})
🛡️ Race: ${character.race} | Class: ${character.characterClass} | Level: ${character.level}
❤️ Health: ${character.health} HP | 🧪 Mana: ${character.mana} MP | ⚔️ Strength: ${character.strength} STR
🛡️ Armor Class: ${character.armorClass} AC | ✨ Alignment: ${character.alignment}

📊 CORE ATTRIBUTES:
- STR: ${character.stats.strength}
- DEX: ${character.stats.dexterity}
- CON: ${character.stats.constitution}
- INT: ${character.stats.intelligence}
- WIS: ${character.stats.wisdom}
- CHA: ${character.stats.charisma}

⚡ SIGNATURE ABILITY: ${character.specialAbility.name}
"${character.specialAbility.description}"

📖 BACKSTORY:
"${currentBackstory}"
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getModifier = (val: number) => {
    const mod = Math.floor((val - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  return (
    <motion.div
      key={character.id}
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative w-full rounded-3xl p-1.5 md:p-2.5 bg-gradient-to-b from-amber-500/40 via-amber-700/20 to-slate-900 border-2 border-amber-500/70 shadow-[0_0_35px_rgba(245,158,11,0.2)] ring-1 ring-amber-400/40"
    >
      {/* Inner Card Framing Container */}
      <div className="relative w-full h-full rounded-[22px] bg-slate-950/95 border border-amber-500/30 p-5 md:p-7 overflow-hidden backdrop-blur-md flex flex-col gap-6">

        {/* Decorative Corner Metallic Accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-400/80 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-400/80 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-400/80 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-400/80 pointer-events-none" />

        {/* Watermark Class Aura */}
        <div className={`absolute -top-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-br ${classInfo.themeColor.gradient} opacity-15 blur-3xl pointer-events-none`} />

        {/* Player Card Header Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b-2 border-amber-500/30 pb-5">
          <div className="flex items-center gap-3.5">
            <div className={`flex items-center justify-center p-3.5 rounded-2xl border-2 ${classInfo.themeColor.border} ${classInfo.themeColor.bg} ${classInfo.themeColor.text} shadow-lg shadow-amber-900/20`}>
              <ClassIcon characterClass={character.characterClass} className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-md">
                  PLAYER CARD • LVL {character.level}
                </span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${classInfo.themeColor.badge}`}>
                  {character.characterClass}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100 mt-1">
                {character.fullName}
              </h2>
              <p className="text-xs font-semibold text-amber-300/90 flex items-center gap-1 mt-0.5">
                <Crown className="w-3.5 h-3.5" />
                {character.title}
              </p>
            </div>
          </div>

          {/* Action Header Buttons (Save to Deck & Copy) */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
              title="Copy player card details"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Share'}
            </button>

            {onSaveParty && (
              <button
                onClick={() => onSaveParty(character)}
                disabled={isSaved}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black border transition-all ${
                  isSaved
                    ? 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300 cursor-default shadow-md shadow-emerald-950/50'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-400 shadow-lg shadow-amber-900/30 active:scale-95 cursor-pointer'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                {isSaved ? 'Saved in Deck' : 'Save to Deck'}
              </button>
            )}
          </div>
        </div>

        {/* PROMINENT PLAYER CARD RANDOM STATS (Health, Mana, Strength) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-900/90 border-2 border-amber-500/40 shadow-inner">
          {/* Health Stat */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-red-950/70 to-slate-950 border border-red-800/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30">
                <Heart className="w-5 h-5 fill-red-500/20" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-red-300/80">Health</span>
                <p className="text-xl font-black text-slate-100">{character.health} <span className="text-xs text-red-400 font-bold">HP</span></p>
              </div>
            </div>
            <div className="h-8 w-1.5 rounded-full bg-red-600/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          </div>

          {/* Mana Stat */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-blue-950/70 to-slate-950 border border-blue-800/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Flame className="w-5 h-5 fill-blue-500/20" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-300/80">Mana</span>
                <p className="text-xl font-black text-slate-100">{character.mana} <span className="text-xs text-blue-400 font-bold">MP</span></p>
              </div>
            </div>
            <div className="h-8 w-1.5 rounded-full bg-blue-500/80 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          </div>

          {/* Strength Stat */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-950/70 to-slate-950 border border-amber-800/50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/30">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300/80">Strength</span>
                <p className="text-xl font-black text-slate-100">{character.strength} <span className="text-xs text-amber-400 font-bold">STR</span></p>
              </div>
            </div>
            <div className="h-8 w-1.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Portrait & Key Attributes */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <CharacterPortrait
              characterClass={character.characterClass}
              race={character.race}
              skinTone={character.portraitSeed.skinTone}
              hairColor={character.portraitSeed.hairColor}
              eyeColor={character.portraitSeed.eyeColor}
              avatarStyle={character.portraitSeed.avatarStyle}
              className="w-full h-48 md:h-56 shadow-inner rounded-xl border border-amber-500/30"
            />

            <PortraitGenerator
              character={character}
              onPortraitGenerated={(url) => {
                character.aiPortraitUrl = url;
              }}
            />

            {/* Armor Class & Race/Class info */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="p-2 rounded-lg bg-emerald-950/50 text-emerald-400 border border-emerald-800/40">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Armor Class</p>
                  <p className="text-base font-black text-slate-100">{character.armorClass} AC</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="p-2 rounded-lg bg-purple-950/50 text-purple-400 border border-purple-800/40">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Alignment</p>
                  <p className="text-xs font-bold text-slate-200 truncate">{character.alignment}</p>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Race:</span>
                <span className="font-bold text-amber-300">{character.race}</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Class:</span>
                <span className="font-bold text-slate-100">{character.characterClass}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Attributes, Ability & Backstory */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            
            {/* Ability Scores Grid */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 md:p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Attribute Modifiers
                </h3>
                {onRerollSingleAttr && (
                  <button
                    onClick={() => onRerollSingleAttr('stats')}
                    className="flex items-center gap-1 text-[11px] font-semibold text-amber-400/80 hover:text-amber-300 transition-colors"
                  >
                    <Dices className="w-3.5 h-3.5" />
                    Re-roll Stats
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { name: 'STR', label: 'Strength', value: character.stats.strength },
                  { name: 'DEX', label: 'Dexterity', value: character.stats.dexterity },
                  { name: 'CON', label: 'Constitution', value: character.stats.constitution },
                  { name: 'INT', label: 'Intelligence', value: character.stats.intelligence },
                  { name: 'WIS', label: 'Wisdom', value: character.stats.wisdom },
                  { name: 'CHA', label: 'Charisma', value: character.stats.charisma },
                ].map((stat) => {
                  const isPrimary = classInfo.primaryStat.substring(0, 3).toUpperCase() === stat.name;
                  const percentage = Math.min(100, Math.max(10, (stat.value / 20) * 100));

                  return (
                    <div
                      key={stat.name}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isPrimary
                          ? 'bg-amber-950/30 border-amber-500/40'
                          : 'bg-slate-950/60 border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-0.5">
                        <span className={`font-bold ${isPrimary ? 'text-amber-300' : 'text-slate-400'}`}>
                          {stat.name}
                        </span>
                        <span className="font-mono text-slate-400 text-[11px]">
                          ({getModifier(stat.value)})
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-lg font-extrabold text-slate-100">{stat.value}</span>
                        <span className="text-[10px] text-slate-500 truncate max-w-[70px]">{stat.label}</span>
                      </div>

                      <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className={`h-full rounded-full ${
                            isPrimary ? 'bg-amber-400' : 'bg-slate-400'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Signature Ability */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 md:p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Signature Ability
                </h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${classInfo.themeColor.badge}`}>
                  {character.specialAbility.name}
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {character.specialAbility.description}
              </p>
            </div>

            {/* Backstory Lore & Quote */}
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 md:p-5 space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <ScrollText className="w-4 h-4 text-amber-400" />
                    Character Lore & Origin
                  </h3>

                  <button
                    onClick={handleGenerateBackstory}
                    disabled={isGeneratingBackstory}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      isGeneratingBackstory
                        ? 'bg-slate-800 border-slate-700 text-slate-400 opacity-70 cursor-not-allowed'
                        : 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/50 active:scale-95'
                    }`}
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${isGeneratingBackstory ? 'animate-spin' : 'text-amber-400'}`} />
                    {isGeneratingBackstory ? 'Generating Story...' : 'Generate Backstory'}
                  </button>
                </div>

                <p className="text-xs md:text-sm text-slate-300 italic leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  "{currentBackstory}"
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-start gap-2 text-xs text-amber-300/80">
                <QuoteIcon className="w-4 h-4 shrink-0 mt-0.5 text-amber-400/60" />
                <p className="font-serif italic">"{character.quote}"</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
};
