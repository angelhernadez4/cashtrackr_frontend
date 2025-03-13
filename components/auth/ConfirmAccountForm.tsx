"use client"
import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { confirmAccount } from "@/actions/confirm-account-action"
import { PinInput, PinInputField } from "@chakra-ui/pin-input"
import { toast } from "react-toastify"

function ConfirmAccountForm() {
    const router = useRouter()
    const [isComplete, setIsComplete] = useState<boolean>(false)
    const [token, setToken] = useState<string>("")
    const confirmAccountWithToken = confirmAccount.bind(null, token)
    const [state, dispatch] = useFormState(confirmAccountWithToken, {
        errors: [],
        success: null
    })
    useEffect(() => {
        if (isComplete) {
            dispatch()
        }
    }, [isComplete, dispatch])

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => {
                toast.error(error)
            })
        }
        if (state.success) {
            toast.success(state.success.message)
            router.push('/auth/login')
        }
    }, [state, router])

    const handleChange = (value: string) => {
        setIsComplete(false)
        setToken(value)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }
    return (
        <>
            <div className='flex justify-center gap-5 my-10'>
                <PinInput
                    value={token}
                    onChange={handleChange}
                    onComplete={handleComplete}
                >
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white dark:placeholder-gray-700 dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white dark:placeholder-gray-700 dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white dark:placeholder-gray-700 dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white dark:placeholder-gray-700 dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white dark:placeholder-gray-700 dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                    <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white dark:placeholder-gray-700 dark:border-gray-700 dark:text-slate-100 dark:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                </PinInput>
            </div>
        </>
    )
}

export default ConfirmAccountForm