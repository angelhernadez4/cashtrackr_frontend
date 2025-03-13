"use client"

import { authenticate } from "@/actions/authenticate-user-action";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import LoadingButton from "../ui/LoadingButton";

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Iniciar sesión');
    const [state, dispatch] = useFormState(authenticate, { errors: [] });

    useEffect(() => {
        if (state.errors.length > 0) {
            state.errors.forEach(error => toast.error(error));
            setLoading(false); // Si hay error, desbloqueamos el botón
            setText('Iniciar sesión')
        }
    }, [state]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true); // Bloquea el botón antes de enviar
        setText('Iniciando sesión...')
        const formData = new FormData(event.currentTarget);
        await Promise.resolve(dispatch(formData));
    };

    return (
        <form onSubmit={handleSubmit} className="mt-14 space-y-5" noValidate>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold text-2xl dark:text-slate-300">
                    Correo electrónico
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico de registro"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    name="email"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-bold text-2xl dark:text-slate-300">
                    Contraseña
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Contraseña de registro"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    name="password"
                    required
                />
            </div>

            <LoadingButton loading={loading} text={text} />
        </form>
    );
}
