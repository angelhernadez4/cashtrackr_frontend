"use server"

import getToken from "@/src/auth/token";
import { Budget, DraftBudgetSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath, revalidateTag } from "next/cache";

type ActionStateType = {
    errors: string[],
    success: { success: boolean; message: string } | null
}
export async function editBudget(budgetId: Budget['_id'], prevState: ActionStateType, formData: FormData) {
    const budgetData = {
        name: formData.get('name'),
        amount: formData.get('amount')
    }
    const budget = DraftBudgetSchema.safeParse(budgetData)
    if (!budget.success) {
        return {
            errors: budget.error.issues.map(issue => issue.message),
            success: null
        }
    }

    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}`
    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: budget.data.name,
            amount: budget.data.amount
        })
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
    revalidatePath('/admin') // Revalidar toda la url con todas las peticiones que hay
    // revalidateTag('/all-budgets') // Unicamente ciertas peticiones
    if (!success.success) {
        return {
            errors: ['La respuesta del servidor no es válida.'],
            success: null
        }
    }
    return {
        errors: [],
        success: success.data
    }
}