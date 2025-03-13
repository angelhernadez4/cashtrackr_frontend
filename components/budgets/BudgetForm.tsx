import { Budget } from "@/src/schemas";

export default function BudgetForm({ budget } : { budget? : Budget }) {
    return (
        <>
            <div className="space-y-3">
                <label htmlFor="name" className="text-sm uppercase font-bold">
                    Nombre presupuesto
                </label>
                <input
                    id="name"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    type="text"
                    placeholder="Nombre del presupuesto"
                    name="name"
                    defaultValue={budget?.name}
                />
            </div>
            <div className="space-y-3">
                <label htmlFor="amount" className="text-sm uppercase font-bold">
                    Cantidad Presupuesto
                </label>
                <input
                    type="number"
                    id="amount"
                    className="w-full border border-gray-300 dark:border-none p-3 rounded-lg dark:bg-slate-800 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500"
                    placeholder="Cantidad presupuesto"
                    name="amount"
                    defaultValue={budget?.amount}
                />
            </div>
        </>
    )
}
