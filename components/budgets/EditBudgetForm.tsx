"use client"
import { Budget } from "@/src/schemas";
import BudgetForm from "./BudgetForm";
import { useFormState } from "react-dom";
import { editBudget } from "@/actions/edit-budget-action";
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react"; 
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditBudgetForm({budget} : { budget : Budget }) {
    const router = useRouter()
    const editBudgetWithId = editBudget.bind(null, budget._id)
    const [state, dispatch] = useFormState(editBudgetWithId, {
        errors: [],
        success: null
    })
    useEffect(() => {
        if(state.success) {
            toast.success(state.success.message)
            router.push('/admin')
        }
    }, [state, router])
    return (
        <>
            <form
                className="mt-10 space-y-3"
                noValidate
                action={dispatch}
            >
                {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
                <BudgetForm 
                    budget={budget}
                />
                <input
                    type="submit"
                    className="bg-amber-500 w-full p-3 rounded-md text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors"
                    value='Guardar cambios'
                />
            </form>
        </>
    )
}
