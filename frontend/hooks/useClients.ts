'use client';

import { useState, useEffect } from "react";
import { clientsApi } from "../lib/api";
import { Client, ListClientsFilters } from "../lib/types";

export function useClients() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<ListClientsFilters>({ page: 1, limit: 10 });

    async function fetchClients() {
        setLoading(true);
        setError(null);
        try {
            const data = await clientsApi.list(filters);
            setClients(data.items);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao buscar clientes');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchClients();
    }, [filters]);

    async function removeClient(id: string) {
        try {
            await clientsApi.remove(id);
            await fetchClients();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao excluir cliente');
        }
    }

    return { clients, loading, error, filters, setFilters, removeClient };
}