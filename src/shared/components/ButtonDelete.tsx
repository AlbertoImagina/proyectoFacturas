import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { deleteData } from "../middlewares/getData";
import { Factura } from "../../types/Facturas";




interface Button {
    idToken:string,
    item:Factura
}

function ButtonDelete({ idToken, item } : Button) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const toast = useToast()
    

    const handleClick = () => {
    deleteData(idToken)
    .then(() => {
        toast({
            title: "Factura borrada con éxito",
            colorScheme: "success",
        });

    })
    .catch((e) => {
        toast({
            title: `No se ha podido borrar la factura: ${e}`,
            colorScheme: "error",
        });
    });
    };

    return (
    <>
    <Button colorScheme="red" onClick={onOpen}>
        <MdDelete />
    </Button>

    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
    >
        <AlertDialogOverlay>
            <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Borrar factura {item.numero}
            </AlertDialogHeader>

            <AlertDialogBody>
                Estás seguro que quieres borrar la factura de <b>{ item.cliente }</b> ?
            </AlertDialogBody>

            <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>No</Button>
                <Button colorScheme="red" onClick={handleClick} ml={3}>Si</Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
        </AlertDialog>
    </>
);
}

export default ButtonDelete;
