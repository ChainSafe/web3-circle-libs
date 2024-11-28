import { useCircleSdk } from '~/hooks/useCircleSdk';

export interface WalletBalanceProps {
  format?: (balance: bigint) => string;
}

function defaultFormat(balance: bigint) {
  return `${balance.toString()} ETH`;
}

export const WalletBalance = ({ format = defaultFormat }: WalletBalanceProps = {}) => {
  const { client } = useCircleSdk();

  return <span>{format(client.getBalance())}</span>;
};
