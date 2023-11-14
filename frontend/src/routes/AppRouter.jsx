import { Route, Routes, Navigate } from "react-router-dom";
import AuthRoutes from "../auth/routes/authRoutes";
import AdminRoutes from "../admin/routes/AdminRoutes";
import { useAuth } from "../context/AuthProvider";
import { LoadingAuth } from "../components";
import { HomePage } from "../home/pages";

export default function AppRouter() {

    const { check, loading } = useAuth()

    if (loading) return <LoadingAuth />

    return (
        <Routes>

            <Route
                path="/*"
                element={<HomePage />}
            />

            {
                check === "authenticated"
                    ? <Route path="/admin/*" element={<AdminRoutes />} />
                    : <Route path="/auth/*" element={<AuthRoutes />} />
            }

            {
                check === "authenticated"
                    ? <Route path="/*" element={<Navigate to={"/admin"} />} />
                    : <Route path="/*" element={<Navigate to={"/auth/login"} />} />
            }
        </Routes>
    )
}
