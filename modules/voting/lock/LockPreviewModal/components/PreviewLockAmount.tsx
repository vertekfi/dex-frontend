import { TokenAvatarSetInList } from '~/components/token/TokenAvatarSetInList';
import { fNum2, FNumFormats } from '~/lib/util/useNumber';
import { Box, Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

const MemoizedTokenAvatarSetInList = memo(TokenAvatarSetInList);

type Props = {
  lockablePool: any;
  totalLpTokens: string;
};

export function PreviewLockAmount(props: Props) {
  return (
    <Box padding="1" borderRadius="16px" display="flex" flexDirection="column">
      <Flex justify="space-around">
        <Text>
          {`VPT tokens: ${fNum2(props.totalLpTokens, FNumFormats.token)}`}
          <Text color="gray">80% VRTK / 20% BNB</Text>
        </Text>
        <Text>
          <MemoizedTokenAvatarSetInList
            imageSize={36}
            width={92}
            tokens={props.lockablePool.tokens}
          />
        </Text>
      </Flex>
    </Box>
  );
}
