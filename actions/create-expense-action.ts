"use server"

import getToken from '@/src/auth/token';
import { Budget, DraftExpenseSchema, ErrorResponseSchema, SuccessSchema } from '@/src/schemas';
import { revalidatePath } from 'next/cache';

type ActionStateType = {
    errors: string[],
    success: { success: boolean; message: string } | null
}

export async function createExpense(budgetId: Budget['_id'], prevState: ActionStateType, formData: FormData) {
    const expense = DraftExpenseSchema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    })

    if (!expense.success) {
        return {
            errors: expense.error.issues.map(issue => issue.message),
            success: null
        }
    }

    // Generar gasto
    const token = getToken()
    const url = `${process.env.API_URL}/budgets/${budgetId}/expenses`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: expense.data.name,
            amount: expense.data.amount
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
