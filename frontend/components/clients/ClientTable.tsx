'use client';

import Link from 'next/link';
import { Client } from '../../lib/types';
import { StatusBadge } from './StatusBadge';

interface ClientTableProps {
    clients: Client[];
    onDeleteClick: (client: Client) => void;
}

export function ClientTable({ clients, onDeleteClick }: ClientTableProps) {
    if (clients.length === 0) {
        return <p className="text-gray-500 text-sm py-8 text-center">Nenhum cliente encontrado.</p>;
    }

    return (
        <table className="w-full border-collapse text-sm">
            <thead>
                <tr className="border-b border-gray-200 text-left text-gray-500">
                    <th className="py-2 pr-4">Nome</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Telefone</th>
                    <th className="py-2 pr-4">Documento</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Ações</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client) => (
                    <tr key={client.id} className="border-b border-gray-100">
                        <td className="py-2 pr-4">{client.nome}</td>
                        <td className="py-2 pr-4">{client.email}</td>
                        <td className="py-2 pr-4">{client.telefone}</td>
                        <td className="py-2 pr-4">{client.documento}</td>
                        <td className="py-2 pr-4">
                            <StatusBadge status={client.status} />
                        </td>
                        <td className="py-2 pr-4 flex gap-2">
                            <Link href={`/clients/${client.id}/edit`} className="text-blue-600 hover:underline">
                                Editar
                            </Link>
                            <button onClick={() => onDeleteClick(client)} className="text-red-600 hover:underline">
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}