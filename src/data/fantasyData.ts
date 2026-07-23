import { CharacterClassType, CharacterRace, ClassInfo } from '../types';

export const CHARACTER_CLASSES: Record<CharacterClassType, ClassInfo> = {
  Warrior: {
    name: 'Warrior',
    description: 'Masters of martial combat, wielding heavy steel and tactical brilliance on the battlefield.',
    iconName: 'Swords',
    primaryStat: 'strength',
    themeColor: {
      bg: 'bg-amber-950/40',
      border: 'border-amber-600/50',
      text: 'text-amber-400',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      glow: 'shadow-amber-900/30',
      gradient: 'from-amber-600 to-red-600',
    },
    startingEquipment: ['Greatsword', 'Steel Chainmail', 'Iron Gauntlets', 'Whetstone'],
    signatureAbilities: [
      { name: 'Whirlwind Strike', description: 'Cleaves through up to three enemies in a sweeping blow.', cooldown: '2 Turns' },
      { name: 'Battle Cry', description: 'Bolsters allies, increasing attack damage for 3 rounds.', cooldown: '4 Turns' },
    ],
  },
  Mage: {
    name: 'Mage',
    description: 'Scholars of esoteric arcana who bend elemental forces and secret spellcraft to their will.',
    iconName: 'Wand2',
    primaryStat: 'intelligence',
    themeColor: {
      bg: 'bg-blue-950/40',
      border: 'border-blue-500/50',
      text: 'text-blue-400',
      badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      glow: 'shadow-blue-900/30',
      gradient: 'from-blue-600 to-cyan-500',
    },
    startingEquipment: ['Crystal Staff', 'Enchanted Robes', 'Spell Tome', 'Arcane Focus Component'],
    signatureAbilities: [
      { name: 'Arcane Meteor', description: 'Calls down searing cosmic fire upon targeted coordinates.', cooldown: '3 Turns' },
      { name: 'Frost Shield', description: 'Absorbs physical damage and slows attackers who strike it.', cooldown: '4 Turns' },
    ],
  },
  Rogue: {
    name: 'Rogue',
    description: 'Lethal opportunists who navigate shadows with precise daggers and unrivaled stealth.',
    iconName: 'Crosshair',
    primaryStat: 'dexterity',
    themeColor: {
      bg: 'bg-emerald-950/40',
      border: 'border-emerald-500/50',
      text: 'text-emerald-400',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      glow: 'shadow-emerald-900/30',
      gradient: 'from-emerald-600 to-teal-500',
    },
    startingEquipment: ['Dual Venom Daggers', 'Studded Leather Armor', 'Lockpicks', 'Smoke Bombs'],
    signatureAbilities: [
      { name: 'Shadowstep', description: 'Instantly teleports behind a target to deliver a critical strike.', cooldown: '2 Turns' },
      { name: 'Venomous Coating', description: 'Infuses blades with lethal poison dealing damage over time.', cooldown: '3 Turns' },
    ],
  },
  Paladin: {
    name: 'Paladin',
    description: 'Holy champions bound by sacred oaths, wielding divine radiance and unyielding armor.',
    iconName: 'Shield',
    primaryStat: 'strength',
    themeColor: {
      bg: 'bg-yellow-950/40',
      border: 'border-yellow-500/50',
      text: 'text-yellow-400',
      badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      glow: 'shadow-yellow-900/30',
      gradient: 'from-yellow-500 to-amber-600',
    },
    startingEquipment: ['Radiant Warhammer', 'Full Tower Shield', 'Blessed Plate Mail', 'Sacred Emblem'],
    signatureAbilities: [
      { name: 'Divine Smite', description: 'Channels holy light into a weapon swing, blinding dark foes.', cooldown: '2 Turns' },
      { name: 'Aura of Protection', description: 'Grants damage resistance to all nearby allies.', cooldown: 'Passive' },
    ],
  },
  Ranger: {
    name: 'Ranger',
    description: 'Trackers of the wild frontiers, deadly with longbows and attuned to wilderness survival.',
    iconName: 'Trees',
    primaryStat: 'dexterity',
    themeColor: {
      bg: 'bg-green-950/40',
      border: 'border-green-500/50',
      text: 'text-green-400',
      badge: 'bg-green-500/20 text-green-300 border-green-500/30',
      glow: 'shadow-green-900/30',
      gradient: 'from-green-600 to-emerald-500',
    },
    startingEquipment: ['Yew Recurve Bow', 'Hunting Knife', 'Camo Cloak', 'Quiver of 30 Arrows'],
    signatureAbilities: [
      { name: 'Volley of Arrows', description: 'Rains precision arrows down over a targeted zone.', cooldown: '2 Turns' },
      { name: 'Falcon Companion', description: 'Summons a keen scout falcon to reveal hidden foes.', cooldown: '5 Turns' },
    ],
  },
  Cleric: {
    name: 'Cleric',
    description: 'Devout heralds of celestial gods, capable of mending mortal wounds and banishing evil.',
    iconName: 'Sparkles',
    primaryStat: 'wisdom',
    themeColor: {
      bg: 'bg-sky-950/40',
      border: 'border-sky-500/50',
      text: 'text-sky-300',
      badge: 'bg-sky-500/20 text-sky-200 border-sky-500/30',
      glow: 'shadow-sky-900/30',
      gradient: 'from-sky-500 to-indigo-600',
    },
    startingEquipment: ['Sanctified Mace', 'Scale Armor', 'Holy Water Flask', 'Prayer Bead Rosary'],
    signatureAbilities: [
      { name: 'Celestial Light', description: 'Restores health and cures ailments for the entire party.', cooldown: '3 Turns' },
      { name: 'Turn Undead', description: 'Emits a blinding holy surge that terrifies spectral entities.', cooldown: '4 Turns' },
    ],
  },
  Bard: {
    name: 'Bard',
    description: 'Charismatic performers whose magical melodies inspire allies and bewilder adversaries.',
    iconName: 'Music',
    primaryStat: 'charisma',
    themeColor: {
      bg: 'bg-pink-950/40',
      border: 'border-pink-500/50',
      text: 'text-pink-400',
      badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      glow: 'shadow-pink-900/30',
      gradient: 'from-pink-500 to-rose-600',
    },
    startingEquipment: ['Fine Silver Lute', 'Rapier', 'Feathered Cap', 'Disguise Kit'],
    signatureAbilities: [
      { name: 'Song of Valor', description: 'Boosts party movement speed and critical hit chance.', cooldown: '3 Turns' },
      { name: 'Dissonant Whisper', description: 'Confuses enemy minds with haunting harmonic magic.', cooldown: '2 Turns' },
    ],
  },
  Warlock: {
    name: 'Warlock',
    description: 'Spellcasters who forged pacts with otherworldly entities to wield dark eldritch power.',
    iconName: 'Flame',
    primaryStat: 'charisma',
    themeColor: {
      bg: 'bg-purple-950/40',
      border: 'border-purple-500/50',
      text: 'text-purple-400',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      glow: 'shadow-purple-900/30',
      gradient: 'from-purple-600 to-violet-700',
    },
    startingEquipment: ['Eldritch Rod', 'Obsidian Amulet', 'Pact Leather Vestments', 'Soul Gem'],
    signatureAbilities: [
      { name: 'Eldritch Blast', description: 'Fires a beam of crackling force that pushes foes backward.', cooldown: '1 Turn' },
      { name: 'Hellish Rebuke', description: 'Engulfs any attacker in vengeful infernal flames.', cooldown: '3 Turns' },
    ],
  },
  Druid: {
    name: 'Druid',
    description: 'Guardians of nature who shape-shift into primal beasts and command forest elements.',
    iconName: 'Feather',
    primaryStat: 'wisdom',
    themeColor: {
      bg: 'bg-lime-950/40',
      border: 'border-lime-500/50',
      text: 'text-lime-400',
      badge: 'bg-lime-500/20 text-lime-300 border-lime-500/30',
      glow: 'shadow-lime-900/30',
      gradient: 'from-lime-600 to-green-600',
    },
    startingEquipment: ['Ironwood Quarterstaff', 'Hide Armor', 'Totemic Talisman', 'Herbalism Pouch'],
    signatureAbilities: [
      { name: 'Wild Shape', description: 'Transforms into a ferocious Dire Bear or swift Raven.', cooldown: '4 Turns' },
      { name: 'Entangling Vines', description: 'Summons thorny roots from the earth to immobilize foes.', cooldown: '2 Turns' },
    ],
  },
  Monk: {
    name: 'Monk',
    description: 'Ascetics who harness internal Ki energy for blinding hand-to-hand combat and agility.',
    iconName: 'Zap',
    primaryStat: 'dexterity',
    themeColor: {
      bg: 'bg-orange-950/40',
      border: 'border-orange-500/50',
      text: 'text-orange-400',
      badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      glow: 'shadow-orange-900/30',
      gradient: 'from-orange-500 to-amber-600',
    },
    startingEquipment: ['Prayer Wraps', 'Simple Linen Robe', 'Ki Beads', 'Iron Quarterstaff'],
    signatureAbilities: [
      { name: 'Flurry of Blows', description: 'Unleashes four rapid unarmed strikes in a split second.', cooldown: '1 Turn' },
      { name: 'Step of the Wind', description: 'Dashes with superhuman speed, dodging incoming missiles.', cooldown: '2 Turns' },
    ],
  },
  Necromancer: {
    name: 'Necromancer',
    description: 'Dark scholars commanding life essence, death magic, and skeletal thralls.',
    iconName: 'Skull',
    primaryStat: 'intelligence',
    themeColor: {
      bg: 'bg-zinc-950/60',
      border: 'border-zinc-500/50',
      text: 'text-emerald-300',
      badge: 'bg-zinc-800/60 text-emerald-300 border-zinc-600/40',
      glow: 'shadow-emerald-950/50',
      gradient: 'from-zinc-700 to-emerald-900',
    },
    startingEquipment: ['Bone Dagger', 'Grave Robes', 'Soul Jar', 'Phylactery Fragment'],
    signatureAbilities: [
      { name: 'Raise Dead', description: 'Rouses a skeletal minion from fallen remains to fight.', cooldown: '4 Turns' },
      { name: 'Life Siphon', description: 'Drains health from a target to restore the caster.', cooldown: '2 Turns' },
    ],
  },
  Sorcerer: {
    name: 'Sorcerer',
    description: 'Innate magic wielders carrying raw dragon blood or chaos magic in their veins.',
    iconName: 'Sun',
    primaryStat: 'charisma',
    themeColor: {
      bg: 'bg-violet-950/40',
      border: 'border-violet-500/50',
      text: 'text-violet-300',
      badge: 'bg-violet-500/20 text-violet-200 border-violet-500/30',
      glow: 'shadow-violet-900/30',
      gradient: 'from-violet-600 to-fuchsia-600',
    },
    startingEquipment: ['Dragon Crystal Dagger', 'Silk Mantle', 'Arcane Focus Orb'],
    signatureAbilities: [
      { name: 'Chaos Surge', description: 'Unleashes unpredictable elemental energy striking multiple foes.', cooldown: '2 Turns' },
      { name: 'Twinned Spell', description: 'Duplicates a single spell to hit two distinct targets.', cooldown: '3 Turns' },
    ],
  },
  Barbarian: {
    name: 'Barbarian',
    description: 'Primal warriors driven by unstoppable battle rage, absorbing massive punishment.',
    iconName: 'Axe',
    primaryStat: 'strength',
    themeColor: {
      bg: 'bg-red-950/40',
      border: 'border-red-600/50',
      text: 'text-red-400',
      badge: 'bg-red-500/20 text-red-300 border-red-500/30',
      glow: 'shadow-red-900/30',
      gradient: 'from-red-600 to-orange-600',
    },
    startingEquipment: ['Double-Headed Battleaxe', 'Fur Harness', 'Horned Helmet', 'Throwing Spears'],
    signatureAbilities: [
      { name: 'Berserker Rage', description: 'Halves incoming damage and boosts melee strikes for 4 turns.', cooldown: '5 Turns' },
      { name: 'Reckless Strike', description: 'Guarantees a critical strike at the cost of defense.', cooldown: '2 Turns' },
    ],
  },
};

