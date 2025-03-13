"use server"

import { ErrorResponseSchema, ResetPasswordSchema, SuccessSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string[],
    success: { success: boolean; message: string } | null
}
export async function resetPassword(token: string, prevState: ActionStateType, formData: FormData) {
    const resetPasswordInput = {
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }
    const resetPassword = ResetPasswordSchema.safeParse(resetPasswordInput)
    if (!resetPassword.success) {
        return {
            errors: resetPassword.error.issues.map(issue => issue.message),
            success: null
        }
    }
    const url = `${process.env.API_URL}/auth/reset-password/${token}`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            password: resetPassword.data.password,
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
    return {
        errors: [],
        success: success.data 
    }
}