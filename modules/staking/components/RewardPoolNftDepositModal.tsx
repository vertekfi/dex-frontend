import {
  Box,
  ModalHeader,
  ModalOverlay,
  Text,
  Grid,
} from '@chakra-ui/react';
import { Modal, ModalBody, ModalCloseButton, ModalContent } from '@chakra-ui/modal';
import { useCallback, useEffect, useState } from 'react';
import { RewardPool } from '~/apollo/generated/graphql-codegen-generated';
import {
  BeetsTransactionStepsSubmit,
  TransactionStep,
} from '~/components/button/BeetsTransactionStepsSubmit';
import { TokenBase } from '~/lib/services/token/token-types';
import { useUserAccount } from '~/lib/user/useUserAccount';
import { useAllowances } from '~/lib/util/useAllowances';
import { useRewardPoolDepositNft } from '../lib/useRewardPoolDepositNft';
import { useApproveNFT } from '~/lib/util/useApproveNFT';
import { earlyLudwigNft } from '~/lib/services/nft/nft.service';
import NextImage from 'next/image';

interface Props {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
  pool: RewardPool;
}

export function RewardPoolNftDepositModal({ isOpen, onOpen, onClose, pool }: Props) {
  const { userAddress } = useUserAccount();

  const [tokensOfOwner, setTokensOfOwner] = useState<any>();
  const [images, setImages] = useState<any>();
  const [isLoadingBalance, setIsLoadingBalance] = useState<boolean>(true);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  useEffect(() => {
    if (!userAddress) return;
    earlyLudwigNft.tokenOfOwner(userAddress).then((res) => {
      setTokensOfOwner(res);
    });
  }, [userAddress]);

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

  const [selectedNFTs, setSelectedNFTs] = useState([]);
  const [steps, setSteps] = useState<TransactionStep[] | null>(null);

  const { depositToPool, ...depositQuery } = useRewardPoolDepositNft(pool);

  const nftInfo: TokenBase = {
    address: '0xb97B035231447F748A3F8Ba25B59C6ee23bDF36B',
    symbol: 'ROAR',
    decimals: 18,
    name: 'ROAR',
  };

  const {
    isLoading: isLoadingAllowances,
    hasApprovalForAmount,
    refetch: refetchAllowances,
  } = useAllowances(userAddress || null, [nftInfo], pool.address);

  useEffect(() => {
    if (!userAddress || !tokensOfOwner) return;
    earlyLudwigNft.isApprovedForAll(userAddress).then(res=> {
      setIsApproved(res)
    })
    
  }, [userAddress, tokensOfOwner]);

  

  const { approve, ...approveQuery } = useApproveNFT(nftInfo);

  const loading = isLoadingBalance || isLoadingAllowances;

  useEffect(() => {
    if (!loading) {
      // const hasApproval = hasApprovalForAmount(nftInfo.address, '1');

      setSteps([
        ...(!isApproved
          ? [
              {
                id: 'approve',
                type: 'other' as const,
                buttonText: 'Approve NFT',
                tooltipText: 'Approve NFT',
              },
            ]
          : []),
        {
          id: 'stake',
          type: 'other',
          buttonText: 'Stake NFT',
          tooltipText: 'Stake your NFT to earn additional rewards.',
        },
      ]);
    }
  }, [loading, isOpen]);

  const handleClick = (id: string) => {
    let items = [...selectedNFTs];
    if (items.includes(id)) {
      items = items.filter((x) => x !== id);
    } else {
      items = [];
      items.push(id);
    }
    setSelectedNFTs(items);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent
        boxShadow="0 0 10px #5BC0F8, 0 0 20px #4A4AF6"
        backgroundColor="vertek.slate.900"
        padding="12px"
        borderRadius="16px"
      >
        <ModalCloseButton />
        <ModalHeader className="bg">
          <Text color="gray.100" fontSize="md">
            Stake your NFT to earn additional rewards
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
          </Box>
          {selectedNFTs.length > 0 && (
            <BeetsTransactionStepsSubmit
              isLoading={loading || steps === null}
              loadingButtonText="Loading balances..."
              completeButtonText="Deposit complete"
              onCompleteButtonClick={() => {
                onClose();
              }}
              onSubmit={(id) => {
                if (id === 'approve') {
                  approve(pool.address, selectedNFTs[0].token_id);
                } else if (id === 'stake') {
                  depositToPool(pool.poolId, 1, parseInt(selectedNFTs[0].token_id));
                }
              }}
              onConfirmed={async (id) => {
                if (id === 'approve') {
                  refetchAllowances();
                } else if (id === 'stake') {
                  // refetchTokenBalances();
                }
              }}
              steps={steps || []}
              queries={[
                { ...depositQuery, id: 'stake' },
                { ...approveQuery, id: 'approve' },
              ]}
              // isDisabled={!hasValue || !amountIsValid}
            />
          )}
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