export const CHARACTER_RACES: CharacterRace[] = [
  'Human',
  'Elf',
  'Dwarf',
  'Halfling',
  'Dragonborn',
  'Tiefling',
  'Gnome',
  'Half-Orc',
  'Aamar',
];

export const FIRST_NAMES = [
  'Garrick', 'Valeria', 'Thorne', 'Lyra', 'Elora', 'Kaelen', 'Rhiannon', 'Cedric', 'Zephyr', 'Rowan',
  'Aethelgard', 'Morwenna', 'Darin', 'Isolde', 'Vesper', 'Balthazar', 'Seraphina', 'Malakor', 'Nyssa',
  'Talon', 'Freya', 'Gideon', 'Astraea', 'Corvus', 'Sylas', 'Evander', 'Kaelith', 'Raelen', 'Maeve',
  'Finnian', 'Ophelia', 'Vaelin', 'Caelum', 'Nyx', 'Darian', 'Callista', 'Ignis', 'Xanthos', 'Kassandra',
];

export const LAST_NAMES = [
  'Ironwill', 'Shadowweaver', 'Dawnseeker', 'Frostwhisper', 'Flamecaller', 'Oakenshield', 'Stormrider',
  'Voidwalker', 'Silverwood', 'Bloodfang', 'Nightshade', 'Sunstrider', 'Ravenclaw', 'Winterfall',
  'Goldhand', 'Dragonheart', 'Ashenveil', 'Starfall', 'Duskwing', 'Hawkeye', 'Gravewood', 'Lightbringer',
];

