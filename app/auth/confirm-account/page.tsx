import ConfirmAccountForm from "@/components/auth/ConfirmAccountForm"
import { Metadata } from "next"

export const metadata : Metadata = {
    title: "CashTrackr - Confirmar cuenta",
    description: "Confirma tu cuenta y controla tus finanzas"
}
function ConfirmAccountpage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950 dark:text-purple-600">Confirma tu cuenta</h1>
            <p className="text-3xl font-bold">ingresa el código que recibiste<span className="text-amber-500"> por correo electrónico</span></p>
            <ConfirmAccountForm />
        </>
    )
}

export default ConfirmAccountpage