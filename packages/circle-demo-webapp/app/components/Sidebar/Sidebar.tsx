import { Link, NavLink } from '@remix-run/react';
import { LayoutDashboard, Database } from 'lucide-react';
import React from 'react';
import type { WalletSet } from 'web3-circle-sdk';

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
          isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-600'
        } hover:bg-purple-50`
      }
    >
      {React.cloneElement(icon, { size: 20 })}
      {label}
    </NavLink>
  );
}

export interface SidebarProps {
  walletSets: WalletSet[];
}

export function Sidebar({ walletSets = [] }: SidebarProps) {
  return (
    <aside className="bg-white w-64 h-full shadow-md flex flex-col overflow-y-auto">
      <div className="p-6 max-w-[180px]">
        <Link to="/">
          <img src={circleLogo} alt="Circle Logo" />
        </Link>
      </div>
      <nav className="flex-1 px-4">
        <SidebarNavLink to="/wallets" icon={<LayoutDashboard />} label="Wallet Sets" />

        {walletSets.length > 0 && (
          <div className="mt-12">
            <p className="px-4 text-xs font-semibold text-gray-500 mb-2">
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
    </aside>
  );
}
