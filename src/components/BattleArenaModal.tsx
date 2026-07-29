import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Character } from '../types';
import { Swords, Shield, Heart, Zap, Flame, Trophy, Skull, RefreshCw, X } from 'lucide-react';

interface BattleArenaModalProps {
  character: Character;
  onClose: () => void;
}

interface Enemy {
  name: string;
  type: string;
  hp: number;
  maxHp: number;
  attack: number;
  icon: string;
  description: string;
}

const MONSTERS: Enemy[] = [
  {
    name: 'Goblin Warlord',
    type: 'Humanoid',
    hp: 45,
    maxHp: 45,
    attack: 8,
    icon: '👺',
    description: 'A ruthless chieftain wielding a jagged cleaver.',
  },
  {
    name: 'Shadow Wraith',
    type: 'Undead',
    hp: 60,
    maxHp: 60,
    attack: 12,
    icon: '👻',
    description: 'A spectral phantom that drains the vital energy of mortals.',
  },
  {
    name: 'Ancient Red Dragon',
    type: 'Dragon',
    hp: 120,
    maxHp: 120,
    attack: 22,
    icon: '🐉',
    description: 'A terrifying beast breathing hellfire across the battlefield.',
  },
];

export const BattleArenaModal: React.FC<BattleArenaModalProps> = ({ character, onClose }) => {
  const [selectedEnemyIndex, setSelectedEnemyIndex] = useState(0);
  const [enemyHp, setEnemyHp] = useState(MONSTERS[0].hp);
  const [heroHp, setHeroHp] = useState(character.health);
  const [heroMana, setHeroMana] = useState(character.mana);
  const [battleLog, setBattleLog] = useState<string[]>([
    `⚔️ Combat Initiated! ${character.name} faces ${MONSTERS[0].name}!`,
  ]);
  const [isBattleOver, setIsBattleOver] = useState(false);
  const [winner, setWinner] = useState<'hero' | 'enemy' | null>(null);

  const currentEnemy = MONSTERS[selectedEnemyIndex];

  const handleSelectEnemy = (idx: number) => {
    setSelectedEnemyIndex(idx);
    const target = MONSTERS[idx];
    setEnemyHp(target.hp);
    setHeroHp(character.health);
    setHeroMana(character.mana);
    setIsBattleOver(false);
    setWinner(null);
    setBattleLog([`⚔️ Combat Initiated! ${character.name} faces ${target.name}!`]);
  };

  const handleHeroAttack = () => {
    if (isBattleOver || heroHp <= 0 || enemyHp <= 0) return;

    // Calculate Hero Damage
    const baseAtk = character.stats.strength + Math.floor(character.stats.dexterity / 2);
    const heroDmg = Math.floor(Math.random() * 8) + baseAtk;
    const newEnemyHp = Math.max(0, enemyHp - heroDmg);
    setEnemyHp(newEnemyHp);

    let logs = [`💥 ${character.name} strikes with ${character.weapon} for ${heroDmg} damage!`];

    if (newEnemyHp <= 0) {
      logs.push(`🏆 VICTORY! ${character.name} defeated ${currentEnemy.name}!`);
      setIsBattleOver(true);
      setWinner('hero');
      setBattleLog((prev) => [...logs, ...prev]);
      return;
    }

    // Enemy Retaliation
    const enemyDmg = Math.max(2, Math.floor(Math.random() * currentEnemy.attack) + 4);
    const newHeroHp = Math.max(0, heroHp - enemyDmg);
    setHeroHp(newHeroHp);
    logs.push(`🩸 ${currentEnemy.name} retaliates dealing ${enemyDmg} damage!`);

    if (newHeroHp <= 0) {
      logs.push(`💀 DEFEAT! ${character.name} has been vanquished in battle.`);
      setIsBattleOver(true);
      setWinner('enemy');
    }

    setBattleLog((prev) => [...logs, ...prev]);
  };

  const handleUseAbility = () => {
    if (isBattleOver || heroHp <= 0 || enemyHp <= 0 || heroMana < 10) return;

    setHeroMana((prev) => Math.max(0, prev - 10));

    // Calculate Ability Damage
    const spellPower = character.stats.intelligence + character.stats.wisdom;
    const abilityDmg = Math.floor(Math.random() * 12) + spellPower;
    const newEnemyHp = Math.max(0, enemyHp - abilityDmg);
    setEnemyHp(newEnemyHp);

    let logs = [`✨ ${character.name} unleashes SIGNATURE ABILITY [${character.signatureAbility}] dealing ${abilityDmg} magic damage!`];

    if (newEnemyHp <= 0) {
      logs.push(`🏆 VICTORY! ${character.name} vaporized ${currentEnemy.name}!`);
      setIsBattleOver(true);
      setWinner('hero');
      setBattleLog((prev) => [...logs, ...prev]);
      return;
    }

    // Enemy Retaliation
    const enemyDmg = Math.max(2, Math.floor(Math.random() * currentEnemy.attack) + 3);
    const newHeroHp = Math.max(0, heroHp - enemyDmg);
    setHeroHp(newHeroHp);
    logs.push(`🩸 ${currentEnemy.name} counter-attacks dealing ${enemyDmg} damage!`);

    if (newHeroHp <= 0) {
      logs.push(`💀 DEFEAT! ${character.name} succumbed to damage.`);
      setIsBattleOver(true);
      setWinner('enemy');
    }

    setBattleLog((prev) => [...logs, ...prev]);
  };

  const handleResetBattle = () => {
    handleSelectEnemy(selectedEnemyIndex);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-xl clay-surface p-6 text-slate-100 overflow-hidden border border-rose-500/40 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-500/20 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-500/20 rounded-xl border border-rose-500/40 text-rose-300">
              <Swords className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-cinzel text-xl font-bold text-rose-100">Battle Arena Simulator</h3>
              <p className="text-xs text-rose-300/80">Test hero combat effectiveness</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Monster Selector */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {MONSTERS.map((m, idx) => (
            <button
              key={m.name}
              onClick={() => handleSelectEnemy(idx)}
              className={`p-2 rounded-xl text-left border transition-all ${
                selectedEnemyIndex === idx
                  ? 'bg-rose-950/60 border-rose-400 text-rose-200 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="text-xl mb-1">{m.icon}</div>
              <div className="text-xs font-bold truncate">{m.name}</div>
              <div className="text-[10px] text-slate-400">HP {m.hp}</div>
            </button>
          ))}
        </div>

        {/* Duel Battlefield Display */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Hero Side */}
          <div className="clay-well p-4 rounded-xl border border-amber-500/30">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">Hero</div>
            <div className="font-cinzel text-base font-bold text-slate-100 truncate">{character.name}</div>
            <div className="text-xs text-amber-400 mb-2">{character.className}</div>
            
            {/* HP Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-rose-400 flex items-center gap-1"><Heart className="w-3 h-3"/> HP</span>
                <span>{heroHp} / {character.health}</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 transition-all duration-300"
                  style={{ width: `${(heroHp / character.health) * 100}%` }}
                />
              </div>
            </div>

            {/* MP Bar */}
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-cyan-400 flex items-center gap-1"><Zap className="w-3 h-3"/> MP</span>
                <span>{heroMana} / {character.mana}</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 transition-all duration-300"
                  style={{ width: `${(heroMana / character.mana) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Enemy Side */}
          <div className="clay-well p-4 rounded-xl border border-rose-500/30">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-1">Enemy</div>
            <div className="font-cinzel text-base font-bold text-slate-100 truncate">{currentEnemy.name}</div>
            <div className="text-xs text-rose-300 mb-2">{currentEnemy.type}</div>

            {/* HP Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold">
                <span className="text-rose-400 flex items-center gap-1"><Heart className="w-3 h-3"/> HP</span>
                <span>{enemyHp} / {currentEnemy.maxHp}</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 transition-all duration-300"
                  style={{ width: `${(enemyHp / currentEnemy.maxHp) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Combat Action Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={handleHeroAttack}
            disabled={isBattleOver}
            className="flex-1 py-2.5 clay-btn-amber text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            <Swords className="w-4 h-4" />
            Weapon Attack
          </button>
          <button
            onClick={handleUseAbility}
            disabled={isBattleOver || heroMana < 10}
            className="flex-1 py-2.5 clay-btn-purple text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-cyan-300" />
            Special Ability (10 MP)
          </button>
          <button
            onClick={handleResetBattle}
            className="px-3 py-2.5 clay-btn-dark text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center cursor-pointer"
            title="Reset Battle"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Combat Log */}
        <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 h-28 overflow-y-auto custom-scrollbar text-xs font-mono space-y-1">
          {battleLog.map((log, i) => (
            <div key={i} className="text-slate-300">
              {log}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
