import "server-only"
import { redirect } from "next/navigation"
import { UserAPIResponseSchema } from "../schemas"
import { cache } from "react"
import getToken from "./token"

export const verifySession = cache( async () => {
    const token = getToken()
    if (!token) {
        redirect('/auth/login')
    }

    const url = `${process.env.API_URL}/auth/user`
    const req = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    const session = await req.json()
    const result = UserAPIResponseSchema.safeParse(session)  
      
    if (!result.success) {
        redirect('/auth/login')
    }
    return {
        user: result.data.user,
        isAuth: true
    }
})