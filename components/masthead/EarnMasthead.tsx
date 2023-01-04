import { Box, Flex, Text, VStack, Spacer, HStack, Button, SimpleGrid, GridItem } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
    title: string;
    image: ReactNode;
}

export function EarnMasthead({ title, image }: Props) {
return (
<SimpleGrid 
columns={{sm:1, md:5 }} 
padding="2"
marginTop={12} 
marginBottom={12}
spacing={12}>
    <GridItem    
        display="flex" 
        flexDirection="column"  
        colSpan={{sm:1, md:3 }}
        >
        <Text gap="16px" fontSize="36px" color="white" fontWeight="semibold" flex="1" textAlign="left">
            {title}
        </Text>
        <Text fontSize="20px" fontWeight="normal" flex="1" mb="2" color="vertek.slate.100">
            Join our farms for higher rewards and bonuses that can multiply your earnings 
            up to 10 times. 
        </Text>
    </GridItem>
{/* need to remove incentivized, filter, search on mobile */}
    <GridItem
    display="flex"
    justifyContent="flex-start"
    alignItems="flex-start"
    colSpan={{ sm:1, md:2 }}
    flexDirection="column"
    borderRadius="12px" 
    bgGradient='linear(90deg, #302B84 0%, #362BA8 50%, #4132D0 100%)'
    // boxShadow="0px 1px 6px 2px #000"
    padding="4"
    >
            <Text fontSize="20px" color="white" fontWeight="semibold" mb="3" textAlign="left">
                Earn more VRTK in Core Pools 
            </Text>
            <Text fontSize="16px" fontWeight="normal" mb="2" color="vertek.slate.100" textAlign="left">
                    Lock VRTK-WBNB and receive up to 2.5x boosted rewards when farming 
                    Core Pools.
            </Text>
            <Button  
            variant="vertekdark"
            width="50%"
            gap="8px"
            mt="3"
            alignSelf="center"
            >
                Earn More
            </Button>
    </GridItem>
</SimpleGrid>
    );
}
