import React, { ReactElement } from "react";
import {  Box, Divider } from "@chakra-ui/react";
import HeaderTop from "./HeaderTop";
import HeaderBottom from "./HeaderBottom";
import MobileHeader from "./MobileHeader";

const Header = (): ReactElement => {
    return (
        <Box>
            <Box display={{ base: "none", lg: "block" }}>
                <HeaderTop />
                <Divider />
                <HeaderBottom />
            </Box>
            <MobileHeader />
        </Box>
    );
};

export default Header;
