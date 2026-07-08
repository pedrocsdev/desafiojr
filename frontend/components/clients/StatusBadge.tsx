import { ClientStatus } from '../../lib/types';

export function StatusBadge({ status }: { status: ClientStatus }) {
  const isActive = status === ClientStatus.ACTIVE;
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
      }`}
    >
      {isActive ? 'Ativo' : 'Inativo'}
    </span>
  );
}
