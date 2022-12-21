import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Router from "next/router";
import {
    Alert,
    AlertDescription,
    Box,
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

type TFormValues = {
    identifier: string;
    password: string;
};

const SignIn = () => {
    const { status } = useSession();
    const router = Router;

    const [isLoginError, setIsLoginError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<TFormValues>();

    useEffect(() => {
        redirectIfAuthenticated();
    }, [status]);

    const redirectIfAuthenticated = () => {
        if (status !== "loading" && status === "authenticated") {
            router.push("/moj-profil");
        }
    };

    const onSubmit = async ({
        identifier,
        password,
    }: {
        identifier: string;
        password: string;
    }) => {
        setIsLoading(true);
        const res = await signIn("credentials", {
            identifier,
            password,
            redirect: false,
        });
        if (!res?.ok) {
            setIsLoginError(true);
            setIsLoading(false);
        }
    };

    return (
        <Box
            bg="gray.50"
            minH="calc(100vh)"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Container
                maxW="lg"
                py={{ base: "12", md: "24" }}
                px={{ base: "0", sm: "8" }}
            >
                <Stack spacing="8">
                    <Stack spacing="6">
                        <h1>LOGO</h1>
                        <Stack
                            spacing={{ base: "2", md: "3" }}
                            textAlign="center"
                        >
                            <Heading
                                size={useBreakpointValue({
                                    base: "xs",
                                    md: "sm",
                                })}
                            >
                                Prijavi se u svoj račun
                            </Heading>
                            <HStack spacing="1" justify="center">
                                <Text color="muted">Još nemaš račun?</Text>
                                <Button variant="link" colorScheme="blue">
                                    Registriraj se
                                </Button>
                            </HStack>
                        </Stack>
                    </Stack>
                    <Box
                        py={{ base: "0", sm: "8" }}
                        px={{ base: "4", sm: "10" }}
                        bg={useBreakpointValue({
                            base: "transparent",
                            sm: "bg-surface",
                        })}
                        boxShadow={{
                            base: "none",
                            sm: useColorModeValue("md", "md-dark"),
                        }}
                        borderRadius={{ base: "none", sm: "xl" }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack spacing="6">
                                <Stack spacing="5">
                                    <FormControl>
                                        <FormLabel htmlFor="identifier">
                                            Email
                                        </FormLabel>
                                        <Input
                                            id="identifier"
                                            placeholder="email"
                                            type="email"
                                            onClick={() =>
                                                setIsLoginError(false)
                                            }
                                            {...register("identifier")}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="password">
                                            Password
                                        </FormLabel>
                                        <Input
                                            id="password"
                                            placeholder="password"
                                            type="password"
                                            onClick={() =>
                                                setIsLoginError(false)
                                            }
                                            {...register("password")}
                                        />
                                    </FormControl>
                                </Stack>
                                <HStack justify="space-between">
                                    <Checkbox defaultChecked>
                                        Upamti me
                                    </Checkbox>
                                    <Button
                                        variant="link"
                                        colorScheme="blue"
                                        size="sm"
                                    >
                                        Zaboravljena lozinka?
                                    </Button>
                                </HStack>
                                <Stack spacing="6">
                                    <Button
                                        type="submit"
                                        colorScheme="green"
                                        variant="solid"
                                        isLoading={isLoading}
                                    >
                                        Prijavi se
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                        {isLoginError && (
                            <Alert status="error" mt={4}>
                                Provjerite korisnicko ime i lozinku
                            </Alert>
                        )}
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default SignIn;
