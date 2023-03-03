import { InfoIcon } from '@chakra-ui/icons';
import { Tooltip, Text, Box } from '@chakra-ui/react';
import StarsIcon from '~/components/apr-tooltip/StarsIcon';

type Props = {
  tooltipText?: string;
  text: string;
};

export function TableHeading({ tooltipText, text }: Props) {
  return (
    <Box flexDirection="row" display="flex" paddingX="1" mb={2} mt={5}>
      <StarsIcon />
      <Text fontSize="1.3rem" mr={2} ml={2}>
        {text}
      </Text>
      {tooltipText && (
        <Tooltip label={tooltipText}>
          <InfoIcon />
        </Tooltip>
      )}
    </Box>
  );
}
