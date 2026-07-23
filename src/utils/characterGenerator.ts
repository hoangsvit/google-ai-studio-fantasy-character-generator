import { 
  CharacterClassType, 
  CharacterRace, 
  CharacterStats, 
  FantasyCharacter, 
  GenerationFilterLocks 
} from '../types';
import { 
  ALIGNMENTS, 
  BACKSTORY_TEMPLATES, 
  CHARACTER_CLASSES, 
  CHARACTER_RACES, 
  FIRST_NAMES, 
  LAST_NAMES, 
  PORTRAIT_COLORS, 
  QUOTES, 
  TITLES 
} from '../data/fantasyData';

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Rolls 4d6, drops the lowest, returns sum (3 to 18)
function rollStat4d6DropLowest(): number {
  const dice = [
    getRandomInt(1, 6),
    getRandomInt(1, 6),
    getRandomInt(1, 6),
    getRandomInt(1, 6)
  ].sort((a, b) => b - a);
  return dice[0] + dice[1] + dice[2];
}

export function generateCharacter(locks?: GenerationFilterLocks): FantasyCharacter {
  const chosenClass: CharacterClassType = locks?.classLocked && locks.lockedClass
    ? locks.lockedClass
    : getRandomElement(Object.keys(CHARACTER_CLASSES) as CharacterClassType[]);

  const chosenRace: CharacterRace = locks?.raceLocked && locks.lockedRace
    ? locks.lockedRace
    : getRandomElement(CHARACTER_RACES);

  const classInfo = CHARACTER_CLASSES[chosenClass];

  // Base stats roll
  const rawStats: CharacterStats = {
    strength: rollStat4d6DropLowest(),
    dexterity: rollStat4d6DropLowest(),
    constitution: rollStat4d6DropLowest(),
    intelligence: rollStat4d6DropLowest(),
    wisdom: rollStat4d6DropLowest(),
    charisma: rollStat4d6DropLowest(),
  };

  // Boost primary stat for class flavor (+2 or +3)
  rawStats[classInfo.primaryStat] = Math.min(18, rawStats[classInfo.primaryStat] + getRandomInt(2, 4));

  // Race attribute adjustments
  if (chosenRace === 'Dwarf') rawStats.constitution += 2;
  if (chosenRace === 'Elf') rawStats.dexterity += 2;
  if (chosenRace === 'Human') {
    rawStats.strength += 1;
    rawStats.intelligence += 1;
  }
  if (chosenRace === 'Dragonborn') rawStats.strength += 2;
  if (chosenRace === 'Tiefling') rawStats.charisma += 2;
  if (chosenRace === 'Halfling') rawStats.dexterity += 2;
  if (chosenRace === 'Gnome') rawStats.intelligence += 2;
  if (chosenRace === 'Half-Orc') rawStats.strength += 2;
  if (chosenRace === 'Aamar') rawStats.wisdom += 2;

  // Cap stats at 20
  (Object.keys(rawStats) as (keyof CharacterStats)[]).forEach((key) => {
    rawStats[key] = Math.min(20, Math.max(3, rawStats[key]));
  });

  const conMod = Math.floor((rawStats.constitution - 10) / 2);
  const dexMod = Math.floor((rawStats.dexterity - 10) / 2);

  // Class specific hit dice base (d6, d8, d10, d12)
  let hitDiceBase = 8;
  if (['Warrior', 'Paladin', 'Ranger'].includes(chosenClass)) hitDiceBase = 10;
  if (['Barbarian'].includes(chosenClass)) hitDiceBase = 12;
  if (['Mage', 'Sorcerer', 'Necromancer'].includes(chosenClass)) hitDiceBase = 6;

  const level = 1;
  const hitPoints = Math.max(hitDiceBase + conMod, 6);

  // Player Card Core Stats (Health, Mana, Strength)
  const health = hitPoints * 15 + getRandomInt(40, 110);

  let manaBase = 60;
  if (['Mage', 'Sorcerer', 'Warlock', 'Necromancer'].includes(chosenClass)) {
    manaBase = 220 + rawStats.intelligence * 4;
  } else if (['Cleric', 'Druid', 'Paladin', 'Bard'].includes(chosenClass)) {
    manaBase = 150 + rawStats.wisdom * 3;
  } else {
    manaBase = 50 + rawStats.dexterity * 2;
  }
  const mana = manaBase + getRandomInt(10, 50);

  const strength = rawStats.strength * 5 + getRandomInt(5, 15);

  // Base Armor Class
  let baseArmor = 10;
  if (['Warrior', 'Paladin'].includes(chosenClass)) baseArmor = 16; // Chainmail/Plate
  else if (['Rogue', 'Ranger', 'Bard'].includes(chosenClass)) baseArmor = 12 + dexMod; // Leather
  else if (['Barbarian', 'Monk'].includes(chosenClass)) baseArmor = 10 + dexMod + Math.floor((rawStats.constitution - 10) / 2);
  else baseArmor = 10 + dexMod; // Robes

  const armorClass = Math.max(10, baseArmor);

  const firstName = getRandomElement(FIRST_NAMES);
  const lastName = getRandomElement(LAST_NAMES);
  const title = getRandomElement(TITLES);
  const fullName = `${firstName} ${lastName}`;

  const ability = getRandomElement(classInfo.signatureAbilities);
  const backstoryTemplate = getRandomElement(BACKSTORY_TEMPLATES);
  const backstory = backstoryTemplate.replace('{NAME}', fullName);
  const quote = getRandomElement(QUOTES);

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    firstName,
    lastName,
    title,
    fullName,
    characterClass: chosenClass,
    race: chosenRace,
    level,
    stats: rawStats,
    health,
    mana,
    strength,
    hitPoints,
    armorClass,
    alignment: getRandomElement(ALIGNMENTS),
    specialAbility: {
      name: ability.name,
      description: ability.description,
    },
    backstory,
    quote,
    portraitSeed: {
      skinTone: getRandomElement(PORTRAIT_COLORS.skins),
      hairColor: getRandomElement(PORTRAIT_COLORS.hair),
      eyeColor: getRandomElement(PORTRAIT_COLORS.eyes),
      avatarStyle: getRandomInt(1, 4),
    },
    createdAt: Date.now(),
  };
}
