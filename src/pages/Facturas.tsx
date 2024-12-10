import { useState } from "react";
import { useData } from "../shared/hooks/useData";
import { EndpointTypes } from "../types/Enums/Endpoints";
import { Flex, Button } from "@chakra-ui/react";
import Tabla from "../shared/components/Tabla";
import Filter from "../shared/components/Filter";
import { Factura } from "../types/Facturas";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../shared/context/auth.context";
import { TbLogout2 } from "react-icons/tb";


export default function Facturas() {

  const { logout } = useAuthContext()
  const navigate = useNavigate()

  const [datosFiltrados, setDatosFiltrados] = useState([])
  
  const { data, loading, error, refreshData } = useData({
    endpoint: EndpointTypes.FACTURAS,
  });


  const filtrado = (param:boolean) => {
    if(param === true || param === false) {
      const pagado = data?.data.filter((item:Factura) => item.pagada === param)
      setDatosFiltrados(pagado)
    } else {
      setDatosFiltrados([])  
    }

  }


  if (loading) {
    return <h1>Cargando datos...</h1>;
  }

  if (error) {
    return <h1>Ocurrió un error al cargar los datos</h1>;
  }

  return (
    <>
      <Flex m="5vh" direction="row" align="center">
        <Filter onChange={filtrado}/>
        
        <Flex my="30px" justify="center" gap={4}>
            <Button variant="solid" colorScheme="teal">
              <Link to="/addFacturas">Agregar Factura</Link>
            </Button>

          <Button variant="solid" colorScheme="red" onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();

                            logout(navigate)}}>
              <Flex direction="row" align="center" gap="10px">
                <TbLogout2 />
                Cerrar sesión
              </Flex>
            </Button>
        </Flex>

      </Flex>
      
      <Tabla lista={datosFiltrados.length ? datosFiltrados : data?.data} refreshData={refreshData}/>
    </>

  )
}
