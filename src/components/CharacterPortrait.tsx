import React from 'react';
import { CharacterClassType, CharacterRace } from '../types';
import { CHARACTER_CLASSES } from '../data/fantasyData';

interface CharacterPortraitProps {
  characterClass: CharacterClassType;
  race: CharacterRace;
  skinTone: string;
  hairColor: string;
  eyeColor: string;
  avatarStyle: number;
  className?: string;
}

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  characterClass,
  race,
  skinTone,
  hairColor,
  eyeColor,
  avatarStyle,
  className = '',
}) => {
  const classInfo = CHARACTER_CLASSES[characterClass];

  // Horns for Tiefling / Dragonborn features
  const isTiefling = race === 'Tiefling';
  const isDragonborn = race === 'Dragonborn';
  const isElf = race === 'Elf';

  // Hair style variations
  const hairStyleType = avatarStyle % 3;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl border ${classInfo.themeColor.border} ${classInfo.themeColor.bg} p-2 ${className}`}>
      {/* Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-t ${classInfo.themeColor.gradient} opacity-20 blur-lg`} />

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full relative z-10 drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="armorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={eyeColor} />
            <stop offset="100%" stopColor="#000" />
          </radialGradient>
        </defs>

        {/* Halo / Magic aura in background */}
        <circle cx="100" cy="100" r="82" stroke="currentColor" className={`${classInfo.themeColor.text} opacity-20`} strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Tiefling Horns */}
        {isTiefling && (
          <g fill="#2d2238" stroke="#181124" strokeWidth="2">
            <path d="M 65 70 C 40 40, 30 20, 50 15 C 60 25, 68 50, 72 65 Z" />
            <path d="M 135 70 C 160 40, 170 20, 150 15 C 140 25, 132 50, 128 65 Z" />
          </g>
        )}

        {/* Dragonborn Crest */}
        {isDragonborn && (
          <g fill="#884422" stroke="#441100" strokeWidth="1.5">
            <path d="M 70 50 L 100 20 L 130 50 Z" />
            <path d="M 85 40 L 100 10 L 115 40 Z" />
          </g>
        )}

        {/* Shoulders & Armor / Robes */}
        <path
          d="M 35 185 C 35 140, 60 130, 100 130 C 140 130, 165 140, 165 185 Z"
          fill="url(#armorGrad)"
          stroke="#4b5563"
          strokeWidth="2"
        />

        {/* Class Chestplate Accent */}
        {characterClass === 'Warrior' || characterClass === 'Paladin' || characterClass === 'Barbarian' ? (
          <path d="M 80 135 L 100 165 L 120 135 L 100 130 Z" fill="#d97706" opacity="0.8" />
        ) : characterClass === 'Mage' || characterClass === 'Cleric' || characterClass === 'Sorcerer' ? (
          <circle cx="100" cy="150" r="12" fill="#3b82f6" opacity="0.8" stroke="#93c5fd" strokeWidth="2" />
        ) : (
          <path d="M 70 140 L 100 155 L 130 140" stroke="#10b981" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        )}

        {/* Neck */}
        <rect x="88" y="110" width="24" height="25" rx="4" fill={skinTone} />

        {/* Head Base */}
        {isDragonborn ? (
          <path d="M 65 65 L 135 65 L 125 120 L 100 130 L 75 120 Z" fill={skinTone} stroke="#442200" strokeWidth="2" />
        ) : (
          <path d="M 68 65 C 68 45, 132 45, 132 65 C 132 100, 125 122, 100 122 C 75 122, 68 100, 68 65 Z" fill={skinTone} />
        )}

        {/* Elven Ears */}
        {isElf && (
          <g fill={skinTone}>
            <path d="M 68 75 C 45 65, 40 55, 66 65 Z" />
            <path d="M 132 75 C 155 65, 160 55, 134 65 Z" />
          </g>
        )}

        {/* Eyes */}
        <g>
          {/* Left Eye */}
          <ellipse cx="85" cy="78" rx="6" ry="4" fill="#ffffff" />
          <circle cx="85" cy="78" r="3" fill="url(#eyeGlow)" />
          <circle cx="86" cy="77" r="1" fill="#ffffff" />

          {/* Right Eye */}
          <ellipse cx="115" cy="78" rx="6" ry="4" fill="#ffffff" />
          <circle cx="115" cy="78" r="3" fill="url(#eyeGlow)" />
          <circle cx="116" cy="77" r="1" fill="#ffffff" />

          {/* Eyebrows */}
          <path d="M 77 71 Q 85 68 92 72" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
          <path d="M 108 72 Q 115 68 123 71" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Nose */}
        <path d="M 100 82 L 97 93 L 103 93" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Mouth */}
        <path d="M 92 104 Q 100 108 108 104" stroke="#4b5563" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Hair Styles */}
        {!isDragonborn && (
          <g fill={hairColor}>
            {hairStyleType === 0 && (
              /* Long flowing hair */
              <path d="M 65 65 C 60 30, 140 30, 135 65 C 140 85, 145 110, 140 130 C 130 115, 130 75, 128 65 C 115 50, 85 50, 72 65 C 70 75, 70 115, 60 130 C 55 110, 60 85, 65 65 Z" />
            )}
            {hairStyleType === 1 && (
              /* Short cropped / warrior cut */
              <path d="M 66 65 C 65 35, 135 35, 134 65 C 130 50, 115 42, 100 42 C 85 42, 70 50, 66 65 Z" />
            )}
            {hairStyleType === 2 && (
              /* Spiky / mage / rogue wild hair */
              <path d="M 62 65 L 58 45 L 75 35 L 88 22 L 100 32 L 112 20 L 125 35 L 142 45 L 138 65 C 128 48, 72 48, 62 65 Z" />
            )}
          </g>
        )}

        {/* Class Helm / Crown / Hood Accent */}
        {characterClass === 'Mage' || characterClass === 'Warlock' || characterClass === 'Necromancer' ? (
          <path d="M 60 55 C 80 20, 120 20, 140 55 C 130 45, 70 45, 60 55 Z" fill="#1e1b4b" opacity="0.6" />
        ) : characterClass === 'Rogue' ? (
          <path d="M 60 65 C 60 30, 140 30, 140 65 Q 100 40 60 65 Z" fill="#064e3b" opacity="0.8" />
        ) : null}
      </svg>
    </div>
  );
};
