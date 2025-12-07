
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {

    const islogged = localStorage.getItem("token");

    if (!islogged) {
        return <Navigate to="/authentication" replace />
    }

    return <Outlet />;
}