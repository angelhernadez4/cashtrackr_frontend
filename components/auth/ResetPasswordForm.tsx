import { resetPassword } from "@/actions/reset-password-action"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { toast } from "react-toastify"
import LoadingButton from "../ui/LoadingButton"

export default function ResetPasswordForm({token} : {token: string}) {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Guardar contraseña');
    const router = useRouter()
    const resetPasswordWithToken = resetPassword.bind(null, token)
    const [state, dispatch] = useFormState(resetPasswordWithToken, {
        errors: [],
        success: null
    })
    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => toast.error(error))
            setLoading(false);
            setText('Guardar contraseña')
        }
        if (state.success) {
            setLoading(false);
            setText('Guardar contraseña')
            toast.success(state.success.message)
            router.push('/auth/login')
        }
    }, [state, router])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true); // Bloquea el botón antes de enviar
        setText('Guardando contraseña...')
        const formData = new FormData(event.currentTarget);
        await Promise.resolve(dispatch(formData));
    };
    return (
        <form
            className=" mt-14 space-y-5"
            noValidate
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-5">
                <label
                    htmlFor="password"
                    className="font-bold text-2xl text-slate-300"
                >Password</label>

                <input
                    type="password"
                    id="password"
                    placeholder="Password de Registro"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    name="password"
                />
            </div>

            <div className="flex flex-col gap-5">
                <label
                    htmlFor="password_confirmation"
                    className="font-bold text-2xl text-slate-300"
                >Repetir Password</label>

                <input
                    id="password_confirmation"
                    type="password"
                    placeholder="Repite Password de Registro"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    name="password_confirmation"
                />

            </div>

            <LoadingButton loading={loading} text={text} />
        </form>
    )
}