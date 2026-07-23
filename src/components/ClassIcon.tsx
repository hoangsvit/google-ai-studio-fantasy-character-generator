import React from 'react';
import { 
  Swords, 
  Wand2, 
  Crosshair, 
  Shield, 
  Trees, 
  Sparkles, 
  Music, 
  Flame, 
  Feather, 
  Zap, 
  Skull, 
  Sun, 
  Axe,
  User
} from 'lucide-react';
import { CharacterClassType } from '../types';

interface ClassIconProps {
  characterClass: CharacterClassType;
  className?: string;
}

export const ClassIcon: React.FC<ClassIconProps> = ({ characterClass, className = 'w-5 h-5' }) => {
  switch (characterClass) {
    case 'Warrior':
      return <Swords className={className} />;
    case 'Mage':
      return <Wand2 className={className} />;
    case 'Rogue':
      return <Crosshair className={className} />;
    case 'Paladin':
      return <Shield className={className} />;
    case 'Ranger':
      return <Trees className={className} />;
    case 'Cleric':
      return <Sparkles className={className} />;
    case 'Bard':
      return <Music className={className} />;
    case 'Warlock':
      return <Flame className={className} />;
    case 'Druid':
      return <Feather className={className} />;
    case 'Monk':
      return <Zap className={className} />;
    case 'Necromancer':
      return <Skull className={className} />;
    case 'Sorcerer':
      return <Sun className={className} />;
    case 'Barbarian':
      return <Axe className={className} />;
    default:
      return <User className={className} />;
  }
};
