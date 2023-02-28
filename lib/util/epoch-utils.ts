import { add, nextThursday } from 'date-fns';

export function getVotePeriodEndTime(): number {
  const today = new Date().getTime();
  let n = nextThursday(new Date());
  if (today > Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0)) {
    n = add(n, { weeks: 1 });
  }
  const epochEndTime = Date.UTC(n.getFullYear(), n.getMonth(), n.getDate(), 0, 0, 0);
  return epochEndTime;
}
