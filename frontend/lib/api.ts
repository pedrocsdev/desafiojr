import {
    Client,
    CreateClientPayload,
    UpdateClientPayload,
    ListClientsFilters,
    PaginatedClients
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    });
    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || 'Erro na requisição');
    }
    return response.json();
}

export const clientsApi = {
    list: (filters: ListClientsFilters) => {
        const params = new URLSearchParams(filters as Record<string, string>);
        return request<PaginatedClients>(`/clients?${params}`);
    },
    getById: (id: string) => {
        return request<Client>(`/clients/${id}`);
    },
    create: (payload: CreateClientPayload) => {
        return request<Client>('/clients', {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    },
    update: (id: string, payload: UpdateClientPayload) => {
        return request<Client>(`/clients/${id}`, {
            method: 'PUT',
            body: JSON.stringify(payload),
        });
    },
    remove: (id: string) => {
        return request<void>(`/clients/${id}`, {
            method: 'DELETE',
        });
    },
};