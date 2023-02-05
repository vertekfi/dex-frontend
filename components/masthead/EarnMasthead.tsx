import { Text, Button, SimpleGrid, GridItem , Box} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { NextLink } from '../link/NextLink';
import { useState } from 'react';
import { LockForm } from '~/modules/voting/lock/LockForm';
import 'animate.css'; 
import { motion } from 'framer-motion';

interface Props {
  title: string;
  image: ReactNode;
}
export function EarnMasthead({ title, image }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  return (
<SimpleGrid
  columns={{ sm: 1, lg: 6 }}
  paddingX={{ base: '2', lg: '4' }}
  paddingY="2"
  marginTop={{ base: 0, lg: 2 }}
  marginBottom={{ base: 6, lg: 8 }}
  spacing={{ base: '6', lg: '8' }}
>
  <GridItem display="flex" flexDirection="column" colSpan={{ sm: 1, lg: 3 }} 
  className="animate__animated animate__zoomIn delayhalf " 
        >
    <Text
      gap="0"
      fontSize="2.2rem"
      color="white"
      fontWeight="semibold"
      flex="1"
      textAlign="left"
    >
      {title}
    </Text>
   

    <Text fontSize="1.2rem" fontWeight="normal" flex="1" mb="2" color="vertek.slate.100">
      Join our farms for higher rewards and bonuses that can multiply your earnings up to 10
      times.
    </Text>
  </GridItem>
  
  
  <GridItem colSpan={1} />
  
  <GridItem
    className="verteklightpurplebox animate__animated animate__zoomIn animate__delay-2s"
    marginTop={{ base: 0, lg: 2 }}
    display="flex"
    width={{ base: '100%', md: '60%', lg: 'auto' }}
    mx="auto"
    justifyContent="flex-start"
    alignItems="flex-start"
    colSpan={{ sm: 1, lg: 2 }}
    flexDirection="column"
    borderRadius={{ base: '16px', lg: '16px' }}
    padding={{ base: '4', lg: '4' }}
    
  >
   
    <Text
      fontSize={{ base: '1rem', lg: '1.1rem' }}
      color="white"
      fontWeight="semibold"
      m="2"
      textAlign="left"
    >
      Earn more VRTK in Core Pools
    </Text>
    <Text
      fontSize={{ base: '1rem', lg: '1.0rem' }}
      fontWeight="normal"
      m="2"
      color="vertek.slate.100"
      textAlign="left"
    >
      Lock VRTK-BNB and receive up to 2.5x boosted rewards when farming Core Pools.
    </Text>
    <Box
      display="flex" 
      justifyContent="center" 
      width="full" 
      alignItems="center" 
        >
      <NextLink href="/voting" chakraProps={{ _hover: { textDecoration: 'none' } }}>
      <Button
        className="animate__animated animate__zoomIn animate__delay-3s"
        variant="moistblack"
        marginY="0.5rem"
        width={{ base: '180px', md: '220px' }}
        boxShadow="0px 10px 4px #000"
        fontSize={{ base: '0.9rem', lg: '1rem' }}
        alignSelf="center"
        // onClick={handleOpenModal}
      >
        Earn More
      </Button>
      </NextLink>
    </Box>

  </GridItem>
 

  {/* {isModalOpen && <LockForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />} */}
</SimpleGrid>
  );
}
