import LoginForm from '@/components/auth/LoginForm'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata : Metadata = {
    title: "CashTrackr - Iniciar sesión",
    description: "Inicia sesión y controla tus finanzas"
}

function LoginPage() {
    return (
        <>
            <h1 className="font-black text-6xl text-purple-950 dark:text-purple-600">Iniciar sesión</h1>
            <p className="text-3xl font-bold">y controla tus<span className="text-amber-500"> finanzas</span></p>
            <LoginForm />
            <nav className="mt-10 flex flex-col space-y-4">
                <Link href='/auth/register' className="text-center text-gray-500 dark:text-slate-300">¿No tienes cuenta? Crea una</Link>
                <Link href='/auth/forgot-password' className="text-center text-gray-500 dark:text-slate-300">¿Olvidaste tu contraseña? Reestablecer</Link>
            </nav>
        </>
    )
}

export default LoginPage