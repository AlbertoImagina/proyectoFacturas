import "./App.css";
import { BrowserRouter, NavigateFunction } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterController } from "./shared/components/RouterController";
import { AuthContext } from "./shared/context/auth.context";
import { useState } from "react";
import { UserInt } from "./interfaces/UserInt";

function App() {

  const queryClient = new QueryClient()

  const userPerfil: UserInt = JSON.parse(localStorage.getItem("user") || "{}")

  const [user, setUser] = useState<UserInt>({
    nombre: userPerfil?.nombre || "",
    apellidos: userPerfil?.apellidos || "",
    email: userPerfil?.email || "",
    createdAt: userPerfil?.createdAt || new Date(),
    id: userPerfil?.id || "",
    telefono: userPerfil?.telefono || "",
    password: ""
  })
  const [auth, setAuth] = useState<boolean>(localStorage?.getItem("auth") === "true" ? true : false)



  const logout = (navigate: NavigateFunction) => {
    localStorage.removeItem("user")
    localStorage.removeItem("auth")

    setUser({
      nombre: null,
      apellidos: null,
      email: null,
      createdAt: null,
      id: null,
      telefono: null,
      password: null
    })

    setAuth(false)

    navigate("/")
  }
  

  return (
    <ChakraProvider>
      <AuthContext.Provider value={{ user, setUser, auth, setAuth, logout }}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            < RouterController />
          </BrowserRouter>
        </QueryClientProvider>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}
export default App;
