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
      <FadeInOutBox isVisible={hasBptInWallet} style={{ backgroundColor:'black', borderRadius:'16px' }} containerWidth="100%">
      <Alert bg="black" status="warning" color="white" mt="4" borderRadius="12px" >
        <AlertIcon color="vertek.neonpurple.500" />     
          <Box flex="1" mr="8">
            You have ~{numberFormatUSDValue(valueInWallet)} worth of VPT in your wallet. This pool
            offers additional rewards that will accumulate over time when your VPT are staked.{' '}
            {/*<Link color="beets.highlight">More details</Link>*/}
          </Box>
          <Button variant="stayblack" width="20%" onClick={onOpen}>
            Stake now
          </Button>
        </Alert>
      </FadeInOutBox>
      <PoolStakeModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
