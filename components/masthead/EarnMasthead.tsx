import { Box, Flex, Text, VStack, Spacer, HStack, Button, SimpleGrid, GridItem } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
    title: string;
    image: ReactNode;
}

export function EarnMasthead({ title, image }: Props) {
return (
<SimpleGrid 
    columns={{ sm: 1, md: 6 }} 
    paddingX="4"
    paddingY="2"
    marginTop={{ base: 0, lg: 10 }}
    marginBottom={{ base: 6, lg:8 }}
    spacing={{ base: '6', lg: '8' }}
>
    <GridItem    
    display="flex" 
    flexDirection="column"  
    colSpan={{ sm: 1, md: 3 }}
    >
    <Text 
        gap="1" 
        fontSize="2.2rem" 
        color="white" 
        fontWeight="semibold" 
        flex="1" 
        textAlign="left"
        >
        {title}
    </Text>
    <Text 
        fontSize="1.2rem" 
        fontWeight="normal" 
        flex="1" 
        mb="2" 
        color="vertek.slate.100"
        >
        Join our farms for higher rewards and bonuses that can multiply your earnings 
        up to 10 times. 
    </Text>
  </GridItem>
  <GridItem colSpan={1} />

  <GridItem
    marginTop={{ base: 0, lg: 2 }}
    display="flex"
    bgColor="rgba(0,0,0, 0.4)"
    justifyContent="flex-start"
    alignItems="flex-start"
    colSpan={{ sm: 1, md: 2 }}
    flexDirection="column"
    borderRadius={{ base: '42px', lg:'16px'}}
    boxShadow='inset 0 0 20px #4A4AF6, inset 0 0 5px #fff'
    padding={{ base:'6', lg:'4' }}
    >
    <Text 
        fontSize={{ base:'1rem', lg:'1.1rem'}}
        color="white" 
        fontWeight="semibold" 
        m="2" 
        textAlign="left"
    >
        Earn more VRTK in Core Pools 
    </Text>
    <Text 
        fontSize={{ base:'1rem', lg:'1.0rem'}}
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
        fontSize={{ base:'0.9rem', lg:'0.9rem'}}
        width="50%"
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
