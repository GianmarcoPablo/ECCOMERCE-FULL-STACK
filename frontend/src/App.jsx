import AppRouter from "./routes/AppRouter"
import { AuthProvider } from "./context/AuthProvider"

export default function App() {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    )
}
