import { Text } from '@chakra-ui/layout';
import { Grid, GridItem } from '@chakra-ui/react';

export default function PoolTransactionHeader() {
    return (
        <Grid
            px="1"
            py={{ base: '4', lg: '2' }}
            borderTopLeftRadius="16px"
            borderTopRightRadius="16px"
            alignItems="center"
            bgColor="rgba(255,255,255,0.08)"
            borderBottom="2px"
            borderBottomColor="vertek.neonpurple.500"
            mb={{ base: '4', lg: '0' }}
            templateColumns={'1fr 250px 200px 1fr'}
            gap="0"
            display={{ base: 'none', lg: 'grid' }}
        >
            <GridItem>
                <Text fontSize="md" fontWeight="semibold" color="gray.100">
                    Action
                </Text>
            </GridItem>
            <GridItem justifyContent="flex-start" alignItems="center" display="flex" >
                <Text fontSize="md" fontWeight="semibold" color="gray.100">
                    Details
                </Text>
            </GridItem>
            <GridItem justifyContent="center" alignItems="center" display="flex" >
                <Text fontSize="md" fontWeight="semibold" color="gray.100">
                    Value
                </Text>
            </GridItem>
            <GridItem>
                <Text
                    fontSize="md"
                    fontWeight="semibold"
                    color="gray.100"
                    textAlign={{ base: 'left', lg: 'right' }}
                    mr="6"
                >
                    Time
                </Text>
            </GridItem>
        </Grid>
    );
}
