import React, { Dispatch, SetStateAction, useContext } from "react";
import { UserInt } from "../../interfaces/UserInt";
import { NavigateFunction } from "react-router-dom";

interface UserContext {
    user: UserInt;
    auth: boolean;
    setUser: Dispatch<SetStateAction<UserInt>>;
    setAuth: Dispatch<SetStateAction<boolean>>;
    logout: (navigate: NavigateFunction) => void;
}

export const AuthContext = React.createContext<UserContext>({
    user: {
        nombre: null,
        apellidos: null,
        telefono: null,
        email: null,
        password: null,
        id: null,
        createdAt: null,
    },
    auth: false,
    setUser: (user) => { },
    setAuth: (auth) => { },
    logout: (navigate) => { }
})

export const useAuthContext = () => {
    return useContext(AuthContext);
}