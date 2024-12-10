import { Formik } from 'formik';
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { addData } from '../shared/middlewares/getData';
import { useMutation } from '@tanstack/react-query';
import { Flex, Input,Button, FormLabel, Text, Checkbox, useToast } from '@chakra-ui/react';


interface Add {
    refreshData: () => void
}

function AddFacturas({refreshData}: Add) {

    const initialValues ={
    createdAt: "",
    numero: 0,
    cliente: "",
    fechaPago: "",
    pagada: false,
    }

    const formularioSchema = Yup.object({
        createdAt: Yup.date().required("Fecha requerida"),
        numero: Yup.number().required("Número de factura requerida").positive().integer(),
        cliente: Yup.string().required("Nombre de cliente requerido"),
        fechaPago: Yup.date().required("Fecha de pago requerida"),
        pagada: Yup.boolean().optional(),
    });

const toast = useToast()

const mutation = useMutation({
    mutationFn: addData
})

const navigate = useNavigate()

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
                    <h1>Añadir factura nueva</h1>
                </Text>
            </Flex>


    <Formik
    const initialValues ={initialValues}
    validationSchema={formularioSchema}
    onSubmit={(values) => {
        const dataValues = { ...values, id: uuidv4()}
        mutation.mutate(dataValues)
        toast({
            title: 'Factura creada con éxito',
            colorScheme: 'green'
        })
        navigate("/facturas")
        refreshData()
    }}
    >
    {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        errors
    }) => (
        <form onSubmit={handleSubmit}>
            <Flex
            display="flex"
            direction="column"
            shadow="lg"
            p="20px"
            >

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
            disabled={isSubmitting}
            >
                Submit
            </Button>
            </Flex>

        </form>
    )}
    </Formik>
        </div>
    )

}

export default AddFacturas