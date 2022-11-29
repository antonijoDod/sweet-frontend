import React, { ReactElement } from "react";
import Link from "next/link";
import {
    Box,
    Container,
    Flex,
    HStack,
    IconButton,
    Collapse,
    useBoolean,
    VStack,
    Stack,
    Text,
    useDisclosure,
    Button,
} from "@chakra-ui/react";
import {  Logo } from "@components";
import {
    HiOutlineMenuAlt3,
    HiSearch,
    HiUser,
} from "react-icons/hi";

import { NAV_ITEMS, TNavbarItem } from "./NavItems";

const Navbar = () => {
    return (
        <VStack py={8} align="start">
            {NAV_ITEMS.map((item) => (
                <NavbarItem key={item.id} {...item} />
            ))}
        </VStack>
    );
};

const NavbarItem = ({ label, href }: TNavbarItem): ReactElement => {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Stack spacing={4} onClick={() => onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? "#"}
                justify={"space-between"}
                align="start"
                _hover={{
                    textDecoration: "none",
                }}
            >
                <HStack alignItems="start" cursor="pointer">
                    <Text fontWeight={600} color="gray.600">
                        {label}
                    </Text>
                </HStack>
            </Flex>
        </Stack>
    );
};

const MobileHeader = (): ReactElement => {
    const [isOpen, setIsOpen] = useBoolean();
    return (
        <Box
            position="fixed"
            zIndex="99"
            w="full"
            top={0}
            bg="white"
            display={{ lg: "none" }}
        >
            <Container maxW="container.xl">
                <Flex
                    justifyContent="space-between"
                    align="center"
                    width="100%"
                    h="16"
                >
                    <Logo height="28px" width="90px" />
                    <HStack>
                        <IconButton
                            icon={<HiSearch />}
                            aria-label="Search button"
                            variant="ghost"
                        />

                        <Button size="sm" colorScheme="red">
                            Dodaj recept
                        </Button>
                        <IconButton
                            icon={<HiUser />}
                            aria-label="Login button"
                            variant="ghost"
                        />
                        <IconButton
                            icon={<HiOutlineMenuAlt3 />}
                            aria-label="Toggle menu"
                            onClick={setIsOpen.toggle}
                            variant="ghost"
                        />
                    </HStack>
                </Flex>
            </Container>
            <Collapse in={isOpen} animateOpacity>
                <Container maxW="container.xl" bg="white">
                    <Navbar />
                </Container>
            </Collapse>
        </Box>
    );
};

export default MobileHeader;
