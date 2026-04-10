import { useState } from 'react';
import { Trophy, XCircle, CheckCircle, RotateCcw, Home, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { MODULE_INFO, EXAM_CONFIG } from '../data/questions';

const optionLetters = ['A', 'B', 'C', 'D'];

const moduleColorMap = {
  1: { bar: 'bg-blue-500', text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  2: { bar: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  3: { bar: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
};

function ModuleBreakdown({ moduleId, correct, total }) {
  const mod = MODULE_INFO[moduleId];
  const c = moduleColorMap[moduleId];
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className={`${c.bg} ${c.border} border rounded-xl p-4`}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="font-semibold text-gray-900 text-sm">{mod.title}</span>
          <span className="text-xs text-gray-500 ml-2">{mod.name}</span>
        </div>
        <span className={`font-bold text-sm ${c.text}`}>{correct}/{total}</span>
      </div>
      <div className="w-full bg-white/60 rounded-full h-2">
        <div
          className={`${c.bar} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">{pct}% correct</div>
    </div>
  );
}

function ReviewItem({ question, userAnswer }) {
  const [open, setOpen] = useState(false);
  const isCorrect = userAnswer === question.answer;

  return (
    <div className={`border rounded-xl overflow-hidden ${isCorrect ? 'border-green-200' : 'border-red-200'}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full text-left px-4 py-3 flex items-start gap-3 ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
      >
        {isCorrect ? (
          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
        ) : (
          <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
        )}
        <span className="text-sm text-gray-800 flex-1 leading-snug">{question.question}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        )}
      </button>

      {open && (
        <div className="px-4 py-4 bg-white space-y-2">
          {question.options.map((opt, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 px-3 py-2 rounded-lg text-sm ${
                i === question.answer
                  ? 'bg-green-50 border border-green-200 text-green-900'
                  : userAnswer === i
                  ? 'bg-red-50 border border-red-200 text-red-800 line-through opacity-70'
                  : 'text-gray-500'
              }`}
            >
              <span className={`font-bold w-5 flex-shrink-0 ${
                i === question.answer ? 'text-green-600' : userAnswer === i ? 'text-red-500' : 'text-gray-400'
              }`}>
                {optionLetters[i]}
              </span>
              {opt}
              {i === question.answer && <CheckCircle className="w-3.5 h-3.5 text-green-500 ml-auto flex-shrink-0 mt-0.5" />}
            </div>
          ))}
          {question.explanation && (
            <div className="flex gap-2 mt-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">{question.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ResultsScreen({ results, questions, answers, mode, onBack }) {
  const [showReview, setShowReview] = useState(false);
  const { totalCorrect, byModule, total, passed } = results;

  const passMark = mode === 'exam' ? EXAM_CONFIG.passingScore : Math.ceil(total * 0.7);
  const percentage = Math.round((totalCorrect / total) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Result banner */}
        <div className={`rounded-2xl p-6 text-center text-white ${
          passed
            ? 'bg-gradient-to-br from-green-500 to-green-700'
            : 'bg-gradient-to-br from-red-500 to-red-700'
        }`}>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            {passed ? <Trophy className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
          </div>
          <div className="text-4xl font-black mb-1">{passed ? 'PASSED' : 'FAILED'}</div>
          <div className="text-5xl font-black mb-2 tabular-nums">
            {totalCorrect}<span className="text-2xl font-semibold opacity-70">/{total}</span>
          </div>
          <div className="text-white/80 text-sm">
            {percentage}% correct · Pass mark: {passMark}/{total}
            {mode === 'exam' && ` · ${passed ? 'Congratulations!' : 'Keep practising!'}`}
          </div>
        </div>

        {/* Module breakdown */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Breakdown by Module</h3>
          <div className="space-y-3">
            {Object.entries(byModule).map(([modId, { correct, total: modTotal }]) => (
              <ModuleBreakdown
                key={modId}
                moduleId={parseInt(modId)}
                correct={correct}
                total={modTotal}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
          >
            <Home className="w-4 h-4" /> Home
          </button>
          <button
            onClick={() => setShowReview((v) => !v)}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {showReview ? 'Hide' : 'Review'} Answers
          </button>
        </div>

        {/* Review section */}
        {showReview && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Answer Review</h3>
            {questions.map((q) => (
              <ReviewItem
                key={q.id}
                question={q}
                userAnswer={answers[q.id] ?? null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
