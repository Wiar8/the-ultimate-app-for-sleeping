import { motion } from 'motion/react';
import { useI18n } from '../i18n';

interface CycleCardProps {
  time: string;
  cycles: number;
  isRecommended: boolean;
}

const CYCLE_STYLES: Record<number, { labelColor: string; barColor: string; timeColor: string; barWidth: string }> = {
  6: { labelColor: 'text-white', barColor: 'bg-[var(--sc-primary)]', timeColor: 'text-[var(--sc-text)]', barWidth: 'w-full' },
  5: { labelColor: 'text-[var(--sc-primary-light)]', barColor: 'bg-[var(--sc-primary)]', timeColor: 'text-[var(--sc-text)]', barWidth: 'w-[83%]' },
  4: { labelColor: 'text-[var(--sc-text-secondary)]', barColor: 'bg-[var(--sc-primary)]', timeColor: 'text-[var(--sc-text)]', barWidth: 'w-[66%]' },
  3: { labelColor: 'text-[var(--sc-text-muted)]', barColor: 'bg-[var(--sc-text-muted)]', timeColor: 'text-[var(--sc-text-secondary)]', barWidth: 'w-[50%]' },
};

const getLabelKey = (cycles: number): string => {
  const labels: Record<number, string> = { 6: 'recommended', 5: 'great', 4: 'good', 3: 'minimum' };
  return labels[cycles] || 'good';
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 200, damping: 20 } as const 
  }
};

export function CycleCard({ time, cycles, isRecommended }: CycleCardProps) {
  const { t, lang } = useI18n();
  const styles = CYCLE_STYLES[cycles] ?? CYCLE_STYLES[4];
  const totalMinutes = cycles * 90;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Labels are not in translations for simplicity - keeping English
  const labels: Record<string, Record<string, string>> = {
    en: { recommended: 'Recommended', great: 'Great', good: 'Good', minimum: 'Minimum' },
    es: { recommended: 'Recomendado', great: 'Excelente', good: 'Bueno', minimum: 'Mínimo' },
  };
  const label = labels[lang][getLabelKey(cycles)];

  return (
    <motion.div
      variants={itemVariants}
      className={`flex flex-col items-center gap-4 p-5 rounded-3xl w-full min-w-40 transition-shadow duration-300 hover:shadow-[0_10px_40px_-5px_rgba(124,106,232,0.15)] ${
        isRecommended
          ? 'bg-[rgba(124,106,232,0.09)] border border-(--sc-primary) shadow-[0_8px_30px_-5px_rgba(124,106,232,0.19)]'
          : 'bg-(--sc-surface)/80 border border-(--sc-border)]'
      }`}
    >
      {/* Badge */}
      <div
        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${styles.labelColor} ${
          isRecommended
            ? 'bg-(--sc-primary)'
            : 'bg-(--sc-surface-dark) border border-(--sc-border)]'
        }`}
      >
        {label}
      </div>

      {/* Time */}
      <span className={`font-['Playfair_Display'] text-3xl font-bold italic text-center ${styles.timeColor}`}>
        {time}
      </span>

      {/* Info */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs font-medium text-(--sc-primary-light)">
          {cycles} {t.results.cycles}
        </span>
        <span className="text-xs text-(--sc-text-secondary)">
          {hours}h {minutes}m
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 rounded-full bg-(--sc-input-bg)">
        <div className={`h-full rounded-full ${styles.barColor} ${styles.barWidth}`} />
      </div>
    </motion.div>
  );
}
