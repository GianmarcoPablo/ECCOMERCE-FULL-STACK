import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import axiosInstance from "../config/axiosConfig";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {


    const [initialState, setInitialState] = useState({
        check: "checking", // "checking" | "authenticated" | "not-authenticated"
        loading: true,
        error: null,
        data: null
    })


    useEffect(() => {
        const userAuthenticated = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                setInitialState({
                    check: "not-authenticated",
                    loading: false,
                    error: null,
                    data: null
                })
                return token
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            try {

                const { data } = await axiosInstance.get('/auth/profile', config)
                setInitialState({
                    ...initialState,
                    check: "authenticated",
                    loading: false,
                    data
                })
            } catch (error) {
                setInitialState({
                    ...initialState,
                    check: "not-authenticated",
                    loading: false,
                    error: error.response.data.msg
                })
            }
        }
        userAuthenticated()
    }, [])


    return (
        <AuthContext.Provider value={{
            loading: initialState.loading,
            error: initialState.error,
            data: initialState.data,
            check: initialState.check,
            setInitialState,
        }}>
            {children}
        </AuthContext.Provider>
    )
} 