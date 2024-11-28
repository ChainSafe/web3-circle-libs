import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react';

import { Button } from '~/components/ui/button';

export function PageHeader() {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        <p className="text-gray-500">Welcome back!</p>
      </div>
      <div className="flex space-x-3">
        <Button variant="outline">
          <DollarSign /> Invest
        </Button>
        <Button variant="outline">
          <ArrowDown /> Receive
        </Button>
        <Button>
          <ArrowUp /> Send
        </Button>
      </div>
    </header>
  );
}
