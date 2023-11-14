import { useState, useEffect, useRef } from "react"


export default function useForm(initialState = {}, formType = "register") {

    const [formState, setFormState] = useState(initialState)
    const [error, setError] = useState(null)
    const isFirstRun = useRef(true)

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false
            return
        }

        if (!formState.name && formType === "register") {
            setError("Name is required")
            return
        }

        if (!formState.email) {
            setError("Email is required")
            return
        }

        if (formState.password.length < 6) {
            setError("Password must be at least 6 characters")
            return
        }

        setError(null)

    }, [formState])


    const handleInputChange = ({ target }) => {

        if (target.name === "name" && target.value.trimStart() !== target.value) {
            return
        }

        setFormState({
            ...formState,
            [target.name]: target.value
        })
    }

    const handleReset = () => {
        setFormState(initialState)
    }

    return {
        formState,
        ...formState,
        handleInputChange,
        error,
        setError,
        handleReset
    }
}
