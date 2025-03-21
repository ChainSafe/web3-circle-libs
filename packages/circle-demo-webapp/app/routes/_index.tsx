export default function Page() {
  return (
    <div className="p-8 pt-12 max-w-4xl mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="grow space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">Welcome to Circle Elements Demo</h1>
          <p className="text-muted-foreground">
            This is a demonstration application showcasing Circle&apos;s
            developer-controlled wallets using Circle SDK and ChainSafe&apos;s{' '}
            @chainsafe/react-elements library.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">About this Demo</h2>
          <p className="text-muted-foreground">
            This application demonstrates how to build a cryptocurrency wallet application
            using:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Circle SDK for wallet and transaction management</li>
            <li>@chainsafe/react-elements library for pre-built UI components</li>
            <li>Remix.js for the application framework</li>
            <li>Tailwind CSS for styling</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Resources</h2>
          <div className="space-y-2">
            <p className="text-muted-foreground">For more information, visit:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <a
                  href="https://developers.circle.com/w3s/developer-controlled-wallet-quickstart"
                  className="text-primary hover:underline"
                >
                  Circle Developer-Controlled Wallet Quickstart
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ChainSafe/web3-circle-libs"
                  className="text-primary hover:underline"
                >
                  @chainsafe/react-elements GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://chainsafe.github.io/web3-circle-libs/"
                  className="text-primary hover:underline"
                >
                  @chainsafe/react-elements Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <footer className="text-center text-muted-foreground mt-8 pt-8 border-t">
        Made with 💛 by ChainSafe
      </footer>
    </div>
  );
}
