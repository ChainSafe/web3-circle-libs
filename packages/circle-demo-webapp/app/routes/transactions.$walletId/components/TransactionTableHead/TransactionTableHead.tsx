export function TransactionTableHead() {
  return (
    <thead>
      <tr className="text-foreground text-left text-sm">
        <th className="px-4 py-2">From</th>
        <th className="px-4 py-2">To</th>
        <th className="px-4 py-2">Status</th>
        <th className="px-4 py-2">Token Name</th>
        <th className="px-4 py-2 text-right">Amount</th>
        <th className="px-4 py-2 text-right">Date</th>
        <th className="py-2 text-right">Actions</th>
      </tr>
    </thead>
  );
}
