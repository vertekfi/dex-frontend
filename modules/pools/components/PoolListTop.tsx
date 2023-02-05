import { Box, Circle, Flex, Grid, GridItem, IconButton } from '@chakra-ui/react';
import { PoolListTabs } from '~/modules/pools/components/PoolListTabs';
import { PoolListSearch } from '~/modules/pools/components/PoolListSearch';
import { Filter } from 'react-feather';
import { PoolListTokenMultiSelect } from '~/modules/pools/components/PoolListTokenMultiSelect';
import { PoolListFilterMultiSelect } from '~/modules/pools/components/PoolListFilterMultiSelect';
import { usePoolList } from '~/modules/pools/usePoolList';
import { FadeInOutBox } from '~/components/animation/FadeInOutBox';
import { PoolListAttributeMultiSelect } from './PoolListAttributeMultiSelect';
import 'animate.css'; 


export function PoolListTop() {
  const { showFilters, toggleFilterVisibility, state } = usePoolList();
  const hasFiltersSelected =
    (state.where?.filterIn || []).length > 0 || (state.where?.tokensIn || []).length > 0;

  return (
    <Box display={{ base: 'none', lg: 'block' }}>
      <Flex pb={0}>
        <Flex flex={1} mb={{base:'0', lg:'3'}}>
          <div className="animate__animated animate__zoomIn animate__delay-2s animate__duration-6s">
          <PoolListTabs />
          </div>
          <Box position="relative">
          <div className="animate__animated animate__zoomIn animate__delay-2s animate__duration-6s">

            <IconButton
              aria-label="filter-button"
              icon={<Filter />}
              ml={4}
              onClick={toggleFilterVisibility}
              color={showFilters ? 'white' : 'gray.100'}
              boxShadow="0px 10px 1px #000"
              bgColor={showFilters ? 'vertek.neonpurple.500' : 'vertek.slatepurple.900'}
              _hover={{ bgColor: 'vertek.neonpurple.500', boxShadow:'none'  }}
            />
            </div>
            {hasFiltersSelected ? (
              <Circle
                size="3"
                bg="red.500"
                opacity="0.85"
                position="absolute"
                top="-4px"
                right="-4px"
              />
            ) : null}
          </Box>
        
        </Flex>
        <Box>
          <PoolListSearch />
        </Box>
      </Flex>
      <FadeInOutBox isVisible={showFilters} >
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: '1fr 1fr 0px', lg: '1fr 1fr 1fr' }}
          gap="0"
          pb="0"
          pt="1"
        >
          <GridItem  borderRadius="4px"  mr={{ base: '0', md: '2' }} mb={{ base: '4', md: '0' }}>
            <PoolListTokenMultiSelect />
          </GridItem>
          <GridItem  ml={{ base: '0', md: '2' }} >
            <PoolListFilterMultiSelect />
          </GridItem>
          {/* <GridItem display={{ base: 'none', md: 'block' }}>
            <PoolListAttributeMultiSelect />
          </GridItem> */}
        </Grid>
      </FadeInOutBox>
    </Box>
  );
}
