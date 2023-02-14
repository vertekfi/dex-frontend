import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import VertexNft from '~/lib/abi/VertexNft.json';
import { TokenBase } from '~/lib/services/token/token-types';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';

export function useApproveNFT(token: TokenBase) {
    const networkConfig = useNetworkConfig();
    const { submit, submitAsync, ...rest } = useSubmitTransaction({
        config: {
            addressOrName: token.address || '',
            contractInterface: VertexNft,
            functionName: 'approve',
        },
        transactionType: 'APPROVE',
    });

    // constract to approve is the staking contract
    function approve(contractToApprove = networkConfig.nft.nftStakingContract.toLowerCase(), tokenId: string) {
        submit({
            args: [contractToApprove, tokenId],
            toastText: `Approve ${token.symbol}`,
        });
    }

    return {
        approve,
        ...rest,
    };
}