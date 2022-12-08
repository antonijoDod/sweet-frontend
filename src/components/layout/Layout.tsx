import React, { ReactElement, ReactNode } from "react";
import { Header, Footer } from "@components";
import { Box } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
    return (
        <>
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
