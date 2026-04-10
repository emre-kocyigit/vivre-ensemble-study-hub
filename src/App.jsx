import { useState } from 'react';
import LandingPage from './components/LandingPage';
import PracticeSetup from './components/PracticeSetup';
import ExamMode from './components/ExamMode';
import PracticeMode from './components/PracticeMode';
import RedemptionMode from './components/RedemptionMode';
import FlashcardMode from './components/FlashcardMode';

// Screens: 'home' | 'exam' | 'practice-setup' | 'practice' | 'redemption' | 'flashcards'
export default function App() {
  const [screen, setScreen] = useState('home');
  const [practiceConfig, setPracticeConfig] = useState(null);

  const handleBack = () => {
    setScreen('home');
    setPracticeConfig(null);
  };

  const handlePracticeStart = (config) => {
    setPracticeConfig(config);
    setScreen('practice');
  };

  if (screen === 'exam') return <ExamMode onBack={handleBack} />;

  if (screen === 'practice-setup') {
    return (
      <PracticeSetup
        onBack={handleBack}
        onStart={handlePracticeStart}
      />
    );
  }

  if (screen === 'practice' && practiceConfig) {
    return (
      <PracticeMode
        config={practiceConfig}
        onBack={() => setScreen('practice-setup')}
      />
    );
  }

  if (screen === 'redemption') return <RedemptionMode onBack={handleBack} />;

  if (screen === 'flashcards') return <FlashcardMode onBack={handleBack} />;

  return (
    <LandingPage
      onStartExam={() => setScreen('exam')}
      onStartPractice={() => setScreen('practice-setup')}
      onStartRedemption={() => setScreen('redemption')}
      onStartFlashcards={() => setScreen('flashcards')}
    />
  );
}
