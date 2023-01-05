import React, { ReactElement, ReactNode } from "react";
import { Header, Footer } from "@components";
import { Box } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Header />
            <Box as="main" mt={{ base: "16", lg: "0" }}>
                {children}
            </Box>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default Layout;
