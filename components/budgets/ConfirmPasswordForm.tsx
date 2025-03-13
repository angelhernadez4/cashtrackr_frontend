import { DialogTitle } from "@headlessui/react";
import ErrorMessage from "../ui/ErrorMessage";
import { useFormState } from "react-dom";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { deleteBudget } from "@/actions/delete-budget-action";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ConfirmPasswordForm() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const budgetId = searchParams.get('deleteBudgetId')!

    const closeModal = () => {
        const hideModal = new URLSearchParams(searchParams.toString())
        hideModal.delete('deleteBudgetId')
        router.replace(`${pathname}?${hideModal}`)
    }

    const deleteBudgetWithPassword = deleteBudget.bind(null, budgetId)
    const [state, dispatch] = useFormState(deleteBudgetWithPassword, {
        errors: [],
        success: null
    })
    useEffect(() => {
        if (state.success) {
            toast.success(state.success.message)
            router.push('/admin')
        }
    }, [state, router])
    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 dark:text-purple-600 my-5"
            >
                Eliminar presupuesto
            </DialogTitle>
            <p className="text-xl font-bold dark:text-slate-300">Ingresa tu contraseña para {''}
                <span className="text-amber-500">eliminar el presupuesto {''}</span>
            </p>
            <p className='text-gray-400 text-sm'>(Un presupuesto eliminado y sus gastos no se pueden recuperar)</p>
            
            {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
            <form
                className=" mt-5 space-y-5"
                noValidate
                action={dispatch}
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-bold text-2xl dark:text-slate-300"
                        htmlFor="password"
                    >Ingresa tu contraseña para eliminar</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                        name='password'
                    />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <input
                        type="submit"
                        value='Eliminar presupuesto'
                        className="bg-purple-950 hover:bg-purple-800 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
                    />
                    <button
                        className="bg-amber-500 hover:bg-amber-600 w-full p-3 rounded-lg text-white font-black cursor-pointer transition-colors"
                        onClick={closeModal}
                    >Cancelar</button>
                </div>
            </form>

        </>
    )

}