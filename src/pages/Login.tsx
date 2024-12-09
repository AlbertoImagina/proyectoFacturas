import { Button, Flex, FormControl, FormLabel, Input, Text, useToast } from "@chakra-ui/react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { userLogin } from "../shared/middlewares/login.middleware";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../shared/context/auth.context";


export interface Inputs {
    name: string;
    type: "text" | "number" | "password" | "email"
    label: string;
}

export const Login = () => {
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
            label: "contraseña"
        }
    ]

    const initialValues = {
        email: "",
        password: "",
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("El campo debe ser un email valido.").required("El campo email es obligatorio"),
        password: Yup.string().required("El campo contraseña es obligatorio")
    })

    const onSubmit = async (values: { email: string; password: string; }) => {
        const response = await userLogin(values);

        if (!response?.auth) {
            return toast({
                title: response?.error,
                status: 'error',
            })
        }

        localStorage?.setItem("auth", response?.auth.toString())
        localStorage?.setItem("user", JSON.stringify(response?.user))
        setUser(response?.user)
        setAuth(true)
        navigate("/facturas")
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
                    Inicio de Sesion
                </Text>

                <Formik
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {(formik) => {
                        const { handleSubmit, values, setFieldValue, errors } = formik;

                        return (
                            <Form
                                onSubmit={handleSubmit}
                            >
                                <Flex
                                    direction="column"
                                    gap="20px"
                                    w="400px"
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
                                </Flex>

                                <Flex
                                    w="100%"
                                    mt="30px"
                                    direction="column"
                                    gap="20px"
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
                                        Continuar
                                    </Button>

                                    <Link to={("/register")}>
                                        Si aún no te has registrado, pincha aquí
                                    </Link>
                                </Flex>
                            </Form>
                        )
                    }}
                </Formik>
            </Flex>
        </Flex>
    )
}

export default Login