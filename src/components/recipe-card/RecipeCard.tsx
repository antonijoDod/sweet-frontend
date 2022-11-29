import React, { ReactElement } from "react";
import Image from "next/image";
import NextLink from "next/link";
import {
    Text,
    Box,
    Container,
    Heading,
    Stack,
    HStack,
    Flex,
    Icon,
    Link,
    VStack,
} from "@chakra-ui/react";
import { HiClock, HiUser, HiOutlineHeart } from "react-icons/hi";
import { TRecipe } from "@types";

interface Props extends TRecipe {
    imageHeight?: number;
}

const RecipeCard = ({
    id,
    attributes,
    imageHeight = 250,
}: Props): ReactElement => {
    return (
        <NextLink href={`/recept/${attributes.slug}`} shallow={true}>
            <Box cursor="pointer" _hover={{ boxShadow: "lg" }} h="fulls">
                <Box h={imageHeight} position="relative">
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
                                : ""
                        }
                        layout="fill"
                        objectFit="cover"
                    />
                </Box>
                <Flex
                    direction="column"
                    justifyContent="space-between"
                    bgColor="white"
                    textAlign="center"
                    p="6"
                >
                    <Box>
                        <Text
                            fontSize="sm"
                            fontWeight="600"
                            color="red.500"
                            mb={4}
                            textTransform="uppercase"
                        >
                            {attributes.categories.data?.map(
                                (category) => category.attributes.name,
                            )}
                        </Text>
                        <Heading as="h3" size="md" mb={4}>
                            {attributes.title}
                        </Heading>
                        <Text mb="4" noOfLines={2}>
                            {attributes.description}
                        </Text>
                    </Box>
                    <Stack justifyContent="center" direction="row" spacing="4">
                        <HStack spacing={2} align="center">
                            <Icon as={HiClock} color="red.500" fontSize="xl" />
                            <Text>15 min</Text>
                        </HStack>
                        <HStack spacing={2} align="center">
                            <Icon as={HiUser} color="red.500" fontSize="xl" />
                            <Text>Martina</Text>
                        </HStack>
                        <HStack spacing={2} align="center">
                            <Icon
                                as={HiOutlineHeart}
                                color="red.500"
                                fontSize="xl"
                            />
                            <Text>5 likes</Text>
                        </HStack>
                    </Stack>
                </Flex>
            </Box>
        </NextLink>
    );
};

export default RecipeCard;
