import { useState } from 'react';
import { calculateWakeUpTimes, calculateBedtimes, formatTime } from './utils/sleepLogic';

function App() {
  const [wakeUpTimes, setWakeUpTimes] = useState<Date[]>([]);
  const [bedtimes, setBedtimes] = useState<Date[]>([]);
  const [targetWakeUpTime, setTargetWakeUpTime] = useState('07:00');
  const [mode, setMode] = useState<'none' | 'sleep-now' | 'wake-up'>('none');
  const [sleepOnset, setSleepOnset] = useState(
    Number(localStorage.getItem('sleepOnset')) || 15
  );
  const [showSettings, setShowSettings] = useState(false);

  const handleOnsetChange = (val: string) => {
    const minutes = parseInt(val, 10) || 0;
    setSleepOnset(minutes);
    localStorage.setItem('sleepOnset', minutes.toString());
  };

  const handleSleepNow = () => {
    const times = calculateWakeUpTimes(new Date(), sleepOnset);
    setWakeUpTimes(times);
    setMode('sleep-now');
  };

  const handleWakeUpAt = (time: string) => {
    setTargetWakeUpTime(time);
    const times = calculateBedtimes(time, sleepOnset);
    setBedtimes(times);
    setMode('wake-up');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-2xl relative">
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
          title="Settings"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Sleep Cycles</h1>
          <p className="text-neutral-400">Calculate the best time to wake up or go to bed.</p>
        </header>

        {showSettings && (
          <section className="space-y-4 p-4 bg-neutral-800 rounded-xl animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">Settings</h2>
            <div className="space-y-2">
              <label htmlFor="onset-time" className="block text-sm font-medium text-neutral-400">
                Time to fall asleep (minutes):
              </label>
              <input
                id="onset-time"
                type="number"
                min="0"
                max="60"
                value={sleepOnset}
                onChange={(e) => handleOnsetChange(e.target.value)}
                className="w-full bg-neutral-900 border-none rounded-lg p-2 text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </section>
        )}

        <section className="space-y-4">
          <button
            onClick={handleSleepNow}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all active:scale-95 cursor-pointer"
          >
            I want to sleep now
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-neutral-900 px-2 text-neutral-500">Or</span>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="wake-up-time" className="block text-sm font-medium text-neutral-400">
              I want to wake up at:
            </label>
            <input
              id="wake-up-time"
              type="time"
              value={targetWakeUpTime}
              onChange={(e) => handleWakeUpAt(e.target.value)}
              className="w-full bg-neutral-800 border-none rounded-xl p-4 text-xl font-mono text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            <button
               onClick={() => handleWakeUpAt(targetWakeUpTime)}
               className="w-full py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-xl transition-all active:scale-95 cursor-pointer"
            >
              Calculate Bedtimes
            </button>
          </div>
        </section>

        {mode === 'sleep-now' && (
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg font-semibold text-center text-indigo-400">Suggested Wake-up Times:</h2>
            <div className="grid grid-cols-2 gap-3">
              {wakeUpTimes.map((time, i) => (
                <div key={i} className="bg-neutral-800 p-4 rounded-xl text-center border border-neutral-700">
                  <div className="text-2xl font-bold">{formatTime(time)}</div>
                  <div className="text-xs text-neutral-500">{3 + i} cycles</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {mode === 'wake-up' && (
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg font-semibold text-center text-indigo-400">Suggested Bedtimes:</h2>
            <div className="grid grid-cols-2 gap-3">
              {bedtimes.map((time, i) => (
                <div key={i} className="bg-neutral-800 p-4 rounded-xl text-center border border-neutral-700">
                  <div className="text-2xl font-bold">{formatTime(time)}</div>
                  <div className="text-xs text-neutral-500">{6 - i} cycles</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      
      <footer className="mt-8 text-neutral-600 text-sm">
        Each cycle is 90 minutes. {sleepOnset} {sleepOnset === 1 ? 'minute' : 'minutes'} included for falling asleep.
      </footer>
    </div>
  );
}

export default App;
