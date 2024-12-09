import { Route, Routes } from "react-router-dom";
import Facturas from "../../pages/Facturas";
import AddFacturas from "../../pages/AddFacturas";
import Editar from "../../pages/Editar";
import Show from "../../pages/Show";
import Login from "../../pages/Login";
import Register from "../../pages/Register";

import { useAuthContext } from "../context/auth.context";


export const RouterController = () => {
  const { auth } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/facturas" element={ auth? <Login/> : <Facturas/> } />
      <Route path="addFacturas" element={ auth? <Login/> : <AddFacturas/> } />
      <Route path="editar/:token" element={ auth? <Login/> : <Editar/> } />
      <Route path="show/:idToken" element={ auth? <Login/> : <Show/> } />
    </Routes>
  );
};
