import { Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_60%,_rgba(124,106,232,0.07)_0%,_transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_30%_20%,_rgba(74,58,186,0.03)_0%,_transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_50%_at_70%_30%,_rgba(139,92,246,0.03)_0%,_transparent_100%)]" />
      </div>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-1 h-1 rounded-full bg-(--sc-primary-light) opacity-25 animate-twinkle" style={{ left: '12%', top: '21%' }} />
        <div className="absolute w-1 h-1 rounded-full bg-(--sc-primary) opacity-20 animate-twinkle" style={{ left: '24%', top: '10%', animationDelay: '1s' }} />
        <div className="absolute w-1 h-1 rounded-full bg-(--sc-primary-light) opacity-15 animate-twinkle" style={{ left: '76%', top: '16%', animationDelay: '2s' }} />
        <div className="absolute w-1 h-1 rounded-full bg-(--sc-primary) opacity-25 animate-twinkle" style={{ left: '87%', top: '32%', animationDelay: '0.5s' }} />
        <div className="absolute w-1 h-1 rounded-full bg-(--sc-primary-light) opacity-30 animate-twinkle" style={{ left: '62%', top: '8%', animationDelay: '1.5s' }} />
        <div className="absolute w-1 h-1 rounded-full bg-(--sc-primary) opacity-15 animate-twinkle" style={{ left: '35%', top: '74%', animationDelay: '2.5s' }} />
        <div className="absolute w-1 h-1 rounded-full bg-(--sc-primary-light) opacity-20 animate-twinkle" style={{ left: '94%', top: '66%', animationDelay: '0.8s' }} />
      </div>

      <div className="relative flex flex-col items-center gap-6 px-6 pt-16 pb-5 md:px-16">
        {/* Headline */}
        <h1 className="font-['Playfair_Display'] text-4xl md:text-6xl font-bold italic text-center leading-[1.15] text-(--sc-text) max-w-lg">
          Wake Up Feeling{'\n'}Refreshed
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-(--sc-text-secondary) text-center leading-[1.6] max-w-xl">
          Calculate your perfect sleep and wake times based on
          90-minute sleep cycles. Sleep smarter, not longer.
        </p>
      </div>
    </section>
  );
}
