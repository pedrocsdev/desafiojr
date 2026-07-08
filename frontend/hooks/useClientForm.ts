'use client';

import { useState, useEffect } from 'react';
import { clientsApi } from '../lib/api';
import { CreateClientPayload } from '../lib/types';

export function useClientForm(id?: string) {
    const [formData, setFormData] = useState<CreateClientPayload>({
        nome: '',
        email: '',
        telefone: '',
        documento: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    function validate(): boolean {
        const newErrors: Record<string, string> = {};

        if (!formData.nome.trim()) {
            newErrors.nome = 'Nome é obrigatório';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.telefone.trim()) {
            newErrors.telefone = 'Telefone é obrigatório';
        }

        if (!formData.documento.trim()) {
            newErrors.documento = 'Documento é obrigatório';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleChange(field: keyof CreateClientPayload, value: string) {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }
    useEffect(() => {
        if (id) {
            setLoading(true);
            clientsApi
                .getById(id)
                .then((client) => {
                    setFormData({
                        nome: client.nome,
                        email: client.email,
                        telefone: client.telefone,
                        documento: client.documento,
                    });
                })
                .catch((err) => {
                    setSubmitError(err instanceof Error ? err.message : 'Erro ao carregar cliente');
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    async function handleSubmit() {
        setSubmitError(null);
        setSuccess(false);

        if (!validate()) {
            return;
        }

        setLoading(true);
        try {
            if (id) {
                await clientsApi.update(id, formData);
            } else {
                await clientsApi.create(formData);
            }
            setSuccess(true);
        } catch (err) {
            setSubmitError(err instanceof Error ? err.message : 'Erro ao salvar cliente');
        } finally {
            setLoading(false);
        }
    }
    return { formData, errors, loading, submitError, success, handleChange, handleSubmit };
}

