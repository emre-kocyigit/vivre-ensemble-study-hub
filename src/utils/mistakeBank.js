import { questions } from '../data/questions';

const MISTAKE_KEY = 'lux_mistake_bank';

export function getMistakeIds() {
  try {
    return JSON.parse(localStorage.getItem(MISTAKE_KEY)) || [];
  } catch {
    return [];
  }
}

export function getMistakeCount() {
  return getMistakeIds().length;
}

export function getMistakeQuestions(moduleFilter = null) {
  const ids = new Set(getMistakeIds());
  return questions.filter(
    (q) => ids.has(q.id) && (moduleFilter === null || q.module === moduleFilter)
  );
}

/** Add wrong-answer question IDs to the bank (deduplicates) */
export function addMistakes(ids) {
  if (!ids || ids.length === 0) return;
  const current = new Set(getMistakeIds());
  ids.forEach((id) => current.add(id));
  localStorage.setItem(MISTAKE_KEY, JSON.stringify([...current]));
}

/** Remove question IDs from the bank (used when answered correctly in Redemption) */
export function removeMistakes(ids) {
  if (!ids || ids.length === 0) return;
  const current = new Set(getMistakeIds());
  ids.forEach((id) => current.delete(id));
  localStorage.setItem(MISTAKE_KEY, JSON.stringify([...current]));
}

export function clearMistakeBank() {
  localStorage.removeItem(MISTAKE_KEY);
}

/** Returns IDs of questions answered incorrectly */
export function getWrongAnswerIds(quizQuestions, answers) {
  return quizQuestions
    .filter((q) => answers[q.id] !== q.answer)
    .map((q) => q.id);
}
