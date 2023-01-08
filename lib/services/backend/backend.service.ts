import { GraphQLClient } from 'graphql-request';
import { GetLiquidityGaugesDocument } from '~/apollo/generated/graphql-codegen-generated';
import { networkConfig } from '~/lib/config/network-config';

export class BackendService {
  private readonly client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient(networkConfig.backendUrl);
  }

  async getGauges() {
    return this.client.request(GetLiquidityGaugesDocument);
  }
}

export const backenService = new BackendService();
