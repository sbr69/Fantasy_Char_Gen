export interface Stats {
  strength: number;
  dexterity: number;
  intelligence: number;
  wisdom: number;
  constitution: number;
  charisma: number;
}

export type ClassType =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Paladin'
  | 'Ranger'
  | 'Cleric'
  | 'Bard'
  | 'Necromancer'
  | 'Druid'
  | 'Monk'
  | 'Warlock'
  | 'Sorcerer';

export type RaceType =
  | 'Human'
  | 'High Elf'
  | 'Wood Elf'
  | 'Dwarf'
  | 'Halfling'
  | 'Tiefling'
  | 'Dragonborn'
  | 'Half-Orc'
  | 'Gnome'
  | 'Aasimar';

export interface CharacterClassInfo {
  name: ClassType;
  iconName: string;
  description: string;
  primaryStat: keyof Stats;
  signatureAbility: string;
  favoredWeapon: string;
  colorHex: string;
  bgGradient: string;
  borderColor: string;
  presetPortraitAsset?: string;
  dicebearStyle?: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  className: ClassType;
  race: RaceType;
  alignment: string;
  stats: Stats;
  level: number;
  health: number;
  mana: number;
  signatureAbility: string;
  weapon: string;
  backstorySnippet: string;
  quote: string;
  generatedAt: string;
  isFavorite?: boolean;
  isInDeck?: boolean;
  customBackstory?: string;
  portraitUrl?: string;
  portraitSeed?: string;
  portraitStyle?: 'cartoon-3d' | 'game-vector' | 'pixel-hero';
}
