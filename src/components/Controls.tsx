import React from 'react';
import { motion } from 'motion/react';
import { ClassType, RaceType } from '../types';
import { CLASSES_INFO, RACES } from '../data/fantasyData';
import { Dices, Sparkles, Filter, RefreshCw, Flame } from 'lucide-react';

interface ControlsProps {
  onGenerate: () => void;
  selectedClass: ClassType | 'ANY';
  setSelectedClass: (c: ClassType | 'ANY') => void;
  selectedRace: RaceType | 'ANY';
  setSelectedRace: (r: RaceType | 'ANY') => void;
  isRolling: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
  onGenerate,
  selectedClass,
  setSelectedClass,
  selectedRace,
  setSelectedRace,
  isRolling,
}) => {
  const classList: ClassType[] = Object.keys(CLASSES_INFO) as ClassType[];

  const handleQuickPreset = (cls: ClassType, race: RaceType) => {
    setSelectedClass(cls);
    setSelectedRace(race);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Primary Big Forge Hero Button */}
      <motion.button
        id="generate-character-btn"
        data-testid="generate-character"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGenerate}
        disabled={isRolling}
        className="w-full py-4 px-6 clay-btn-amber text-slate-950 flex items-center justify-center gap-3 cursor-pointer relative overflow-hidden group border border-amber-300/50 shadow-[0_0_25px_rgba(245,158,11,0.3)]"
      >
        {/* Animated Light Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

        <motion.div
          animate={isRolling ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <Dices className="w-7 h-7 sm:w-8 sm:h-8 text-slate-950 shrink-0" />
        </motion.div>

        <span className="font-cinzel text-lg sm:text-xl md:text-2xl font-black tracking-wide text-slate-950">
          {isRolling ? 'Generating Character...' : 'Generate Character'}
        </span>

        <Sparkles className="w-6 h-6 text-slate-950/80 group-hover:rotate-12 transition-transform shrink-0" />
      </motion.button>

      {/* Alchemist Locks & Config Console */}
      <div className="clay-surface p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-2.5">
          <div className="flex items-center gap-2 text-amber-300 font-extrabold text-xs uppercase tracking-wider font-cinzel">
            <Filter className="w-4 h-4 text-amber-400" />
            <span>Alchemical Transmutation Locks</span>
          </div>

          {(selectedClass !== 'ANY' || selectedRace !== 'ANY') && (
            <button
              onClick={() => {
                setSelectedClass('ANY');
                setSelectedRace('ANY');
              }}
              className="px-2.5 py-1 clay-btn-dark text-[11px] text-amber-300 flex items-center gap-1 cursor-pointer"
              title="Reset Filter Locks"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Locks</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Class Lock */}
          <div className="clay-well p-2.5 flex flex-col gap-1">
            <label className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
              Class Affinity
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value as ClassType | 'ANY')}
              className="bg-transparent text-amber-300 font-bold text-xs focus:outline-none cursor-pointer w-full py-0.5"
            >
              <option value="ANY" className="bg-slate-950 text-slate-200">
                Any Class (Randomized)
              </option>
              {classList.map((cls) => (
                <option key={cls} value={cls} className="bg-slate-950 text-slate-200">
                  {cls}
                </option>
              ))}
            </select>
          </div>

          {/* Race Lock */}
          <div className="clay-well p-2.5 flex flex-col gap-1">
            <label className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
              Ancestral Lineage
            </label>
            <select
              value={selectedRace}
              onChange={(e) => setSelectedRace(e.target.value as RaceType | 'ANY')}
              className="bg-transparent text-amber-300 font-bold text-xs focus:outline-none cursor-pointer w-full py-0.5"
            >
              <option value="ANY" className="bg-slate-950 text-slate-200">
                Any Lineage (Randomized)
              </option>
              {RACES.map((race) => (
                <option key={race} value={race} className="bg-slate-950 text-slate-200">
                  {race}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Hero Archetype Presets */}
        <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center gap-1.5 text-[11px]">
          <span className="text-slate-400 font-semibold text-[10px] mr-1 flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-400" />
            Quick Presets:
          </span>

          <button
            onClick={() => handleQuickPreset('Mage', 'High Elf')}
            className="px-2.5 py-1 rounded-lg bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 border border-purple-700/50 transition-colors cursor-pointer"
          >
            Elven Mage
          </button>

          <button
            onClick={() => handleQuickPreset('Paladin', 'Human')}
            className="px-2.5 py-1 rounded-lg bg-amber-950/60 hover:bg-amber-900/80 text-amber-200 border border-amber-700/50 transition-colors cursor-pointer"
          >
            Human Paladin
          </button>

          <button
            onClick={() => handleQuickPreset('Rogue', 'Tiefling')}
            className="px-2.5 py-1 rounded-lg bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 border border-rose-700/50 transition-colors cursor-pointer"
          >
            Tiefling Rogue
          </button>

          <button
            onClick={() => handleQuickPreset('Warrior', 'Dwarf')}
            className="px-2.5 py-1 rounded-lg bg-red-950/60 hover:bg-red-900/80 text-red-200 border border-red-700/50 transition-colors cursor-pointer"
          >
            Dwarven Warrior
          </button>
        </div>
      </div>
    </div>
  );
};
