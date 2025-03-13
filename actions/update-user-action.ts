"use server"
import getToken from "@/src/auth/token";
import { ErrorResponseSchema, ProfileFormSchema, SuccessSchema } from "@/src/schemas"
import { revalidatePath } from "next/cache";

type ActionStateType = {
    errors: string[],
    success: { success: boolean; message: string } | null
}
export async function updateUser(prevState: ActionStateType, formData: FormData) {
    const profile = ProfileFormSchema.safeParse({
        name: formData.get('name'),
        lastName: formData.get('lastName'),
        email: formData.get('email')
    })
    if (!profile.success) {
        return {
            errors: profile.error.issues.map(issue => issue.message),
            success: null
        }
    }

    const token = getToken()
    const url = `${process.env.API_URL}/auth/user`
    const req = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: profile.data.name,
            lastName: profile.data.lastName,
            email: profile.data.email
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
    revalidatePath('/admin/profile/settings')
    return {
        errors: [],
        success: success.data
    }
}