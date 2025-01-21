# Circle Wallet Elements

Monorepo that contains the following packages:

- [`@circle-libs/circle-demo-webapp`](packages/circle-demo-webapp) - Demo application combining Circle React components and [Circle SDK](https://developers.circle.com/)
- [`@circle-libs/circle-react-elements`](packages/circle-react-elements) - React components compatible with Circle SDK
- [`@circle-libs/circle-sdk-setup`](packages/circle-sdk-setup) - CLI tool for Circle SDK setup

## Local Development

To set up the monorepo for local development, follow these steps:

1. Install dependencies.
   ```sh
   yarn install
   ```
2. Run react-elements watcher in a separate console.
   ```sh
   yarn elements:watch
   ```
3. Start the development server for the demo webapp.
   ```sh
   yarn demo:dev
   ```

You can now make changes to the packages and see the updates in the demo webapp in real-time.
