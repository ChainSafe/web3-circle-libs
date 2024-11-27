import { Outlet } from 'react-router-dom';

import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-12 overflow-y-auto bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}
