import { CharacterClassInfo, ClassType, RaceType, Stats, Character } from '../types';

import warriorImg from '../assets/images/warrior_portrait_1785342371242.jpg';
import mageImg from '../assets/images/mage_portrait_1785342390942.jpg';
import rogueImg from '../assets/images/rogue_portrait_1785342406977.jpg';
import paladinImg from '../assets/images/paladin_portrait_1785342420855.jpg';

export const CLASSES_INFO: Record<ClassType, CharacterClassInfo> = {
  Warrior: {
    name: 'Warrior',
    iconName: 'Shield',
    description: 'A disciplined master of martial combat, heavy armor, and front-line warfare.',
    primaryStat: 'strength',
    signatureAbility: 'Whirlwind Strike',
    favoredWeapon: 'Greatsword & Heavy Shield',
    colorHex: '#ef4444',
    bgGradient: 'from-amber-950/60 via-red-950/80 to-slate-950',
    borderColor: 'border-red-500/50',
    presetPortraitAsset: warriorImg,
    dicebearStyle: 'adventurer',
  },
  Mage: {
    name: 'Mage',
    iconName: 'Sparkles',
    description: 'A scholar of arcana capable of unleashing devastating elemental destruction.',
    primaryStat: 'intelligence',
    signatureAbility: 'Arcane Meteor',
    favoredWeapon: 'Rune Staff & Grimoire',
    colorHex: '#3b82f6',
    bgGradient: 'from-blue-950/70 via-indigo-950/80 to-slate-950',
    borderColor: 'border-blue-500/50',
    presetPortraitAsset: mageImg,
    dicebearStyle: 'micah',
  },
  Rogue: {
    name: 'Rogue',
    iconName: 'Sword',
    description: 'A lethal agent of stealth, poisons, and precision strikes from the shadows.',
    primaryStat: 'dexterity',
    signatureAbility: 'Shadow Step & Backstab',
    favoredWeapon: 'Dual Venomous Daggers',
    colorHex: '#10b981',
    bgGradient: 'from-emerald-950/70 via-slate-950 to-slate-950',
    borderColor: 'border-emerald-500/50',
    presetPortraitAsset: rogueImg,
    dicebearStyle: 'adventurer',
  },
  Paladin: {
    name: 'Paladin',
    iconName: 'Sun',
    description: 'A holy champion empowered by divine vows to protect the innocent and crush evil.',
    primaryStat: 'strength',
    signatureAbility: 'Radiant Smite',
    favoredWeapon: 'Blessed Warhammer',
    colorHex: '#f59e0b',
    bgGradient: 'from-amber-950/70 via-yellow-950/60 to-slate-950',
    borderColor: 'border-amber-400/50',
    presetPortraitAsset: paladinImg,
    dicebearStyle: 'lorelei',
  },
  Ranger: {
    name: 'Ranger',
    iconName: 'Trees',
    description: 'A master tracker and marksman attuned to the wilds and lethal with a bow.',
    primaryStat: 'dexterity',
    signatureAbility: 'Volley of Arrows',
    favoredWeapon: 'Longbow of the Deepwood',
    colorHex: '#84cc16',
    bgGradient: 'from-lime-950/70 via-emerald-950/60 to-slate-950',
    borderColor: 'border-lime-500/50',
    dicebearStyle: 'adventurer',
  },
  Cleric: {
    name: 'Cleric',
    iconName: 'HeartHandshake',
    description: 'A devout conduit of sacred magic capable of mending mortal wounds and casting light.',
    primaryStat: 'wisdom',
    signatureAbility: 'Aura of Sanctuary',
    favoredWeapon: 'Consecrated Mace',
    colorHex: '#06b6d4',
    bgGradient: 'from-cyan-950/70 via-sky-950/60 to-slate-950',
    borderColor: 'border-cyan-400/50',
    dicebearStyle: 'lorelei',
  },
  Bard: {
    name: 'Bard',
    iconName: 'Music',
    description: 'An inspiring performer whose songs manipulate emotions, weave illusions, and turn battles.',
    primaryStat: 'charisma',
    signatureAbility: 'Dissonant Melody',
    favoredWeapon: 'Enchanted Lute & Rapier',
    colorHex: '#ec4899',
    bgGradient: 'from-fuchsia-950/70 via-pink-950/60 to-slate-950',
    borderColor: 'border-pink-500/50',
    dicebearStyle: 'micah',
  },
  Necromancer: {
    name: 'Necromancer',
    iconName: 'Skull',
    description: 'A practitioner of forbidden dark magic who commands undead legions and drains vitality.',
    primaryStat: 'intelligence',
    signatureAbility: 'Soul Harvest',
    favoredWeapon: 'Bone Scythe',
    colorHex: '#a855f7',
    bgGradient: 'from-purple-950/80 via-slate-950 to-slate-950',
    borderColor: 'border-purple-500/50',
    dicebearStyle: 'bottts-neutral',
  },
  Druid: {
    name: 'Druid',
    iconName: 'Leaf',
    description: 'A guardian of nature who shifts into fearsome beasts and channels primordial weather.',
    primaryStat: 'wisdom',
    signatureAbility: 'Primal Beast Form',
    favoredWeapon: 'Elderwood Quarterstaff',
    colorHex: '#22c55e',
    bgGradient: 'from-green-950/70 via-stone-950 to-slate-950',
    borderColor: 'border-green-500/50',
    dicebearStyle: 'adventurer',
  },
  Monk: {
    name: 'Monk',
    iconName: 'Flame',
    description: 'A warrior of martial discipline who channels spiritual Ki into blistering hand-to-hand strikes.',
    primaryStat: 'dexterity',
    signatureAbility: 'Flurry of Blows',
    favoredWeapon: 'Iron-Bound Cestus',
    colorHex: '#f97316',
    bgGradient: 'from-orange-950/70 via-amber-950/60 to-slate-950',
    borderColor: 'border-orange-500/50',
    dicebearStyle: 'micah',
  },
  Warlock: {
    name: 'Warlock',
    iconName: 'Eye',
    description: 'A spellcaster bound to an eldritch patron, wielding dark beams and otherworldly pacts.',
    primaryStat: 'charisma',
    signatureAbility: 'Eldritch Blast',
    favoredWeapon: 'Obsidian Orb',
    colorHex: '#14b8a6',
    bgGradient: 'from-teal-950/70 via-emerald-950/60 to-slate-950',
    borderColor: 'border-teal-500/50',
    dicebearStyle: 'bottts-neutral',
  },
  Sorcerer: {
    name: 'Sorcerer',
    iconName: 'Zap',
    description: 'A spellcaster born with innate dragon or chaos blood, shaping wild magic at will.',
    primaryStat: 'charisma',
    signatureAbility: 'Metamagic Surge',
    favoredWeapon: 'Dragon-Eye Crystal',
    colorHex: '#e11d48',
    bgGradient: 'from-rose-950/70 via-purple-950/60 to-slate-950',
    borderColor: 'border-rose-500/50',
    dicebearStyle: 'micah',
  },
};

