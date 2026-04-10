import { BookOpen, Trophy, Clock, Target, Star, ChevronRight, Flame, LayoutGrid, Trash2 } from 'lucide-react';
import { MODULE_INFO, EXAM_CONFIG } from '../data/questions';
import { getBestScores } from '../utils/quiz';
import { getMistakeCount, clearMistakeBank } from '../utils/mistakeBank';
import { useState } from 'react';
import PrivacyFooter from './PrivacyFooter';

const moduleColors = {
  blue: {
    bg: 'bg-blue-50', border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500',
  },
  emerald: {
    bg: 'bg-emerald-50', border: 'border-emerald-200',
    badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500',
  },
  amber: {
    bg: 'bg-amber-50', border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500',
  },
};

export default function LandingPage({ onStartExam, onStartPractice, onStartRedemption, onStartFlashcards }) {
  const bestScores = getBestScores();
  const topScore = bestScores.length ? Math.max(...bestScores.map((s) => s.score)) : null;
  const [mistakeCount, setMistakeCount] = useState(() => getMistakeCount());

  const handleClearBank = () => {
    if (window.confirm(`Clear all ${mistakeCount} mistakes from the bank?`)) {
      clearMistakeBank();
      setMistakeCount(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
            <span className="text-base">🇱🇺</span>
            <span>Luxembourg Citizenship Exam Prep</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Vivre ensemble au<br />
            <span className="text-red-600">Grand-Duché de Luxembourg</span>
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Prepare for your naturalisation exam with realistic simulations and targeted practice sessions.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Target className="w-4 h-4 text-red-500" />
              <span>Pass mark: <strong>{EXAM_CONFIG.passingScore}/{EXAM_CONFIG.totalQuestions}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Duration: <strong>{EXAM_CONFIG.durationMinutes} minutes</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span><strong>60+</strong> questions in bank</span>
            </div>
            {topScore !== null && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Star className="w-4 h-4 text-amber-500" />
                <span>Your best: <strong>{topScore}/40</strong></span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* ── Smart Review Banner ───────────────────────────── */}
        <div className={`rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center gap-4 ${
          mistakeCount > 0
            ? 'bg-orange-50 border-orange-200'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              mistakeCount > 0 ? 'bg-orange-100' : 'bg-gray-100'
            }`}>
              <Flame className={`w-5 h-5 ${mistakeCount > 0 ? 'text-orange-600' : 'text-gray-400'}`} />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">
                Smart Review
                {mistakeCount > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {mistakeCount}
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {mistakeCount > 0
                  ? `${mistakeCount} question${mistakeCount > 1 ? 's' : ''} to review · Tracked from your quiz attempts`
                  : 'No mistakes tracked yet — complete a quiz to populate your review bank'}
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {mistakeCount > 0 && (
              <button
                onClick={handleClearBank}
                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Clear mistake bank"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ── Mode Cards ────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Exam Simulation */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-gradient-to-br from-red-500 to-red-700 p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 rounded-xl p-2.5">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Exam Simulation</h2>
                  <p className="text-red-100 text-sm">Official exam conditions</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm flex-wrap">
                <span className="bg-white/20 rounded-lg px-2.5 py-1">40 questions</span>
                <span className="bg-white/20 rounded-lg px-2.5 py-1">60 min timer</span>
                <span className="bg-white/20 rounded-lg px-2.5 py-1">No hints</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <ul className="space-y-2 text-sm text-gray-600 mb-5 flex-1">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Exact 10/20/10 distribution across modules</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>60-minute countdown — stay focused</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Results revealed only after final submission</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Wrong answers auto-added to review bank</li>
              </ul>
              <button onClick={onStartExam} className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 group">
                Start Simulation <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Section Quiz */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/20 rounded-xl p-2.5">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Section Quiz</h2>
                  <p className="text-blue-100 text-sm">Practice by module</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm flex-wrap">
                <span className="bg-white/20 rounded-lg px-2.5 py-1">Choose module</span>
                <span className="bg-white/20 rounded-lg px-2.5 py-1">Instant feedback</span>
                <span className="bg-white/20 rounded-lg px-2.5 py-1">No timer</span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <ul className="space-y-2 text-sm text-gray-600 mb-5 flex-1">
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Focus on any of the 3 curriculum modules</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Choose 10, 20, or all available questions</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Optional instant feedback with explanations</li>
                <li className="flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>Mistakes tracked automatically</li>
              </ul>
              <button onClick={onStartPractice} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 group">
                Start Practice <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Smart Review Actions ───────────────────────────── */}
        <div className="grid grid-cols-2 gap-4">
          {/* Redemption Quiz */}
          <div className={`rounded-2xl border overflow-hidden ${
            mistakeCount > 0
              ? 'border-orange-200 bg-white'
              : 'border-gray-100 bg-gray-50 opacity-60'
          }`}>
            <div className={`p-5 ${mistakeCount > 0 ? 'bg-gradient-to-br from-orange-500 to-red-600' : 'bg-gray-200'} text-white`}>
              <div className="flex items-center gap-2.5 mb-1">
                <Flame className="w-5 h-5" />
                <span className="font-bold">Redemption Quiz</span>
              </div>
              <p className="text-white/80 text-xs">
                {mistakeCount > 0
                  ? `Quiz yourself on your ${mistakeCount} saved mistakes`
                  : 'Complete quizzes to unlock'}
              </p>
            </div>
            <div className="px-5 py-4">
              <button
                onClick={onStartRedemption}
                disabled={mistakeCount === 0}
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2 ${
                  mistakeCount > 0
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {mistakeCount > 0 ? (
                  <><Flame className="w-4 h-4" /> Start Redemption</>
                ) : (
                  'No mistakes yet'
                )}
              </button>
            </div>
          </div>

          {/* Flashcards */}
          <div className="rounded-2xl border border-purple-200 bg-white overflow-hidden">
            <div className="p-5 bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <div className="flex items-center gap-2.5 mb-1">
                <LayoutGrid className="w-5 h-5" />
                <span className="font-bold">Flashcards</span>
              </div>
              <p className="text-white/80 text-xs">
                Flip-card review for all 60 questions
              </p>
            </div>
            <div className="px-5 py-4">
              <button
                onClick={onStartFlashcards}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" /> Browse Flashcards
              </button>
            </div>
          </div>
        </div>

        {/* ── About ────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">About This Tool</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            This tool helps residents prepare for the 24-hour <strong>«&nbsp;Vivre ensemble au Grand-Duché
            de Luxembourg&nbsp;»</strong> course modules required for Luxembourg nationality. It covers all
            official curriculum topics with 60+ practice questions, timed simulations, and a smart
            mistake-tracking system.
          </p>
          <ol className="space-y-2">
            {[
              { n: 1, label: 'Fundamental Rights', sub: '1848 Constitution · ECHR · Constitutional Court', color: 'bg-blue-500' },
              { n: 2, label: 'State & Municipal Institutions', sub: 'Grand Duke · 3 branches of power · 1918/19 crisis', color: 'bg-emerald-500' },
              { n: 3, label: 'History & European Integration', sub: '963 Lucilinburhuc · 1839 independence · Steel · Schengen', color: 'bg-amber-500' },
            ].map(({ n, label, sub, color }) => (
              <li key={n} className="flex items-start gap-3">
                <span className={`${color} text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  {n}
                </span>
                <div>
                  <span className="text-sm font-semibold text-gray-900">{label}</span>
                  <span className="text-xs text-gray-400 ml-2">{sub}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* ── Curriculum Overview ───────────────────────────── */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Curriculum Overview</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(MODULE_INFO).map(([id, mod]) => {
              const c = moduleColors[mod.color];
              return (
                <div key={id} className={`${c.bg} ${c.border} border rounded-xl p-4`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.badge}`}>{mod.name}</span>
                    <span className="text-xs text-gray-500">{mod.hours}h curriculum</span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{mod.title}</h4>
                  <p className="text-xs text-gray-500 mb-3">{mod.description}</p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                    <span><strong>{mod.examQuestions}</strong> questions in exam</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Best Scores ───────────────────────────────────── */}
        {bestScores.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Simulation Scores</h3>
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {bestScores.slice(0, 5).map((s, i) => (
                <div key={i} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 w-4">#{i + 1}</span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      s.passed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {s.passed ? 'PASSED' : 'FAILED'}
                    </span>
                    <span className="text-sm text-gray-500">{new Date(s.date).toLocaleDateString()}</span>
                  </div>
                  <span className="font-bold text-gray-900">{s.score}/40</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <PrivacyFooter />
    </div>
  );
}
