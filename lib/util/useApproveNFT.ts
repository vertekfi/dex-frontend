import { useSubmitTransaction } from '~/lib/util/useSubmitTransaction';
import VertexNft from '~/lib/abi/VertexNft.json';
import { MaxUint256 } from '@ethersproject/constants';
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
    function approve(contractToApprove = '0x9b5c9187561d44a7548dc3680475bfdf8c6f86e2', tokenId: string) {
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


// import { BigNumber, ethers } from 'ethers'
// import { useCallback, useMemo } from 'react'

// import {
//   useHasPendingApproval,
//   useTransactionAdder
// } from '../state/transactions/hooks'
// import useAllowanceNFT from './useAllowanceNFT'

// const APPROVE_AMOUNT = ethers.constants.MaxUint256;
// const APPROVE_BASE_AMOUNT = BigNumber.from('1000000000000000000000000');

// export enum ApprovalState {
//   UNKNOWN,
//   NOT_APPROVED,
//   PENDING,
//   APPROVED,
// }

// // returns a variable indicating the state of the approval and a function which approves if necessary or early returns
// function useApproveNFT(token: any, spender: string): [ApprovalState, () => Promise<void>] {
//   const pendingApproval = useHasPendingApproval(token.address, spender);
//   const currentAllowance = useAllowanceNFT(token, spender, pendingApproval);
//   const approvalState: ApprovalState = useMemo(() => {
//     // we might not have enough data to know whether or not we need to approve
//     // if (!currentAllowance) return ApprovalState.UNKNOWN;

//     // amountToApprove will be defined if currentAllowance is
//     return !currentAllowance ? pendingApproval ? ApprovalState.PENDING : ApprovalState.NOT_APPROVED : ApprovalState.APPROVED;
//   }, [currentAllowance, pendingApproval]);

//   const addTransaction = useTransactionAdder();

//   const approve = useCallback(async (): Promise<void> => {
//     if (approvalState !== ApprovalState.NOT_APPROVED) {
//       console.error('approve was called unnecessarily');
//       return;
//     }

//     try
//     {
//         const response = await token.setApprovalForAll(spender, true);
//         addTransaction(response, {
//           summary: `Approve NFT`,
//           approval: {
//             tokenAddress: token.address,
//             spender: spender,
//           },
//         });
//     }
//     catch(error)
//     {

//     }

//   }, [approvalState, token, spender, addTransaction]);

//   return [approvalState, approve];
// }

// export default useApproveNFT;