import { Network, urlFor } from '~/lib/global/useNetworkInfo';

/**
 * @summary returns full URL for pool id, given network.
 */
export function poolURLFor(poolId: string, network: Network): string {
  return `${urlFor(network)}/pool/${poolId}`;
}
