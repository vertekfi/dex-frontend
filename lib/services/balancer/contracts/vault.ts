// import Service from '../balancer-contracts.service';
// import { getAddress } from '@ethersproject/address';
// import { formatUnits } from '@ethersproject/units';
// import { BigNumber } from '@ethersproject/bignumber';
// import {
//   LinearPoolDataMap,
//   OnchainPoolData,
//   OnchainTokenDataMap,
//   PoolType,
//   RawLinearPoolData,
//   RawLinearPoolDataMap,
//   RawOnchainPoolData,
//   RawPoolTokens
// } from '../../subgraph/types';
// import { TokenInfoMap } from '@/types/TokenList';
// import {
//   isWeightedLike,
//   isStableLike,
//   isTradingHaltable,
//   isStablePhantom
// } from '@/composables/usePool';
// import { toNormalizedWeights } from '@balancer-labs/balancer-js';
// import { pick } from 'lodash';
// import { Vault__factory } from '@balancer-labs/typechain';
import { Contract } from 'ethers';
import VaultAbi from '../../../abi/VaultAbi.json';
import { networkConfig } from '~/lib/config/network-config';
import { networkProvider } from '~/lib/global/network';
// import ProtocolFeesCollector from './protocol-fees-collector';

export class Vault {
  // service: Service;
  instance: Contract;

  constructor() {
    //  this.service = service;
    this.instance = new Contract(networkConfig.balancer.vault, VaultAbi, networkProvider);
  }

  // public get protocolFeesCollector(): ProtocolFeesCollector {
  //   return new ProtocolFeesCollector(this);
  // }

  // private formatPoolTokens(
  //   poolTokens: RawPoolTokens,
  //   tokenInfo: TokenInfoMap,
  //   weights: number[],
  //   poolAddress: string
  // ): OnchainTokenDataMap {
  //   const tokens = <OnchainTokenDataMap>{};

  //   poolTokens.tokens.forEach((token, i) => {
  //     const tokenBalance = poolTokens.balances[i];
  //     const decimals = tokenInfo[token]?.decimals;
  //     tokens[token] = {
  //       decimals,
  //       balance: formatUnits(tokenBalance, decimals),
  //       weight: `${weights[i]}`,
  //       symbol: tokenInfo[token]?.symbol,
  //       name: tokenInfo[token]?.name
  //       //logoURI: tokenInfo[token]?.logoURI
  //     };
  //   });

  //   // Remove pre-minted BPT
  //   delete tokens[poolAddress];

  //   return tokens;
  // }

  // private formatLinearPools(linearPools: RawLinearPoolDataMap): LinearPoolDataMap {
  //   const _linearPools = <LinearPoolDataMap>{};

  //   Object.keys(linearPools).forEach(address => {
  //     const {
  //       id,
  //       mainToken,
  //       wrappedToken,
  //       priceRate,
  //       unwrappedTokenAddress,
  //       tokenData,
  //       totalSupply
  //     } = linearPools[address];

  //     _linearPools[address] = {
  //       id,
  //       priceRate: formatUnits(priceRate.toString(), 18),
  //       mainToken: {
  //         address: getAddress(mainToken.address),
  //         index: mainToken.index.toNumber(),
  //         balance: tokenData.balances[mainToken.index.toNumber()].toString()
  //       },
  //       wrappedToken: {
  //         address: getAddress(wrappedToken.address),
  //         index: wrappedToken.index.toNumber(),
  //         balance: tokenData.balances[wrappedToken.index.toNumber()].toString(),
  //         priceRate: formatUnits(wrappedToken.rate, 18)
  //       },
  //       unwrappedTokenAddress: getAddress(unwrappedTokenAddress),
  //       totalSupply: formatUnits(totalSupply, 18),
  //       balance: '0',
  //       poolToken: ''
  //     };
  //   });

  //   return _linearPools;
  // }

  // public normalizeWeights(weights: BigNumber[], type: PoolType, tokens: TokenInfoMap): number[] {
  //   if (isWeightedLike(type)) {
  //     // toNormalizedWeights returns weights as 18 decimal fixed point
  //     return toNormalizedWeights(weights).map(w => Number(formatUnits(w, 18)));
  //   } else if (isStableLike(type)) {
  //     const tokensList = Object.values(tokens);
  //     return tokensList.map(() => 1 / tokensList.length);
  //   } else {
  //     return [];
  //   }
  // }

  // public get address(): string {
  //   return this.service.config.addresses.vault;
  // }
}
