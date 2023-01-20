import { Alert, AlertIcon, Box, Button, useDisclosure } from '@chakra-ui/react';
import { PoolStakeModal } from '~/modules/pool/stake/PoolStakeModal';
import { usePoolUserBptBalance } from '~/modules/pool/lib/usePoolUserBptBalance';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { FadeInOutBox } from '~/components/animation/FadeInOutBox';
import { usePool } from '~/modules/pool/lib/usePool';

export function PoolStakeInFarmWarning() {
  const { pool } = usePool();
  const { userWalletBptBalance, hasBptInWallet } = usePoolUserBptBalance();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const valueInWallet =
    (parseFloat(userWalletBptBalance) / parseFloat(pool.dynamicData.totalShares)) *
    parseFloat(pool.dynamicData.totalLiquidity);

  return (
    <>
      <FadeInOutBox isVisible={hasBptInWallet} containerWidth="100%">
        <Alert status="warning" borderRadius="lg" mb="5" width="full">
          <AlertIcon />
          <Box flex="1" mr="8" bg="black">
            You have ~{numberFormatUSDValue(valueInWallet)} worth of VPT in your wallet. This pool
            offers additional rewards that will accumulate over time when your VPT are staked.{' '}
            {/*<Link color="beets.highlight">More details</Link>*/}
          </Box>
          <Button variant="verteklight" onClick={onOpen}>
            Stake now
          </Button>
        </Alert>
      </FadeInOutBox>
      <PoolStakeModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
