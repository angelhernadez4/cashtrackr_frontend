"use server"

import getToken from "@/src/auth/token";
import { DraftBudgetSchema, ErrorResponseSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath } from "next/cache";

type ActionStateType = {
    errors: string[]
    success: { success: boolean; message: string } | null
}
export async function createBudget(prevState: ActionStateType, formData: FormData) {
    const budget = DraftBudgetSchema.safeParse({
        name: formData.get('name'),
        amount: formData.get('amount')
    })
    if (!budget.success) {
        return {
            errors: budget.error.issues.map(issue => issue.message),
            success: null
        }
    }
    const token = getToken()
    const url = `${process.env.API_URL}/budgets`
    const req = await fetch(url, {
        method: 'POST',
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
    revalidatePath('/admin')
    const success = SuccessSchema.safeParse(json)
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