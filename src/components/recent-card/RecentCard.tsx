import React, { ReactElement } from "react";
import Image from "next/image";
import { Box, Heading, HStack, Icon, Text, Link } from "@chakra-ui/react";
import { HiClock } from "react-icons/hi";
import NextLink from "next/link";
import { format } from "date-fns";
import { TRecipe } from "@types";

const RecentCard = ({ id, attributes }: TRecipe): ReactElement => {
    return (
        <Link as={NextLink} href="/" cursor="pointer">
            <HStack gap={2} mb="6" cursor="pointer">
                <Box
                    position="relative"
                    height="96px"
                    width="96px"
                    overflow="hidden"
                >
                    <Image
                        src={
                            attributes.main_image.data
                                ? process.env.NEXT_PUBLIC_SERVER_API +
                                  attributes.main_image.data.attributes.formats
                                      .thumbnail.url
                                : "/images/kolac.jpg"
                        }
                        layout="fill"
                        objectFit="cover"
                        alt={attributes.title}
                    />
                    <Box
                        rounded="full"
                        color="white"
                        bgColor="pink.500"
                        opacity={0.9}
                        h={10}
                        w={10}
                        position="absolute"
                        bottom={0}
                        right={0}
                        marginRight="-1"
                        marginBottom="-1"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        1
                    </Box>
                </Box>
                <Box>
                    <Box
                        textTransform="uppercase"
                        fontSize="sm"
                        fontWeight="600"
                    >
                        {attributes.categories.data &&
                            attributes.categories.data
                                .slice(0, 1)
                                .map((category) => (
                                    <Text key={category.id}>
                                        {category.attributes.name}
                                    </Text>
                                ))}
                    </Box>
                    <Heading as="h3" size="sm" py="2">
                        {attributes.title}
                    </Heading>
                    <HStack>
                        <Icon as={HiClock} color="red.500" />
                        <Text>
                            {format(
                                new Date(attributes.publishedAt),
                                "dd.MM.yyyy",
                            )}
                        </Text>
                    </HStack>
                </Box>
            </HStack>
        </Link>
    );
};

export default RecentCard;
