import { Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useGetGaugesQuery } from '~/lib/global/gauges/useGetGaugesQuery';
import { BribeModal } from './BribeModal';

export function AddBribeButton() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { gauges, isLoading: isLoadingGauges, refetchGauges } = useGetGaugesQuery();

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <Flex mt={5} width="25%">
      <Button variant="vertekdark" onClick={() => setIsModalOpen(true)} disabled={isLoadingGauges}>
        Add Bribe
      </Button>
      {isModalOpen && (
        <BribeModal isOpen={isModalOpen} onClose={handleModalClose} gauges={gauges} />
      )}
    </Flex>
  );
}
