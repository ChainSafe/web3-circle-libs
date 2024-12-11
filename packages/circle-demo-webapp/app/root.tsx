import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from '@remix-run/react';
import { LoaderCircle } from 'lucide-react';

import { Sidebar } from './components/Sidebar';

import './tailwind.css';

export const meta: MetaFunction = () => {
  return [{ title: 'Circle SDK Demo' }];
};

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
  const navigation = useNavigation(); // Hook to track navigation state

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-12 overflow-y-auto bg-gray-50 relative">
        {navigation.state === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-50">
            <LoaderCircle className="animate-spin" strokeWidth={1} size={64} />
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
}
