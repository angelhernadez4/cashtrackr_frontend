"use client"
import { register } from "@/actions/create-account-action"
import { useEffect, useRef, useState } from "react"
import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage"
import SuccessMessage from "../ui/SuccessMessage"
import LoadingButton from "../ui/LoadingButton"

function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Registrarme');
    const ref = useRef<HTMLFormElement>(null)
    const [state, dispatch] = useFormState(register, {
        errors: [],
        success: null
    })

    useEffect(() => {
        if (state.success) {
            ref.current?.reset()
            setText('Registrarme')
        }
        if (state.errors.length > 0) {
            setLoading(false); // Si hay error, desbloqueamos el botón
            setText('Registrarme')
        }
    }, [state])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true); // Bloquea el botón antes de enviar
        setText('Registrandome...')
        const formData = new FormData(event.currentTarget);
        await Promise.resolve(dispatch(formData));
    };
    return (
        <form
            ref={ref}
            className="mt-14 space-y-5"
            noValidate
            onSubmit={handleSubmit}
        >
            {state.errors.map(error => (
                <ErrorMessage key={error}>{error}</ErrorMessage>
            ))}
            {state.success && <SuccessMessage>{state.success.message}</SuccessMessage>}
            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl dark:text-slate-300"
                    htmlFor="email"
                >Correo electrónico</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Correo electrónico de registro"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    name="email"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl dark:text-slate-300"
                    htmlFor="nameUser"
                >Nombre</label>
                <input
                    type="text"
                    id="nameUser"
                    placeholder="Nombre de Registro"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    name="name"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl dark:text-slate-300"
                    htmlFor="lastName"
                >Apellido</label>
                <input
                    type="text"
                    id="lastName"
                    placeholder="Nombre de registro"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    name="lastName"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl dark:text-slate-300"
                    htmlFor="password"
                >Contraseña</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Contraseña de registro"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    name="password"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    className="font-bold text-2xl dark:text-slate-300"
                    htmlFor="password_confirmation"
                >Repetir contraseña</label>
                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Repite contraseña de registro"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    name="password_confirmation"
                />
            </div>

            <LoadingButton loading={loading} text={text} />
        </form>
    )
}

export default RegisterForm