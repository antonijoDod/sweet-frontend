import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Router from "next/router";
import NextLink from "next/link";
import { useRegisterUser } from "@hooks/auth";
import {
    Alert,
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
    username: string;
    email: string;
    password: string;
};

const SignUp = () => {
    const { status } = useSession();
    const router = Router;
    const registerUser = useRegisterUser();

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
        username,
        email,
        password,
    }: {
        username: string;
        email: string;
        password: string;
    }) => {
        await registerUser.mutate(
            { email, password, username },
            {
                onSuccess: () => {
                    router.push("/auth/signin");
                },
            }
        );
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
                                Kreiraj novi račun
                            </Heading>
                            <HStack spacing="1" justify="center">
                                <Text color="muted">Imaš postojeći račun?</Text>
                                <Button
                                    as={NextLink}
                                    href="/auth/signin"
                                    variant="link"
                                    colorScheme="blue"
                                >
                                    Prijavi se
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
                                        <FormLabel htmlFor="username">
                                            Korisničko ime
                                        </FormLabel>
                                        <Input
                                            id="username"
                                            placeholder="npr. ivan123 (vidljivo na receptu)"
                                            type="text"
                                            {...register("username")}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel htmlFor="email">
                                            Email
                                        </FormLabel>
                                        <Input
                                            id="email"
                                            placeholder="npr. ivan123@gmail.com"
                                            type="email"
                                            {...register("email")}
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
                                            {...register("password")}
                                        />
                                    </FormControl>
                                </Stack>
                                <Stack spacing="6">
                                    <Button
                                        type="submit"
                                        colorScheme="green"
                                        variant="solid"
                                        isLoading={registerUser.isLoading}
                                    >
                                        Kreiraj račun
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
                        {registerUser.isError && (
                            <Alert status="error" mt={4}>
                                {registerUser.error?.response.data.error
                                    .message ===
                                "Email or Username are already taken"
                                    ? "Korisničko ime ili email već postoji"
                                    : registerUser.error?.response.data.error
                                          .message}
                            </Alert>
                        )}
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default SignUp;
