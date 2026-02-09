import { useState } from 'react';
import { calculateWakeUpTimes, calculateBedtimes, formatTime } from './utils/sleepLogic';

function App() {
  const [wakeUpTimes, setWakeUpTimes] = useState<Date[]>([]);
  const [bedtimes, setBedtimes] = useState<Date[]>([]);
  const [targetWakeUpTime, setTargetWakeUpTime] = useState('07:00');
  const [mode, setMode] = useState<'none' | 'sleep-now' | 'wake-up'>('none');

  const handleSleepNow = () => {
    const times = calculateWakeUpTimes(new Date());
    setWakeUpTimes(times);
    setMode('sleep-now');
  };

  const handleWakeUpAt = (time: string) => {
    setTargetWakeUpTime(time);
    const times = calculateBedtimes(time);
    setBedtimes(times);
    setMode('wake-up');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-2xl">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Sleep Cycles</h1>
          <p className="text-neutral-400">Calculate the best time to wake up or go to bed.</p>
        </header>

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
        Each cycle is 90 minutes. 15 minutes included for falling asleep.
      </footer>
    </div>
  );
}

export default App;
