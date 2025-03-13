"use client"

import { useState } from "react"
import ValidateTokenForm from "./ValidateTokenForm"
import ResetPasswordForm from "./ResetPasswordForm"

export default function PasswordResetHandler() {
    const [isValidToken, setIsValidToken] = useState<boolean>(false)
    const [token, setToken] = useState<string>('')

    return (
        <>
            {!isValidToken ? 
                <ValidateTokenForm
                    setIsValidToken={setIsValidToken}
                    token={token}
                    setToken={setToken}
                /> : 
                <ResetPasswordForm
                    token={token} 
                />
            }
        </>
    )
}
