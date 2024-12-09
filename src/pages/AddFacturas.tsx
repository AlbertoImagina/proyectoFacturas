import { Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { addData } from '../shared/middlewares/getData';
import { useMutation } from '@tanstack/react-query';
import { Flex, Input,Button, FormLabel, Text, Checkbox, useToast } from '@chakra-ui/react';

function AddFacturas() {

const toast = useToast()

    const mutation = useMutation({
        mutationFn: addData
        })


    return (
        <div>
            <Flex>
                <Link to="/">
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
        initialValues={{ 
        createdAt: "",
        numero: 0,
        cliente: "",
        fechaPago: "",
        pagada: false,
    }}

    onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true)
        const dataValues = { ...values, id: uuidv4()}
        mutation.mutate(dataValues)
        toast({
            title: 'Factura creada con éxito',
            colorScheme: 'green'
        })
    }}
    >
    {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
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