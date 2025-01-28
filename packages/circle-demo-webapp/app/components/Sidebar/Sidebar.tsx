import { Link, NavLink } from '@remix-run/react';
import { Database, LayoutDashboard } from 'lucide-react';
import React from 'react';

import { DarkModeToggle } from '~/components/DarkModeToggle';
import { ElementsWalletSet } from '~/lib/types';

import circleLogoWhite from './circle-logo-white.svg';
import circleLogo from './circle-logo.svg';

interface SidebarNavLinkProps {
  to: string;
  icon: React.ReactElement;
  label: string;
}

function SidebarNavLink({ to, icon, label }: SidebarNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md ${
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-secondary'
        }`
      }
    >
      {React.cloneElement(icon, { size: 20 })}
      {label}
    </NavLink>
  );
}

export interface SidebarProps {
  walletSets: ElementsWalletSet[];
}

export function Sidebar({ walletSets = [] }: SidebarProps) {
  return (
    <aside className="bg-background w-64 h-full flex flex-col overflow-y-auto">
      <div className="p-6 max-w-[180px]">
        <Link to="/">
          <img src={circleLogo} alt="Circle Logo" className="block dark:hidden" />
          <img src={circleLogoWhite} alt="Circle Logo" className="hidden dark:block" />
        </Link>
      </div>
      <nav className="flex-1 px-4">
        <SidebarNavLink to="/wallets" icon={<LayoutDashboard />} label="Wallet Sets" />

        {walletSets.length > 0 && (
          <div className="mt-12">
            <p className="px-4 text-xs font-semibold text-muted-foreground mb-2">
              All Wallet Sets
            </p>
            {walletSets.map((set) => (
              <SidebarNavLink
                key={set.id}
                to={`/wallets/${set.id}`}
                icon={<Database />}
                label={set.name ?? 'Unnamed'}
              />
            ))}
          </div>
        )}
      </nav>
      <div className="p-4">
        <DarkModeToggle />
      </div>
    </aside>
  );
}
