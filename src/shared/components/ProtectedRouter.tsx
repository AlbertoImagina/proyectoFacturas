import { Navigate } from "react-router-dom"
import { useAuthContext } from "../context/auth.context"
import Facturas from "../../pages/Facturas";

export const ProtectedRouter = () => {
    const { auth } = useAuthContext();

    return (
        auth
            ? <Facturas/>
            : <Navigate to={"/"} />
    )
}