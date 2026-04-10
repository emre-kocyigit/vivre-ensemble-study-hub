import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, Send } from 'lucide-react';
import { buildPracticeQuestions, calculateResults } from '../utils/quiz';
import { addMistakes, getWrongAnswerIds } from '../utils/mistakeBank';
import { MODULE_INFO } from '../data/questions';
import QuizQuestion from './QuizQuestion';
import ResultsScreen from './ResultsScreen';

const moduleAccent = {
  1: 'bg-blue-600 hover:bg-blue-700',
  2: 'bg-emerald-600 hover:bg-emerald-700',
  3: 'bg-amber-600 hover:bg-amber-700',
};

export default function PracticeMode({ config, onBack }) {
  const { moduleId, count, instantFeedback } = config;
  const mod = MODULE_INFO[moduleId];

  const [questions] = useState(() => buildPracticeQuestions(moduleId, count));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({}); // locked answers for instant mode
  const [phase, setPhase] = useState('quiz'); // 'quiz' | 'results'
  const [results, setResults] = useState(null);

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion?.id] ?? null;
  const isLocked = instantFeedback
    ? submittedAnswers[currentQuestion?.id] !== undefined
    : false;
  const answeredCount = Object.keys(instantFeedback ? submittedAnswers : answers).length;

  const handleSelectAnswer = (idx) => {
    if (isLocked) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: idx }));
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    setSubmittedAnswers((prev) => ({ ...prev, [currentQuestion.id]: selectedAnswer }));
  };

  const handleFinish = () => {
    const finalAnswers = instantFeedback ? submittedAnswers : answers;
    const r = calculateResults(questions, finalAnswers);
    addMistakes(getWrongAnswerIds(questions, finalAnswers));
    setResults({ ...r, passed: r.totalCorrect >= Math.ceil(questions.length * 0.7) });
    setPhase('results');
  };

  const canGoNext = currentIndex < questions.length - 1;
  const canGoPrev = currentIndex > 0;
  const isLastQuestion = currentIndex === questions.length - 1;

  if (phase === 'results') {
    return (
      <ResultsScreen
        results={results}
        questions={questions}
        answers={instantFeedback ? submittedAnswers : answers}
        mode="practice"
        onBack={onBack}
      />
    );
  }

  const accentClass = moduleAccent[moduleId] || 'bg-blue-600 hover:bg-blue-700';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 text-sm truncate">{mod.title}</div>
            <div className="text-xs text-gray-500">
              {answeredCount}/{questions.length} answered
              {instantFeedback && ' · Instant feedback on'}
            </div>
          </div>
          {/* Progress bar */}
          <div className="w-24 bg-gray-100 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${accentClass.split(' ')[0].replace('hover:', '')}`}
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
            selectedAnswer={
              instantFeedback
                ? (submittedAnswers[currentQuestion.id] ?? answers[currentQuestion.id] ?? null)
                : selectedAnswer
            }
            onSelectAnswer={handleSelectAnswer}
            showFeedback={instantFeedback && isLocked}
            isSubmitted={isLocked}
          />

          {/* Confirm button (instant feedback mode) */}
          {instantFeedback && !isLocked && selectedAnswer !== null && (
            <button
              onClick={handleConfirmAnswer}
              className={`mt-5 w-full py-3 rounded-xl text-white font-semibold transition-colors flex items-center justify-center gap-2 ${accentClass}`}
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
            disabled={!canGoPrev}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {/* Dot nav */}
          <div className="hidden sm:flex flex-wrap gap-1.5 max-w-xs justify-center">
            {questions.map((q, i) => {
              const ans = instantFeedback ? submittedAnswers[q.id] : answers[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                    i === currentIndex
                      ? 'bg-gray-900 text-white scale-110'
                      : ans !== undefined
                      ? accentClass.split(' ')[0].replace('hover:', '') + ' text-white'
                      : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                  }`}
                  title={`Question ${i + 1}`}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>

          {isLastQuestion ? (
            <button
              onClick={handleFinish}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium text-sm transition-colors ${accentClass}`}
            >
              Finish <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((i) => i + 1)}
              disabled={!canGoNext}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white font-medium text-sm hover:bg-gray-700 transition-colors disabled:opacity-40"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
