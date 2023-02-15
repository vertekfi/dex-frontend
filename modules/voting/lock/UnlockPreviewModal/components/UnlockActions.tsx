import { BeetsTransactionStepsSubmit } from '~/components/button/BeetsTransactionStepsSubmit';
import { useWithdrawLock } from '../../lib/useWithdrawLock';

type Props = {
  onSuccess: () => void;
};

export function UnlockActions(props: Props) {
  const { withdrawLock, query } = useWithdrawLock();

  return (
    <BeetsTransactionStepsSubmit
      isLoading={false}
      loadingButtonText="Awaiting confirmation.."
      completeButtonText="Unock complete"
      onCompleteButtonClick={() => {}}
      onSubmit={(id) => {
        withdrawLock();
      }}
      onConfirmed={async (id) => {
        props.onSuccess();
      }}
      steps={[
        {
          id: 'withdraw',
          type: 'other' as const,
          buttonText: 'Unlock veVRTK',
          tooltipText: 'Unlock veVRTK',
        },
      ]}
      queries={[{ ...query, id: 'withdraw' }]}
    />
  );
}
