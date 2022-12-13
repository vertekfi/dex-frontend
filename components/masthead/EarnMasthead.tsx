import { Box, Flex, Text, VStack, Spacer, HStack, Button, SimpleGrid, GridItem } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
    title: string;
    image: ReactNode;
}

export function EarnMasthead({ title, image }: Props) {
return (
<SimpleGrid columns={{sm:1, lg:2 }} 
marginTop={12} marginBottom={12}
spacing={14}>
    <Box    
        display="flex" 
        justifyContent="space-between" 
        flexDirection="column"  >
        
        <Text gap="16px" fontSize="36px" color="white" fontWeight="semibold" as="h1" flex="1" textAlign="left">
            {title}
        </Text>
        <Text fontSize="20px" fontWeight="normal" as="h1" flex="1" mb="2" color="vertek.slate.100">
            Join our farms for higher rewards and bonuses that can multiply your earnings 
            up to 10 times. 
        </Text>
    </Box>
{/* need to remove incentivized, filter, search on mobile */}
    <Flex
    width="100%" flexDirection={{ sm:'column', lg:'row' }}
    alignItems={{ sm:'center', lg: 'left' }}
    borderRadius="12px" 
    bgGradient='linear(90deg, #302B84 0%, #362BA8 50%, #4132D0 100%)'
    paddingY={{ sm:6, lg:6 }} 
    paddingX={{ sm:5, lg:12}}>
        <Box w={{sm:11/12, lg:3/4}}
        alignItems="center" 
        justifyContent="space-between" 
            >
            <Text fontSize="20px" color="white" fontWeight="semibold" as="h1" flex="1" mb="3" textAlign="left">
                Earn more VRTK in Core Pools 
            </Text>
            
            <Text fontSize="16px" fontWeight="normal" as="h1" flex="1" mb="2" color="vertek.slate.100">
                    Lock VRTK-WBNB and receive up to 2.5x boosted rewards when farming 
                    Core Pools.
            </Text>
        </Box>
        <Box w={1/4} 
    alignItems="left"
    justifyContent={{ sm:'left', lg:'center'}}
        display="flex">
            <Button  
            alignItems="center" 
            bgColor="vertek.neonpurple.900" 
            borderRadius="8px" 
            
            paddingX="12px" paddingY="16px" gap="8px">
                Earn More
            </Button>
        </Box>
    </Flex>
</SimpleGrid>
    );
}
