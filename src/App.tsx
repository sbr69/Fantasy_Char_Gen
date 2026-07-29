import { useState, useCallback, useEffect } from 'react';
import { Character, ClassType, RaceType } from './types';
import {
  CLASSES_INFO,
  FIRST_NAMES,
  SURNAMES,
  TITLES,
  RACES,
  ALIGNMENTS,
  BACKSTORY_SNIPPETS,
  QUOTES,
  getRandomItem,
  generateStats,
  generateUniqueBackstory,
} from './data/fantasyData';
import { CharacterCard } from './components/CharacterCard';
import { Controls } from './components/Controls';
import { CharacterHistory } from './components/CharacterHistory';
import { MyDeck } from './components/MyDeck';
import { DiceRollerModal } from './components/DiceRollerModal';
import { BattleArenaModal } from './components/BattleArenaModal';
import { CharacterEditorModal } from './components/CharacterEditorModal';
import { Shield, Wand2, Layers, History, FlaskConical, Sparkles, Scroll } from 'lucide-react';

export default function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [history, setHistory] = useState<Character[]>([]);
  const [deck, setDeck] = useState<Character[]>([]);
  const [activeTab, setActiveTab] = useState<'deck' | 'history'>('deck');

  const [selectedClass, setSelectedClass] = useState<ClassType | 'ANY'>('ANY');
  const [selectedRace, setSelectedRace] = useState<RaceType | 'ANY'>('ANY');
  const [isRolling, setIsRolling] = useState(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);

  // Modal active states
  const [showDiceRoller, setShowDiceRoller] = useState(false);
  const [showBattleArena, setShowBattleArena] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  const generateCharacter = useCallback(() => {
    setIsRolling(true);

    setTimeout(() => {
      const firstName = getRandomItem(FIRST_NAMES);
      const surname = getRandomItem(SURNAMES);
      const name = `${firstName} ${surname}`;
      const title = getRandomItem(TITLES);

      const availableClasses = Object.keys(CLASSES_INFO) as ClassType[];
      const className =
        selectedClass === 'ANY' ? getRandomItem(availableClasses) : selectedClass;

      const race = selectedRace === 'ANY' ? getRandomItem(RACES) : selectedRace;
      const classInfo = CLASSES_INFO[className];

      const alignment = getRandomItem(ALIGNMENTS);
      const stats = generateStats(classInfo.primaryStat);

      const level = Math.floor(Math.random() * 5) + 1; // Lvl 1 to 5 starter
      const health = 20 + stats.constitution * 2 + level * 5;
      const mana =
        className === 'Mage' || className === 'Warlock' || className === 'Sorcerer'
          ? 30 + stats.intelligence * 2 + level * 6
          : 15 + stats.wisdom * 1.5;

      const initialBackstory = getRandomItem(BACKSTORY_SNIPPETS);

      const newChar: Character = {
        id: `char-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        name,
        title,
        className,
        race,
        alignment,
        stats,
        level,
        health,
        mana: Math.round(mana),
        signatureAbility: classInfo.signatureAbility,
        weapon: classInfo.favoredWeapon,
        backstorySnippet: initialBackstory,
        customBackstory: initialBackstory,
        quote: getRandomItem(QUOTES),
        generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFavorite: false,
        isInDeck: false,
      };

      setCharacter(newChar);
      setHistory((prev) => [newChar, ...prev.slice(0, 19)]);
      setIsRolling(false);
    }, 250);
  }, [selectedClass, selectedRace]);

  // Initial character load
  useEffect(() => {
    generateCharacter();
  }, [generateCharacter]);

  // Portrait Generation
  const handleGeneratePortrait = () => {
    if (!character) return;
    setIsGeneratingPortrait(true);
    setTimeout(() => {
      setIsGeneratingPortrait(false);
    }, 300);
  };

  const handleRegeneratePortrait = () => {
    if (!character) return;
    setIsGeneratingPortrait(true);
    setTimeout(() => {
      const newSeed = `seed-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const updated = {
        ...character,
        portraitSeed: newSeed,
      };
      setCharacter(updated);
      setHistory((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setDeck((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setIsGeneratingPortrait(false);
    }, 450);
  };

  // Backstory Generator
  const handleGenerateBackstory = () => {
    if (!character) return;
    setIsGeneratingBackstory(true);
    setTimeout(() => {
      const uniqueLore = generateUniqueBackstory(character);
      const updated = {
        ...character,
        customBackstory: uniqueLore,
      };
      setCharacter(updated);
      setHistory((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setDeck((prev) => prev.map((c) => (c.id === character.id ? updated : c)));
      setIsGeneratingBackstory(false);
    }, 350);
  };

  // Save to Deck Handler
  const handleSaveToDeck = (charToSave: Character) => {
    const isAlreadyInDeck = deck.some((c) => c.id === charToSave.id);

    if (isAlreadyInDeck) {
      const updatedDeck = deck.filter((c) => c.id !== charToSave.id);
      setDeck(updatedDeck);
      if (character && character.id === charToSave.id) {
        setCharacter({ ...character, isInDeck: false });
      }
    } else {
      const cardWithDeckFlag = { ...charToSave, isInDeck: true };
      setDeck((prev) => [cardWithDeckFlag, ...prev]);
      if (character && character.id === charToSave.id) {
        setCharacter(cardWithDeckFlag);
      }
    }
  };

  const handleRemoveFromDeck = (id: string) => {
    setDeck((prev) => prev.filter((c) => c.id !== id));
    if (character && character.id === id) {
      setCharacter({ ...character, isInDeck: false });
    }
  };

  const handleClearDeck = () => {
    setDeck([]);
    if (character) {
      setCharacter({ ...character, isInDeck: false });
    }
  };

  const handleToggleFavorite = (id: string) => {
    setHistory((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
    setDeck((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isFavorite: !c.isFavorite } : c))
    );
    if (character && character.id === id) {
      setCharacter((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : null));
    }
  };

  const handleClearHistory = () => {
    setHistory(character ? [character] : []);
  };

  const isCurrentInDeck = character ? deck.some((c) => c.id === character.id) : false;

  return (
    <div className="min-h-screen alchemist-bg text-slate-100 flex flex-col items-center px-4 py-8 sm:py-10 relative overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      {/* Subtle Alchemy Radial Glow Effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-amber-600/15 via-purple-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Header Navbar */}
      <header className="w-full max-w-6xl mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-cinzel text-xl sm:text-2xl font-black text-amber-100 tracking-wide">
              Fantasy Character Forge
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Alchemist's Hero Generator & RPG Card Workbench
            </p>
          </div>
        </div>

        {/* Deck & History quick counter pill */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Deck: <strong className="text-amber-300 font-bold">{deck.length}</strong></span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <History className="w-3.5 h-3.5 text-purple-400" />
            <span>History: <strong className="text-purple-300 font-bold">{history.length}</strong></span>
          </div>
        </div>
      </header>

      {/* Responsive Main Layout Stage */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Player Character Card */}
        <section className="lg:col-span-7 xl:col-span-8 flex flex-col items-center w-full">
          {character && (
            <CharacterCard
              character={character}
              onToggleFavorite={handleToggleFavorite}
              onGeneratePortrait={handleGeneratePortrait}
              onRegeneratePortrait={handleRegeneratePortrait}
              onGenerateBackstory={handleGenerateBackstory}
              onSaveToDeck={handleSaveToDeck}
              onOpenDiceRoller={() => setShowDiceRoller(true)}
              onOpenBattleArena={() => setShowBattleArena(true)}
              onOpenEditor={() => setShowEditor(true)}
              isRolling={isRolling}
              isGeneratingPortrait={isGeneratingPortrait}
              isGeneratingBackstory={isGeneratingBackstory}
              isInDeck={isCurrentInDeck}
            />
          )}
        </section>

        {/* Right Column: Controls Console & Deck/History Collections */}
        <section className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 w-full">
          {/* Controls Panel */}
          <Controls
            onGenerate={generateCharacter}
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            selectedRace={selectedRace}
            setSelectedRace={setSelectedRace}
            isRolling={isRolling}
          />

          {/* Collection Tab Container */}
          <div className="w-full">
            <div className="flex items-center justify-center gap-2 mb-4 clay-well p-1.5 w-fit mx-auto border border-amber-500/20">
              <button
                onClick={() => setActiveTab('deck')}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'deck'
                    ? 'clay-btn-amber text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>My Deck ({deck.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'history'
                    ? 'clay-btn-amber text-slate-950 shadow-lg'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <History className="w-4 h-4" />
                <span>Chronicles ({history.length})</span>
              </button>
            </div>

            {activeTab === 'deck' ? (
              <MyDeck
                deck={deck}
                activeCharacterId={character?.id}
                onSelectCharacter={(char) => setCharacter(char)}
                onRemoveFromDeck={handleRemoveFromDeck}
                onClearDeck={handleClearDeck}
              />
            ) : (
              <CharacterHistory
                history={history}
                activeCharacterId={character?.id}
                onSelectCharacter={(char) => setCharacter(char)}
                onClearHistory={handleClearHistory}
                onToggleFavorite={handleToggleFavorite}
              />
            )}
          </div>
        </section>
      </main>

      {/* Interactive Feature Modals */}
      {showDiceRoller && character && (
        <DiceRollerModal character={character} onClose={() => setShowDiceRoller(false)} />
      )}

      {showBattleArena && character && (
        <BattleArenaModal character={character} onClose={() => setShowBattleArena(false)} />
      )}

      {showEditor && character && (
        <CharacterEditorModal
          character={character}
          onSave={(updated) => {
            setCharacter(updated);
            setHistory((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
            setDeck((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
          }}
          onClose={() => setShowEditor(false)}
        />
      )}

      {/* Footer */}
      <footer className="mt-14 text-center text-xs text-slate-500 flex items-center gap-2 font-medium">
        <Shield className="w-4 h-4 text-amber-400" />
        <span>Alchemist's Workbench • High-Precision RPG Character Forge & Deck Manager</span>
      </footer>
    </div>
  );
}
