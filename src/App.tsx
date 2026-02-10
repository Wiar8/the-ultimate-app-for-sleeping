import { useState } from 'react';
import { calculateWakeUpTimes, calculateBedtimes } from './utils/sleepLogic';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CalculatorCard } from './components/CalculatorCard';
import { ResultsSection } from './components/ResultsSection';
import { InfoSection } from './components/InfoSection';
import { Footer } from './components/Footer';

function App() {
  const [results, setResults] = useState<Date[]>([]);
  const [mode, setMode] = useState<'none' | 'sleep-now' | 'wake-up'>('none');
  const [targetWakeUpDisplay, setTargetWakeUpDisplay] = useState('');
  const [sleepOnset, setSleepOnset] = useState(
    Number(localStorage.getItem('sleepOnset')) || 15
  );

  const handleOnsetChange = (val: string) => {
    const minutes = Math.min(60, Math.max(0, parseInt(val, 10) || 0));
    setSleepOnset(minutes);
    localStorage.setItem('sleepOnset', minutes.toString());
  };

  const handleSleepNow = () => {
    const times = calculateWakeUpTimes(new Date(), sleepOnset);
    setResults(times);
    setMode('sleep-now');
  };

  const handleWakeUpAt = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    const displayPeriod = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 || 12;
    setTargetWakeUpDisplay(`${displayHour}:${m.toString().padStart(2, '0')} ${displayPeriod}`);

    const times = calculateBedtimes(timeStr, sleepOnset);
    setResults(times);
    setMode('wake-up');
  };

  return (
    <div className="min-h-screen bg-(--sc-bg) text-(--sc-text) flex flex-col items-center">
      <div className="w-full max-w-7xl flex flex-col">
        <Header />
        <HeroSection />

        <CalculatorCard
          sleepOnset={sleepOnset}
          onCalculateWakeUp={handleWakeUpAt}
          onCalculateSleepNow={handleSleepNow}
          onSleepOnsetChange={handleOnsetChange}
        />

        {mode !== 'none' && (
          <ResultsSection
            mode={mode}
            times={results}
            targetWakeUpTime={targetWakeUpDisplay}
          />
        )}

        {/* Separator */}
        <div className="w-full px-6 md:px-16">
          <div className="w-full h-px bg-linear-to-r from-transparent via-(--sc-border) to-transparent" />
        </div>

        <InfoSection />

        <Footer />
      </div>
    </div>
  );
}

export default App;
