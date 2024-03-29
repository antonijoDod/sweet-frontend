import React, { ReactElement } from "react";
import Image from "next/image";
import NextLink from "next/link";
import {
    Text,
    Box,
    Heading,
    Stack,
    HStack,
    Flex,
    Icon,
} from "@chakra-ui/react";
import { HiClock, HiUser, HiOutlineHeart } from "react-icons/hi";
import { TRecipe } from "@types";

interface Props extends TRecipe {
    imageHeight?: number;
}

const RecipeCard = ({ attributes, imageHeight = 250 }: Props): ReactElement => {
    return (
        <NextLink href={`/recept/${attributes.slug}`}>
            <Box cursor="pointer" h="fulls">
                <Box h={imageHeight} position="relative" mb={4}>
                    <Image
                        src={
                            attributes.featured_image.data
                                ? attributes.featured_image.data.attributes
                                      .formats.small
                                    ? process.env.NEXT_PUBLIC_SERVER_API +
                                      attributes.featured_image.data?.attributes
                                          .formats.small.url
                                    : process.env.NEXT_PUBLIC_SERVER_API +
                                      attributes.featured_image.data?.attributes
                                          .url
                                : "/images/no-image.jpg"
                        }
                        layout="fill"
                        objectFit="cover"
                        alt={attributes.title}
                    />
                </Box>
                <Flex
                    direction="column"
                    justifyContent="space-between"
                    bgColor="white"
                    mb={4}
                >
                    <Box>
                        {attributes.categories.data.length > 0 ? (
                            attributes.categories.data?.map((category) => (
                                <Text
                                    key={category.id}
                                    fontWeight="600"
                                    color="gray.600"
                                    mb={4}
                                    textTransform="uppercase"
                                >
                                    {category.attributes.name}
                                </Text>
                            ))
                        ) : (
                            <Text
                                fontWeight="600"
                                color="gray.600"
                                mb={4}
                                textTransform="uppercase"
                            >
                                Bez kategorije
                            </Text>
                        )}
                        <Heading as="h3" size="md">
                            {attributes.title}
                        </Heading>
                    </Box>
                </Flex>
                <Stack justifyContent="start" direction="row" spacing="4">
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
        </NextLink>
    );
};

export default RecipeCard;
