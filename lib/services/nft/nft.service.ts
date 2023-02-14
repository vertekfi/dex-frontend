import VertexNft from '~/lib/abi/VertexNft.json';
import { BaseProvider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { StaticJsonRpcBatchProvider } from '~/lib/services/rpc-provider/static-json-rpc-batch-provider';
import { networkConfig } from '~/lib/config/network-config';
import { networkProvider } from '~/lib/global/network';

export default class NftService {
  private _provider: BaseProvider | null = null;
  constructor(private readonly contractAddress: string) {}

  public async balanceOf(user: string): Promise<string> {
    const contract = new Contract(this.contractAddress, VertexNft, this.provider);
    const result = await contract.balanceOf(user);

    return result.toString();
  }

  public async tokenOfOwnerByIndex(user: string, index: number) {
    const contract = new Contract(this.contractAddress, VertexNft, this.provider);
    const result = await contract.tokensOfOwner(user);
    const getIndex = result[index];
    console.log('getIndex', getIndex)
    return getIndex.toString();
  }

  public async tokenOfOwner(user: string) {
    const contract = new Contract(this.contractAddress, VertexNft, this.provider);
    const result = await contract.tokensOfOwner(user);
    return result;
  }

  public async isApprovedForAll(user: string) {
    const contract = new Contract(this.contractAddress, VertexNft, this.provider);
    const result = await contract.isApprovedForAll(user, networkConfig.nft.nftStakingContract.toLowerCase());
    return result;
  }

  public async tokenURI(tokenId: number) {
    const contract = new Contract(this.contractAddress, VertexNft, this.provider);
    const result = await contract.tokenURI(tokenId);

    return result.toString();
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

export const earlyLudwigNft = new NftService(networkConfig.nft.nftAddress.toLowerCase());
