import { motion } from 'motion/react';

interface CycleCardProps {
  time: string;
  cycles: number;
  isRecommended: boolean;
}

const CYCLE_META: Record<number, { label: string; labelColor: string; barColor: string; timeColor: string; barWidth: string }> = {
  6: { label: 'Recommended', labelColor: 'text-white', barColor: 'bg-[var(--sc-primary)]', timeColor: 'text-[var(--sc-text)]', barWidth: 'w-full' },
  5: { label: 'Great', labelColor: 'text-[var(--sc-primary-light)]', barColor: 'bg-[var(--sc-primary)]', timeColor: 'text-[var(--sc-text)]', barWidth: 'w-[83%]' },
  4: { label: 'Good', labelColor: 'text-[var(--sc-text-secondary)]', barColor: 'bg-[var(--sc-primary)]', timeColor: 'text-[var(--sc-text)]', barWidth: 'w-[66%]' },
  3: { label: 'Minimum', labelColor: 'text-[var(--sc-text-muted)]', barColor: 'bg-[var(--sc-text-muted)]', timeColor: 'text-[var(--sc-text-secondary)]', barWidth: 'w-[50%]' },
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
  const meta = CYCLE_META[cycles] ?? CYCLE_META[4];
  const totalMinutes = cycles * 90;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

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
        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${meta.labelColor} ${
          isRecommended
            ? 'bg-(--sc-primary)'
            : 'bg-(--sc-surface-dark) border border-(--sc-border)]'
        }`}
      >
        {meta.label}
      </div>

      {/* Time */}
      <span className={`font-['Playfair_Display'] text-3xl font-bold italic text-center ${meta.timeColor}`}>
        {time}
      </span>

      {/* Info */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs font-medium text-(--sc-primary-light)">
          {cycles} cycles
        </span>
        <span className="text-xs text-(--sc-text-secondary)">
          {hours}h {minutes}m sleep
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 rounded-full bg-(--sc-input-bg)">
        <div className={`h-full rounded-full ${meta.barColor} ${meta.barWidth}`} />
      </div>
    </motion.div>
  );
}
