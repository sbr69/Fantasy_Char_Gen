import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Character, Stats } from '../types';
import { Dices, X, Sparkles, Flame, ShieldAlert, Award, Trophy } from 'lucide-react';

interface DiceRollerModalProps {
  character: Character;
  onClose: () => void;
}

interface RollHistoryItem {
  id: string;
  statName: string;
  d20: number;
  modifier: number;
  total: number;
  isNat20: boolean;
  isNat1: boolean;
  timestamp: string;
}

export const DiceRollerModal: React.FC<DiceRollerModalProps> = ({ character, onClose }) => {
  const [selectedStat, setSelectedStat] = useState<keyof Stats>('strength');
  const [isRolling, setIsRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState<RollHistoryItem | null>(null);
  const [history, setHistory] = useState<RollHistoryItem[]>([]);

  const getModifier = (statValue: number): number => {
    return Math.floor((statValue - 10) / 2);
  };

  const handleRoll = (statKey: keyof Stats) => {
    if (isRolling) return;
    setIsRolling(true);
    setSelectedStat(statKey);

    // Animate dice roll over 600ms
    let rollCounter = 0;
    const interval = setInterval(() => {
      rollCounter++;
      if (rollCounter > 8) {
        clearInterval(interval);
        const d20 = Math.floor(Math.random() * 20) + 1;
        const statVal = character.stats[statKey];
        const modifier = getModifier(statVal);
        const total = d20 + modifier;
        const isNat20 = d20 === 20;
        const isNat1 = d20 === 1;

        const newRollResult: RollHistoryItem = {
          id: `roll-${Date.now()}`,
          statName: statKey.toUpperCase(),
          d20,
          modifier,
          total,
          isNat20,
          isNat1,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        };

        setCurrentRoll(newRollResult);
        setHistory((prev) => [newRollResult, ...prev.slice(0, 7)]);
        setIsRolling(false);
      }
    }, 60);
  };

  const statOptions: { key: keyof Stats; label: string; icon: string }[] = [
    { key: 'strength', label: 'Strength (STR)', icon: '⚔️' },
    { key: 'dexterity', label: 'Dexterity (DEX)', icon: '🏹' },
    { key: 'constitution', label: 'Constitution (CON)', icon: '🛡️' },
    { key: 'intelligence', label: 'Intelligence (INT)', icon: '🔮' },
    { key: 'wisdom', label: 'Wisdom (WIS)', icon: '📜' },
    { key: 'charisma', label: 'Charisma (CHA)', icon: '🎭' },
  ];

  const currentMod = getModifier(character.stats[selectedStat]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg clay-surface p-6 text-slate-100 overflow-hidden border border-amber-500/40 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 rounded-xl border border-amber-500/40 text-amber-300">
              <Dices className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-cinzel text-xl font-bold text-amber-100">d20 Skill & Combat Roller</h3>
              <p className="text-xs text-amber-300/80">{character.name} ({character.className})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stat selector buttons */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {statOptions.map((item) => {
            const val = character.stats[item.key];
            const mod = getModifier(val);
            const isSelected = selectedStat === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setSelectedStat(item.key)}
                className={`p-2.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md shadow-amber-950/40'
                    : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:border-amber-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase">{item.key.slice(0, 3)}</span>
                  <span className="text-sm">{item.icon}</span>
                </div>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-sm font-black text-slate-100">{val}</span>
                  <span className={`text-xs font-bold ${mod >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {mod >= 0 ? `+${mod}` : mod}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Dice Display & Roll Button */}
        <div className="clay-well p-6 mb-6 flex flex-col items-center justify-center text-center relative overflow-hidden border border-amber-500/30">
          <AnimatePresence mode="wait">
            {currentRoll ? (
              <motion.div
                key={currentRoll.id}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="relative mb-2">
                  {currentRoll.isNat20 && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-black uppercase rounded-full tracking-wider animate-bounce">
                      CRITICAL HIT!
                    </span>
                  )}
                  {currentRoll.isNat1 && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-rose-600 text-slate-100 text-[10px] font-black uppercase rounded-full tracking-wider">
                      CRITICAL FAILURE!
                    </span>
                  )}
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center font-black text-3xl shadow-xl border-2 ${
                      currentRoll.isNat20
                        ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-amber-500/50'
                        : currentRoll.isNat1
                        ? 'bg-rose-950 text-rose-300 border-rose-500 shadow-rose-900/50'
                        : 'bg-indigo-950 text-amber-200 border-amber-500/40'
                    }`}
                  >
                    {currentRoll.d20}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-slate-300 mt-1">
                  <span>d20 Roll ({currentRoll.d20})</span>
                  <span>+</span>
                  <span className="text-amber-300">Mod ({currentRoll.modifier >= 0 ? `+${currentRoll.modifier}` : currentRoll.modifier})</span>
                  <span>=</span>
                  <span className="text-2xl font-black text-amber-100">{currentRoll.total}</span>
                </div>
                <p className="text-xs text-amber-300/80 font-medium mt-1">
                  {currentRoll.statName} Check Result
                </p>
              </motion.div>
            ) : (
              <div className="py-4 text-slate-400">
                <Dices className="w-12 h-12 mx-auto text-amber-400/40 mb-2" />
                <p className="text-sm font-semibold">Select a attribute above and roll the d20!</p>
              </div>
            )}
          </AnimatePresence>

          <button
            onClick={() => handleRoll(selectedStat)}
            disabled={isRolling}
            className="mt-4 px-8 py-3 clay-btn-amber text-slate-950 font-extrabold rounded-xl shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <Dices className={`w-5 h-5 ${isRolling ? 'animate-spin' : ''}`} />
            <span>{isRolling ? 'Rolling d20...' : `Roll ${selectedStat.toUpperCase()} Check`}</span>
          </button>
        </div>

        {/* Recent Roll Log */}
        {history.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Roll Log
            </h4>
            <div className="space-y-1.5 max-h-32 overflow-y-auto custom-scrollbar pr-1">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="px-3 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800 text-xs flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-300">{h.statName} Check</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">d20: {h.d20}</span>
                    <span className="font-bold text-amber-300">Total: {h.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
