export type CharacterClassType = 
  | 'Warrior' 
  | 'Mage' 
  | 'Rogue' 
  | 'Paladin' 
  | 'Ranger' 
  | 'Cleric' 
  | 'Bard' 
  | 'Warlock' 
  | 'Druid' 
  | 'Monk' 
  | 'Necromancer' 
  | 'Sorcerer' 
  | 'Barbarian';

export type CharacterRace = 
  | 'Human' 
  | 'Elf' 
  | 'Dwarf' 
  | 'Halfling' 
  | 'Dragonborn' 
  | 'Tiefling' 
  | 'Gnome' 
  | 'Half-Orc' 
  | 'Aamar';

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface ClassInfo {
  name: CharacterClassType;
  description: string;
  iconName: string;
  primaryStat: keyof CharacterStats;
  themeColor: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    glow: string;
    gradient: string;
  };
  startingEquipment: string[];
  signatureAbilities: { name: string; description: string; cooldown: string }[];
}

export interface FantasyCharacter {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  fullName: string;
  characterClass: CharacterClassType;
  race: CharacterRace;
  level: number;
  stats: CharacterStats;
  health: number;
  mana: number;
  strength: number;
  hitPoints: number;
  armorClass: number;
  alignment: string;
  specialAbility: { name: string; description: string };
  backstory: string;
  quote: string;
  portraitSeed: {
    skinTone: string;
    hairColor: string;
    eyeColor: string;
    avatarStyle: number;
  };
  aiPortraitUrl?: string;
  createdAt: number;
}

export interface GenerationFilterLocks {
  classLocked: boolean;
  lockedClass?: CharacterClassType;
  raceLocked: boolean;
  lockedRace?: CharacterRace;
}
