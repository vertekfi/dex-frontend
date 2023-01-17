import { GridItem, Flex, Text, Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import NextImage from 'next/image';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';
import Vertek from '~/assets/svg/vertektransparent.svg';

export function PerpetualsCard() {
return (
    <GridItem
        bgGradient="vertek.slatepurple.900"
        boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
        borderRadius="18px"
        maxW="550px"
        color="white"
        mt="12"
    >
      <Flex direction="row" justify="center" 
      fontWeight="bold" padding="2" ml="2" 
      borderColor="box.500" 
      borderBottomWidth="2px"
       alignItems="center">
        <Box>
          <NextImage objectFit="contain" src={Vertek} alt={`Logo for deposit token}`} />
        </Box>
        <Box marginLeft="12">
          <Text fontSize="1rem">
           Perpetuals...Coming Soon
          </Text>
        </Box>
      </Flex>
    </GridItem>
);
}
