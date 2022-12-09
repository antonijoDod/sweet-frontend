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
import { HiStar, HiOutlineStar } from "react-icons/hi";
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
                            attributes.main_image.data
                                ? attributes.main_image.data.attributes.formats
                                      .small
                                    ? process.env.NEXT_PUBLIC_SERVER_API +
                                      attributes.main_image.data?.attributes
                                          .formats.small.url
                                    : process.env.NEXT_PUBLIC_SERVER_API +
                                      attributes.main_image.data?.attributes.url
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
                <HStack color="red.500">
                    <Icon as={HiStar} fontSize="xl" />
                    <Icon as={HiStar} fontSize="xl" />
                    <Icon as={HiStar} fontSize="xl" />
                    <Icon as={HiStar} fontSize="xl" />
                    <Icon as={HiOutlineStar} fontSize="xl" />
                </HStack>
            </Box>
        </NextLink>
    );
};

export default RecipeCard;
