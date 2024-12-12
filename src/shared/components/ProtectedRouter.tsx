import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../context/auth.context"
/* import Facturas from "../../pages/Facturas"; */

export const ProtectedRouter = () => {
    const { auth } = useAuthContext();

    return (
        auth
            ? <Outlet/>
            : <Navigate to={"/"} />
    )
}