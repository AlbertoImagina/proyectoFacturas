import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../context/auth.context"
import { Box } from "@chakra-ui/react"

export const ProtectedRouter = () => {
    const { auth } = useAuthContext();

    return auth ? (
        <Box minH="100vh" bg="white">
            <Outlet/>
        </Box>
    ) : (
        <Navigate to={"/"} />
    )
}