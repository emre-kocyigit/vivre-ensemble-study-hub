# 🇱🇺 Vivre ensemble au Grand-Duché de Luxembourg

**A free, open-source exam simulator for the Luxembourg naturalisation test.**

Built with React + Vite + Tailwind CSS. All progress is stored locally — no account needed, no data collected.

---

## About the Exam

The *Vivre ensemble au Grand-Duché de Luxembourg* test is a mandatory requirement for Luxembourg nationality. The official format is:

| Detail | Value |
|---|---|
| Total questions | 40 multiple-choice |
| Duration | 60 minutes |
| Pass mark | **28 / 40** (70%) |

### Official Module Weighting (`matieres_en.pdf`)

Question distribution follows the official curriculum hours, as published in the Ministry's reference document:

| Module | Topic | Curriculum Hours | Questions in Exam |
|---|---|:---:|:---:|
| Module 1 | Fundamental Rights | 6 h | **10** |
| Module 2 | State & Municipal Institutions | 12 h | **20** |
| Module 3 | History & European Integration | 6 h | **10** |
| **Total** | | **24 h** | **40** |

---

## Features

### 🏆 Exam Simulation
- Exactly **40 questions** drawn from the full question bank, respecting the official 10 / 20 / 10 distribution.
- **60-minute countdown** timer with colour-coded warnings at 5 minutes and 1 minute remaining.
- No feedback during the exam — results revealed only on final submission.
- Pass / Fail verdict with a per-module score breakdown.
- Best scores saved to LocalStorage.

### 📖 Section Quiz (Practice Mode)
- Choose any single module to focus on.
- Select 10, 20, or all available questions.
- **Instant Feedback** mode: see the correct answer and explanation immediately after each answer.
- **End Review** mode: complete all questions first, then review results.
- No timer — study at your own pace.

### 🔥 Mistake Bank & Redemption Quiz
- Every incorrect answer (in any mode) is automatically saved to a persistent **Mistake Bank**.
- The home dashboard shows a live **"Questions to Review"** counter.
- **Redemption Quiz**: a targeted quiz built exclusively from your saved mistakes.
- Correct answers in Redemption mode are automatically removed from the bank.

### 🃏 Flashcards
- Flip-card view for all 60 questions in the bank.
- **Front:** the question. **Back:** all options with the correct answer highlighted in green, plus the explanation.
- Smooth CSS 3D flip animation.
- Filter by module (Rights / Institutions / History) or show **Mistakes Only**.
- Mark cards as *"Got It"* (removes from Mistake Bank) or *"Still Learning"* (adds to bank).
- Reshuffle button to randomise the deck.

---

## Question Bank

60 hand-written questions covering the official curriculum:

- **Module 1 (20 questions):** 1848 Constitution, European Convention on Human Rights (ECHR), Constitutional Court of Luxembourg.
- **Module 2 (20 questions):** Role of the Grand Duke, three branches of power (legislative / executive / judicial), 1918–19 political crisis.
- **Module 3 (20 questions):** 963 Lucilinburhuc founding, Treaty of London 1839, steel industry (*Minette* ore), Schengen Agreement.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v3 |
| Icons | Lucide React |
| Animation | CSS 3D transforms (no library) |
| State | React hooks (`useState`, `useEffect`, `useCallback`) |
| Persistence | `localStorage` (client-side only) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites
- Node.js ≥ 18

### Local development

```bash
git clone https://github.com/YOUR_USERNAME/vivre-ensemble.git
cd vivre-ensemble
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```


---

## Privacy

> **This app collects zero personal data.**
>
> Your quiz scores, answers, and Mistake Bank are stored exclusively in your own browser via the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) (`localStorage`). Nothing is transmitted to any server. To erase all data, clear your browser's site data / cache for this domain.

---

## Sources & References

This study hub is based on the official curriculum and documentation from the Luxembourg Ministry of Education:

- [Official Vivre Ensemble Portal](https://ssl.education.lu/ve-portal/#/home)
- [Examination Content PDF](https://ssl.education.lu/ve-portal/assets/docs/matieres_en.pdf)

---

## License

MIT — free to use, fork, and improve.

---

## Disclaimer

This is an unofficial study tool. Always refer to the [official Luxembourg government resources](https://guichet.public.lu/en/citoyens/nationalite/naturalisation.html) for the most current exam information.
