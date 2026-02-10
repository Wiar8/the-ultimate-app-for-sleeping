export type Language = 'en' | 'es';

// Define the shape of translations
type TranslationShape = {
  app: {
    title: string;
    sleepScience: string;
  };
  hero: {
    headline: string;
    subtitle: string;
  };
  calculator: {
    wakeUpAt: string;
    sleepNow: string;
    wantToWakeUpAt: string;
    sleepNowDescription: string;
    calculateSleepTimes: string;
    calculateWakeTimes: string;
    timeToFallAsleep: string;
    min: string;
  };
  results: {
    optimalBedtimes: string;
    optimalWakeTimes: string;
    wakeUpSubtitle: (time: string) => string;
    sleepNowSubtitle: string;
    recommended: string;
    cycles: string;
  };
  info: {
    title: string;
    subtitle: string;
    card1: {
      title: string;
      description: string;
    };
    card2: {
      title: string;
      description: string;
    };
    card3: {
      title: string;
      description: string;
    };
  };
  footer: {
    copyright: string;
  };
};

export const translations: Record<Language, TranslationShape> = {
  en: {
    app: {
      title: 'UAS',
      sleepScience: 'Sleep Science',
    },
    hero: {
      headline: 'Wake Up Feeling\nRefreshed',
      subtitle: 'Calculate your perfect sleep and wake times based on 90-minute sleep cycles. Sleep smarter, not longer.',
    },
    calculator: {
      wakeUpAt: 'Wake Up At',
      sleepNow: 'Sleep Now',
      wantToWakeUpAt: 'I want to wake up at',
      sleepNowDescription: "Going to bed now? We'll calculate the best times to set your alarm.",
      calculateSleepTimes: 'Calculate Sleep Times',
      calculateWakeTimes: 'Calculate Wake Times',
      timeToFallAsleep: 'Time to fall asleep:',
      min: 'min',
    },
    results: {
      optimalBedtimes: 'Your Optimal Bedtimes',
      optimalWakeTimes: 'Your Optimal Wake Times',
      wakeUpSubtitle: (time: string) => `Go to bed at one of these times to wake up at ${time} feeling refreshed`,
      sleepNowSubtitle: 'Set your alarm for one of these times to wake up feeling refreshed',
      recommended: 'Recommended',
      cycles: 'cycles',
    },
    info: {
      title: 'The Science of Sleep Cycles',
      subtitle: 'Understanding how your body rests to optimize your mornings',
      card1: {
        title: '90-Minute Cycles',
        description: 'Each sleep cycle lasts approximately 90 minutes, moving through light sleep, deep sleep, and REM stages.',
      },
      card2: {
        title: 'Wake Between Cycles',
        description: 'Waking at the end of a cycle means lighter sleep, so you feel alert and refreshed instead of groggy.',
      },
      card3: {
        title: 'Fall Asleep Buffer',
        description: 'We account for the average 15 minutes it takes to fall asleep, so your calculated times are accurate.',
      },
    },
    footer: {
      copyright: '© Ultimate App for Sleeping. All rights reserved.',
    },
  },
  es: {
    app: {
      title: 'UAS',
      sleepScience: 'Ciencia del Sueño',
    },
    hero: {
      headline: 'Despierta\nRenovado',
      subtitle: 'Calcula tus horarios ideales con ciclos de 90 minutos. Duerme mejor, no más.',
    },
    calculator: {
      wakeUpAt: 'Despertar',
      sleepNow: 'Dormir Ahora',
      wantToWakeUpAt: 'Quiero despertar a las',
      sleepNowDescription: '¿Te vas a dormir? Te calculamos los mejores horarios.',
      calculateSleepTimes: 'Calcular Horas para Dormir',
      calculateWakeTimes: 'Calcular Horas para Despertar',
      timeToFallAsleep: 'Tiempo en dormirse:',
      min: 'min',
    },
    results: {
      optimalBedtimes: 'Mejores Horas para Dormir',
      optimalWakeTimes: 'Mejores Horas para Despertar',
      wakeUpSubtitle: (time: string) => `Duerme a estas horas para despertar a las ${time} renovado`,
      sleepNowSubtitle: 'Pon tu alarma a una de estas horas para despertar bien',
      recommended: 'Recomendado',
      cycles: 'ciclos',
    },
    info: {
      title: 'La Ciencia del Sueño',
      subtitle: 'Cómo descansa tu cuerpo para mejores mañanas',
      card1: {
        title: 'Ciclos de 90 Minutos',
        description: 'Cada ciclo dura ~90 minutos, pasando por sueño ligero, profundo y REM.',
      },
      card2: {
        title: 'Despierta Entre Ciclos',
        description: 'Despertar al final de un ciclo te hace sentir alerta, no aturdido.',
      },
      card3: {
        title: 'Tiempo en Dormirse',
        description: 'Sumamos los ~15 minutos que tomas en dormirte para precisión.',
      },
    },
    footer: {
      copyright: '© Ultimate App for Sleeping. Todos los derechos reservados.',
    },
  },
};

export type Translations = typeof translations;
