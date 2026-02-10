import { motion } from 'motion/react';
import { useMemo } from 'react';

const STAR_COUNT = 60; // Increased count

export function Background() {
  const stars = useMemo(() => {
    return Array.from({ length: STAR_COUNT }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 0.8, // Slightly more varied sizes
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
      driftX: (Math.random() - 0.5) * 40,
      driftY: (Math.random() - 0.5) * 40,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#030208]">
      {/* Global Gradients - Expanded to cover almost the entire web */}
      <div className="absolute inset-0 opacity-70">
        <div className="absolute top-[-30%] left-[-20%] w-[150%] h-[150%] rounded-full bg-[radial-gradient(circle,rgba(124,106,232,0.12)_0%,transparent_70%)]" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[150%] h-[150%] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.1)_0%,transparent_70%)]" />
      </div>

      {/* Massive Central Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[180vw] h-[150vh] opacity-40 bg-[radial-gradient(ellipse_at_center,rgba(124,106,232,0.18)_0%,transparent_75%)] blur-[150px]" />
      </div>

      {/* Animated Star Field - Brightened */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: star.size,
            height: star.size,
            left: star.left,
            top: star.top,
          }}
          animate={{
            opacity: [0.15, 0.8, 0.15],
            x: [0, star.driftX, 0],
            y: [0, star.driftY, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
            opacity: {
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }
          }}
        />
      ))}

      {/* Deep atmospheric depth overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,14,34,0)_0%,rgba(3,2,8,0.6)_100%)]" />
    </div>
  );
}