export const TITLES = [
  'the Undaunted', 'the Spellbreaker', 'Blade of the Realm', 'Keeper of the Ancient Rune',
  'the Shadow Stalker', 'Shield of Oakhaven', 'the Storm Harbinger', 'the Silver-Tongued',
  'Master of the Unseen Arcana', 'the Iron-Handed', 'Wanderer of Forgotten Paths',
  'the Sovereign Sentinel', 'Weaver of Fate', 'the Dragon-Slayer', 'the Whisperer',
];

export const ALIGNMENTS = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil',
];

export const BACKSTORY_TEMPLATES = [
  "Raised in the quiet solitude of the Whisperwood, {NAME} discovered their true calling when an ancient artifact awakened within their possession.",
  "Once a high commander in the Royal Guard, {NAME} chose a path of lone wandering after uncovering a dark conspiracy in the capital.",
  "Born under a rare solar eclipse, {NAME} carries a ancestral brand that draws elemental forces toward them wherever they travel.",
  "Having spent years deciphering forgotten scrolls in the Grand Library of Aethelgard, {NAME} set out to locate lost celestial relics.",
  "After their coastal village was saved by a mysterious wanderer, {NAME} vowed to protect innocent travelers across the outer realm.",
  "Apprenticed to a legendary master in the High Crags, {NAME} perfected their craft before seeking honor in distant lands.",
  "Exiled from their ancestral stronghold after taking responsibility for an illicit duel, {NAME} now seeks redemption through perilous quests.",
  "Guided by cryptic prophetic dreams that reveal impending shadow, {NAME} travels from town to town gathering worthy companions.",
];

export const QUOTES = [
  "Steel may break, but honor endures forever.",
  "The shadows do not hide secrets from those who know where to look.",
  "Magic is not a weapon to be feared, but a harmony to be mastered.",
  "A sharp blade is good, but a sharper mind guarantees survival.",
  "We walk into the storm so others may dwell in the light.",
  " Fate is not written in stone; it is forged with every step we take.",
  "Silence is the most lethal strike of all.",
  "Every victory requires a sacrifice; make sure yours is worth the price.",
];

export const PORTRAIT_COLORS = {
  skins: ['#fce0d8', '#f1c27d', '#e0ac69', '#c68642', '#8d5524', '#52341d', '#8ba4b5', '#6b5278', '#3e5c54'],
  hair: ['#1a1a1a', '#4a3728', '#8b5a2b', '#c29b38', '#b83b28', '#e5e5e5', '#335577', '#8a2be2', '#20b2aa'],
  eyes: ['#2e8b57', '#1e90ff', '#8b4513', '#ffd700', '#da70d6', '#ff4500', '#00ffff'],
};
