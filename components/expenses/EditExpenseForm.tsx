import { DialogTitle } from "@headlessui/react";
import ExpenseForm from "./ExpenseForm";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GetExpenseById } from "@/src/schemas";
import { useFormState } from "react-dom";
import { editExpense } from "@/actions/edit-expense-action";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";

export default function EditExpenseForm({ closeModal }: { closeModal: () => void }) {
    const [expense, setExpense] = useState<GetExpenseById>()
    const { id: budgetId } = useParams()
    const searchParams = useSearchParams()
    const expenseId = searchParams.get('editExpenseId')!
    const editExpenseWithBudgetId = editExpense.bind(null, {
        budgetId: String(budgetId),
        expenseId
    })
    const [state, dispacth] = useFormState(editExpenseWithBudgetId, {
        errors: [],
        success: null
    })
    useEffect(() => {
        const url = `${process.env.NEXT_PUBLIC_URL}/admin/api/budgets/${budgetId}/expenses/${expenseId}`
        fetch(url)
            .then(res => res.json())
            .then(data => setExpense(data)
            )
    }, [budgetId, expenseId])

    useEffect(() => {
        if (state.success) {
            toast.success(state.success.message)
            closeModal()
        }
    }, [state, closeModal])
    return (
        <>
            <DialogTitle
                as="h3"
                className="font-black text-4xl text-purple-950 dark:text-purple-600 my-5"
            >
                Editar Gasto
            </DialogTitle>
            <p className="text-xl font-bold">Edita los detalles de un {''} 
                <span className="text-amber-500">gasto</span>
            </p>
            <form
                className="bg-gray-100 dark:bg-slate-950 dark:border-none shadow-lg rounded-lg p-10 mt-10 border"
                noValidate
                action={dispacth}
            >
                {state.errors.map(error => <ErrorMessage key={error}>{error}</ErrorMessage>)}
                <ExpenseForm expense={expense} />

                <input
                    type="submit"
                    className="bg-amber-500 w-full p-3 text-white uppercase font-bold hover:bg-amber-600 cursor-pointer transition-colors rounded-md"
                    value='Guardar Cambios'
                />
            </form>
        </>
    )
}