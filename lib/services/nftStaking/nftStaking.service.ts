import VertexNft from '~/lib/abi/VertexNft.json';
import { BaseProvider } from '@ethersproject/providers';
import { BigNumber, Contract } from 'ethers';
import { StaticJsonRpcBatchProvider } from '~/lib/services/rpc-provider/static-json-rpc-batch-provider';
import { networkConfig } from '~/lib/config/network-config';
import { networkProvider } from '~/lib/global/network';
import { Transaction } from '@ethersproject/transactions';

export interface TransactionResponse extends Transaction {
  hash: string;

  // Only if a transaction has been mined
  blockNumber?: number;
  blockHash?: string;
  timestamp?: number;

  confirmations: number;

  // Not optional (as it is in Transaction)
  from: string;

  // The raw transaction
  raw?: string;

  // This function waits until the transaction has been mined
  wait: (confirmations?: number) => Promise<TransactionReceipt>;
}

export interface TransactionReceipt {
  to: string;
  from: string;
  contractAddress: string;
  transactionIndex: number;
  root?: string;
  gasUsed: BigNumber;
  logsBloom: string;
  blockHash: string;
  transactionHash: string;
  logs: Array<Log>;
  blockNumber: number;
  confirmations: number;
  cumulativeGasUsed: BigNumber;
  effectiveGasPrice: BigNumber;
  byzantium: boolean;
  type: number;
  status?: number;
}

export interface Log {
  blockNumber: number;
  blockHash: string;
  transactionIndex: number;

  removed: boolean;

  address: string;
  data: string;

  topics: Array<string>;

  transactionHash: string;
  logIndex: number;
}

export default class nftStakingService {
  private _provider: BaseProvider | null = null;
  constructor(private readonly contractAddress: string) {}

  public async depositTokens(poolId: Number, amount: BigNumber): Promise<TransactionResponse> {
    const contract = new Contract(this.contractAddress, VertexNft, this.provider);
    return await contract['deposit(uint256,uint256)'](poolId, amount);
  }

  public async withdrawTokens(poolId: Number, amount: BigNumber): Promise<TransactionResponse> {
    const contract = new Contract(this.contractAddress, VertexNft, this.provider);
    return await contract['withdraw(uint256,uint256)'](poolId, amount);
  }

  public async stakeNFT(poolId: Number, tokens: any[]): Promise<TransactionResponse> {
    const contract = new Contract(this.contractAddress, VertexNft, this.provider);
    // deposit - pid, amount, token ids
    // not sure what to set amount
    return await contract['deposit(uint256,uint256,uint256[])'](poolId, 1, tokens);
  }

  public async unstakeNFT(poolId: Number, tokens: any[]): Promise<TransactionResponse> {
    const contract = new Contract(this.contractAddress, VertexNft, this.provider);
    // deposit - pid, amount, token ids
    // not sure what to set amount
    return await contract['withdraw(uint256,uint256,uint256[])'](poolId, 1, tokens);
  }

  get provider(): BaseProvider {
    if (this._provider === null) {
      if (networkConfig.chainId === '5' || networkConfig.chainId === '56') {
        this._provider = networkProvider;
      } else {
        this._provider = new StaticJsonRpcBatchProvider('https://rpc.ftm.tools');
      }
    }

    return this._provider;
  }
}

// export const nftStakingContract = new nftStakingService(
//   '0xFeC15cAaf2C07c75D31974D4206ac907AA1B1fDf',
// );
export const nftStakingContract = new nftStakingService(
  '0x9b5c9187561d44a7548dc3680475bfdf8c6f86e2',
);
