'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useClients } from '../../hooks/useClients';
import { AppHeader } from '../../components/layout/appHeader';
import { ClientFilters } from '../../components/clients/ClientFilters';
import { ClientTable } from '../../components/clients/ClientTable';
import { ConfirmDeleteDialog } from '../../components/clients/ConfirmDeleteDialog';
import { Client } from '../../lib/types';

export default function ClientsPage() {
  const { clients, loading, error, filters, setFilters, removeClient } = useClients();
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  async function handleConfirmDelete() {
    if (clientToDelete) {
      await removeClient(clientToDelete.id);
      setClientToDelete(null);
    }
  }

  return (
    <div>
      <AppHeader />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <ClientFilters filters={filters} onChange={setFilters} />
          <Link
            href="/clients/new"
            className="bg-blue-600 text-white rounded px-4 py-2 text-sm h-fit"
          >
            + Novo cliente
          </Link>
        </div>

        {loading && <p className="text-gray-500 text-sm">Carregando...</p>}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        {!loading && !error && (
          <ClientTable clients={clients} onDeleteClick={setClientToDelete} />
        )}
      </div>

      <ConfirmDeleteDialog
        client={clientToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setClientToDelete(null)}
      />
    </div>
  );
}
