import { LinksFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from '@remix-run/react';
import { LoaderCircle } from 'lucide-react';

import { Sidebar } from '~/components/Sidebar';
import { cachedLoader } from '~/lib/cache';
import { sdk } from '~/lib/sdk';

import './tailwind.css';
import { WalletSet } from '~/lib/types';

export const meta: MetaFunction = () => {
  return [{ title: 'Circle SDK Demo' }];
};

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: 'https://fonts.cdnfonts.com/css/sf-pro-display' },
];

export async function loader() {
  return cachedLoader('walletSets', async () => {
    const res = await sdk.listWalletSets();
    return res?.data?.walletSets as WalletSet[];
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const walletSets = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <div className="flex h-screen">
      <Sidebar walletSets={walletSets} />

      <div className="flex-1 p-12 overflow-y-auto bg-secondary relative">
        {navigation.state === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-50">
            <LoaderCircle className="animate-spin" strokeWidth={1} size={64} />
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
}
