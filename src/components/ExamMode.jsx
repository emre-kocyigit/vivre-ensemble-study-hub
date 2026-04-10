import { useState, useEffect, useCallback } from 'react';
import { Clock, AlertTriangle, Flag, ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { buildExamQuestions, calculateResults, saveBestScore } from '../utils/quiz';
import { addMistakes, getWrongAnswerIds } from '../utils/mistakeBank';
import { EXAM_CONFIG, MODULE_INFO } from '../data/questions';
import QuizQuestion from './QuizQuestion';
import ResultsScreen from './ResultsScreen';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function ExamMode({ onBack }) {
  const [questions] = useState(() => buildExamQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(EXAM_CONFIG.durationMinutes * 60);
  const [phase, setPhase] = useState('quiz'); // 'quiz' | 'confirm' | 'results'
  const [results, setResults] = useState(null);

  const submitExam = useCallback(() => {
    const r = calculateResults(questions, answers);
    const passed = r.totalCorrect >= EXAM_CONFIG.passingScore;
    saveBestScore(r.totalCorrect, passed);
    addMistakes(getWrongAnswerIds(questions, answers));
    setResults({ ...r, passed });
    setPhase('results');
  }, [questions, answers]);

  // Countdown timer
  useEffect(() => {
    if (phase !== 'quiz') return;
    if (timeLeft <= 0) {
      submitExam();
      return;
    }
    const id = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [phase, timeLeft, submitExam]);

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;
  const currentQuestion = questions[currentIndex];
  const isWarning = timeLeft <= 300; // 5 min warning
  const isDanger = timeLeft <= 60;

  const handleAnswer = (idx) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: idx }));
  };

  const handleSubmitClick = () => {
    setPhase('confirm');
  };

  if (phase === 'results') {
    return (
      <ResultsScreen
        results={results}
        questions={questions}
        answers={answers}
        mode="exam"
        onBack={onBack}
      />
    );
  }

  if (phase === 'confirm') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7 text-amber-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Submit Exam?</h2>
          {unansweredCount > 0 ? (
            <p className="text-gray-600 mb-6">
              You have <strong className="text-red-600">{unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}</strong>.
              Unanswered questions will be marked as incorrect.
            </p>
          ) : (
            <p className="text-gray-600 mb-6">
              You have answered all {questions.length} questions. Are you ready to see your results?
            </p>
          )}
          <div className="flex gap-3">
            <button
              onClick={() => setPhase('quiz')}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Review First
            </button>
            <button
              onClick={submitExam}
              className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
            >
              Submit Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-red-500" />
            <span className="font-bold text-gray-900 text-sm hidden sm:block">Exam Simulation</span>
            <span className="text-xs text-gray-500">
              {answeredCount}/{questions.length} answered
            </span>
          </div>

          {/* Timer */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono font-bold text-sm tabular-nums ${
            isDanger
              ? 'bg-red-100 text-red-700'
              : isWarning
              ? 'bg-amber-100 text-amber-700'
              : 'bg-gray-100 text-gray-700'
          }`}>
            <Clock className={`w-4 h-4 ${isDanger ? 'animate-pulse' : ''}`} />
            {formatTime(timeLeft)}
          </div>

          <button
            onClick={handleSubmitClick}
            className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-7 mb-5">
          <QuizQuestion
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentQuestion.id] ?? null}
            onSelectAnswer={handleAnswer}
            showFeedback={false}
            isSubmitted={false}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium text-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          {/* Dot navigation */}
          <div className="hidden sm:flex flex-wrap gap-1.5 max-w-xs justify-center">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(i)}
                className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                  i === currentIndex
                    ? 'bg-gray-900 text-white scale-110'
                    : answers[q.id] !== undefined
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}
                title={`Question ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (currentIndex < questions.length - 1) {
                setCurrentIndex((i) => i + 1);
              } else {
                handleSubmitClick();
              }
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 text-white font-medium text-sm hover:bg-gray-700 transition-colors"
          >
            {currentIndex < questions.length - 1 ? (
              <>Next <ChevronRight className="w-4 h-4" /></>
            ) : (
              <>Submit <Flag className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
