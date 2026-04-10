import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

const optionLetters = ['A', 'B', 'C', 'D'];

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  showFeedback,       // boolean: show correct/wrong highlight
  isSubmitted,        // boolean: answer locked in
}) {
  const getOptionStyle = (index) => {
    const base = 'w-full text-left px-4 py-3.5 rounded-xl border text-sm font-medium transition-all flex items-start gap-3 ';

    if (!isSubmitted && selectedAnswer === index) {
      return base + 'border-blue-500 bg-blue-50 text-blue-900 ring-2 ring-blue-200';
    }

    if (isSubmitted && showFeedback) {
      if (index === question.answer) {
        return base + 'border-green-500 bg-green-50 text-green-900 ring-2 ring-green-200';
      }
      if (selectedAnswer === index && index !== question.answer) {
        return base + 'border-red-500 bg-red-50 text-red-900 ring-2 ring-red-200';
      }
    }

    if (!isSubmitted) {
      return base + 'border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50 cursor-pointer';
    }

    return base + 'border-gray-200 text-gray-500 cursor-default';
  };

  const getLetterStyle = (index) => {
    const base = 'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ';
    if (!isSubmitted && selectedAnswer === index) {
      return base + 'bg-blue-500 text-white';
    }
    if (isSubmitted && showFeedback && index === question.answer) {
      return base + 'bg-green-500 text-white';
    }
    if (isSubmitted && showFeedback && selectedAnswer === index && index !== question.answer) {
      return base + 'bg-red-500 text-white';
    }
    return base + 'bg-gray-100 text-gray-500';
  };

  const wasCorrect = isSubmitted && selectedAnswer === question.answer;
  const wasWrong = isSubmitted && selectedAnswer !== null && selectedAnswer !== question.answer;

  return (
    <div>
      {/* Progress & question number */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          Question {questionNumber} of {totalQuestions}
        </span>
        {isSubmitted && showFeedback && (
          <span className={`flex items-center gap-1 text-xs font-semibold ${wasCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {wasCorrect ? (
              <><CheckCircle className="w-4 h-4" /> Correct</>
            ) : (
              <><XCircle className="w-4 h-4" /> Incorrect</>
            )}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5">
        <div
          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question text */}
      <p className="text-gray-900 font-semibold text-base md:text-lg leading-relaxed mb-5">
        {question.question}
      </p>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            className={getOptionStyle(idx)}
            onClick={() => !isSubmitted && onSelectAnswer(idx)}
            disabled={isSubmitted}
          >
            <span className={getLetterStyle(idx)}>
              {optionLetters[idx]}
            </span>
            <span className="leading-snug">{opt}</span>
            {isSubmitted && showFeedback && idx === question.answer && (
              <CheckCircle className="w-4 h-4 text-green-500 ml-auto flex-shrink-0 mt-0.5" />
            )}
            {isSubmitted && showFeedback && selectedAnswer === idx && idx !== question.answer && (
              <XCircle className="w-4 h-4 text-red-500 ml-auto flex-shrink-0 mt-0.5" />
            )}
          </button>
        ))}
      </div>

      {/* Explanation (only in feedback mode after submission) */}
      {isSubmitted && showFeedback && question.explanation && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
          <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-900 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
