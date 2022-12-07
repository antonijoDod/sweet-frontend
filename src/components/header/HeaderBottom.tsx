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
                        <Button onClick={() => signIn()}>Login</Button>
                    ) : (
                        <NextLink href="/moj-profil" shallow={true}>
                            <IconButton
                                rounded="full"
                                icon={<HiUser />}
                                aria-label="Login button"
                            />
                        </NextLink>
                    )}
                </HStack>
            </Flex>
        </Container>
    );
};

export default HeaderBottom;
