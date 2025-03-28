# ChainSafe React Elements powered by Circle Web3 Services

Accelerate frontend development with a powerful set of UI components designed for
Circle's [Developer-Controlled Wallets](https://developers.circle.com/w3s/developer-controlled-wallets). These embedded
wallets enable users to store, send, and spend USDC and other digital assets seamlessly.

## Features

- Pre-built components for common Circle operations
- Built with React, TypeScript, and Tailwind CSS
- Accessible by default using Radix UI primitives
- Dark mode support
- Responsive and mobile-friendly
- Form components with validation
- Transaction management components
- Wallet management components

## Circle Console Setup

Before using the components, you need to configure the Circle Console. The easiest way is to use our setup tool:

```bash
npx @chainsafe/circle-sdk-setup --api-key YOUR_API_KEY
```

You'll need:

- A Circle API key from the [Circle Console](https://console.circle.com). Read how to setup your Circle Developer
  Account [here](https://developers.circle.com/w3s/circle-developer-account).

The setup tool will automatically:

- Generate a secure entity secret
- Register your configuration with Circle
- Save the configuration to `.env` file with required environment variables:

    - `CIRCLE_API_KEY`: Your Circle API key
    - `CIRCLE_SECRET`: Generated entity secret for secure communication with the Circle API

- Generate a recovery file (`recovery_file_YYYY-MM-DD.dat`)

⚠️ **Important**: Store the generated recovery file (`recovery_file_YYYY-MM-DD.dat`) in a secure location and remove it
from your project directory.

Then you can proceed with the installation of
the [Circle Developer-Controlled Wallet SDK](https://developers.circle.com/w3s/nodejs-sdk) and ChainSafe React Elements
powered by Circle Web3 Services.

## Installation

```bash
npm install @chainsafe/circle-react-elements
```

or

```bash
yarn add @chainsafe/circle-react-elements
```

## Dependencies

This package requires the following peer dependencies:

```json
{
  "@circle-fin/developer-controlled-wallets": "^7.1.0",
  // Circle SDK
  "lucide-react": "^0.474.0",
  // Icon library
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "tailwindcss": "^4.0.4"
  // CSS framework
}
```

Install them all in a single command:

```bash
npm install @circle-fin/developer-controlled-wallets lucide-react react react-dom tailwindcss
```

or

```bash
yarn add @circle-fin/developer-controlled-wallets lucide-react react react-dom tailwindcss
```

## Tailwind CSS Setup

Import the ChainSafe React Elements powered by Circle Web3 Services CSS in your app's `tailwind.css` file:

```css
@import 'tailwindcss';
@import '@chainsafe/circle-react-elements/styles.css';

@custom-variant dark (&:is(.dark *));

:root {
    --primary: hsl(255 82% 64%); /* Overwrite to match your theme. */
}

.dark {
    --primary: hsl(255 82% 64%); /* Overwrite to match your theme. */
}
```

## Quick Start

Here's a simple example using the wallet creation form:

```tsx
import { NewWalletForm } from '@chainsafe/circle-react-elements';

function CreateWallet() {
  const handleSubmit = async (data) => {
    try {
      // Call Circle's API to create wallet
      await createWallet(data);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <NewWalletForm walletSetId="your-wallet-set-id" onSubmit={handleSubmit} isTestnet />
  );
}
```

## Components

The library provides several categories of components:

## Wallet Components

- `WalletDetails` - Show wallet information
- `WalletSetDetails` - Show wallet set information
- `WalletBalance` - Display token balances
- `WalletReceive` - Show wallet address with QR code

## Blockchain Components

- `ChainIcon` - Display blockchain network icon
- `ChainLabel` - Show network name with icon
- `ChainSelect` - Network selection dropdown for mainnets
- `TestChainSelect` - Network selection dropdown for testnets

## Token Components

- `TokenItem` - Display token information
- `TokenSelect` - Token selection dropdown with balances
- `Amount` - Format token amounts

## Transaction Components

- `TransactionDetails` - Display transaction information
- `Transaction` - Flexible transactions component that dynamically renders transaction details within a table,
  supporting customizable columns

## Form Components

- `NewWalletForm` - Create a new wallet
- `EditWalletForm` - Edit an existing wallet
- `NewWalletSetForm` - Create a new wallet set
- `EditWalletSetForm` - Edit an existing wallet set
- `SendTransactionForm` - Send tokens from a wallet

## Feedback & Messaging

- `SuccessMessage` - Display a success message
- `TransactionState` - Show transaction state
- `ComplianceStatus` - Show compliance status

## TypeScript

The package is written in TypeScript and includes full type definitions. All components and their props are fully typed
for the best development experience.

## Theme Customization

The components use Tailwind CSS for styling and can be customized through your Tailwind configuration. They respect your
theme's colors, spacing, and other design tokens.

## Further Resources

- [Circle Developer Documentation](https://developers.circle.com/w3s/developer-controlled-create-your-first-wallet)
- [ChainSafe React Elements powered by Circle Web3 Services Storybook](https://chainsafe.github.io/web3-circle-libs)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.
