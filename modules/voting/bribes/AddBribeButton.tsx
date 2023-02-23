import { Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useGetGaugesQuery } from '~/lib/global/gauges/useGetGaugesQuery';
import { BribeModal } from './BribeModal';

export function AddBribeButton() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { gauges, isLoading } = useGetGaugesQuery();

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <Flex mt={5} width="25%">
      <Button variant="vertekdark" onClick={() => setIsModalOpen(true)} disabled={isLoading}>
        Add Bribe
      </Button>
      {isModalOpen && (
        <BribeModal isOpen={isModalOpen} onClose={handleModalClose} poolsWithGauges={gauges} />
      )}
    </Flex>
  );
}
