import { ModalHeader, ModalOverlay, Text,  Box, Grid } from '@chakra-ui/react';
import { Modal, ModalBody, ModalCloseButton, ModalContent } from '@chakra-ui/modal';
import { useCallback, useEffect, useState } from 'react';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';
import {
  BeetsTransactionStepsSubmit,
  TransactionStep,
} from '~/components/button/BeetsTransactionStepsSubmit';
import { networkConfig } from '~/lib/config/network-config';
import { TokenBase } from '~/lib/services/token/token-types';
import { BeetsTokenInputWithSlider } from '~/components/inputs/BeetsTokenInputWithSlider';
import { useRewardPoolWithdrawNft } from '../lib/useRewardPoolWithdrawNft';
import { nftStakingContract } from '~/lib/services/nftStaking/nftStaking.service';
import { earlyLudwigNft } from '~/lib/services/nft/nft.service';
import { useUserAccount } from '~/lib/user/useUserAccount';
import NextImage from 'next/image';

interface Props {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  pool: RewardPool;
}

export function RewardPoolNftWithdrawModal({ isOpen, onOpen, onClose, pool }: Props) {
  const { userAddress } = useUserAccount();

  const [tokensOfOwner, setTokensOfOwner] = useState<any>();
  const [images, setImages] = useState<any>();
  const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(true);

  const [selectedNFTs, setSelectedNFTs] = useState([]);

  useEffect(() => {
    if (!userAddress) return;
    nftStakingContract.getStakedNFTs(pool.poolId, userAddress)
    .then((res) => {
      setTokensOfOwner(res);
    });
  }, [userAddress, pool.poolId]);

  const fetchBalance = useCallback(async () => {
    if (!tokensOfOwner) return;
    let tokenImages = [];
    for (let i = 0; i < tokensOfOwner.length; i++) {
      let tokenURI = await earlyLudwigNft.tokenURI(tokensOfOwner[i]);
      tokenURI = tokenURI.replace('ipfs://', 'https://nftstorage.link/ipfs/');

      let dat = await fetch(tokenURI).then((res) => res.json());
      dat =
        dat.image.substring(0, dat.image.length - 6) + dat.image.substring(dat.image.length - 6);
      dat = dat.replace('ipfs://', 'https://nftstorage.link/ipfs/');

      tokenImages.push({ token_id: tokensOfOwner[i].toString(), token_uri: dat });
    }
    setImages(tokenImages);
  }, [tokensOfOwner]);

  useEffect(() => {
    if (!userAddress || !tokensOfOwner) return;
    fetchBalance()
      .then(() => {
        setIsLoadingBalance(false);
      })
      .catch((err) => {
        console.error(`Failed to fetch token balance: ${err.stack}`);
        setIsLoadingBalance(false);
      });
  }, [userAddress, tokensOfOwner, fetchBalance]);

  const [steps, setSteps] = useState<TransactionStep[] | null>(null);

  const { withdrawFromPool, ...withdrawQuery } = useRewardPoolWithdrawNft(pool.address);

  const nftInfo: TokenBase = {
    address: '0xb97B035231447F748A3F8Ba25B59C6ee23bDF36B',
    symbol: 'ROAR',
    decimals: 18,
    name: 'ROAR',
  };


  useEffect(() => {
    if (!isOpen) {
      setSteps([
        {
          id: 'unstake',
          type: 'other',
          buttonText: 'Unstake NFT',
          tooltipText: 'Unstake NFT.',
        },
      ]);
    }
  }, [isOpen]);

  const handleClick = (id: string) => {
    let items = [...selectedNFTs];
    if (items.includes(id)) {
      items = items.filter((x) => x !== id);
    } else {
      items = [];
      items.push(id);
    }
    setSelectedNFTs(items);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        withdrawQuery.reset();
        onClose();
      }}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent backgroundColor="black">
        <ModalCloseButton />
        <ModalHeader className="bg">
          <Text color="gray.200" fontSize="md">
            Unstake NFT
          </Text>
        </ModalHeader>
        <ModalBody className="bg" pt="4" pb="6">
        <Box
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            <Grid
              justifyContent="center"
              templateColumns="repeat(2, 1fr)"
              gap={2}
              style={{
                width: '100%',
                height: '400px',
                overflow: 'auto',
                borderRadius: '20px',
                border: '1px solid gray',
                padding: 8,
              }}
            >
              {images &&
                images.map((item: any, index: number) => (
                  <Box key={index} onClick={() => handleClick(item)} style={{ padding: '10px' }}>
                    <NFTItem image={item.token_uri} selected={selectedNFTs.includes(item)} />
                  </Box>
                ))}
            </Grid>
            {/* <CircularProgress style={{ zIndex:1, position: 'absolute', display: usersNfts.length === 0 && max.gt(0) ? '' : 'none', marginTop: '0px' }} /> */}
          </Box>
        {selectedNFTs.length > 0 &&<BeetsTransactionStepsSubmit
            isLoading={steps === null}
            loadingButtonText="Loading balances..."
            completeButtonText="Withdraw complete"
            onCompleteButtonClick={() => {
              onClose();
            }}
            onSubmit={(id) => {
              withdrawFromPool(pool.poolId, 1, parseInt(selectedNFTs[0].token_id));
            }}
            onConfirmed={async (id) => {}}
            steps={steps || []}
            queries={[{ ...withdrawQuery, id: 'unstake' }]}
            // isDisabled={parseInt(pool.userInfo?.amountDeposited || '0') > 0 === false}
            isDisabled={false}
          />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

interface IProps {
  image?: string;
  selected?: boolean;
  tokenRank?: string;
  tokenRankColor?: string;
}

const NFTItem = (props: IProps) => {
  const { image, selected, tokenRank, tokenRankColor } = props;
  const [show, setShow] = useState(false);

  return (
    <Box
      style={{
        border: '2px solid',
        borderColor: selected ? '#D94F04' : 'gray',
        borderRadius: '10px',
        width: '225px',
        height: '225px',
      }}
    >
      {image && (
        <NextImage
          onClick={() => setShow(!show)}
          src={image}
          style={{ padding: '20px', borderRadius: '10px' }}
          width="225px"
          height="225px"
        />
      )}
    </Box>
  );
};

export default NFTItem;