import { User, Box, LayoutDashboard } from 'lucide-react';
import React from 'react';
import { Link, NavLink } from '@remix-run/react';

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

export function Sidebar() {
  return (
    <aside className="bg-white w-64 h-full shadow-md flex flex-col">
      <div className="p-6 max-w-[180px]">
        <Link to="/">
          <img src={circleLogo} alt="Circle Logo" />
        </Link>
      </div>
      <nav className="flex-1 px-4">
        <SidebarNavLink to="/overview" icon={<LayoutDashboard />} label="Overview" />
        <SidebarNavLink to="/customers" icon={<User />} label="Customers" />
        <SidebarNavLink to="/products" icon={<Box />} label="Products" />
      </nav>
    </aside>
  );
}
