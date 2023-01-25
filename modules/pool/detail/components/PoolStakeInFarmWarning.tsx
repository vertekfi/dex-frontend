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
      <FadeInOutBox isVisible={hasBptInWallet} style={{ backgroundColor:'black', borderRadius:'16px',  }} containerWidth="100%">
      <Alert bg="black" status="warning" color="white" mt={{base:'2', md:'4'}} borderRadius="12px" >
        <AlertIcon color="vertek.neonpurple.500" />  
        <Box display="flex" flexDirection={{ base:'column', md:'row' }} justifyContent="center" alignItems="center" >   
          <Box width="full" flex="1" mr={{ base:'0', md:'8'}}>
            You have ~{numberFormatUSDValue(valueInWallet)} worth of VPT in your wallet. This pool
            offers additional rewards that will accumulate over time when your VPT are staked.{' '}
          </Box>
          <Button variant="stayblack" width={{ base:'100%', md:'20%'}} mt={{base:'2', md:'0'}} onClick={onOpen}>
            Stake now
          </Button>
          </Box>
        </Alert>
      </FadeInOutBox>
      <PoolStakeModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
