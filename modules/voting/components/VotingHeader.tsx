import { Button, Grid, Text, Box } from '@chakra-ui/react';
import { useUserVeLockInfoQuery } from '../lib/useUserVeLockInfoQuery';
import { useEffect, useState } from 'react';
import { UserDataProvider, useUserData } from '~/lib/user/useUserData';
import { networkConfig } from '~/lib/config/network-config';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { numberFormatUSDValue } from '~/lib/util/number-formats';
import { tokenFormatAmount } from '~/lib/services/token/token-util';
import { bnum } from '@balancer-labs/sor';
import { fNum2, FNumFormats } from '~/lib/util/useNumber';
import { differenceInDays, format } from 'date-fns';
import { PRETTY_DATE_FORMAT } from '../constants';
import { GqlPoolUnion } from '~/apollo/generated/graphql-codegen-generated';
import styled from '@emotion/styled';
import { LockIcon } from '@chakra-ui/icons';
import { LockForm } from './lock/LockForm';
import Card from '~/components/card/Card';


interface Props {
  pool: GqlPoolUnion;
}
const VotingCardHeader = styled.p`
  font-size: 1.3rem;
  text-align: center;
  color: #C1C1D1;
  font-weight: bold;
  text-shadow: 0 0 12px #000;

`;
export function VotingHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const [pool, setPool] = useState<GqlPoolUnion>();
  const [hasLock, setHasLock] = useState<boolean>(false);
  const [hasExpiredLock, setExpiredHasLock] = useState<boolean>(false);
  const [userPoolBalance, setUserPoolBalance] = useState<{
    balance: string;
    usdValue: string;
  }>({
    balance: '0',
    usdValue: '0',
  });
  const [lockInfoDisplay, setLockInfoDisplay] = useState<{
    lockedUntilDays: number;
    lockedUntilDate: string;
    veBalance: string;
    percentOwned: string;
  }>({
    lockedUntilDays: 0,
    lockedUntilDate: '-',
    veBalance: '0',
    percentOwned: '0',
  });

  const { isConnected } = useUserAccount();
  const { userLockInfo } = useUserVeLockInfoQuery();
  const { loading: loadingBalances, bptBalanceForPool, usdBalanceForPool } = useUserData();
  useEffect(() => {
    if (!loadingBalances && isConnected) {
      setUserPoolBalance({
        balance: tokenFormatAmount(
          bptBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId),
        ),
        usdValue: numberFormatUSDValue(
          usdBalanceForPool(networkConfig.balancer.votingEscrow.lockablePoolId),
        ),
      });
    }
  }, [loadingBalances, isConnected]);

  // set user lock info
  useEffect(() => {
    if (isConnected && userLockInfo) {
      if (userLockInfo.hasExistingLock && !userLockInfo.isExpired) {
        setHasLock(true);

        const percentOwned = fNum2(
          bnum(userLockInfo.lockedAmount).div(userLockInfo.totalSupply).toString(),
          {
            style: 'percent',
            maximumFractionDigits: 4,
          },
        );
        const lockedUntilDays = differenceInDays(new Date(userLockInfo.lockedEndDate), new Date());
        const veBalance = fNum2(userLockInfo.lockedAmount, FNumFormats.token);
        const lockedUntilDate = format(userLockInfo.lockedEndDate, PRETTY_DATE_FORMAT);

        setLockInfoDisplay({
          lockedUntilDays,
          percentOwned,
          veBalance,
          lockedUntilDate,
        });
      }

      if (userLockInfo.hasExistingLock && userLockInfo.isExpired) {
        setExpiredHasLock(true);
      }
    }
  }, [isConnected, userLockInfo]);

