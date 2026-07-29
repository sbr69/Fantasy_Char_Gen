import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Character, Stats } from '../types';
import { Sliders, X, Sparkles, Shield, Heart, Zap, Save, Plus, Minus } from 'lucide-react';

interface CharacterEditorModalProps {
  character: Character;
  onSave: (updated: Character) => void;
  onClose: () => void;
}

export const CharacterEditorModal: React.FC<CharacterEditorModalProps> = ({ character, onSave, onClose }) => {
  const [name, setName] = useState(character.name);
  const [title, setTitle] = useState(character.title);
  const [weapon, setWeapon] = useState(character.weapon);
  const [level, setLevel] = useState(character.level);
  const [stats, setStats] = useState<Stats>({ ...character.stats });

  const handleStatChange = (statKey: keyof Stats, delta: number) => {
    setStats((prev) => ({
      ...prev,
      [statKey]: Math.max(3, Math.min(30, prev[statKey] + delta)),
    }));
  };

  const handleLevelChange = (delta: number) => {
    const newLvl = Math.max(1, Math.min(20, level + delta));
    setLevel(newLvl);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedHealth = 20 + stats.constitution * 2 + level * 5;
    const updatedMana = 15 + stats.intelligence * 2 + stats.wisdom * 1.5 + level * 5;

    const updatedChar: Character = {
      ...character,
      name,
      title,
      weapon,
      level,
      stats,
      health: Math.round(updatedHealth),
      mana: Math.round(updatedMana),
    };

    onSave(updatedChar);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg clay-surface p-6 text-slate-100 overflow-hidden border border-amber-500/40 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 rounded-xl border border-amber-500/40 text-amber-300">
              <Sliders className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-cinzel text-xl font-bold text-amber-100">Character Forge Editor</h3>
              <p className="text-xs text-amber-300/80">Customize hero attributes & equipment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Identity inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase text-amber-300 mb-1">Character Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100 focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-amber-300 mb-1">Honorific Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-amber-300 mb-1">Primary Weapon</label>
            <input
              type="text"
              value={weapon}
              onChange={(e) => setWeapon(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm font-semibold text-slate-100 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Level adjustment */}
          <div className="clay-well p-3 rounded-xl flex items-center justify-between border border-amber-500/20">
            <span className="text-xs font-bold uppercase text-slate-300">Hero Level (1 - 20)</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleLevelChange(-1)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center font-bold text-amber-300"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-black text-lg text-amber-100 w-6 text-center">{level}</span>
              <button
                type="button"
                onClick={() => handleLevelChange(1)}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center font-bold text-amber-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stat adjustments */}
          <div>
            <label className="block text-xs font-bold uppercase text-amber-300 mb-2">Stat Points</label>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(stats) as (keyof Stats)[]).map((statKey) => (
                <div key={statKey} className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-400">{statKey.slice(0, 3)}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleStatChange(statKey, -1)}
                      className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300"
                    >
                      -
                    </button>
                    <span className="text-xs font-black text-amber-200 w-5 text-center">{stats[statKey]}</span>
                    <button
                      type="button"
                      onClick={() => handleStatChange(statKey, 1)}
                      className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 flex gap-2">
            <button
              type="submit"
              className="flex-1 py-3 clay-btn-amber text-slate-950 font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Save className="w-4 h-4" />
              Save Character Modifications
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
