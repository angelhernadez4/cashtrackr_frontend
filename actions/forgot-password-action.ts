"use server"

import { ErrorResponseSchema, ForgotPasswordSchema, SuccessSchema } from "@/src/schemas"

type ActionStateType = {
    errors: string[]
    success: { success: boolean; message: string } | null
}
export async function forgotPasword(prevState : ActionStateType, formData : FormData) {
    const forgotPassword = ForgotPasswordSchema.safeParse({
        email: formData.get('email')
    })

    if (!forgotPassword.success) {
        return {
            errors: forgotPassword.error.errors.map(error => error.message),
            success: null
        }
    }

    const url = `${process.env.API_URL}/auth/forgot-password`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email : forgotPassword.data.email
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