import React, { useState } from 'react';
import { Character } from '../types';
import { CLASSES_INFO } from '../data/fantasyData';
import { ClassIcon } from './ClassIcon';
import { History, Heart, Trash2, ChevronRight, User } from 'lucide-react';

interface CharacterHistoryProps {
  history: Character[];
  activeCharacterId?: string;
  onSelectCharacter: (char: Character) => void;
  onClearHistory: () => void;
  onToggleFavorite: (id: string) => void;
}

export const CharacterHistory: React.FC<CharacterHistoryProps> = ({
  history,
  activeCharacterId,
  onSelectCharacter,
  onClearHistory,
  onToggleFavorite,
}) => {
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  if (history.length === 0) return null;

  const filteredHistory = history.filter((char) =>
    filter === 'favorites' ? char.isFavorite : true
  );

  return (
    <div className="w-full clay-surface p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 mb-4 border-b border-amber-500/20 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-amber-400" />
          <h3 className="font-cinzel text-sm uppercase tracking-wider font-extrabold text-amber-300">
            Hero Chronicles ({history.length})
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex clay-well p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filter === 'all'
                  ? 'clay-btn-amber text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('favorites')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                filter === 'favorites'
                  ? 'bg-rose-500/30 text-rose-300 border border-rose-500/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Heart className="w-3 h-3 fill-rose-400" />
              Favorites
            </button>
          </div>

          <button
            onClick={onClearHistory}
            className="p-2 clay-btn-dark text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            title="Clear History Chronicles"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <div className="py-8 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
          <User className="w-8 h-8 opacity-40 text-amber-400" />
          <span className="font-medium">
            No saved favorites yet. Click the heart button on any hero card!
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1 custom-scrollbar">
          {filteredHistory.map((char) => {
            const classInfo = CLASSES_INFO[char.className] || CLASSES_INFO.Warrior;
            const isActive = char.id === activeCharacterId;

            return (
              <div
                key={char.id}
                onClick={() => onSelectCharacter(char)}
                className={`p-3 rounded-2xl transition-all cursor-pointer flex items-center justify-between group ${
                  isActive
                    ? 'bg-amber-950/60 border border-amber-500/70 shadow-lg shadow-amber-950/40'
                    : 'clay-well hover:bg-slate-900/80 border border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-inner"
                    style={{
                      backgroundColor: `${classInfo.colorHex}25`,
                      borderColor: `${classInfo.colorHex}60`,
                      color: classInfo.colorHex,
                    }}
                  >
                    <ClassIcon iconName={classInfo.iconName} className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-cinzel text-xs sm:text-sm font-bold text-slate-100 truncate group-hover:text-amber-300 transition-colors">
                      {char.name}
                    </div>
                    <div className="text-[11px] font-medium text-slate-400 truncate">
                      {char.className} • {char.race}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(char.id);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        char.isFavorite ? 'fill-rose-500 text-rose-500' : ''
                      }`}
                    />
                  </button>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
