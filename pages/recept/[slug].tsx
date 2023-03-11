import React, { ReactElement, useEffect, useState } from "react";
import Image from "next/image";
import {
    Layout,
    HeroAndBreadcrumb,
    TextWithUnderline,
    BakeStep,
    SocialShareMenu,
    InfoWithIcon,
} from "@components";
import {
    Container,
    Grid,
    GridItem,
    Text,
    Heading,
    HStack,
    Stack,
    Icon,
    Box,
    SimpleGrid,
    Checkbox,
    Flex,
} from "@chakra-ui/react";
import {
    HiHeart,
    HiOutlineCalendar,
    HiUser,
    HiOutlineClock,
    HiViewList,
    HiOutlineUsers,
} from "react-icons/hi";
import { RiKnifeLine } from "react-icons/ri";
import { GiCookingGlove } from "react-icons/gi";
import axios from "axios";
import { TRecipe, TRecipes } from "@types";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import ImageGallery from "react-image-gallery";

type TRecipeProps = {
    recipe: TRecipe;
};

const Recipe = ({ recipe }: TRecipeProps): ReactElement => {
    if (!recipe) return <Text>Something is wrong</Text>;

    return (
        <Layout>
            <Head>
                <title>{recipe.attributes.title} | JEDNOSTAVNI KOLAČI</title>
            </Head>
            <HeroAndBreadcrumb title={recipe.attributes.title} />
            <Container maxW="container.xl" my="16">
                <Grid gap={16} templateColumns={{ md: "repeat(3, 1fr)" }}>
                    <GridItem colSpan={2}>
                        <HStack alignItems="center" mb={4}>
                            {recipe.attributes.categories.data.length > 0 ? (
                                recipe.attributes.categories.data.map(
                                    (category) => (
                                        <Text key={category.id}>
                                            {category.attributes.name}
                                        </Text>
                                    )
                                )
                            ) : (
                                <Text>Bez kategorije</Text>
                            )}
                        </HStack>
                        <Heading as="h2" size="lg" mb={4}>
                            {recipe.attributes.title}
                        </Heading>
                        <Stack
                            direction={{ base: "column", md: "row" }}
                            justify="space-between"
                        >
                            <HStack gap={8}>
                                <HStack align="center" h="full">
                                    <Icon
                                        as={HiOutlineCalendar}
                                        color="red.500"
                                    />
                                    <Text color="gray.600">
                                        {format(
                                            new Date(
                                                recipe.attributes.publishedAt
                                            ),
                                            "dd.MM.yyyy"
                                        )}
                                    </Text>
                                </HStack>
                            </HStack>
                            <SocialShareMenu />
                        </Stack>
                        {/* Image */}
                        <Box mt="8">
                            {recipe.attributes.gallery_images.data && (
                                <ImageGallery
                                    items={recipe.attributes.gallery_images.data.map(
                                        (image) => {
                                            return {
                                                original:
                                                    process.env
                                                        .NEXT_PUBLIC_SERVER_API +
                                                    image.attributes.url,
                                                thumbnail:
                                                    process.env
                                                        .NEXT_PUBLIC_SERVER_API +
                                                    image.attributes.formats
                                                        .thumbnail.url,
                                            };
                                        }
                                    )}
                                />
                            )}
                        </Box>
                        {/* Details with icons */}
                        <Box bg={"gray.50"} p="6" mt={8}>
                            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={8}>
                                <InfoWithIcon
                                    icon={RiKnifeLine}
                                    label="Priprema"
                                    value={
                                        recipe.attributes.preparing_time ||
                                        0 + " min"
                                    }
                                />
                                <InfoWithIcon
                                    icon={GiCookingGlove}
                                    label="Pečenje"
                                    value={
                                        recipe.attributes.cooking_time ||
                                        0 + " min"
                                    }
                                />
                                <InfoWithIcon
                                    icon={HiOutlineClock}
                                    label="Ukupno"
                                    value={1}
                                />
                                <InfoWithIcon
                                    icon={HiOutlineUsers}
                                    label="Za osoba"
                                    value={`${
                                        recipe.attributes.serving_for || 0
                                    } porcija`}
                                />
                            </SimpleGrid>
                        </Box>
                        <Box
                            my={8}
                            fontWeight={"normal"}
                            fontSize="lg"
                            __css={{ "&>*": { paddingBottom: 4 } }}
                        >
                            <ReactMarkdown>
                                {recipe.attributes.description
                                    ? recipe.attributes.description
                                    : ""}
                            </ReactMarkdown>
                        </Box>
                        {/* Ingredients */}
                        <Box bg={"gray.50"} p="6">
                            <HStack>
                                <Icon
                                    as={HiViewList}
                                    fontSize="3xl"
                                    color="red.500"
                                />
                                <Heading as="h3" fontSize="2xl">
                                    Sastojci
                                </Heading>
                            </HStack>
                            <Flex
                                direction={"column"}
                                gap={2}
                                mt="4"
                                color={"gray.700"}
                            >
                                {recipe.attributes.ingredients.length > 0 ? (
                                    recipe.attributes.ingredients.map(
                                        (ingredient) => (
                                            <Checkbox key={ingredient.id}>
                                                <Text ml={2}>
                                                    {ingredient.name}
                                                    {" - "}
                                                    {ingredient.amount}
                                                </Text>
                                            </Checkbox>
                                        )
                                    )
                                ) : (
                                    <Text>Sastojci nisu dodani</Text>
                                )}
                            </Flex>
                        </Box>
                        {/* Directions */}
                        <Box mt={8}>
                            <TextWithUnderline
                                title="Priprema"
                                fontSize="2xl"
                            />
                            {recipe.attributes.steps.length > 0 ? (
                                recipe.attributes.steps.map((step, index) => (
                                    <BakeStep
                                        key={step.id}
                                        stepNumber={index}
                                        {...step}
                                    />
                                ))
                            ) : (
                                <Text>Nema koraka pripreme</Text>
                            )}
                        </Box>
                    </GridItem>
                    {/*  <GridItem colSpan={1}>2</GridItem> */}
                </Grid>
            </Container>
        </Layout>
    );
};

export async function getStaticPaths() {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/recipes`
    );
    const recipes: TRecipes = response.data;

    const paths = recipes.data.map((recipe) => ({
        params: { slug: recipe.attributes.slug },
    }));

    return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const recipeResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/recipes/${slug}`
    );

    const recipe = recipeResponse.data.data;

    return {
        props: {
            recipe,
        },
    };
}

export default Recipe;
