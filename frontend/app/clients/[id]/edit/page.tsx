'use client';

import { useParams } from 'next/navigation';
import { AppHeader } from '../../../../components/layout/appHeader';
import { ClientForm } from '../../../../components/clients/ClientForm';

export default function EditClientPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div>
      <AppHeader />
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Editar cliente</h2>
        <ClientForm id={id} />
      </div>
    </div>
  );
}
