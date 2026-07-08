'use client';

import { Client } from '../../lib/types';

interface ConfirmDeleteDialogProps {
    client: Client | null;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDeleteDialog({ client, onConfirm, onCancel }: ConfirmDeleteDialogProps) {
    if (!client) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
                <h2 className="text-lg font-semibold mb-2">Confirmar exclusão</h2>
                <p className="text-sm text-gray-600 mb-6">
                    Tem certeza que deseja excluir o cliente <b>{client.nome}</b>? Essa ação vai inativá-lo no
                    sistema.
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}