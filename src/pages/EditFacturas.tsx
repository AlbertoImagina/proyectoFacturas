import { Flex,Text,Input, Checkbox, Button, FormLabel, useToast } from "@chakra-ui/react"
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updateData } from "../shared/middlewares/getData";
import { Factura } from "../types/Facturas";


interface Edit {
    item:Factura,
    refreshData: () => void
}


function EditFacturas({ item, refreshData } : Edit) {
    const formularioSchema = Yup.object({
        createdAt: Yup.date().required("Fecha requerida"),
        numero: Yup.number().required("Número de factura requerida").positive().integer(),
        cliente: Yup.string().required("Nombre de cliente requerido"),
        fechaPago: Yup.date().required("Fecha de pago requerida"),
        pagada: Yup.boolean().optional(),
    });
    
    const toast = useToast()
    const navigate = useNavigate()

    const initualValues = {
        id: item.id,
        createdAt: item.createdAt,
        numero: item.numero,
        cliente: item.cliente,
        fechaPago: item.fechaPago,
        pagada: false,
    }
    
        const mutation = useMutation({
            mutationFn: updateData
            })
    
    
        return (
            <div>
                <Flex>
                    <Link to="/facturas">
                        <Button
                        colorScheme='teal'
    
                        >Atrás</Button>
                    </Link>
                    <Text
                    my="50px"
                    >
                        <h1>Modificar factura</h1>
                    </Text>
                </Flex>
    
    
        <Formik
            initialValues={initualValues}
            validationSchema={formularioSchema}
            onSubmit={(values) => {
                const dataValues = { ...values}
                mutation.mutate(dataValues)
                toast({
                    title: "Modificada correctamente",
                    colorScheme:"green"
                })
                refreshData()
                navigate('/facturas')
        }}
        >
        {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors
        }) => (
            <form onSubmit={handleSubmit}>
                <Flex
                display="flex"
                direction="column"
                shadow="lg"
                p="20px"
                >
    
                <FormLabel>ID</FormLabel>
                <Input
                    type="string"
                    name="id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.id}
                    disabled
            />

                <FormLabel>Fecha creación</FormLabel>
                <Input
                    type="date"
                    name="createdAt"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.createdAt}
            />
                    <Text fontSize="xs" color="red" align="left">{errors.createdAt}</Text>
                <FormLabel>Numero de cliente</FormLabel>
                <Input
                    type="number"
                    name="numero"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.numero}
            />
                    <Text fontSize="xs" color="red" align="left">{errors.numero}</Text>
                <FormLabel>Nombre de cliente</FormLabel>
                <Input
                    type="string"
                    name="cliente"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cliente}
            />
                    <Text fontSize="xs" color="red" align="left">{errors.cliente}</Text>
                <FormLabel>Fecha de pago</FormLabel>
                <Input
                    type="date"
                    name="fechaPago"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fechaPago}
            />
                    <Text fontSize="xs" color="red" align="left">{errors.fechaPago}</Text>
                <FormLabel>Pagada</FormLabel>
                <Checkbox
                    type="boolean"
                    name="pagada"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    my="5px"
            />
                <Button 
                colorScheme='teal'
                m="10px"
                type="submit" 
                >
                    Modificar
                </Button>
                </Flex>
    
            </form>
        )}
        </Formik>
            </div>
        )
    
}

export default EditFacturas

