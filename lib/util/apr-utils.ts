import { GqlPoolApr } from '~/apollo/generated/graphql-codegen-generated';
import { bnum } from './big-number.utils';

export function getAprValues(poolApr: GqlPoolApr, boost: { boost: string }) {
  const minAprItem = poolApr.items.find((apr) => apr.title.includes('Min'));
  const maxAprItem = poolApr.items.find((apr) => apr.title.includes('Max'));
  const swapApr = poolApr.items.find((apr) => apr.title.includes('Swap'));
  const veVrtkApr = poolApr.items.find((apr) => apr.title.includes('veVRTK'));

  let minApr = '0';
  let maxApr = '0';
  let boostedTotalAPR = '0';
  let dailyMinApr = 0;
  let dailyMaxApr = 0;
  if (minAprItem && maxAprItem) {
    const minNum = parseFloat(minAprItem.apr) + parseFloat(swapApr?.apr || '0');
    const maxNum = parseFloat(maxAprItem.apr) + parseFloat(swapApr?.apr || '0');
    dailyMinApr = minNum / 365;
    dailyMaxApr = maxNum / 365;

    minApr = String(minNum);
    maxApr = String(maxNum);

    boostedTotalAPR = bnum(String(parseFloat(minAprItem.apr)))
      .times(boost.boost)
      .plus(swapApr?.apr || '0')
      .toString();
  }

  let dailyVe = 0;
  if (veVrtkApr) {
    const totalVe = parseFloat(poolApr.total);
    dailyVe = totalVe / 365;
  }

  return {
    minApr,
    maxApr,
    boostedTotalAPR,
    dailyMinApr,
    dailyMaxApr,
    isVePool: veVrtkApr !== undefined,
    dailyVe,
  };
}
