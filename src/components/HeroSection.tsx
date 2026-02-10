import { motion } from 'motion/react';
import { useI18n } from '../i18n';

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="relative w-full">
      <div className="relative flex flex-col items-center gap-6 px-6 pt-16 pb-5 md:px-16">
        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold italic text-center leading-[1.15] text-(--sc-text) max-w-lg whitespace-pre-line"
        >
          {t.hero.headline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="text-base md:text-lg text-(--sc-text-secondary) text-center leading-[1.6] max-w-xl"
        >
          {t.hero.subtitle}
        </motion.p>
      </div>
    </section>
  );
}
