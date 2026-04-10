import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, Send, Trophy, Flame } from 'lucide-react';
import { getMistakeQuestions, removeMistakes, addMistakes } from '../utils/mistakeBank';
import { shuffle } from '../utils/quiz';
import QuizQuestion from './QuizQuestion';

export default function RedemptionMode({ onBack }) {
  const [questions] = useState(() => shuffle(getMistakeQuestions()));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState({}); // qId -> selectedIdx (locked)
  const [phase, setPhase] = useState('quiz'); // 'quiz' | 'results'
  const [results, setResults] = useState(null);

  // Empty bank guard
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
            <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="font-semibold text-gray-900">Redemption Quiz</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-sm">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Mistake Bank is Empty!</h3>
            <p className="text-sm text-gray-500 mb-6">
              You've cleared all your mistakes. Keep practising in Section Quiz mode to keep your knowledge sharp.
            </p>
            <button onClick={onBack} className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion?.id] ?? null;
  const isLocked = submitted[currentQuestion?.id] !== undefined;
  const answeredCount = Object.keys(submitted).length;

  const handleSelect = (idx) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: idx }));
  };

  const handleConfirm = () => {
    if (selectedAnswer === null) return;
    setSubmitted((prev) => ({ ...prev, [currentQuestion.id]: selectedAnswer }));
  };

  const handleFinish = () => {
    const correctIds = [];
    const wrongIds = [];

    questions.forEach((q) => {
      const userAns = submitted[q.id];
      if (userAns === q.answer) {
        correctIds.push(q.id);
      } else {
        wrongIds.push(q.id);
      }
    });

    // Remove mastered, keep/re-add failed
    removeMistakes(correctIds);
    addMistakes(wrongIds);

    const correct = correctIds.length;
    setResults({ correct, total: questions.length, correctIds, wrongIds });
    setPhase('results');
  };

  // ── Results screen ─────────────────────────────────────────
  if (phase === 'results') {
    const { correct, total, wrongIds } = results;
    const allCleared = wrongIds.length === 0;

    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-lg mx-auto space-y-5">
          {/* Banner */}
          <div className={`rounded-2xl p-6 text-center text-white ${
            allCleared
              ? 'bg-gradient-to-br from-green-500 to-emerald-700'
              : 'bg-gradient-to-br from-orange-500 to-red-700'
          }`}>
            <div className="text-5xl mb-3">{allCleared ? '🏆' : '🔥'}</div>
            <div className="text-3xl font-black mb-1">
              {correct}/{total} Correct
            </div>
            <p className="text-white/80 text-sm">
              {allCleared
                ? `All ${total} mistakes cleared from your bank!`
                : `${correct} removed from bank · ${wrongIds.length} remain to review`}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-green-700">{correct}</div>
              <div className="text-xs text-green-600 font-medium mt-0.5">Removed from Bank</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-black text-red-700">{wrongIds.length}</div>
              <div className="text-xs text-red-600 font-medium mt-0.5">Still in Bank</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Back to Home
            </button>
            {wrongIds.length > 0 && (
              <button
                onClick={() => {
                  // Restart with remaining mistakes
                  const remaining = shuffle(getMistakeQuestions());
                  window.location.reload(); // simplest way to reinitialise state
                }}
                className="flex-1 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors"
              >
                Retry Remaining
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Quiz screen ────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-semibold text-gray-900 text-sm">Redemption Quiz</span>
            </div>
            <div className="text-xs text-gray-500">{answeredCount}/{questions.length} answered · Instant feedback</div>
          </div>
          {/* Progress */}
          <div className="w-20 bg-gray-100 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-orange-500 transition-all duration-300"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-7 mb-5">
          <QuizQuestion
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={submitted[currentQuestion.id] ?? answers[currentQuestion.id] ?? null}
            onSelectAnswer={handleSelect}
            showFeedback={isLocked}
            isSubmitted={isLocked}
          />

          {/* Confirm button */}
          {!isLocked && selectedAnswer !== null && (
            <button
              onClick={handleConfirm}
              className="mt-5 w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Confirm Answer
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((i) => i - 1)}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {/* Dot nav */}
          <div className="hidden sm:flex flex-wrap gap-1.5 max-w-xs justify-center">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(i)}
                className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                  i === currentIndex
                    ? 'bg-gray-900 text-white scale-110'
                    : submitted[q.id] !== undefined
                    ? submitted[q.id] === q.answer
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}
                title={`Question ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white font-medium text-sm hover:bg-gray-700 transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-medium text-sm transition-colors"
            >
              Finish <Send className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
