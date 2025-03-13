import { GetExpenseById } from "@/src/schemas"

type ExpenseFormProps = {
    expense?: GetExpenseById
}

export default function ExpenseForm({ expense } : ExpenseFormProps ) {
    return (
        <>
            <div className="mb-5">
                <label htmlFor="name" className="text-sm uppercase font-bold dark:text-slate-300">
                    Nombre Gasto
                </label>
                <input
                    id="name"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    type="text"
                    placeholder="Nombre del gasto"
                    name="name"
                    defaultValue={expense?.expense.name || ''}
                />
            </div>

            <div className="mb-5">
                <label htmlFor="amount" className="text-sm uppercase font-bold dark:text-slate-300">
                    Cantidad Gasto
                </label>
                <input
                    id="amount"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    type="number"
                    placeholder="Cantidad gasto"
                    name="amount"
                    defaultValue={expense?.expense.amount || ''}
                />
            </div>
        </>
    )
}