import React, { ReactElement } from "react";
import { Box, Heading, Stack, HStack, Icon, Text } from "@chakra-ui/react";
import { HiClock, HiUser, HiOutlineHeart } from "react-icons/hi";
import Image from "next/image";
import NextLink from "next/link";
import { TRecipe } from "@types";

const SlideCard = ({ id, attributes }: TRecipe): ReactElement => {
    return (
        <Box
            as={NextLink}
            href={`recept/${attributes.slug}`}
            position="relative"
        >
            <Box h={{ base: 250, lg: 500 }} position="relative">
                <Image
                    src={
                        attributes.featured_image.data
                            ? attributes.featured_image.data.attributes.formats
                                  .large
                                ? process.env.NEXT_PUBLIC_SERVER_API +
                                  attributes.featured_image.data?.attributes
                                      .formats.large.url
                                : process.env.NEXT_PUBLIC_SERVER_API +
                                  attributes.featured_image.data?.attributes.url
                            : ""
                    }
                    layout="fill"
                    objectFit="cover"
                    alt={attributes.title}
                />
            </Box>
            <Box
                position={{ base: "inherit", lg: "absolute" }}
                maxWidth="xl"
                bottom="0"
                right="0"
                left="0"
                margin="0 auto"
                bgColor="white"
                textAlign="center"
                p="6"
            >
                <Text fontSize="sm" fontWeight="600" color="red.500" mb="4">
                    CATEGORY
                </Text>
                <Heading as="h2" size="lg" mb={4}>
                    {attributes.title}
                </Heading>
                <Text mb="4">
                    More off this less hello salamander lied porpoise much over
                    tightly circa outside crud mightily rigorouse.
                </Text>
                <Stack justifyContent="center" direction="row" spacing="4">
                    <HStack spacing={2} align="center">
                        <Icon as={HiClock} color="red.500" fontSize="xl" />
                        <Text>15 min</Text>
                    </HStack>
                    <HStack spacing={2} align="center">
                        <Icon as={HiUser} color="red.500" fontSize="xl" />
                        <Text>Martina</Text>
                    </HStack>
                </Stack>
            </Box>
        </Box>
    );
};

export default SlideCard;
