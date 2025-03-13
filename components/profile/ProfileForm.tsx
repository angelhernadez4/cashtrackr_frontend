"use client"
import { updateUser } from "@/actions/update-user-action"
import { User } from "@/src/schemas"
import { useFormState } from "react-dom"
import ErrorMessage from "../ui/ErrorMessage"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function ProfileForm({user} : { user : User }) {
    const { name, lastName, email } = user
    const [state, dispatch] = useFormState(updateUser, {
        errors: [],
        success: null
    })

    useEffect(() => {
        if (state.success) {
            toast.success(state.success.message)
        }
    }, [state])
    return (
        <>
            <form
                className=" mt-14 space-y-5"
                noValidate
                action={dispatch}
            >
                {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                        htmlFor="name"
                    >Nombre</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Tu Nombre"
                        className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                        name="name"
                        defaultValue={name}
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                        htmlFor="lastName"
                    >Apellido</label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Tu apellido"
                        className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                        name="lastName"
                        defaultValue={lastName}
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl"
                        htmlFor="email"
                    >Correo electrónico</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Tu correo electrónico"
                        className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                        name="email"
                        defaultValue={email}
                    />
                </div>

                <input
                    type="submit"
                    value='Guardar cambios'
                    className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
                />
            </form>
        </>
    )
}