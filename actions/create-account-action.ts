"use server"

import { ErrorResponseSchema, RegisterSchema, SuccessSchema } from "@/src/schemas"
type ActionStateType = {
    errors: string[]
    success: { success: boolean; message: string } | null
}
export async function register(prevState : ActionStateType, formData : FormData) {
    const registerData = {
        email: formData.get('email'),
        name: formData.get('name'),
        lastName: formData.get('lastName'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation')
    }

    // Validate the data
    const register = RegisterSchema.safeParse(registerData)
    if (!register.success) {
        const errors = register.error.errors.map(error => error.message)
        return {
            errors,
            success: prevState.success
        }
    }
    // Register the user
    const url = `${process.env.API_URL}/auth/create-account`
    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: register.data.name,
            lastName: register.data.lastName,
            password: register.data.password,
            email: register.data.email,
        })
    })
    const json = await req.json()
    
    if (req.status === 409) {
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
            success: prevState.success
        }
    }
    return {
        errors: [],
        success: success.data 
    };
}