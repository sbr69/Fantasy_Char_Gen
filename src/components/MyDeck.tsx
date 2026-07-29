import React from 'react';
import { Character } from '../types';
import { CLASSES_INFO } from '../data/fantasyData';
import { ClassIcon } from './ClassIcon';
import {
  Layers,
  Trash2,
  ChevronRight,
  Shield,
  Zap,
  Dumbbell,
  Sparkles,
  Award,
  BookOpen,
} from 'lucide-react';

interface MyDeckProps {
  deck: Character[];
  activeCharacterId?: string;
  onSelectCharacter: (char: Character) => void;
  onRemoveFromDeck: (id: string) => void;
  onClearDeck: () => void;
}

export const MyDeck: React.FC<MyDeckProps> = ({
  deck,
  activeCharacterId,
  onSelectCharacter,
  onRemoveFromDeck,
  onClearDeck,
}) => {
  if (deck.length === 0) {
    return (
      <div className="w-full clay-surface p-8 text-center text-slate-300">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl clay-well flex items-center justify-center text-amber-400 border border-amber-500/20">
            <Layers className="w-7 h-7" />
          </div>
          <h3 className="font-cinzel text-lg font-extrabold text-amber-200">Your Hero Deck is Empty</h3>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Click the <span className="text-amber-300 font-bold">"Save to Deck"</span> button on any character card to add heroes to your permanent deck collection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full clay-surface p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-4 border-b border-amber-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <h3 className="font-cinzel text-sm uppercase tracking-wider font-extrabold text-amber-300">
            My Player Deck ({deck.length} Cards)
          </h3>
        </div>

        <button
          onClick={onClearDeck}
          className="px-3 py-1.5 clay-btn-dark text-xs font-bold text-slate-300 hover:text-red-400 flex items-center gap-1.5 cursor-pointer"
          title="Clear My Deck"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Deck</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
        {deck.map((char) => {
          const classInfo = CLASSES_INFO[char.className] || CLASSES_INFO.Warrior;
          const isActive = char.id === activeCharacterId;

          return (
            <div
              key={char.id}
              onClick={() => onSelectCharacter(char)}
              className={`p-3.5 rounded-2xl transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                isActive
                  ? 'bg-amber-950/70 border-2 border-amber-400 shadow-xl shadow-amber-950/60'
                  : 'clay-well hover:bg-slate-900/90 border border-slate-800'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-inner"
                    style={{
                      backgroundColor: `${classInfo.colorHex}25`,
                      borderColor: `${classInfo.colorHex}60`,
                      color: classInfo.colorHex,
                    }}
                  >
                    <ClassIcon iconName={classInfo.iconName} className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-cinzel text-xs font-bold text-slate-100 truncate group-hover:text-amber-300 transition-colors">
                      {char.name}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-400 truncate">
                      Lvl {char.level} {char.className} • {char.race}
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFromDeck(char.id);
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/50 transition-colors cursor-pointer shrink-0"
                  title="Remove from Deck"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Vitals Mini Badge Bar */}
              <div className="grid grid-cols-3 gap-1 bg-slate-950/80 p-2 rounded-xl text-[10px] font-extrabold my-1 border border-slate-800">
                <div className="flex items-center gap-1 text-red-300">
                  <Shield className="w-3 h-3 text-red-400" />
                  <span>{char.health} HP</span>
                </div>
                <div className="flex items-center gap-1 text-blue-300">
                  <Zap className="w-3 h-3 text-blue-400" />
                  <span>{char.mana} MP</span>
                </div>
                <div className="flex items-center gap-1 text-amber-300">
                  <Dumbbell className="w-3 h-3 text-amber-400" />
                  <span>{char.stats.strength} STR</span>
                </div>
              </div>

              {/* Card Footer Snippet */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 pt-1.5 border-t border-slate-800">
                <span className="truncate italic">"{char.customBackstory || char.backstorySnippet}"</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
