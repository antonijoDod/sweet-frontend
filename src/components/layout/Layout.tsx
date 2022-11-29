import React, { ReactElement, ReactNode } from "react";
import { Header, Footer } from "@components";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }: { children: ReactNode }): ReactElement => {
    return (
        <>
            <Header />
            <Box as="main" mt={{ base: "16", lg: "0" }}>
                {children}
            </Box>
            <Footer />
        </>
    );
};

export default Layout;
