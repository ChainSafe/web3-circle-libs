import { MoreVertical } from 'lucide-react';

export function MenuButton() {
  return (
    <button className="text-gray-400 hover:text-gray-600" aria-label="Menu">
      <MoreVertical size={20} />
    </button>
  );
}
