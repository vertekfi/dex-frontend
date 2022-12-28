import { TransactionResponse } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { Signer } from 'ethers';
import { getAccountSigner } from '~/lib/util/web3';

export interface WalletError extends Error {
  code: number | string;
}

export class Web3Service {
  constructor() {}

  async sendTransaction(
    contractAddress: string,
    abi: any,
    action: string,
    params: any[] = [],
    options: Record<string, any> = {},
  ): Promise<TransactionResponse> {
    const signer = await getAccountSigner();
    const contract = new Contract(contractAddress, abi, signer as Signer);

    console.log('Contract: ', contractAddress);
    console.log('Action: ', action);
    console.log('Params: ', params);

    try {
      //   const gasPriceSettings = await gasPriceService.getGasSettingsForContractCall(
      //     contract,
      //     action,
      //     params,
      //     options,
      //     forceEthereumLegacyTxType,
      //   );
      options = { ...options };

      return await contract[action](...params, options);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async callStatic<T>(
    contractAddress: string,
    abi: any[],
    action: string,
    params: any[] = [],
    options: Record<string, any> = {},
  ): Promise<T> {
    console.log('Sending transaction');
    console.log('Contract', contractAddress);
    console.log('Action', `"${action}"`);
    console.log('Params', params);
    const signer = await getAccountSigner();
    const contract = new Contract(contractAddress, abi, signer);
    const contractWithSigner = contract.connect(signer);
    return await contractWithSigner.callStatic[action](...params, options);
  }
}

export const web3Service = new Web3Service();
