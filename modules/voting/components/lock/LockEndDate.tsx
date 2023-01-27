import { addWeeks, format } from 'date-fns';
import DatePicker from 'react-datepicker';

import { useEffect, useState } from 'react';
import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { INPUT_DATE_FORMAT } from '../../constants';
import { useLockState } from './lib/useLockState';
import { FormControl, Button, Box } from '@chakra-ui/react';

type Props = {
  minLockEndDateTimestamp: number;
  maxLockEndDateTimestamp: number;
  veBalLockInfo: VeBalLockInfo;
};

export function LockEndDate(props: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeTag, setaAtiveTag] = useState<string>();

  const [lockDates, setLockDates] = useState<
    {
      id: string;
      label: string;
      date: string;
      action: () => void;
    }[]
  >();

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

  return (
    <Box
      padding="2"
      boxShadow="0 12px 12px rgba(0, 0, 0, 0.5)"
      bgColor="black"
      borderRadius="12px"
      mb="6"
    >
      <FormControl mb="8">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM/dd/yyyy"
          placeholderText="mm/dd/yyyy"
          id="voteWeight"
          name="voteWeight"
          autoComplete="off"
          calendarClassName="datepicker"
        />
        <Box
          w="99%"
          paddingY="2"
          paddingX={{ base: 'none', md: '1' }}
          justifyContent="space-between"
          display="flex"
        >
          <Button
            variant="stayblacklock"
            onClick={() => {
              let nextThursday = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
              while (nextThursday.getUTCDay() !== 4) {
                nextThursday.setDate(nextThursday.getDate() + 1);
              }
              setSelectedDate(nextThursday);
            }}
          >
            1w
          </Button>
          <Button
            variant="stayblacklock"
            onClick={() => {
              let nextThursday = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
              while (nextThursday.getUTCDay() !== 4) {
                nextThursday.setDate(nextThursday.getDate() + 1);
              }
              setSelectedDate(nextThursday);
            }}
          >
            1m
          </Button>
          <Button
            variant="stayblacklock"
            onClick={() => {
              let nextThursday = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
              while (nextThursday.getUTCDay() !== 4) {
                nextThursday.setDate(nextThursday.getDate() + 1);
              }
              setSelectedDate(nextThursday);
            }}
          >
            3m
          </Button>
          <Button
            variant="stayblacklock"
            onClick={() => {
              let nextThursday = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
              while (nextThursday.getUTCDay() !== 4) {
                nextThursday.setDate(nextThursday.getDate() + 1);
              }
              setSelectedDate(nextThursday);
            }}
          >
            6m
          </Button>
          <Button
            variant="stayblacklock"
            onClick={() => {
              let nextThursday = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
              while (nextThursday.getUTCDay() !== 4) {
                nextThursday.setDate(nextThursday.getDate() + 1);
              }
              setSelectedDate(nextThursday);
            }}
          >
            1y
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
}
