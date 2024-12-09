import { UserInt } from "../../interfaces/UserInt"
import axios from "axios"
import { EndpointTypes } from "../../types/Enums/Endpoints"

const _axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const userLogin = async ({ email, password }) => {
    const { data } = await _axios.get(EndpointTypes.USERS)

    const userFind = data?.find((user: UserInt) => user?.email === email)

    if (!userFind) return { auth: false, error: "Usuario no encontrado" }
    if (userFind?.password !== password) return { auth: false, error: "Su email o contraseña son incorrectos" }

    delete userFind.password

    return {
        user: userFind,
        auth: true
    }
}

export const userRegister = async (data: Partial<UserInt>) => {
    return _axios.post(EndpointTypes.USERS, data)
        .then((response) => response)
}