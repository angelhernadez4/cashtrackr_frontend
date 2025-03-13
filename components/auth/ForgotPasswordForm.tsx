"use client"

import { forgotPasword } from "@/actions/forgot-password-action"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import LoadingButton from "../ui/LoadingButton"

export default function ForgotPasswordForm() {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Enviar instrucciones');
    const [state, dispatch] = useFormState(forgotPasword, {
        errors: [],
        success: null
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => toast.error(error))
            setLoading(false);
            setText('Enviar instrucciones')
        }
        if (state.success) {
            setLoading(false);
            toast.success(state.success.message)
            setText('Enviar instrucciones')
        }
    }, [state])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true); // Bloquea el botón antes de enviar
        setText('Enviando instrucciones...')
        const formData = new FormData(event.currentTarget);
        await Promise.resolve(dispatch(formData));
    };
    return (
        <form 
            className=" mt-14 space-y-5"
            noValidate
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-2 mb-10">
                <label
                className="font-bold text-2xl dark:text-slate-300"
                htmlFor="email"
                >Correo electrónico</label>
        
                <input
                    type="email"
                    id="email"
                    placeholder="Correo electrónico de registro"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    name="email"
                />
            </div>
        
            <LoadingButton loading={loading} text={text} />
        </form>
    )
}