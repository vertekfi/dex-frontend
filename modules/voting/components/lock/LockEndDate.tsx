import { addWeeks, format } from 'date-fns';
import { useEffect, useState } from 'react';
import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { INPUT_DATE_FORMAT } from '../../constants';
import { useLockState } from './lib/useLockState';

type Props = {
  minLockEndDateTimestamp: number;
  maxLockEndDateTimestamp: number;
  veBalLockInfo: VeBalLockInfo;
};

export function LockEndDate(props: Props) {
  const [lockDates, setLockDates] = useState<
    {
      id: string;
      label: string;
      date: string;
      action: () => void;
    }[]
  >();
  const [activeTag, setaAtiveTag] = useState<string>();

  const { setLockEndDate } = useLockState();

  useEffect(() => {
    if (props.veBalLockInfo?.hasExistingLock) {
      setLockEndDate(formatDateInput(props.veBalLockInfo.lockedEndDate));
    } else {
      setLockEndDate(formatDateInput(props.maxLockEndDateTimestamp));
    }
  }, []);

  useEffect(() => {
    setLockDates([
      {
        id: 'one-week',
        label: '~1W',
        date: getDateInput(props.minLockEndDateTimestamp),
        action: () => updateLockEndDate(props.minLockEndDateTimestamp),
      },
      {
        id: 'one-month',
        label: '~1M',
        date: getDateInput(addWeeks(props.minLockEndDateTimestamp, 4).getTime()),
        action: () => updateLockEndDate(addWeeks(props.minLockEndDateTimestamp, 4).getTime()),
      },
      {
        id: 'three-month',
        label: '~3M',
        date: getDateInput(addWeeks(props.minLockEndDateTimestamp, 12).getTime()),
        action: () => updateLockEndDate(addWeeks(props.minLockEndDateTimestamp, 12).getTime()),
      },
      {
        id: 'six-month',
        label: '~6M',
        date: getDateInput(addWeeks(props.minLockEndDateTimestamp, 24).getTime()),
        action: () => updateLockEndDate(addWeeks(props.minLockEndDateTimestamp, 24).getTime()),
      },
      {
        id: 'one-year',
        label: '~1Y',
        date: formatDateInput(props.maxLockEndDateTimestamp),
        action: () => {
          setLockEndDate(formatDateInput(props.maxLockEndDateTimestamp));
        },
      },
    ]);
  }, [props]);

  function getDateInput(timestamp: number) {
    return formatDateInput(Math.min(timestamp, props.maxLockEndDateTimestamp));
  }

  function updateLockEndDate(timestamp: number) {
    setLockEndDate(getDateInput(timestamp));
  }

  function formatDateInput(date: Date | number) {
    return format(date, INPUT_DATE_FORMAT);
  }
}
