import React, { ReactElement, useEffect } from "react";
import NextLink from "next/link";
import {
    Container,
    Flex,
    HStack,
    Button,
    IconButton,
    Link,
} from "@chakra-ui/react";
import { HiUser } from "react-icons/hi";

import { NAV_ITEMS, TNavbarItem } from "./NavItems";

const DesktopNavItem = ({ item }: { item: TNavbarItem }): ReactElement => {
    const { label, href } = item;

    return (
        <Link
            as={NextLink}
            p={2}
            href={href ?? "#"}
            fontWeight={500}
            color="gray.900"
            shallow={true}
            _hover={{
                textDecoration: "none",
                color: "red.500",
            }}
        >
            {label}
        </Link>
    );
};

const HeaderBottom = (): ReactElement => {

    return (
        <Container maxW="container.xl">
            <Flex justifyContent="space-between" h={24} align="center">
                <HStack spacing="4">
                    {NAV_ITEMS.map((navItem) => (
                        <DesktopNavItem key={navItem.id} item={navItem} />
                    ))}
                </HStack>
                <HStack>
                    <Button rounded="full" variant="solid" colorScheme="red">
                        Dodaj recept
                    </Button>
                        <Button >Login</Button>
                        <NextLink href="/moj-profil" shallow={true}>
                            <IconButton
                                rounded="full"
                                icon={<HiUser />}
                                aria-label="Login button"
                            />
                        </NextLink>
                </HStack>
            </Flex>
        </Container>
    );
};

export default HeaderBottom;
