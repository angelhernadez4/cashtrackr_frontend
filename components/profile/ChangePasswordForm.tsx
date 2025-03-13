"use client"

import { updatePassword } from "@/actions/update-password-action"
import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage"
import { useEffect, useRef } from "react"
import { toast } from "react-toastify"

export default function ChangePasswordForm() {
    const ref = useRef<HTMLFormElement>(null)
    const [state, dispatch] = useFormState(updatePassword, {
        errors: [],
        success: null
    })

    useEffect(() => {
        if (state.success) {
            toast.success(state.success.message)
            ref.current?.reset()
        }
    }, [state])
    return (
        <>
            <form
                className=" mt-14 space-y-5"
                noValidate
                action={dispatch}
                ref={ref}
            >
                {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                        htmlFor="current_password"
                    >Contraseña Actual</label>
                    <input
                        id="current_password"
                        type="password"
                        placeholder="Contraseña actual"
                        className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                        name="current_password"
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                        htmlFor="password"
                    >Nueva contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Contraseña de registro"
                        className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                        name="password"
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <label
                        htmlFor="password_confirmation"
                        className="font-bold text-2xl"
                    >Repetir contraseña</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite contraseña de registro"
                        className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                        name="password_confirmation"
                    />
                </div>

                <input
                    type="submit"
                    value='Cambiar contraseña'
                    className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}