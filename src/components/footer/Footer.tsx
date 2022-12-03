import React, { CSSProperties, ReactElement } from "react";
import { Flex, Center, Text } from "@chakra-ui/react";

const Footer = (): ReactElement => {
    const iconStyle: CSSProperties = {
        fontSize: 22,
        color: "#fff",
        marginRight: "0.25rem",
        marginLeft: "0.25rem",
    };
    return (
        <Center bg="main.100" py={10}>
            <Flex flexDirection="column" alignItems="center">
                <a
                    href="https://github.com/pankod"
                    target="_blank"
                    data-testid="pankod-logo"
                    rel="noreferrer"
                >
                   Logo
                </a>
                <Flex mt={5} color="gray.200" textAlign="center" py="4">
                    <a
                        href="https://www.facebook.com/groups/743893966260475"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Facebook
                    </a>
                </Flex>
                <Text color="gray.500">
                    © 2022 Jednostavni kolači. Sva prava pridržana.{" "}
                </Text>
            </Flex>
        </Center>
    );
};

export default Footer