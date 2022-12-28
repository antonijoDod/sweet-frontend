import React, { ReactElement, useEffect } from "react";
import NextLink from "next/link";
import {
    Container,
    Flex,
    HStack,
    Button,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
} from "@chakra-ui/react";
import { HiUser, HiChevronDown } from "react-icons/hi";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { NAV_ITEMS, TNavbarItem } from "./NavItems";

const DesktopNavItem = ({ item }: { item: TNavbarItem }): ReactElement => {
    const { label, href } = item;

    return (
        <Link
            as={NextLink}
            p={2}
            href={href ?? "#"}
            fontWeight={700}
            color="gray.900"
            textTransform="uppercase"
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
    const { data: session, status } = useSession();
    const user = session?.user;
    const isLoadingUser = status === "loading";
    return (
        <Container maxW="container.xl">
            <Flex justifyContent="space-between" h={24} align="center">
                <HStack spacing="4">
                    {NAV_ITEMS.map((navItem) => (
                        <DesktopNavItem key={navItem.id} item={navItem} />
                    ))}
                </HStack>
                <HStack>
                    {!user ? (
                        <Button
                            colorScheme="red"
                            variant="outline"
                            leftIcon={<HiUser />}
                            onClick={() => signIn()}
                        >
                            Prijavi se
                        </Button>
                    ) : (
                        <Menu>
                            <HStack>
                                <MenuButton
                                    as={Button}
                                    variant="gost"
                                    rightIcon={<HiChevronDown />}
                                >
                                    Moj račun
                                </MenuButton>
                            </HStack>
                            <MenuList zIndex={9999}>
                                <MenuItem as={NextLink} href="/moj-profil">
                                    Moj profil
                                </MenuItem>
                                <MenuItem
                                    as={NextLink}
                                    href="/moj-profil/postavke"
                                >
                                    Postavke
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={() => signOut()}>
                                    Odjava
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </HStack>
            </Flex>
        </Container>
    );
};

export default HeaderBottom;
