import { useState } from 'react';
import { ArrowLeft, ChevronRight, Zap, Eye, EyeOff } from 'lucide-react';
import { MODULE_INFO, questions } from '../data/questions';

const moduleColors = {
  1: { selected: 'border-blue-500 bg-blue-50 ring-2 ring-blue-200', base: 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50' },
  2: { selected: 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-200', base: 'border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50' },
  3: { selected: 'border-amber-500 bg-amber-50 ring-2 ring-amber-200', base: 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50' },
};

const badgeColors = {
  blue: 'bg-blue-100 text-blue-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
};

export default function PracticeSetup({ onBack, onStart }) {
  const [selectedModule, setSelectedModule] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);
  const [instantFeedback, setInstantFeedback] = useState(true);

  const availableCount = selectedModule
    ? questions.filter((q) => q.module === selectedModule).length
    : 0;

  const countOptions = [10, 20, 'all'].filter(
    (c) => c === 'all' || c <= availableCount
  );

  const canStart = selectedModule !== null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Section Quiz Setup</h1>
            <p className="text-gray-500 text-sm">Choose a module and configure your practice session</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Module Selection */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="bg-gray-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">1</span>
              Select a Module
            </h2>
            <div className="space-y-3">
              {Object.entries(MODULE_INFO).map(([id, mod]) => {
                const modId = parseInt(id);
                const isSelected = selectedModule === modId;
                const colors = moduleColors[modId];
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setSelectedModule(modId);
                      setQuestionCount(10);
                    }}
                    className={`w-full text-left border rounded-xl p-4 transition-all ${
                      isSelected ? colors.selected : colors.base
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColors[mod.color]}`}>
                            {mod.name}
                          </span>
                          <span className="text-xs text-gray-400">{mod.hours}h — {mod.examQuestions} exam questions</span>
                        </div>
                        <div className="font-semibold text-gray-900 text-sm">{mod.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{mod.description}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 mt-1 ml-3 flex-shrink-0 transition-colors ${
                        isSelected ? 'border-current bg-current' : 'border-gray-300'
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Count */}
          {selectedModule && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-gray-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">2</span>
                Number of Questions
              </h2>
              <div className="flex gap-3">
                {countOptions.map((c) => (
                  <button
                    key={c}
                    onClick={() => setQuestionCount(c)}
                    className={`flex-1 py-2.5 rounded-xl border font-semibold text-sm transition-all ${
                      questionCount === c
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'border-gray-200 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {c === 'all' ? `All (${availableCount})` : c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Instant Feedback */}
          {selectedModule && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="bg-gray-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">3</span>
                Feedback Mode
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setInstantFeedback(true)}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all text-left ${
                    instantFeedback
                      ? 'border-green-500 bg-green-50 text-green-800 ring-2 ring-green-200'
                      : 'border-gray-200 text-gray-600 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4" />
                    <span className="font-semibold">Instant</span>
                  </div>
                  <p className="text-xs opacity-70">See the correct answer right away with explanation</p>
                </button>
                <button
                  onClick={() => setInstantFeedback(false)}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all text-left ${
                    !instantFeedback
                      ? 'border-purple-500 bg-purple-50 text-purple-800 ring-2 ring-purple-200'
                      : 'border-gray-200 text-gray-600 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <EyeOff className="w-4 h-4" />
                    <span className="font-semibold">End Review</span>
                  </div>
                  <p className="text-xs opacity-70">Complete all questions then review results</p>
                </button>
              </div>
            </div>
          )}

          {/* Start Button */}
          <button
            onClick={() => canStart && onStart({ moduleId: selectedModule, count: questionCount, instantFeedback })}
            disabled={!canStart}
            className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all ${
              canStart
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Start Quiz
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
