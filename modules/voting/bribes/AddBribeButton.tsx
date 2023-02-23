import { Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useGetPoolsQuery } from '~/apollo/generated/graphql-codegen-generated';
import { BribeModal } from './BribeModal';

export function AddBribeButton() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data: pools, loading } = useGetPoolsQuery({
    pollInterval: 30000,
  });

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <Flex mt={5} width="25%">
      <Button variant="vertekdark" onClick={() => setIsModalOpen(true)} disabled={loading}>
        Add Bribe
      </Button>
      {!loading && pools?.poolGetPools && isModalOpen && (
        <BribeModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          poolsWithGauges={pools.poolGetPools}
        />
      )}
    </Flex>
  );
}
