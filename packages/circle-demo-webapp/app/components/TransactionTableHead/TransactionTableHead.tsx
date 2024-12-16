export function TransactionTableHead() {
  return (
    <thead>
      <tr className="text-foreground text-left text-sm">
        <th className="py-2">Event</th>
        <th className="px-4 py-2">From</th>
        <th className="px-4 py-2">To</th>
        <th className="px-4 py-2 text-right">Amount</th>
        <th className="py-2 text-right">Date</th>
      </tr>
    </thead>
  );
}
