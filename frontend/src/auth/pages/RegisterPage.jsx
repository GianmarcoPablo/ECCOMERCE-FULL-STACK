import AuthLayout from "../layout/AuthLayout"
import { Link } from "react-router-dom"
import useForm from "../../hooks/useForm"
import axiosInstance from "../../config/axiosConfig"
import { useState } from "react"
import { Error, Success } from "../../components"

export default function RegisterPage() {

    const { formState, handleInputChange, handleReset, error, setError } = useForm({
        name: '',
        email: '',
        password: ''
    }, "register")
    const [loginMessage, setLoginMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axiosInstance.post("/users", formState)
            setLoginMessage('Account created successfully. Please login.')
            handleReset()
        } catch (error) {
            setError(error.response.data.errors[0].msg)
        }

        setTimeout(() => {
            setLoginMessage('')
        }, 5000)
    }


    return (
        <AuthLayout title="Register">
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <input
                    className='bg-neutral-800 px-3 py-2 rounded'
                    type="text"
                    placeholder="Username"
                    autoComplete="off"
                    name="name"
                    onChange={handleInputChange}
                    value={formState.name}
                />
                <input
                    className='bg-neutral-800 px-3 py-2 rounded'
                    type="email"
                    autoComplete="off"
                    name="email"
                    placeholder="Email"
                    onChange={handleInputChange}
                    value={formState.email}
                />
                <input
                    className='bg-neutral-800 px-3 py-2 rounded'
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    value={formState.password}
                />
                <button
                    disabled={formState.name === '' || formState.email === '' || formState.password === ''}
                    type="submit"
                    className={`bg-orange-600 font-bold py-1 hover:bg-orange-500 transition-colors 
               ${formState.name === '' || formState.email === '' || formState.password === '' ? 'disabled' : ''}`}
                >
                    Register
                </button>
                {!loginMessage && <Error error={error} />}
                {loginMessage && <Success loginMessage={loginMessage} />}

                <Link to="/auth/login" className='mt-2 text-center text-neutral-100 hover:text-neutral-200 transition-colors'>Already have an account? Login here.</Link>
            </form>
        </AuthLayout>
    )
}
