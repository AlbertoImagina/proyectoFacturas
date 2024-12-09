
import { Button, Flex, FormControl, FormLabel, Grid, Input, Link, Text, useToast } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { userRegister } from "../shared/middlewares/login.middleware";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../shared/context/auth.context";
import { Link as RouterLink } from "react-router-dom"

export interface Inputs {
    name: string;
    type: "text" | "number" | "password" | "email"
    label: string;
}

export const Register = () => {
    const { setUser, setAuth } = useAuthContext();
    const toast = useToast();
    const navigate = useNavigate();

    const inputs: Inputs[] = [
        {
            name: "email",
            type: "email",
            label: "Correo electronico"
        },
        {
            name: "password",
            type: "password",
            label: "Contraseña"
        },
        {
            name: "confirmPassword",
            type: "password",
            label: "Confirmar Contraseña"
        },
        {
            name: "nombre",
            type: "text",
            label: "Nombe"
        },
        {
            name: "apellidos",
            label: "Apellidos",
            type: "text"
        },
        {
            name: "telefono",
            type: "number",
            label: "Telefono"
        }
    ]

    const initialValues = {
        email: "",
        password: "",
        confirmPassword: "",
        nombre: "",
        apellidos: "",
        telefono: 0
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("El campo debe ser un email valido.").required("El campo email es obligatorio"),
        password: Yup.string().required("El campo contraseña es obligatorio"),
        confirmPassword: Yup.string().required("El campo confirmar contraseña es obligatorio").oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir.'),
        nombre: Yup.string().required("El campo nombre es obligatorio"),
        apellidos: Yup.string().required("El campo apellidos es obligatorio"),
        telefono: Yup.number().min(9, "El telefono debe ser valido").required("El campo telefono es obligatorio"),
    })

    const onSubmit = async (
        values: {
            email: string;
            password: string;
            nombre: string;
            apellidos: string;
            telefono: number;
        }) => {
        const { data } = await userRegister({
            ...values,
            telefono: String(values?.telefono)
        })

        if (data && data?.email === values?.email) {
            navigate("/login")

            return toast({
                title: `El registro de ${data?.nombre} fue exitoso.`,
                status: 'success',
            })
        }

        toast({
            title: `Error al registrar al usuario ${values?.email}, vuelva a intentarlo.`,
            status: 'error',
        })
    }

    return (
        <Flex
            h="100vh"
            w="100%"
            alignItems="center"
            justifyContent="center"
        >
            <Flex
                direction="column"
                shadow="xl"
                p="40px"
                rounded="10px"
                gap="30px"
            >
                <Text
                    fontSize="28px"
                    fontWeight="600"
                >
                    Registro
                </Text>

                <Formik
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {(formik) => {
                        const { handleSubmit, values, setFieldValue, errors } = formik;

                        return (
                            <Form onSubmit={handleSubmit}>
                                <Grid
                                    gridTemplateColumns="repeat(2, 1fr)"
                                    rowGap="20px"
                                    columnGap="40px"
                                    w="600px"
                                >
                                    {inputs?.map((i: Inputs, index) =>
                                        <FormControl
                                            key={index}
                                        >
                                            <FormLabel>
                                                {i?.label}
                                            </FormLabel>

                                            <Input
                                                type={i?.type}
                                                name={i?.name}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(i?.name, e?.target?.value)}
                                                value={values[i?.name]}
                                            />

                                            <Text
                                                opacity={errors[i?.name] ? 1 : 0}
                                                color="red.500"
                                                fontSize="12px"
                                                mt="3px"
                                            >
                                                *{errors[i?.name]}
                                            </Text>
                                        </FormControl>
                                    )}
                                </Grid>

                                <Flex
                                    w="100%"
                                    mt="30px"
                                >
                                    <Button
                                        colorScheme="teal"
                                        w="100%"
                                        h="fit-content"
                                        py="10px"
                                        px="20px"
                                        fontSize={"18px"}
                                        fontWeight="500"
                                        isDisabled={Object.keys(errors)?.length !== 0}
                                        type="submit"
                                    >
                                        Registrarse
                                    </Button>
                                </Flex>
                            </Form>
                        )
                    }}
                </Formik>

                <Flex>
                    <Text
                        fontSize="16px"
                        fontWeight="300"
                    >
                        ¿Ya estás registrado? Ve {" "}

                        <Link
                            as={RouterLink}
                            to={"/login"}
                            fontWeight="600"
                            color="blue.400"
                            cursor="pointer"
                            _hover={{ textDecoration: "underline" }}
                        >
                            aqui
                        </Link>.
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Register