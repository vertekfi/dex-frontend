import { Box, Button, FormControl, Input, Text } from '@chakra-ui/react';
import { addWeeks, format } from 'date-fns';
import { INPUT_DATE_FORMAT } from '../constants';
import { useLockEndDate } from './lib/useLockEndDate';

export function LockEndDateInput() {
  const { lockDate, setLockDate, minLockEndDateTimestamp, maxLockEndDateTimestamp } =
    useLockEndDate();

  function getDateInput(timestamp: number) {
    return formatDateInput(Math.min(timestamp, maxLockEndDateTimestamp));
  }

  function updateLockEndDate(timestamp: number) {
    const newDate = getDateInput(timestamp);
    setLockDate(newDate);
  }

  function formatDateInput(date: Date | number) {
    return format(date, INPUT_DATE_FORMAT);
  }

  function handleDateChanged(date: string) {
    updateLockEndDate(new Date(date).getTime());
    // round up to thursday of the selected week?
  }

  const lockDates = [
    {
      id: 'one-week',
      label: '~1W',
      date: getDateInput(minLockEndDateTimestamp),
      action: () => updateLockEndDate(minLockEndDateTimestamp),
    },
    {
      id: 'one-month',
      label: '~1M',
      date: getDateInput(addWeeks(minLockEndDateTimestamp, 4).getTime()),
      action: () => updateLockEndDate(addWeeks(minLockEndDateTimestamp, 4).getTime()),
    },
    {
      id: 'three-month',
      label: '~3M',
      date: getDateInput(addWeeks(minLockEndDateTimestamp, 12).getTime()),
      action: () => updateLockEndDate(addWeeks(minLockEndDateTimestamp, 12).getTime()),
    },
    {
      id: 'six-month',
      label: '~6M',
      date: getDateInput(addWeeks(minLockEndDateTimestamp, 24).getTime()),
      action: () => updateLockEndDate(addWeeks(minLockEndDateTimestamp, 24).getTime()),
    },
    {
      id: 'one-year',
      label: '~1Y',
      date: formatDateInput(maxLockEndDateTimestamp),
      action: () => {
        setLockDate(formatDateInput(maxLockEndDateTimestamp));
      },
    },
  ];

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
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="date"
          value={lockDate}
          onChange={(event) => handleDateChanged(event.target.value)}
        />
        <Box
          w="99%"
          paddingY="2"
          mt="2"
          paddingX={{ base: 'none', md: '1' }}
          justifyContent="space-between"
          display="flex"
        >
          {minLockEndDateTimestamp < maxLockEndDateTimestamp &&
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
