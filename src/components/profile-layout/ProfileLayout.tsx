import React, { ReactElement, ReactNode, useEffect, useState } from "react";
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

type TProfileLayoutProps = {
    children: ReactNode;
};

const ProfileLayout = ({ children }: TProfileLayoutProps): ReactElement => {
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
                                    >
                                        Moji recepti
                                    </MenuItem>
                                    <MenuItem
                                        as={NextLink}
                                        href="/moj-profil/postavke"
                                        borderBottom="1px"
                                        borderBottomColor="gray.300"
                                    >
                                        Postavke
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Box bgColor="white" p={4}>
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
