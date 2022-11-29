import React, { ReactElement } from "react";
import Link from "next/link";
import {
    Box,
    Container,
    Flex,
    HStack,
    Icon,
    IconButton,
} from "@chakra-ui/react";
import { FaFacebookF } from "react-icons/fa";
import { Logo } from "@components";
import { HiSearch } from "react-icons/hi";

const HeaderTop = (): ReactElement => {
    return (
        <Container maxW="container.xl">
            <Flex justifyContent="space-between" alignItems="center" h="24">
                <HStack color="gray.600">
                    <Link href="https://facebook.com">
                        <Icon fontSize="xl" as={FaFacebookF} cursor="pointer" />
                    </Link>
                </HStack>
                <Logo height="56px" width="180px" />
                <Box>
                    <IconButton
                        variant="solid"
                        bgColor="white"
                        fontSize="2xl"
                        aria-label="Search button"
                        icon={<HiSearch />}
                    />
                </Box>
            </Flex>
        </Container>
    );
};

export default HeaderTop;
