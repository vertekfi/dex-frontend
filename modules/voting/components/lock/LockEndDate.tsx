import { addWeeks, format } from 'date-fns';
import DatePicker from 'react-datepicker';

import { useEffect, useState } from 'react';
import { VeBalLockInfo } from '~/lib/services/balancer/contracts/veBAL';
import { INPUT_DATE_FORMAT } from '../../constants';
import { useLockState } from './lib/useLockState';
import { FormControl, Button, Box, Text } from '@chakra-ui/react';

type Props = {
  minLockEndDateTimestamp: number;
  maxLockEndDateTimestamp: number;
  veBalLockInfo?: VeBalLockInfo;
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

  const { setLockEndDate, lockEndDate } = useLockState();

  useEffect(() => {
    if (props.veBalLockInfo?.hasExistingLock) {
      updateLockEndDate(props.veBalLockInfo.lockedEndDate);
    } else {
      setLockEndDate(formatDateInput(props.maxLockEndDateTimestamp));
    }
  }, [props.veBalLockInfo]);

  useEffect(() => {
    if (props.minLockEndDateTimestamp) {
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
    }
  }, [props]);

  function getDateInput(timestamp: number) {
    return formatDateInput(Math.min(timestamp, props.maxLockEndDateTimestamp));
  }

  function updateLockEndDate(timestamp: number) {
    console.log('LockEndDate comp updateLockEndDate: ' + timestamp);
    console.log(lockEndDate);
    setLockEndDate(getDateInput(timestamp));
    console.log(lockEndDate);
  }

  function formatDateInput(date: Date | number) {
    return format(date, INPUT_DATE_FORMAT);
  }

  const handleDate = (val: any) => {
    console.log('LockEndDate comp: ' + val);
    setLockEndDate(val);
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="space-between"
      mb="6"
      mx="2"
      paddingX="2"
      paddingY="4"
      bgColor="vertek.slatepurple.900"
      boxShadow="2px 24px 12px 0px #000"
      borderRadius="16px"
      flexDirection="column"
    >
      <Text align="left" mb="0" fontWeight="normal" color="white" fontSize="1rem">
        Lock until
      </Text>
      <FormControl mb="2">
        <DatePicker
          value={lockEndDate}
          onChange={(date) => handleDate(date)}
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
          mt="2"
          paddingX={{ base: 'none', md: '1' }}
          justifyContent="space-between"
          display="flex"
        >
          {props.minLockEndDateTimestamp < props.maxLockEndDateTimestamp &&
            lockDates?.map((lockDate, i) => {
              return (
                <Button key={i} variant="stayblacklock" onClick={lockDate.action}>
                  {lockDate.label}
                </Button>
              );
            })}
        </Box>
      </FormControl>
    </Box>
  );
}