export const FIRST_NAMES = [
  'Valerius', 'Kaelen', 'Zephyr', 'Lyra', 'Aurelia', 'Dorn', 'Elysia', 'Thorin', 'Mirella', 'Garrick',
  'Cassian', 'Soren', 'Vespera', 'Eamon', 'Thalia', 'Xander', 'Rowan', 'Sylvia', 'Balthazar', 'Corvus',
  'Isolde', 'Darian', 'Morrigan', 'Ignis', 'Freya', 'Kaeleth', 'Orion', 'Seraphina', 'Malakor', 'Niamh',
  'Rhovan', 'Talaris', 'Alistair', 'Vaelen', 'Evander', 'Astrid', 'Lucian', 'Caelum', 'Nyx', 'Gideon'
];

export const SURNAMES = [
  'Shadowweave', 'Ironfist', 'Sunwalker', 'Frostweaver', 'Stormcaller', 'Ravencrest', 'Bloodthorn',
  'Starwhisper', 'Dragonfang', 'Oakshield', 'Voidwalker', 'Goldbraid', 'Emberforge', 'Nightshade',
  'Silverblade', 'Wildheart', 'Ashenveil', 'Lightbringer', 'Gravewood', 'Winterfang', 'Dawnstrider'
];

export const TITLES = [
  'the Wandering Blade', 'the Storm Shield', 'Keeper of Secrets', 'the Sun Herald', 'the Unbroken',
  'Shadow of the Vale', 'Master of Runes', 'the Crimson Fang', 'Warden of the North', 'the Spellweaver',
  'Whisperer of Spirits', 'the Iron Sentinel', 'Scourge of the Void', 'the Gentle Flame', 'the Dread Vanguard'
];

export const RACES: RaceType[] = [
  'Human',
  'High Elf',
  'Wood Elf',
  'Dwarf',
  'Halfling',
  'Tiefling',
  'Dragonborn',
  'Half-Orc',
  'Gnome',
  'Aasimar'
];

export const ALIGNMENTS = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Neutral Evil',
  'Chaotic Evil'
];

