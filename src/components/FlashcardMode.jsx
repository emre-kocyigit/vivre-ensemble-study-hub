import { useState, useCallback } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Lightbulb, RotateCcw, AlertCircle, Layers } from 'lucide-react';
import { questions, MODULE_INFO } from '../data/questions';
import { getMistakeIds, addMistakes, removeMistakes } from '../utils/mistakeBank';
import { shuffle } from '../utils/quiz';

const optionLetters = ['A', 'B', 'C', 'D'];

const moduleAccentMap = {
  1: { pill: 'bg-blue-100 text-blue-700', bar: 'bg-blue-500', front: 'from-blue-600 to-blue-800' },
  2: { pill: 'bg-emerald-100 text-emerald-700', bar: 'bg-emerald-500', front: 'from-emerald-600 to-emerald-800' },
  3: { pill: 'bg-amber-100 text-amber-700', bar: 'bg-amber-500', front: 'from-amber-500 to-amber-700' },
};

function buildDeck(moduleFilter, mistakeOnly) {
  let pool = moduleFilter ? questions.filter((q) => q.module === moduleFilter) : [...questions];
  if (mistakeOnly) {
    const ids = new Set(getMistakeIds());
    pool = pool.filter((q) => ids.has(q.id));
  }
  return shuffle(pool);
}

