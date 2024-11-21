import { PieChart, User, Box, Database, LayoutDashboard } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

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
      <div className="p-6 text-2xl font-bold">Logo</div>
      <nav className="flex-1 px-4">
        <SidebarNavLink to="/overview" icon={<LayoutDashboard />} label="Overview" />
        <SidebarNavLink to="/customers" icon={<User />} label="Customers" />
        <SidebarNavLink to="/products" icon={<Box />} label="Products" />
        <SidebarNavLink to="/billing" icon={<Database />} label="Billing" />
        <SidebarNavLink to="/reports" icon={<PieChart />} label="Reports" />
      </nav>
    </aside>
  );
}
