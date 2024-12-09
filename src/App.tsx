import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterController } from "./shared/components/RouterController";

function App() {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RouterController />
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
export default App;
