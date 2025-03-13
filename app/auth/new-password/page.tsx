import PasswordResetHandler from "@/components/auth/PasswordResetHandler"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "CashTrackr - Nueva contraseña",
    description: "Cambia tu contraseña y controla tus finanzas"
}
export default function NewPasswordPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950 dark:text-purple-600">Reestablecer contraseña</h1>
            <p className="text-3xl font-bold">Ingresa el código que recibiste
                <span className="text-amber-500"> por correo electrónico</span>
            </p>
            <PasswordResetHandler />
        </>
    )
}
