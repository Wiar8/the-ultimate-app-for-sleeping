import { CycleCard } from './CycleCard';
import { formatTime } from '../utils/sleepLogic';

interface ResultsSectionProps {
  mode: 'sleep-now' | 'wake-up';
  times: Date[];
  targetWakeUpTime?: string;
}

export function ResultsSection({ mode, times, targetWakeUpTime }: ResultsSectionProps) {
  // For wake-up mode, times come in [6-cycle, 5-cycle, 4-cycle, 3-cycle] order
  // For sleep-now mode, times come in [3-cycle, 4-cycle, 5-cycle, 6-cycle] order
  const cards = mode === 'wake-up'
    ? times.map((t, i) => ({ time: t, cycles: 6 - i }))
    : [...times].reverse().map((t, i) => ({ time: t, cycles: 6 - i }));

  const title = mode === 'wake-up'
    ? 'Your Optimal Bedtimes'
    : 'Your Optimal Wake Times';

  const subtitle = mode === 'wake-up'
    ? `Go to bed at one of these times to wake up at ${targetWakeUpTime} feeling refreshed`
    : 'Set your alarm for one of these times to wake up feeling refreshed';

  return (
    <section className="flex flex-col items-center gap-8 px-6 py-12 md:px-16 w-full animate-fade-in-up">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_40%_60%_at_20%_30%,_rgba(124,106,232,0.03)_0%,_transparent_100%)]" />

      <div className="flex flex-col items-center gap-2 relative">
        <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-semibold italic text-center text-(--sc-text)">
          {title}
        </h2>
        <p className="text-base text-(--sc-text-secondary) text-center">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl">
        {cards.map(({ time, cycles }) => (
          <CycleCard
            key={cycles}
            time={formatTime(time)}
            cycles={cycles}
            isRecommended={cycles === 6}
          />
        ))}
      </div>
    </section>
  );
}
