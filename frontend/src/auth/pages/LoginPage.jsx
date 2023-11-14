import AuthLayout from "../layout/AuthLayout"
import { Link, useNavigate } from "react-router-dom"
import useForm from "../../hooks/useForm"
import axiosInstance from "../../config/axiosConfig"
import { Error } from "../../components"
import { useAuth } from "../../context/AuthProvider"
export default function LoginPage() {
    const { formState, error, handleInputChange, setError } = useForm({
        email: '',
        password: ''
    }, "login")


    const navigate = useNavigate()
    const { setInitialState } = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axiosInstance.post("/auth/login", formState)
            localStorage.setItem('token', data.token)
            setInitialState({
                check: "authenticated",
                loading: false,
                error: null,
                data
            })
            navigate('/admin')
        } catch (error) {
            setError(error.response.data.msg)
        }
    }


    return (
        <AuthLayout title="Login" >
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                <input
                    className='bg-neutral-800 px-3 py-2 rounded'
                    type="email"
                    placeholder="Email"
                    autoComplete="off"
                    name="email"
                    onChange={handleInputChange}
                    value={formState.email}
                />
                <input
                    className='bg-neutral-800 px-3 py-2 rounded'
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInputChange}
                    value={formState.password}
                />
                <button
                    disabled={formState.email === '' || formState.password === ''}
                    type="submit"
                    className={
                        `bg-orange-600 font-bold py-1 hover:bg-orange-500 transition-colors ${formState.email === '' || formState.password === '' ? 'disabled' : ''}`
                    }
                >
                    Login
                </button>
                {error && <Error error={error} />}
                <Link to="/auth/register" className='text-center text-neutral-100 hover:text-neutral-200 transition-colors'>Don't have an account? Register here.</Link>
            </form>
        </AuthLayout >
    )
}