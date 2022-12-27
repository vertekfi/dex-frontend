import { Vault } from './contracts/vault';
// import {
//   WeightedPool__factory,
//   StablePool__factory,
//   InvestmentPool__factory
// } from '@balancer-labs/typechain';

import WeightedPoolAbi from '../../abi/WeightedPoolFactory.json';
//import LinearPoolAbi from '@/lib/abi/LinearPool.json';
//import StaticATokenLMAbi from '@/lib/abi/StaticATokenLM.json';
//import StablePhantomPool from '@/lib/abi/StablePhantomPool.json';
import ERC20_ABI from '../../abi/ERC20.json';
//import BatchRelayer from './contracts/batch-relayer';
import { VeBAL } from './contracts/veBAL';

export default class BalancerContractsService {
  vault: Vault;
  veBAL: VeBAL;

  constructor() {
    // Init contracts
    this.vault = new Vault();
    this.veBAL = new VeBAL();
  }

  // Combine all the ABIs and remove duplicates
  public get allPoolABIs() {
    return Object.values(
      Object.fromEntries(
        [
          ...WeightedPoolAbi,
          // ...StablePool__factory.abi,
          // ...InvestmentPool__factory.abi,
          // ...StablePhantomPool,
          // ...LinearPoolAbi,
          // ...StaticATokenLMAbi,
          ...ERC20_ABI,
        ].map((row) => [row.name, row]),
      ),
    );
  }
}

export const balancerContractsService = new BalancerContractsService();
