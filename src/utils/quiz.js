import { questions, EXAM_CONFIG } from '../data/questions';

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Build the 40-question exam set with exact distribution
 */
export function buildExamQuestions() {
  const result = [];
  Object.entries(EXAM_CONFIG.distribution).forEach(([mod, count]) => {
    const pool = questions.filter((q) => q.module === parseInt(mod));
    result.push(...shuffle(pool).slice(0, count));
  });
  return shuffle(result);
}

/**
 * Build a practice quiz for a specific module
 */
export function buildPracticeQuestions(moduleId, count) {
  const pool = questions.filter((q) => q.module === moduleId);
  const shuffled = shuffle(pool);
  return count === 'all' ? shuffled : shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Calculate score results from an answers map
 */
export function calculateResults(quizQuestions, answers) {
  let totalCorrect = 0;
  const byModule = {};

  quizQuestions.forEach((q) => {
    const mod = q.module;
    if (!byModule[mod]) byModule[mod] = { correct: 0, total: 0 };
    byModule[mod].total += 1;

    if (answers[q.id] === q.answer) {
      totalCorrect += 1;
      byModule[mod].correct += 1;
    }
  });

  return { totalCorrect, byModule, total: quizQuestions.length };
}

/**
 * LocalStorage helpers for best scores
 */
const STORAGE_KEY = 'lux_exam_best_scores';

export function getBestScores() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveBestScore(score, passed) {
  const scores = getBestScores();
  scores.unshift({ score, passed, date: new Date().toISOString() });
  const top10 = scores.slice(0, 10);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(top10));
  return top10;
}
