import { useState } from "react";
import { useData } from "../shared/hooks/useData";
import { EndpointTypes } from "../types/Enums/Endpoints";
import { Flex } from "@chakra-ui/react";
import Tabla from "../shared/components/Tabla";
import Filter from "../shared/components/Filter";

export default function Facturas() {

  const [datosFiltrados, setDatosFiltrados] = useState([])
  
  const { data, loading, error, refreshData } = useData({
    endpoint: EndpointTypes.FACTURAS,
  });


  const filtrado = (param:boolean) => {
    if(param === true || param === false) {
      const pagado = data?.data.filter((item) => item.pagada === param)
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
      <Flex m="5vh">
        <Filter onChange={filtrado}/>
      </Flex>
      
      <Tabla lista={datosFiltrados.length ? datosFiltrados : data?.data} refreshData={refreshData}/>
    </>

  )
}
