import { sub } from 'date-fns';

export const oneSecondInMs = 1000;
export const oneMinInMs = 60 * oneSecondInMs;
export const oneHourInMs = 60 * oneMinInMs;
export const oneDayInMs = 24 * oneHourInMs;
export const oneWeekInMs = 7 * oneDayInMs;

export function toUnixTimestamp(jsTimestamp: number): number {
  return Math.round(jsTimestamp / oneSecondInMs);
}

export function getPreviousThursday(date: Date = new Date()): Date {
  let daysSinceThursday = date.getDay() - 4;
  if (daysSinceThursday < 0) daysSinceThursday += 7;

  return sub(date, {
    days: daysSinceThursday,
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  });
}
