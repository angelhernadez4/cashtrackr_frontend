import { validateToken } from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
type ValidateTokenFormProps = {
    setIsValidToken: Dispatch<SetStateAction<boolean>>
    token: string
    setToken: Dispatch<SetStateAction<string>>
}
export default function ValidateTokenForm({setIsValidToken, token, setToken} : ValidateTokenFormProps) {
    const [isComplete, setIsComplete] = useState<boolean>(false)
    const validateTokenInput = validateToken.bind(null, token)
    const [state, dispatch] = useFormState(validateTokenInput, {
        errors: [],
        success: null
    })

    useEffect(() => {
        if(isComplete) {
            dispatch()
        }
    }, [isComplete, dispatch])

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach(error => toast.error(error))
        }
        if (state.success) {
            toast.success(state.success.message)
            setIsValidToken(true)
        }
    }, [state, setIsValidToken])

    const handleChange = (token: string) => {
        setToken(token)
        setIsComplete(false)
    }

    const handleComplete = () => {
        setIsComplete(true)
    }

    return (
        <div className="flex justify-center gap-5 my-10">
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
    )
}