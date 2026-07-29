import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Character } from '../types';
import { CLASSES_INFO, getCharacterPortraitUrl } from '../data/fantasyData';
import { ClassIcon } from './ClassIcon';
import {
  Copy,
  Check,
  Heart,
  Shield,
  Zap,
  Swords,
  Scroll,
  Quote,
  Sparkles,
  Award,
  RefreshCw,
  Image as ImageIcon,
  Wand2,
  BookmarkPlus,
  BookmarkCheck,
  Dumbbell,
  BookOpen,
  Share2,
  Dices,
  Sliders,
} from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onToggleFavorite?: (id: string) => void;
  onGeneratePortrait: () => void;
  onRegeneratePortrait: () => void;
  onGenerateBackstory: () => void;
  onSaveToDeck: (character: Character) => void;
  onOpenDiceRoller?: () => void;
  onOpenBattleArena?: () => void;
  onOpenEditor?: () => void;
  isRolling?: boolean;
  isGeneratingPortrait?: boolean;
  isGeneratingBackstory?: boolean;
  isInDeck?: boolean;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onToggleFavorite,
  onGeneratePortrait,
  onRegeneratePortrait,
  onGenerateBackstory,
  onSaveToDeck,
  onOpenDiceRoller,
  onOpenBattleArena,
  onOpenEditor,
  isRolling = false,
  isGeneratingPortrait = false,
  isGeneratingBackstory = false,
  isInDeck = false,
}) => {
  const [copied, setCopied] = useState(false);
  const classInfo = CLASSES_INFO[character.className] || CLASSES_INFO.Warrior;
  const portraitUrl = getCharacterPortraitUrl(character);

  const handleCopy = () => {
    const text = `⚔️ ${character.name} ${character.title}
Class: ${character.className} | Race: ${character.race} | Level: ${character.level}
Alignment: ${character.alignment}
Primary Weapon: ${character.weapon}
Special Ability: ${character.signatureAbility}
Stats: STR ${character.stats.strength} | DEX ${character.stats.dexterity} | INT ${character.stats.intelligence} | WIS ${character.stats.wisdom} | CON ${character.stats.constitution} | CHA ${character.stats.charisma}
Vitals: Health ${character.health} HP | Mana ${character.mana} MP | Strength ${character.stats.strength} STR
Backstory: "${character.customBackstory || character.backstorySnippet}"`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const statList = [
    { label: 'STR', val: character.stats.strength, key: 'strength' },
    { label: 'DEX', val: character.stats.dexterity, key: 'dexterity' },
    { label: 'INT', val: character.stats.intelligence, key: 'intelligence' },
    { label: 'WIS', val: character.stats.wisdom, key: 'wisdom' },
    { label: 'CON', val: character.stats.constitution, key: 'constitution' },
    { label: 'CHA', val: character.stats.charisma, key: 'charisma' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: isRolling ? 0.4 : 1, y: 0, scale: isRolling ? 0.97 : 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`relative w-full arcane-card-frame p-6 sm:p-8 text-slate-100 overflow-hidden bg-gradient-to-b ${classInfo.bgGradient}`}
    >
      {/* Background Soft Class Color Radial Glow */}
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
        style={{ backgroundColor: classInfo.colorHex }}
      />

      {/* Header Bar: Level/Race Badges & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-amber-500/20 pb-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 clay-pill text-xs font-bold uppercase tracking-wider text-amber-300 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Lvl {character.level} {character.race}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 clay-pill text-xs font-semibold uppercase tracking-wider text-slate-300">
            {character.alignment}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Save to Deck Button */}
          <button
            id="save-to-deck-btn"
            data-testid="save-to-deck"
            onClick={() => onSaveToDeck(character)}
            className={`px-3.5 py-1.5 text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
              isInDeck
                ? 'clay-btn-emerald text-emerald-100 shadow-emerald-950/50'
                : 'clay-btn-amber text-slate-950'
            }`}
            title="Save character to My Deck collection"
          >
            {isInDeck ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-emerald-100" />
                <span>In My Deck</span>
              </>
            ) : (
              <>
                <BookmarkPlus className="w-4 h-4 text-slate-950" />
                <span>Save to Deck</span>
              </>
            )}
          </button>

          {/* Interactive Tools: Dice Roller, Battle Arena, Editor */}
          {onOpenDiceRoller && (
            <button
              onClick={onOpenDiceRoller}
              className="px-3 py-1.5 clay-btn-purple text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
              title="Roll d20 Skill Check"
            >
              <Dices className="w-4 h-4 text-amber-300" />
              <span className="hidden md:inline">d20 Roll</span>
            </button>
          )}

          {onOpenBattleArena && (
            <button
              onClick={onOpenBattleArena}
              className="px-3 py-1.5 clay-btn-amber text-slate-950 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md"
              title="Battle Arena Simulator"
            >
              <Swords className="w-4 h-4 text-slate-950" />
              <span className="hidden md:inline">Battle</span>
            </button>
          )}

          {onOpenEditor && (
            <button
              onClick={onOpenEditor}
              className="px-3 py-1.5 clay-btn-dark text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              title="Customize Hero & Stats"
            >
              <Sliders className="w-4 h-4 text-amber-300" />
              <span className="hidden md:inline">Edit</span>
            </button>
          )}

          {/* Copy Character Sheet */}
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 clay-btn-dark text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            title="Copy Character Sheet"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-300" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          {/* Favorite Button */}
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(character.id)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                character.isFavorite
                  ? 'bg-rose-950/80 border border-rose-500/60 text-rose-400 shadow-lg shadow-rose-950/50'
                  : 'clay-btn-dark text-slate-400 hover:text-rose-400'
              }`}
              title={character.isFavorite ? 'Remove Favorite' : 'Mark as Favorite'}
            >
              <Heart className={`w-4 h-4 ${character.isFavorite ? 'fill-rose-500' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Hero Title & Name in Fantasy Font */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest text-amber-400 font-extrabold mb-1 flex items-center gap-1.5">
          <Award className="w-4 h-4" />
          {character.title}
        </div>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-wide text-amber-100 drop-shadow-[0_4px_16px_rgba(245,158,11,0.35)]">
          {character.name}
        </h1>
      </div>

      {/* Main Player Card Body Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
        {/* Game/Cartoon Style Class Portrait Frame */}
        <div className="md:col-span-6 flex flex-col items-center">
          <div className="relative w-full max-w-[250px] aspect-square mb-3 clay-portrait-ring overflow-hidden group bg-slate-950/90 flex items-center justify-center">
            <div
              className="absolute inset-0 opacity-20 pointer-events-none transition-opacity group-hover:opacity-30"
              style={{
                background: `radial-gradient(circle, ${classInfo.colorHex} 0%, transparent 70%)`,
              }}
            />

            <AnimatePresence mode="wait">
              {isGeneratingPortrait ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center p-4 gap-2 text-amber-300"
                >
                  <Wand2 className="w-10 h-10 animate-spin text-amber-400" />
                  <span className="text-xs font-bold tracking-wide font-cinzel">Summoning RPG Art...</span>
                  <span className="text-[10px] text-slate-400">{character.className} Hero</span>
                </motion.div>
              ) : (
                <motion.img
                  key={portraitUrl}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={portraitUrl}
                  alt={`${character.name} ${character.className} Portrait`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </AnimatePresence>

            {/* Class Badge Overlay */}
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-slate-950/85 border border-amber-500/40 text-[10px] font-extrabold uppercase tracking-wider text-amber-200 flex items-center gap-1 shadow-md">
              <ClassIcon iconName={classInfo.iconName} className="w-3.5 h-3.5 text-amber-400" />
              <span>{character.className}</span>
            </div>

            <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-[9px] font-semibold text-amber-300 flex items-center gap-1">
              <ImageIcon className="w-2.5 h-2.5" />
              <span>Vector Art</span>
            </div>
          </div>

          {/* TWO REQUIRED PORTRAIT BUTTONS */}
          <div className="w-full max-w-[250px] grid grid-cols-2 gap-2">
            <button
              onClick={onGeneratePortrait}
              disabled={isGeneratingPortrait}
              className="py-2.5 px-2 clay-btn-amber text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Wand2 className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Generate Portrait</span>
            </button>

            <button
              onClick={onRegeneratePortrait}
              disabled={isGeneratingPortrait}
              className="py-2.5 px-2 clay-btn-purple text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 shrink-0 ${isGeneratingPortrait ? 'animate-spin' : ''}`}
              />
              <span className="truncate">Regenerate</span>
            </button>
          </div>
        </div>

        {/* Player Card Vitals: Health, Mana, and Strength */}
        <div className="md:col-span-6 flex flex-col justify-between gap-3">
          <div className="text-xs uppercase tracking-widest font-extrabold text-amber-400 mb-1 flex items-center gap-1 font-cinzel">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Core Combat Vitals</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {/* Health Stat */}
            <div className="p-3 clay-well flex items-center justify-between gap-3 border-l-4 border-l-red-500">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-red-950/90 border border-red-700/60 flex items-center justify-center text-red-400 shrink-0 shadow-inner">
                  <Shield className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">
                    Health
                  </div>
                  <div className="text-sm font-black text-red-200">{character.health} HP</div>
                </div>
              </div>
              <div className="text-[11px] text-red-400 font-bold px-2.5 py-1 rounded-lg bg-red-950/50 border border-red-800/40">
                Vitality Pool
              </div>
            </div>

            {/* Mana Stat */}
            <div className="p-3 clay-well flex items-center justify-between gap-3 border-l-4 border-l-blue-500">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-950/90 border border-blue-700/60 flex items-center justify-center text-blue-400 shrink-0 shadow-inner">
                  <Zap className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">
                    Mana
                  </div>
                  <div className="text-sm font-black text-blue-200">{character.mana} MP</div>
                </div>
              </div>
              <div className="text-[11px] text-blue-400 font-bold px-2.5 py-1 rounded-lg bg-blue-950/50 border border-blue-800/40">
                Arcane Reserve
              </div>
            </div>

            {/* Strength Stat */}
            <div className="p-3 clay-well flex items-center justify-between gap-3 border-l-4 border-l-amber-500">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-950/90 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0 shadow-inner">
                  <Dumbbell className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">
                    Strength
                  </div>
                  <div className="text-sm font-black text-amber-200">
                    {character.stats.strength} STR
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-amber-400 font-bold px-2.5 py-1 rounded-lg bg-amber-950/50 border border-amber-800/40">
                Physical Might
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Equipment & Technique Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <div className="p-3.5 clay-well flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-700/40 text-amber-400 shrink-0 mt-0.5">
            <Swords className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Favored Armament
            </div>
            <div className="text-xs font-semibold text-slate-100 mt-0.5">{character.weapon}</div>
          </div>
        </div>

        <div className="p-3.5 clay-well flex items-start gap-3">
          <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-700/40 text-purple-400 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
              Signature Technique
            </div>
            <div className="text-xs font-semibold text-slate-100 mt-0.5">
              {character.signatureAbility}
            </div>
          </div>
        </div>
      </div>

      {/* Full Attribute Matrix */}
      <div className="mb-6">
        <div className="text-xs uppercase tracking-widest font-bold text-slate-300 mb-2.5 flex items-center justify-between">
          <span>Attribute Matrix</span>
          <span className="text-[10px] text-amber-400 font-extrabold">
            Primary Stat: {classInfo.primaryStat.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {statList.map((stat) => {
            const isPrimary = classInfo.primaryStat === stat.key;
            const pct = Math.min(100, Math.round((stat.val / 20) * 100));

            return (
              <div
                key={stat.key}
                className={`p-2.5 rounded-2xl text-center transition-all ${
                  isPrimary
                    ? 'bg-amber-950/60 border border-amber-500/70 shadow-md'
                    : 'clay-well'
                }`}
              >
                <div className="text-[10px] font-extrabold tracking-wider text-slate-400">
                  {stat.label}
                </div>
                <div
                  className={`text-lg font-black mt-0.5 ${
                    isPrimary ? 'text-amber-300' : 'text-slate-100'
                  }`}
                >
                  {stat.val}
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full mt-1.5 overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className={`h-full rounded-full ${
                      isPrimary ? 'bg-amber-400' : 'bg-slate-400'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Backstory & Generator Section */}
      <div className="pt-4 border-t border-amber-500/20 text-sm space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 font-cinzel">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Character Lore & Origin</span>
          </div>

          <button
            id="generate-backstory-btn"
            data-testid="generate-backstory"
            onClick={onGenerateBackstory}
            disabled={isGeneratingBackstory}
            className="px-3.5 py-1.5 clay-btn-purple text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Scroll className={`w-3.5 h-3.5 ${isGeneratingBackstory ? 'animate-bounce' : ''}`} />
            <span>{isGeneratingBackstory ? 'Synthesizing...' : 'Generate Backstory'}</span>
          </button>
        </div>

        <div className="clay-well p-4 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <Scroll className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-serif italic text-amber-100 text-xs sm:text-sm leading-relaxed">
                "{character.customBackstory || character.backstorySnippet}"
              </p>
              <div className="text-[10px] text-amber-400/80 font-mono pt-1">
                — Chronicles of {character.name}, {character.title}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-400 text-xs px-1">
          <Quote className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="italic text-slate-400">{character.quote}</span>
        </div>
      </div>
    </motion.div>
  );
};
