import { VStack, HStack, Grid, GridItem, Box } from '@chakra-ui/layout';
import PoolUserStats from './PoolUserStats';
import PoolOverallMd from './PoolOverallMd';
import { TabList, Tabs } from '@chakra-ui/react';
import BeetsTab from '~/components/tabs/BeetsTab';
import { useState } from 'react';
import { usePoolUserBptBalance } from '~/modules/pool/lib/usePoolUserBptBalance';

export default function PoolStats() {
  const { hasBpt } = usePoolUserBptBalance();
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChanged = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <>
      <Box
        p={{ base: 'none', md: '4' }}
        mb="0"
        width={{ base: '50%', md: 'full' }}
        borderRadius="16px"
        bgColor="rgba(0, 0, 0, 0.3)"
        boxShadow=" 0 0 4px #5BC0F8,  0 0 8px #4A4AF6,  0 0 12px #fff"
      >
        <VStack height="full" spacing="4">
          {hasBpt && (
            <Tabs
              width="full"
              variant="soft-rounded"
              display="flex"
              onChange={handleTabChanged}
              px="2"
            >
              <TabList>
                <HStack spacing="2">
                  <BeetsTab paddingX="4" paddingY="2" fontSize="xs">
                    My Stats
                  </BeetsTab>
                  <BeetsTab paddingX="2" paddingY="2" fontSize="xs">
                    Pool Stats
                  </BeetsTab>
                </HStack>
              </TabList>
            </Tabs>
          )}
          {hasBpt && activeTab === 0 && <PoolUserStats />}
          {(!hasBpt || activeTab === 1) && <PoolOverallMd />}
          {/* style PoolUserStats similar to PoolOverallStats */}
        </VStack>
      </Box>
    </>
  );
}
