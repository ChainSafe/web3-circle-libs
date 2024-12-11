import { NetworkIcon } from '@web3icons/react';
import makeBlockie from 'ethereum-blockies-base64';
import { useMemo } from 'react';
import { BLOCKCHAIN, type Wallet } from 'web3-circle-sdk';

export interface WalletDetailsProps {
  wallet: Wallet;
  children?: React.ReactNode;
}

function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

const BLOCKCHAIN_TO_ICON_MAP = {
  [BLOCKCHAIN.ARB_SEPOLIA]: 'arbitrum',
  [BLOCKCHAIN.ARB]: 'arbitrum',
  [BLOCKCHAIN.AVAX_FUJI]: 'avalanche',
  [BLOCKCHAIN.AVAX]: 'avalanche',
  [BLOCKCHAIN.ETH_SEPOLIA]: 'ethereum',
  [BLOCKCHAIN.ETH]: 'ethereum',
  [BLOCKCHAIN.EVM_TESTNET]: '',
  [BLOCKCHAIN.EVM]: '',
  [BLOCKCHAIN.MATIC_AMOY]: 'polygon',
  [BLOCKCHAIN.MATIC]: 'polygon',
  [BLOCKCHAIN.NEAR_TESTNET]: 'near',
  [BLOCKCHAIN.NEAR]: 'near',
  [BLOCKCHAIN.SOL_DEVNET]: 'solana',
  [BLOCKCHAIN.SOL]: 'solana',
};

const BLOCKCHAIN_LABELS = {
  [BLOCKCHAIN.ARB_SEPOLIA]: 'Arbitrum Sepolia Testnet',
  [BLOCKCHAIN.ARB]: 'Arbitrum Mainnet',
  [BLOCKCHAIN.AVAX_FUJI]: 'Avalanche Fuji Testnet',
  [BLOCKCHAIN.AVAX]: 'Avalanche Mainnet',
  [BLOCKCHAIN.ETH_SEPOLIA]: 'Ethereum Sepolia Testnet',
  [BLOCKCHAIN.ETH]: 'Ethereum Mainnet',
  [BLOCKCHAIN.EVM_TESTNET]: '',
  [BLOCKCHAIN.EVM]: '',
  [BLOCKCHAIN.MATIC_AMOY]: 'Polygon Amoy',
  [BLOCKCHAIN.MATIC]: 'Polygon Mainnet',
  [BLOCKCHAIN.NEAR_TESTNET]: 'NEAR Testnet',
  [BLOCKCHAIN.NEAR]: 'NEAR Mainnet',
  [BLOCKCHAIN.SOL_DEVNET]: 'Solana Devnet',
  [BLOCKCHAIN.SOL]: 'Solana Mainnet',
};

export function WalletDetails({ wallet, children }: WalletDetailsProps) {
  const shortAddress = useMemo(() => shortenAddress(wallet.address), [wallet]);
  const walletImage = useMemo(() => makeBlockie(wallet.address), [wallet]);

  return (
    <div className="flex items-center space-x-4">
      <img src={walletImage} alt="Wallet Avatar" className="w-16 h-16 rounded-full" />

      <div className="flex-1">
        <p className="text-m font-medium text-gray-900">
          {wallet.name || 'Unnamed Wallet'}
        </p>

        <p className="text-sm text-gray-900 mb-1" title={wallet.address}>
          {shortAddress}
        </p>

        <p className="text-sm text-gray-500 flex items-center space-x-2">
          <NetworkIcon
            network={BLOCKCHAIN_TO_ICON_MAP[wallet.blockchain]}
            size={16}
            variant="branded"
          />
          <span>{BLOCKCHAIN_LABELS[wallet.blockchain]}</span>
        </p>
      </div>

      {children && <div>{children}</div>}
    </div>
  );
}
