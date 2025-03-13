"use server"

import getToken from "@/src/auth/token"
import { Budget, ErrorResponseSchema, Expense, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache"

type BudgetAndExpenseIType = {
    budgetId: Budget['_id'],
    expenseId: Expense['_id']
}
type ActionStateType = {
    errors: string[]
    success: { success: boolean; message: string } | null
}

export async function deleteExpense({ budgetId, expenseId }: BudgetAndExpenseIType, prevState: ActionStateType) {
    const token = getToken()

    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`

    const req = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })
    const json = await req.json()

    if (!req.ok) {
        const error = ErrorResponseSchema.parse(json)
        return {
            errors: [error.message],
            success: null
        }
    }

    const success = SuccessSchema.safeParse(json)
    if (!success.success) {
        return {
            errors: ['La respuesta del servidor no es válida.'],
            success: null
        }
    }
    revalidatePath(`/admin/budgets/${budgetId}`)
    return {
        errors: [],
        success: success.data
    }
}