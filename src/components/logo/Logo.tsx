import React, { ReactElement } from "react";
import Image from "next/image";
import { Box } from "@chakra-ui/react";

const Logo = ({ ...rest }): ReactElement => {
    return (
        <Box position="relative" {...rest}>
            <Image src="/images/logo.png" layout="fill" alt="Logo" />
        </Box>
    );
};

export default Logo;