export default function FlashcardMode({ onBack }) {
  const [moduleFilter, setModuleFilter] = useState(null);
  const [mistakeOnly, setMistakeOnly] = useState(false);
  const [deck, setDeck] = useState(() => shuffle(questions));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [slideKey, setSlideKey] = useState(0); // forces re-mount for slide animation
  const [bankedIds] = useState(() => new Set(getMistakeIds()));

  const currentCard = deck[index];
  const accent = moduleAccentMap[currentCard?.module] || moduleAccentMap[1];
  const isInMistakeBank = bankedIds.has(currentCard?.id);

  const applyFilters = useCallback((mod, mistakes) => {
    const newDeck = buildDeck(mod, mistakes);
    setDeck(newDeck);
    setIndex(0);
    setFlipped(false);
    setSlideKey((k) => k + 1);
  }, []);

  const handleModuleFilter = (mod) => {
    const next = moduleFilter === mod ? null : mod;
    setModuleFilter(next);
    applyFilters(next, mistakeOnly);
  };

  const handleMistakeToggle = () => {
    const next = !mistakeOnly;
    setMistakeOnly(next);
    applyFilters(moduleFilter, next);
  };

  const goTo = (newIndex) => {
    setFlipped(false);
    // slight delay so flip-back finishes before slide
    setTimeout(() => {
      setIndex(newIndex);
      setSlideKey((k) => k + 1);
    }, flipped ? 200 : 0);
  };

  const handlePrev = () => goTo(Math.max(0, index - 1));
  const handleNext = () => goTo(Math.min(deck.length - 1, index + 1));

  const handleShuffle = () => {
    const reshuffled = shuffle(deck);
    setDeck(reshuffled);
    setIndex(0);
    setFlipped(false);
    setSlideKey((k) => k + 1);
  };

  const handleMarkKnown = () => {
    removeMistakes([currentCard.id]);
    bankedIds.delete(currentCard.id);
    handleNext();
  };

  const handleMarkUnknown = () => {
    addMistakes([currentCard.id]);
    bankedIds.add(currentCard.id);
    handleNext();
  };

  if (deck.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
            <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-semibold text-gray-900">Flashcards</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">No cards match your filters</h3>
            <p className="text-sm text-gray-500 mb-4">
              {mistakeOnly
                ? "Your Mistake Bank is empty for this filter — great job!"
                : "Try adjusting your module filter."}
            </p>
            <button
              onClick={() => { setMistakeOnly(false); setModuleFilter(null); applyFilters(null, false); }}
              className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold"
            >
              Show All Cards
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 flex-shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 text-sm">Flashcards</div>
            <div className="text-xs text-gray-500">{index + 1} / {deck.length} cards</div>
          </div>
          <button
            onClick={handleShuffle}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 flex-shrink-0"
            title="Reshuffle deck"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="max-w-3xl mx-auto px-4 pb-3 flex items-center gap-2 flex-wrap">
          <button
            onClick={handleMistakeToggle}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
              mistakeOnly
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-red-400'
            }`}
          >
            <Layers className="w-3 h-3" />
            Mistakes Only
          </button>
          <div className="w-px h-4 bg-gray-200" />
          {[null, 1, 2, 3].map((mod) => (
            <button
              key={mod ?? 'all'}
              onClick={() => handleModuleFilter(mod)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                moduleFilter === mod
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {mod ? MODULE_INFO[mod].name : 'All Modules'}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-3xl mx-auto w-full px-4 pt-5">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className={`h-1 rounded-full transition-all duration-300 bg-gradient-to-r ${accent.front}`}
            style={{ width: `${((index + 1) / deck.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-5 flex flex-col">
        <div key={slideKey} className="card-slide-in flex-1 flex flex-col">
          <div className="flashcard-scene flex-1">
            <div
              className={`flashcard-inner w-full h-full ${flipped ? 'is-flipped' : ''}`}
              onClick={() => setFlipped((f) => !f)}
              style={{ minHeight: '300px' }}
            >
              {/* Front */}
              <div className={`flashcard-face w-full h-full bg-gradient-to-br ${accent.front} text-white flex flex-col p-7`}>
                <div className="flex items-center justify-between mb-auto">
                  <span className="text-xs font-semibold bg-white/20 px-2.5 py-1 rounded-full">
                    {MODULE_INFO[currentCard.module].name}
                  </span>
                  {bankedIds.has(currentCard.id) && (
                    <span className="text-xs bg-red-500/30 text-red-100 px-2.5 py-1 rounded-full font-medium">
                      In Review Bank
                    </span>
                  )}
                </div>

                <div className="flex-1 flex items-center justify-center py-6">
                  <p className="text-xl md:text-2xl font-semibold leading-snug text-center">
                    {currentCard.question}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-white/60 text-sm mt-auto">
                  <span className="text-base">👆</span>
                  Tap to reveal answer
                </div>
              </div>

              {/* Back */}
              <div className="flashcard-face flashcard-face--back w-full h-full bg-white border border-gray-200 shadow-sm flex flex-col p-7">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${accent.pill}`}>
                    {MODULE_INFO[currentCard.module].name}
                  </span>
                  <span className="text-xs text-gray-400">Correct Answer</span>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  {/* Show all options with correct highlighted */}
                  <div className="space-y-2 mb-5">
                    {currentCard.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm ${
                          i === currentCard.answer
                            ? 'bg-green-50 border-2 border-green-400 text-green-900 font-semibold'
                            : 'bg-gray-50 text-gray-400'
                        }`}
                      >
                        <span className={`font-bold flex-shrink-0 w-4 ${
                          i === currentCard.answer ? 'text-green-600' : 'text-gray-300'
                        }`}>
                          {optionLetters[i]}
                        </span>
                        {opt}
                      </div>
                    ))}
                  </div>

                  {/* Explanation */}
                  {currentCard.explanation && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-2.5">
                      <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-900 leading-relaxed">{currentCard.explanation}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center text-xs text-gray-400 mt-3">
                  👆 Tap card to flip back
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons (shown when flipped) */}
        {flipped && (
          <div className="flex gap-3 mt-4 card-slide-in">
            <button
              onClick={(e) => { e.stopPropagation(); handleMarkUnknown(); }}
              className="flex-1 py-3 rounded-xl border-2 border-red-200 bg-red-50 text-red-700 font-semibold text-sm hover:bg-red-100 transition-colors"
            >
              😅 Still Learning
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); handleMarkKnown(); }}
              className="flex-1 py-3 rounded-xl border-2 border-green-200 bg-green-50 text-green-700 font-semibold text-sm hover:bg-green-100 transition-colors"
            >
              ✓ Got It
            </button>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handlePrev}
            disabled={index === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <span className="text-sm font-medium text-gray-500">
            {index + 1} / {deck.length}
          </span>

          <button
            onClick={handleNext}
            disabled={index === deck.length - 1}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white font-medium text-sm hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
