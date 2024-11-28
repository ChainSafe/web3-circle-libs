import { useParams } from '@remix-run/react';

export function loader({ params }: { params: { id: string } }) {
  const { id } = params;

  console.log('id', id);

  return [];
}

export default function WalletDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <h2>Details</h2>
      <p>You are viewing details for item with ID: {id}</p>
    </div>
  );
}
