"use server"

import { ErrorResponseSchema, SuccessSchema, TokenSchema } from "@/src/schemas";

type ActionStateType = {
    errors: string[],
    success: { success: boolean; message: string } | null
}
export async function confirmAccount(token : string, prevState: ActionStateType) {
    const confirmToken = TokenSchema.safeParse(token)
    if (!confirmToken.success) {
        return {
            errors: confirmToken.error.issues.map(issue => issue.message),
            success: null
        }
    }
    const url = `${process.env.API_URL}/auth/confirm-account`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token : confirmToken.data
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