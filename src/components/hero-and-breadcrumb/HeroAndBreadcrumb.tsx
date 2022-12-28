import React, { ReactElement } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import {
    Box,
    Container,
    Heading,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import { HiChevronRight } from "react-icons/hi";

interface Props {
    title: string;
}

const breadcrumbItems = [
    { label: "Početna", href: "/" },
    { label: "Recepti", href: "/recepti" },
];

const HeroAndBreadcrumb = ({ title }: Props): ReactElement => {
    const { pathname } = useRouter();

    return (
        <Box as="section" position="relative">
            <Image
                src="/images/inner-page-banner1.jpg"
                layout="fill"
                objectFit="cover"
                alt={title}
            />
            <Box
                py="24"
                _before={{
                    content: "''",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: "red.500",
                    opacity: 0.97,
                }}
            >
                <Container
                    maxW="container.xl"
                    textAlign="center"
                    position="relative"
                    color="white"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
                    <Heading mb="6">{title}</Heading>
                    <Breadcrumb
                        spacing="8px"
                        separator={<HiChevronRight color="gray.500" />}
                    >
                        {breadcrumbItems.map(({ label, href }) => {
                            return (
                                <BreadcrumbItem
                                    key={label}
                                    isCurrentPage={
                                        href === pathname ? true : false
                                    }
                                >
                                    <NextLink href={href ?? "#"}>
                                        {label}
                                    </NextLink>
                                </BreadcrumbItem>
                            );
                        })}
                    </Breadcrumb>
                </Container>
            </Box>
        </Box>
    );
};

export default HeroAndBreadcrumb;
