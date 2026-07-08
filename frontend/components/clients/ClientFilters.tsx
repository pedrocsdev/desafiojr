'use client';

import { ClientStatus, ListClientsFilters } from '../../lib/types';

interface ClientFiltersProps {
    filters: ListClientsFilters;
    onChange: (filters: ListClientsFilters) => void;
}

export function ClientFilters({ filters, onChange }: ClientFiltersProps) {
    return (
        <div className="flex flex-wrap gap-3 mb-4">
            <input
                type="text"
                placeholder="Buscar por nome"
                value={filters.nome ?? ''}
                onChange={(e) => onChange({ ...filters, nome: e.target.value, page: 1 })}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <input
                type="text"
                placeholder="Buscar por email"
                value={filters.email ?? ''}
                onChange={(e) => onChange({ ...filters, email: e.target.value, page: 1 })}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <select
                value={filters.status ?? ''}
                onChange={(e) =>
                    onChange({
                        ...filters,
                        status: (e.target.value || undefined) as ClientStatus | undefined,
                        page: 1,
                    })
                }
                className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
                <option value="">Todos os status</option>
                <option value={ClientStatus.ACTIVE}>Ativo</option>
                <option value={ClientStatus.INACTIVE}>Inativo</option>
            </select>
        </div>
    );
}