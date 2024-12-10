import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Flex,
} from "@chakra-ui/react";

import { FaCheckCircle, FaEye } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { HiPencil } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Factura } from "../../types/Facturas";
import ButtonDelete from "./ButtonDelete";




function Tabla({ lista, refreshData }: IProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("auth")
    navigate("/");
  };

  return (
    <>
    <Flex my="30px" justify="center" gap={4}>
        <Button variant="solid" colorScheme="teal">
          <Link to="/addFacturas">Agregar Factura</Link>
        </Button>
        <Button variant="solid" colorScheme="red" onClick={handleLogout} alignContent="end">
          Cerrar Sesión
        </Button>
    </Flex>

    <TableContainer>
        <Table variant="simple">
          <TableCaption></TableCaption>
          <Thead>
            <Tr>
              <Th textAlign="center">Nº Cliente</Th>
              <Th textAlign="center">Nombre de cliente</Th>
              <Th textAlign="center">Pagada</Th>
              <Th textAlign="center">Fecha de pago</Th>
            </Tr>
          </Thead>
          <Tbody>
            {lista?.map((item) => (
              <Tr key={item.id}>
                <Td textAlign="center">{item.numero}</Td>
                <Td textAlign="center">{item.cliente}</Td>
                <Td justifyItems="center">{item.pagada ? <FaCheckCircle color="green"/> : <VscError color="red"/>}</Td>
                <Td textAlign="center">{new Date(item.fechaPago).toLocaleDateString()}</Td>
                <Td textAlign="center">
                  <Button>
                    <Link to={`/editar/${item.id}`}>
                      <HiPencil />
                    </Link>
                  </Button>
                </Td>
                <Td textAlign="center">
                  <Button>
                    <Link to={`/show/${item.id}`}>
                      <FaEye />
                    </Link>
                  </Button>
                </Td>
                <Td textAlign="center">
                    <ButtonDelete idToken= {item.id} item={item} refreshData={refreshData}/>
                </Td>
              </Tr>
              
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Listado de facturas</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
}

type IProps = { lista: Factura[]; refreshData: () => void };
export default Tabla;
