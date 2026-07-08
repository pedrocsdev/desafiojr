'use client';

import { useRouter } from 'next/navigation';
import { useClientForm } from '../../hooks/useClientForm';

interface ClientFormProps {
    id?: string;
}

export function ClientForm({ id }: ClientFormProps) {
    const router = useRouter();
    const { formData, errors, loading, submitError, success, handleChange, handleSubmit } =
        useClientForm(id);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        await handleSubmit();
    }

    if (success) {
        router.push('/clients');
    }

    return (
        <form onSubmit={onSubmit} className="max-w-md flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => handleChange('nome', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
                {errors.nome && <p className="text-red-600 text-xs mt-1">{errors.nome}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    type="text"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Telefone</label>
                <input
                    type="text"
                    value={formData.telefone}
                    onChange={(e) => handleChange('telefone', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
                {errors.telefone && <p className="text-red-600 text-xs mt-1">{errors.telefone}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Documento</label>
                <input
                    type="text"
                    value={formData.documento}
                    onChange={(e) => handleChange('documento', e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
                {errors.documento && <p className="text-red-600 text-xs mt-1">{errors.documento}</p>}
            </div>

            {submitError && <p className="text-red-600 text-sm">{submitError}</p>}

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white rounded px-4 py-2 text-sm disabled:opacity-50"
            >
                {loading ? 'Salvando...' : 'Salvar'}
            </button>
        </form>
    );
}