export const BACKSTORY_SNIPPETS = [
  'Forged in the fires of a fallen kingdom, seeking vengeance for a betrayed order.',
  'Studied ancient arcane scrolls buried deep within the Whispering Ruins for decades.',
  'Grew up as an orphan in the underground thief dens before discovering an ancient heritage.',
  'Anointed by sacred temple elders after surviving a strike from heavenly lightning.',
  'Exiled from their homeland after refusing to execute a dark pact with the local tyrant.',
  'Traveled across seas and mountain peaks in search of a legendary lost relic.',
  'Raised by wild wolves in the Frostpeaks after a dragon raid laid their village to ash.',
  'Possesses a mysterious rune carved onto their chest that glows when danger draws near.',
  'Sworn protector of a dying grove, carrying its last remaining seed in an amulet.',
  'A disgraced noble who abandoned velvet halls to champion the downtrodden.'
];

export const QUOTES = [
  '"Fate is forged by those willing to raise their weapon."',
  '"Shadows only exist because there is a light worth protecting."',
  '"Magic is not learned, it is remembered from the song of creation."',
  '"My blade does not bleed, but my enemies certainly do."',
  '"Never stand between a dwarf and their sacred oath—or their ale."',
  '"The stars whisper secrets to those patient enough to listen."',
  '"I carry no burden lighter than a conscience clean of cowardice."',
  '"Fear is just the first layer of courage waiting to be pierced."'
];

// Random utility helpers
export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateStats(primaryStat: keyof Stats): Stats {
  const baseStats: Stats = {
    strength: getRandomInt(8, 16),
    dexterity: getRandomInt(8, 16),
    intelligence: getRandomInt(8, 16),
    wisdom: getRandomInt(8, 16),
    constitution: getRandomInt(10, 18),
    charisma: getRandomInt(8, 16),
  };
  baseStats[primaryStat] = Math.max(baseStats[primaryStat], getRandomInt(15, 19));
  return baseStats;
}

/**
 * Generate a cartoon or video-game style portrait URL for a given character and optional seed.
 */
export function getCharacterPortraitUrl(character: Character, seed?: string): string {
  const classInfo = CLASSES_INFO[character.className] || CLASSES_INFO.Warrior;
  const effectiveSeed = seed || character.portraitSeed || `${character.id}-${character.className}`;

  // If no custom seed variation was specified and a preset 3D clay asset exists for this class, use it!
  if (!seed && classInfo.presetPortraitAsset && !character.portraitSeed) {
    return classInfo.presetPortraitAsset;
  }

  // Otherwise generate a custom cartoon/video-game RPG avatar matching class & race attributes
  const style = classInfo.dicebearStyle || 'adventurer';
  const encodedSeed = encodeURIComponent(`${character.className}-${character.race}-${effectiveSeed}`);
  
  // High quality cartoon RPG avatar API
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodedSeed}&backgroundColor=0f172a,1e293b,334155`;
}

export function generateUniqueBackstory(character: Character): string {
  const origins = [
    `Born during the eclipse of the Scarlet Moon in the citadel of ${character.race} elders, ${character.name} was marked by destiny at birth.`,
    `Raised in secret amidst the fog of the Obsidian Peaks, ${character.name} mastered the discipline of the ${character.className} before reaching adulthood.`,
    `Once a humble apprentice in the royal archives, ${character.name} forged their path after discovering an ancient cipher linked to their ${character.race} ancestry.`,
    `Surviving a legendary siege in the Shattered Marches, ${character.name} swore an unyielding oath to uphold justice as ${character.title}.`,
    `Exiled from their ancestral enclave for channeling forbidden arcana, ${character.name} turned adversity into absolute power.`,
    `Entrusted with the legendary ${character.weapon}, ${character.name} emerged from the Wyrmfang Canyons as a fearsome master of the ${character.className} arts.`
  ];

  const deeds = [
    `Wielding the ${character.weapon} with unmatched precision, they now seek to unite the scattered factions against the coming cataclysm.`,
    `Known throughout the realm for their lethal ${character.signatureAbility}, enemies flee at the mere mention of their name.`,
    `Bound by their ${character.alignment} code, they wander the realm answering the call of those facing impossible darkness.`,
    `With raw Strength score of ${character.stats.strength} and immense martial poise, few mortal foes can withstand their onslaught.`,
    `Their journey is driven by a restless search for ancient lost relics that hold the key to restoring their homeland.`
  ];

  return `${getRandomItem(origins)} ${getRandomItem(deeds)}`;
}
