import { Box, Button, Link, Text } from '@chakra-ui/react';
import { CreateForm } from '../../components/create/CreateForm'; 
import { useState } from 'react';

export function PoolsCreate() {
const [isModalOpen, setIsModalOpen] = useState(false);
const handleOpenModal = () => setIsModalOpen(true);

return (
<Box 
marginBottom={{base: '8rem', md:'4rem'}}
>
<Box 
mx="auto"
my="auto" 
display="flex" 
width={{ base: '100%', md: '30%'}}
padding="12px"
paddingY="16px" 
borderRadius="16px" 
flexDirection="column"
justifyContent="center" 
alignItems="center" 
className="verteklightpurplebox"
>
    <Text fontSize="xl" color="white" mb="4">
    Can&apos;t find what you&apos;re looking for?
    </Text>
    <Button 
    variant="stayblack" 
    marginBottom="8" marginTop="4"
    width={{ base: '75%', md: '75%' }}
    as={Link} 
    onClick={handleOpenModal}
    >
    Create a pool
    </Button>
    {isModalOpen && (
        <CreateForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        />
    )}
</Box>
</Box>
); 
}