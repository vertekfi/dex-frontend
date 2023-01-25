import Image from 'next/image';
import BeetsSmart from '~/assets/svg/vertek-logo-dark.svg';
import VertekAlpha from '~/assets/png/vertek-mark-alpha.png'; 
import { useEarlyLudwigNft } from '~/lib/global/useEarlyLudwigNft';


export function WalletUserAvatar() {
    const { data } = useEarlyLudwigNft();
    if (data) {
        return <Image src={data} height="70px" width="150px" />;
    }

    return <Image src={VertekAlpha}  alt="your-profile" />;
}
