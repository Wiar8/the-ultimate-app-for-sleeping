import { Sunrise, MoonStar, Calculator, Timer, Pencil } from 'lucide-react';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Mode = 'wake-up' | 'sleep-now';

interface CalculatorCardProps {
  sleepOnset: number;
  onCalculateWakeUp: (timeStr: string) => void;
  onCalculateSleepNow: () => void;
  onSleepOnsetChange: (val: string) => void;
}

export function CalculatorCard({
  sleepOnset,
  onCalculateWakeUp,
  onCalculateSleepNow,
  onSleepOnsetChange,
}: CalculatorCardProps) {
  const [activeTab, setActiveTab] = useState<Mode>('wake-up');
  const [hour, setHour] = useState(7);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');
  const [editingOnset, setEditingOnset] = useState(false);

  const to24h = useCallback((h: number, p: 'AM' | 'PM') => {
    if (p === 'AM' && h === 12) return 0;
    if (p === 'PM' && h !== 12) return h + 12;
    return h;
  }, []);

  const getTimeStr = useCallback(() => {
    const h24 = to24h(hour, period);
    return `${h24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }, [hour, minute, period, to24h]);

  const handleCalculate = () => {
    if (activeTab === 'wake-up') {
      onCalculateWakeUp(getTimeStr());
    } else {
      onCalculateSleepNow();
    }
  };

  const handleTabChange = (tab: Mode) => {
    setActiveTab(tab);
  };

  const cycleHour = (dir: 1 | -1) => {
    setHour(prev => {
      const next = prev + dir;
      if (next > 12) return 1;
      if (next < 1) return 12;
      return next;
    });
  };

  const cycleMinute = (dir: 1 | -1) => {
    setMinute(prev => {
      const next = prev + dir * 5;
      if (next >= 60) return 0;
      if (next < 0) return 55;
      return next;
    });
  };

  return (
    <section className="flex flex-col items-center gap-8 px-6 py-5 md:px-16 w-full">
      <motion.div 
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="flex flex-col gap-7 p-8 rounded-3xl bg-[rgba(19,17,36,0.5)] border border-(--sc-border) shadow-[0_20px_60px_-10px_rgba(124,106,232,0.13)] w-full max-w-xl backdrop-blur-sm overflow-hidden"
      >
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl bg-(--sc-input-bg) w-full relative">
          <button
            onClick={() => handleTabChange('wake-up')}
            className={`flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer relative z-10 ${
              activeTab === 'wake-up'
                ? 'text-white'
                : 'text-(--sc-text-secondary) hover:text-(--sc-text)'
            }`}
          >
            <Sunrise className="w-4 h-4" />
            Wake Up At
            {activeTab === 'wake-up' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-(--sc-primary) rounded-xl z-[-1]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </button>
          <button
            onClick={() => handleTabChange('sleep-now')}
            className={`flex items-center justify-center gap-2 flex-1 py-3 rounded-xl text-sm font-medium transition-colors duration-200 cursor-pointer relative z-10 ${
              activeTab === 'sleep-now'
                ? 'text-white'
                : 'text-(--sc-text-secondary) hover:text-(--sc-text)'
            }`}
          >
            <MoonStar className="w-4 h-4" />
            Sleep Now
            {activeTab === 'sleep-now' && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-(--sc-primary) rounded-xl z-[-1]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
          </button>
        </div>

        {/* Form content mapping */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: activeTab === 'wake-up' ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: activeTab === 'wake-up' ? 10 : -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex flex-col gap-7 w-full"
          >
            {/* Time input (only for wake-up mode) */}
            {activeTab === 'wake-up' && (
              <div className="flex flex-col items-center gap-3 w-full">
                <span className="text-sm text-(--sc-text-secondary)">I want to wake up at</span>
                <div className="flex items-center gap-3">
                  {/* Hour */}
                  <button
                    onClick={() => cycleHour(1)}
                    onWheel={(e) => cycleHour(e.deltaY > 0 ? -1 : 1)}
                    className="flex items-center justify-center w-24 h-20 rounded-2xl bg-(--sc-input-bg) border border-(--sc-border) cursor-pointer hover:border-(--sc-primary) transition-colors"
                  >
                    <span className="font-['Playfair_Display'] text-4xl font-semibold italic text-(--sc-text)">
                      {hour.toString().padStart(2, '0')}
                    </span>
                  </button>

                  {/* Colon */}
                  <span className="font-['Playfair_Display'] text-4xl font-semibold italic text-(--sc-primary)">
                    :
                  </span>

                  {/* Minute */}
                  <button
                    onClick={() => cycleMinute(1)}
                    onWheel={(e) => cycleMinute(e.deltaY > 0 ? -1 : 1)}
                    className="flex items-center justify-center w-24 h-20 rounded-2xl bg-(--sc-input-bg) border border-(--sc-border) cursor-pointer hover:border-(--sc-primary) transition-colors"
                  >
                    <span className="font-['Playfair_Display'] text-4xl font-semibold italic text-(--sc-text)">
                      {minute.toString().padStart(2, '0')}
                    </span>
                  </button>

                  {/* AM/PM */}
                  <button
                    onClick={() => setPeriod(p => p === 'AM' ? 'PM' : 'AM')}
                    className="flex flex-col items-center justify-center gap-0.5 w-14 h-20 rounded-2xl bg-(--sc-input-bg) border border-(--sc-border) cursor-pointer hover:border-(--sc-primary) transition-colors"
                  >
                    <span className={`text-sm font-semibold ${period === 'AM' ? 'text-(--sc-primary)' : 'text-(--sc-text-muted)'}`}>
                      AM
                    </span>
                    <span className={`text-sm ${period === 'PM' ? 'font-semibold text-(--sc-primary)' : 'text-(--sc-text-muted)'}`}>
                      PM
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Sleep now description */}
            {activeTab === 'sleep-now' && (
              <div className="flex flex-col gap-3 w-full">
                <p className="text-sm text-(--sc-text-secondary)">
                  Going to bed now? We'll calculate the best times to set your alarm.
                </p>
              </div>
            )}

            {/* Calculate button */}
            <button
              onClick={handleCalculate}
              className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-(--sc-primary) text-white font-semibold transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-lg shadow-indigo-500/10"
            >
              <Calculator className="w-5 h-5" />
              {activeTab === 'wake-up' ? 'Calculate Sleep Times' : 'Calculate Wake Times'}
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Sleep onset setting */}
        <div className="flex items-center justify-center gap-2 w-full pt-2">
          <Timer className="w-3.5 h-3.5 text-(--sc-text-muted)" />
          <span className="text-sm text-(--sc-text-muted)">Time to fall asleep:</span>
          {editingOnset ? (
            <input
              type="number"
              min={0}
              max={60}
              value={sleepOnset}
              onChange={(e) => onSleepOnsetChange(e.target.value)}
              onBlur={() => setEditingOnset(false)}
              onKeyDown={(e) => e.key === 'Enter' && setEditingOnset(false)}
              autoFocus
              className="w-14 text-center text-sm font-semibold text-(--sc-primary) bg-(--sc-input-bg) border border-(--sc-border) rounded-lg px-1 py-0.5 focus:outline-none focus:border-(--sc-primary)"
            />
          ) : (
            <span className="text-sm font-semibold text-(--sc-primary)">{sleepOnset} min</span>
          )}
          <button
            onClick={() => setEditingOnset(true)}
            className="cursor-pointer text-(--sc-text-muted) hover:text-(--sc-primary) transition-colors"
          >
            <Pencil className="w-3 h-3" />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
