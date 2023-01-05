import { Box, Flex, Text, VStack, Spacer, HStack, Button, SimpleGrid, GridItem } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
    title: string;
    image: ReactNode;
}

export function EarnMasthead({ title, image }: Props) {
return (
<SimpleGrid 
    columns={{ sm: 1, md: 5 }} 
    padding="2"
    marginTop={{ base: 0, lg: 10 }}
    marginBottom={12}
    spacing={{ base: '6', lg: '8' }}
>
    <GridItem    
    display="flex" 
    flexDirection="column"  
    colSpan={{ sm: 1, md: 3 }}
    >
    <Text 
        gap="1" 
        fontSize="36px" 
        color="white" 
        fontWeight="semibold" 
        flex="1" 
        textAlign="left"
        >
        {title}
    </Text>
    <Text 
        fontSize="20px" 
        fontWeight="normal" 
        flex="1" 
        mb="2" 
        color="vertek.slate.100"
        >
        Join our farms for higher rewards and bonuses that can multiply your earnings 
        up to 10 times. 
    </Text>
  </GridItem>

  <GridItem
    marginTop={{ base: 0, lg: 2 }}
    display="flex"
    justifyContent="flex-start"
    alignItems="flex-start"
    colSpan={{ sm: 1, md: 2 }}
    flexDirection="column"
    borderRadius="16px" 
    bgColor='vertek.slatepurple.900'
    boxShadow='0 0 10px #5BC0F8, 0 0 20px #4A4AF6'
    padding="4"
    >
    <Text 
        fontSize="20px" 
        color="white" 
        fontWeight="semibold" 
        m="2" 
        textAlign="left"
    >
        Earn more VRTK in Core Pools 
    </Text>
    <Text 
        fontSize="16px" 
        fontWeight="normal" 
        m="2" 
        color="vertek.slate.100" 
        textAlign="left"
    >
        Lock VRTK-WBNB and receive up to 2.5x boosted rewards when farming 
        Core Pools.
    </Text>
    <Button  
        variant="vertekdark"
        width="98%"
        margin="3"
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
