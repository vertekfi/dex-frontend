import Head from 'next/head';
import { StakingContainer } from '~/modules/staking/StakingContainer';

const StakingPage = () => {
  return (
    <>
      <Head>
        <title>Vertex | Staking</title>
      </Head>
      <StakingContainer />
    </>
  );
};

export default StakingPage;
