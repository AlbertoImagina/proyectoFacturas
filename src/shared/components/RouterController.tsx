import { Route, Routes} from "react-router-dom";
import Facturas from "../../pages/Facturas";
import Add from "../../pages/Add";
import Editar from "../../pages/Editar";
import Show from "../../pages/Show";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { ProtectedRouter } from "./ProtectedRouter";

/* import { useAuthContext } from "../context/auth.context"; */


export const RouterController = () => {
/*   const { auth } = useAuthContext(); */

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route element={<ProtectedRouter />}>
        <Route path="/facturas" element={<Facturas/> } />
        <Route path="addFacturas" element={ <Add/> } />
        <Route path="editar/:token" element={ <Editar/> } />
        <Route path="show/:idToken" element={ <Show/> } />
      </Route>

    </Routes>
  );
};
