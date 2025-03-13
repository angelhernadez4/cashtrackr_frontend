"use server"
import getToken from "@/src/auth/token";
import { Budget, ErrorResponseSchema, PasswordValidationSchema, SuccessSchema } from "@/src/schemas";
import { revalidatePath, revalidateTag } from "next/cache";

type ActionStateType = {
    errors: string[]
    success: { success: boolean; message: string } | null
}
export async function deleteBudget(budgetId: Budget['_id'], prevState: ActionStateType, formData: FormData) {
    const currentPassword = PasswordValidationSchema.safeParse(formData.get('password'))
    if (!currentPassword.success) {
        return {
            errors: currentPassword.error.issues.map(issue => issue.message),
            success: null
        }
    }

    // Comprobar password
    const token = getToken()
    const checkPasswordUrl = `${process.env.API_URL}/auth/check-password`
    const checkPasswordReq = await fetch(checkPasswordUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: currentPassword.data
        })
    })

    const checkPasswordJson = await checkPasswordReq.json()

    if (!checkPasswordReq.ok) {
        const error = ErrorResponseSchema.parse(checkPasswordJson)
        return {
            errors: [error.message],
            success: null
        }
    }

    // Eliminar el presupuesto
    const deleteBudgetUrl = `${process.env.API_URL}/budgets/${budgetId}`
    const deleteBudgetReq = await fetch(deleteBudgetUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        },
    })

    const deleteBudgetJson = await deleteBudgetReq.json()

    if (!deleteBudgetReq.ok) {
        const error = ErrorResponseSchema.parse(deleteBudgetJson)
        return {
            errors: [error.message],
            success: null
        }
    }
    const success = SuccessSchema.safeParse(deleteBudgetJson)
    revalidateTag('/all-budgets')
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