return (
<UserDataProvider>
  <Box display="flex" flexDirection="row" height="4rem" 
  alignItems="center" justifyContent="space-between" marginTop="-3rem" marginBottom="1rem">
    <Text fontSize="1.5rem" fontWeight="bold" >
      Lock, Load and Vote 
    </Text>
  </Box>
  <Grid
    templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
    paddingX="4"
    paddingY="2"
    gap="12"
    justifyContent="center"
    alignItems="center"
  >
  <Card
  flexDirection="column" 
  borderRadius="16px"
  height="275px"
  padding="4"
  marginTop="1"
  boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
  css={{
    transition: "transform 0.5s",
    "&:hover": {
      transform: "scale(1.01)",
    },
  }}
>
    <Box 
    height="50%" 
    padding="2" 
    width="full" 
    flexDirection="column" 
    display="flex" 
    justifyContent="flex-start" 
    alignItems="center"
    bg="vertek.slatepurple.900" borderRadius="md" 
    boxShadow="2px 24px 12px 0px #000"
    >
      <VotingCardHeader>My VRTK-BNB </VotingCardHeader>
    </Box>
    <Box 
    marginTop="1rem"
    padding="2" 
    height="full" 
    width="full" 
    flexDirection="column" 
    display="flex" 
    justifyContent="space-between" 
    alignItems="center"
    bg="vertek.slatepurple.900" 
    borderRadius="md" 
    boxShadow="2px 28px 12px 0px #000"
    >
      <Text>{userPoolBalance.usdValue}</Text>
      <Text>{userPoolBalance.balance} shares</Text>
      <Button
        as="a"
        href={'pool/' + networkConfig.balancer.votingEscrow.lockablePoolId}
        variant="moistblack"
        width={{ base: '50%', lg: '75%' }}
        marginY="1rem"
        boxShadow="0 0 10px #4A4AF6"
      >
        Get VRTK-BNB
      </Button>
   </Box>
  </Card>
  
  <Card
  flexDirection="column" 
  borderRadius="16px"
  height="275px"
  padding="4"
  marginTop="1"
  boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
  css={{
    transition: "transform 0.5s",
    "&:hover": {
      transform: "scale(1.01)",
    },
  }}
>
    <Box 
    height="50%" 
    padding="2" 
    width="full" 
    flexDirection="column" 
    display="flex" 
    justifyContent="flex-start" 
    alignItems="center"
    bg="vertek.slatepurple.900" borderRadius="md" 
    boxShadow="2px 24px 12px 0px #000">
        <VotingCardHeader>My locked VRTK-BNB</VotingCardHeader>
    </Box>
    <Box marginTop="1rem"
    padding="2" 
    height="full" 
    width="full" 
    flexDirection="column" 
    display="flex" 
    justifyContent="space-between" 
    alignItems="center"
    bg="vertek.slatepurple.900" 
    borderRadius="md" 
    boxShadow="2px 28px 12px 0px #000">
        <Text >$0.00</Text>
        <Text>{userLockInfo?.lockedAmount} shares</Text>
        <Button variant="moistblack" 
            marginY="1rem"             
            width={{ base: '50%', lg: '75%' }}
            boxShadow="0 0 10px #4A4AF6"
            onClick={handleOpenModal}>
          Lock VRTK-BNB
        </Button>
        {isModalOpen && <LockForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </Box>
  </Card>

  <Card
  flexDirection="column" 
  borderRadius="16px"
  height="275px"
  padding="4"
  marginTop="1"
  boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
  css={{
    transition: "transform 0.5s",
    "&:hover": {
      transform: "scale(1.01)",
    },
  }}
>
<Box 
    height="50%" 
    padding="2" 
    width="full" 
    flexDirection="column" 
    display="flex" 
    justifyContent="flex-start" 
    alignItems="center"
    bg="vertek.slatepurple.900" borderRadius="md" 
    boxShadow="2px 24px 12px 0px #000">
        <VotingCardHeader>Locked until </VotingCardHeader>
</Box>
<Box marginTop="1rem"
    padding="2" 
    height="full" 
    width="full" 
    flexDirection="column" 
    display="flex" 
    justifyContent="space-between" 
    alignItems="center"
    bg="vertek.slatepurple.900" 
    borderRadius="md" 
    boxShadow="2px 28px 12px 0px #000">
        <Text>{lockInfoDisplay.lockedUntilDate}</Text>
        <Text>{lockInfoDisplay.lockedUntilDays} days</Text>
        <Button variant="moistblack" 
            marginBottom="1rem"
            boxShadow="0 0 10px #4A4AF6"
            width={{ base: '50%', lg: '75%' }}
            onClick={handleOpenModal}>
          Update My Lock
          <LockIcon ml="2" color="vertek.slate.200" />
        </Button>
      {isModalOpen && <LockForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </Box>
  </Card>

  <Card
  flexDirection="column" 
  borderRadius="16px"
  height="275px"
  padding="4"
  alignItems="center"
  justifyContent="center"
  marginTop="1"
  boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
  css={{
    transition: "transform 0.5s",
    "&:hover": {
      transform: "scale(1.01)",
    },
  }}
>
<Box 
    height="75%" 
    padding="2" 
    width="full" 
    flexDirection="column" 
    display="flex" 
    justifyContent="space-between" 
    alignItems="center"
    bg="vertek.slatepurple.900" borderRadius="md" 
    boxShadow="2px 58px 12px 0px #000">
        <VotingCardHeader>My veVRTK</VotingCardHeader>
        <Text  >{lockInfoDisplay.veBalance} shares</Text>
        <Text >{lockInfoDisplay.percentOwned} percent owned</Text>
    </Box>
  </Card> 
</Grid>
</UserDataProvider>
);
}
