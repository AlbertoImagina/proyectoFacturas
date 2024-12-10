import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterController } from "./shared/components/RouterController";
import { AuthContext } from "./shared/context/auth.context";

function App() {
  const queryClient = new QueryClient();

  

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{  
          user: {
            nombre: "",
            apellidos: "",
            telefono: "",
            email: "",
            password: "",
            id: "",
            createdAt: new Date()
          },
          auth: false,
          setUser: () => {},
          setAuth: () => {},
          logout: () => {}
        }}/>
        <BrowserRouter>
          <RouterController />
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
export default App;
