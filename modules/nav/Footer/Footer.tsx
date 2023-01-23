import { useNetworkConfig } from '~/lib/global/useNetworkConfig';
import { MobileFooter } from './MobileFooter';
import { RegularFooter } from './RegularFooter';

export function Footer() {
  const { chainId } = useNetworkConfig();

return (
  <>
<RegularFooter />
<MobileFooter/>
</>
  );
}
