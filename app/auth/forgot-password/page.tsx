import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata : Metadata = {
    title: "CashTrackr - Olvidé mi contraseña",
    description: "Recupera tu contraseña y controla tus finanzas"
}

function ForgotPasswordPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950 dark:text-purple-600">¿Olvidaste tu contraseña?</h1>
            <p className="text-3xl font-bold">aquí puedes<span className="text-amber-500"> reestablecerla</span></p>
            <ForgotPasswordForm />
            <nav className="mt-10 flex flex-col space-y-4">
                <Link href='/auth/login' className="text-center text-gray-500 dark:text-slate-300">¿Ya tienes cuenta? Iniciar sesión</Link>
                <Link href='/auth/register' className="text-center text-gray-500 dark:text-slate-300">¿No tienes cuenta? Crea una</Link>
            </nav>
        </>
    )
}

export default ForgotPasswordPage