export const SLEEP_CYCLE_MINUTES = 90;

/**
 * Calculates suggested wake-up times if the user goes to sleep now.
 * @param now The current time
 * @param sleepOnsetMinutes Time to fall asleep
 * @returns An array of Date objects representing optimal wake-up times
 */
export function calculateWakeUpTimes(now: Date, sleepOnsetMinutes: number): Date[] {
  const sleepStartTime = new Date(now.getTime() + sleepOnsetMinutes * 60000);
  const suggestions: Date[] = [];

  // Provide suggestions for 3 to 6 sleep cycles
  for (let i = 3; i <= 6; i++) {
    const wakeUpTime = new Date(sleepStartTime.getTime() + i * SLEEP_CYCLE_MINUTES * 60000);
    suggestions.push(wakeUpTime);
  }

  return suggestions;
}

/**
 * Calculates suggested bedtimes for a given target wake-up time.
 * @param wakeUpTimeStr A string in "HH:mm" format
 * @param sleepOnsetMinutes Time to fall asleep
 * @returns An array of Date objects representing optimal bedtimes
 */
export function calculateBedtimes(wakeUpTimeStr: string, sleepOnsetMinutes: number): Date[] {
  const [hours, minutes] = wakeUpTimeStr.split(':').map(Number);
  const now = new Date();
  
  // Set the wake-up time for today, or tomorrow if it's already past that time
  let wakeUpDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
  if (wakeUpDate < now) {
    wakeUpDate.setDate(wakeUpDate.getDate() + 1);
  }

  const suggestions: Date[] = [];

  // Provide suggestions for 3 to 6 sleep cycles before the wake-up time
  for (let i = 3; i <= 6; i++) {
    // Total time to subtract: i cycles * 90 mins + X mins to fall asleep
    const totalMinutesToSubtract = i * SLEEP_CYCLE_MINUTES + sleepOnsetMinutes;
    const bedtime = new Date(wakeUpDate.getTime() - totalMinutesToSubtract * 60000);
    suggestions.push(bedtime);
  }

  // Sort them so the earliest bedtime comes first (optional, but 6 cycles is earliest)
  return suggestions.reverse();
}

/**
 * Formats a Date object as a local time string (e.g., "10:30 PM")
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
