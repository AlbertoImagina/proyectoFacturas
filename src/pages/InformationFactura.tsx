import { Button, Flex, Text } from "@chakra-ui/react"
import { Factura } from "../types/Facturas"
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";


function InformationFactura({ item } : { item:Factura }) {

  return (
    <>
    <Button colorScheme="teal">
        <Link to="/facturas">
            <Flex alignItems="center" gap="10px">
            <FaArrowLeft />
            Atrás
            </Flex>       
        </Link>
    </Button>
    <Flex m="10px" justify="center">
        <Flex direction="row">
            <Flex direction="column" m="10px">
                <Text fontWeight="bold">Factura nº</Text>
                <Text>{item.numero}</Text>
            </Flex>
            <Flex direction="column" m="10px">
                <Text fontWeight="bold">Nombre de factura</Text>
                <Text>{item.cliente}</Text>
            </Flex>
        </Flex>
    </Flex>
    <Flex m="20px" justify="center">
            <Flex direction="column" m="10px">
                <Text fontWeight="bold">Fecha de creación</Text>
                <Text>{new Date(item.createdAt).toLocaleDateString()}</Text>
            </Flex>
            <Flex direction="column" m="10px">
                <Text fontWeight="bold">Fecha de pago</Text>
                <Text>{item.pagada ? `${new Date(item.fechaPago).toLocaleDateString()}` : "No pagada aún"}</Text>
            </Flex>
    </Flex>
    <Flex m="20px" justify="center">
            <Flex direction="column" m="10px">
                <Text>{item.pagada ? "PAGADA" : "PENDIENTE"}</Text>
            </Flex>

    </Flex>


    </>
  )
}

export default InformationFactura
