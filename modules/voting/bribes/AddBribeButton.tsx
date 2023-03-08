import { Button, Flex, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { PlusCircle } from 'react-feather';
import { useGetGaugesQuery } from '~/lib/global/gauges/useGetGaugesQuery';
import { BribeModal } from './BribeModal';

export function AddBribeButton() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { gauges, isLoading } = useGetGaugesQuery();

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <Flex mt={5} width="75%" justifyContent="center" alignContent="center">
      <Button
        variant="vertekdark"
        onClick={() => setIsModalOpen(true)}
        disabled={isLoading}
        width="100%"
        height="48px"
      >
        Add Bribe
        <Icon ml={2} as={PlusCircle} />
      </Button>
      {isModalOpen && (
        <BribeModal isOpen={isModalOpen} onClose={handleModalClose} poolsWithGauges={gauges} />
      )}
    </Flex>
  );
}
