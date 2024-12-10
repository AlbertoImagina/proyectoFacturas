import { Flex,Text,Input, Checkbox, Button, FormLabel, useToast } from "@chakra-ui/react"
import { Formik } from 'formik';
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updateData } from "../shared/middlewares/getData";
import { Factura } from "../types/Facturas";
import { v4 as uuidv4 } from 'uuid';


function EditFacturas({ item } : {item:Factura}) {
    const formularioSchema = Yup.object({
        createdAt: Yup.date().required("Fecha requerida"),
        numero: Yup.number().required("Número de factura requerida").positive().integer(),
        cliente: Yup.string().email("Email requerido"),
        fechaPago: Yup.date().required("Fecha requerida"),
        pagada: Yup.boolean().optional(),
    });
    
    const toast = useToast()
    const navigate = useNavigate()
    
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
            initialValues={{ 
            id: item.id,
            createdAt: item.createdAt,
            numero: item.numero,
            cliente: item.cliente,
            fechaPago: item.fechaPago,
            pagada: false,
        }}
            validationSchema={formularioSchema}
    
            onSubmit={(values,{ setSubmitting }) => {
            setSubmitting(true)

                const dataValues = { ...values, id: uuidv4}
                mutation.mutate(dataValues)
                toast({
                    title: "Modificada correctamente",
                    colorScheme:"green"
                })
                navigate('/')
        }}
        >
        {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
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
                <FormLabel>Numero de cliente</FormLabel>
                <Input
                    type="number"
                    name="numero"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.numero}
            />
                <FormLabel>Nombre de cliente</FormLabel>
                <Input
                    type="string"
                    name="cliente"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cliente}
            />
                <FormLabel>Fecha de pago</FormLabel>
                <Input
                    type="date"
                    name="fechaPago"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fechaPago}
            />
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

