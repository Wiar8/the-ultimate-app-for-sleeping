import { motion } from 'motion/react';
import { useI18n } from '../i18n';
import { CycleCard } from './CycleCard';
import { formatTime } from '../utils/sleepLogic';

interface ResultsSectionProps {
  mode: 'sleep-now' | 'wake-up';
  times: Date[];
  targetWakeUpTime?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function ResultsSection({ mode, times, targetWakeUpTime }: ResultsSectionProps) {
  const { t } = useI18n();

  // For wake-up mode, times come in [6-cycle, 5-cycle, 4-cycle, 3-cycle] order
  // For sleep-now mode, times come in [3-cycle, 4-cycle, 5-cycle, 6-cycle] order
  const cards = mode === 'wake-up'
    ? times.map((t, i) => ({ time: t, cycles: 6 - i }))
    : [...times].reverse().map((t, i) => ({ time: t, cycles: 6 - i }));

  const title = mode === 'wake-up'
    ? t.results.optimalBedtimes
    : t.results.optimalWakeTimes;

  const subtitle = mode === 'wake-up' && targetWakeUpTime
    ? t.results.wakeUpSubtitle(targetWakeUpTime)
    : t.results.sleepNowSubtitle;

  return (
    <section className="flex flex-col items-center gap-8 px-6 py-12 md:px-16 w-full relative">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_40%_60%_at_20%_30%,_rgba(124,106,232,0.03)_0%,_transparent_100%)]" />

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-2 relative"
      >
        <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-semibold italic text-center text-(--sc-text)">
          {title}
        </h2>
        <p className="text-base text-(--sc-text-secondary) text-center">
          {subtitle}
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-3xl"
      >
        {cards.map(({ time, cycles }) => (
          <CycleCard
            key={cycles}
            time={formatTime(time)}
            cycles={cycles}
            isRecommended={cycles === 6}
          />
        ))}
      </motion.div>
    </section>
  );
}
