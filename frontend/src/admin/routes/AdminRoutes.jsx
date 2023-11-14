import { Routes, Route, Navigate } from "react-router-dom";
import { AdminPage } from "../pages";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AdminPage />} />
            <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
    )
}
