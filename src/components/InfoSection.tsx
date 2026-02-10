import { Timer, Brain, Bed } from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export function InfoSection() {
  const { t } = useI18n();

  const INFO_CARDS = [
    {
      icon: Timer,
      title: t.info.card1.title,
      description: t.info.card1.description,
    },
    {
      icon: Brain,
      title: t.info.card2.title,
      description: t.info.card2.description,
    },
    {
      icon: Bed,
      title: t.info.card3.title,
      description: t.info.card3.description,
    },
  ];

  return (
    <section
      id="science"
      className="flex flex-col items-center gap-12 px-6 py-16 md:px-16 w-full"
    >
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-2"
      >
        <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl font-semibold italic text-center text-(--sc-text)">
          {t.info.title}
        </h2>
        <p className="text-base text-(--sc-text-secondary) text-center">
          {t.info.subtitle}
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
      >
        {INFO_CARDS.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            className="flex flex-col gap-4 p-7 rounded-3xl bg-(--sc-surface)/80 border border-(--sc-border) transition-all hover:border-(--sc-primary)/30 hover:bg-(--sc-surface)"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[rgba(124,106,232,0.08)]">
              <Icon className="w-5 h-5 text-(--sc-primary)" />
            </div>
            <h3 className="font-['Playfair_Display'] text-xl font-semibold italic text-(--sc-text)">
              {title}
            </h3>
            <p className="text-sm text-(--sc-text-secondary) leading-[1.6]">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
