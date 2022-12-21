import React, { ReactElement, ReactNode } from "react";
import { Layout } from "@components";
import {
    Box,
    Button,
    Container,
    Grid,
    GridItem,
    Menu,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

type TProfileLayoutProps = {
    children: ReactNode;
};

const ProfileLayout = ({ children }: TProfileLayoutProps): ReactElement => {
    const router = useRouter();

    return (
        <Layout>
            <Box bgColor="gray.100" py={16}>
                <Container maxW="container.xl">
                    <Grid
                        gridGap="8"
                        templateColumns={{
                            base: "repeat(1, 1fr)",
                            md: "repeat(3, 1fr)",
                        }}
                    >
                        <GridItem colSpan={1}>
                            <Box bgColor="white">
                                <Menu>
                                    <MenuItem
                                        as={NextLink}
                                        href="/moj-profil"
                                        borderBottom="1px"
                                        borderBottomColor="gray.300"
                                        backgroundColor={
                                            router.pathname === "/moj-profil"
                                                ? "red.500"
                                                : "white"
                                        }
                                    >
                                        Moji recepti
                                    </MenuItem>
                                    <MenuItem
                                        as={NextLink}
                                        href="/moj-profil/postavke"
                                        borderBottom="1px"
                                        borderBottomColor="gray.300"
                                        backgroundColor={
                                            router.pathname ===
                                            "/moj-profil/postavke"
                                                ? "red.500"
                                                : "white"
                                        }
                                    >
                                        Postavke
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Box bgColor="white" p={8}>
                                {children}
                            </Box>
                        </GridItem>
                    </Grid>
                </Container>
            </Box>
        </Layout>
    );
};

export default ProfileLayout;
