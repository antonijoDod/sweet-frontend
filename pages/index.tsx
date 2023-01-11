import React, { ReactElement } from "react";
import Head from "next/head";
import {
    Box,
    Container,
    Text,
    Grid,
    GridItem,
    SimpleGrid,
} from "@chakra-ui/react";
import { FaFacebookF } from "react-icons/fa";

import {
    Layout,
    RecentCard,
    RecipeCard,
    HeroSlider,
    TextWithUnderline,
} from "@components";
import axios from "axios";
import { TRecipes } from "@types";

type THomeProps = {
    recipes: TRecipes;
    sliderRecipes: TRecipes;
};

const Home = ({ recipes, sliderRecipes }: THomeProps): ReactElement => {
    return (
        <Layout>
            <Head>
                <title>Jednostavni kolači</title>
            </Head>
            <Container as="section" maxW="container.xl">
                <HeroSlider recipes={sliderRecipes?.data.slice(0, 3)} />
            </Container>
            <Container as="section" maxW="container.xl" my={16}>
                <Grid
                    templateColumns={{ base: "none", lg: "repeat(3, 1fr)" }}
                    gap={8}
                >
                    <GridItem colSpan={{ base: 1, lg: 2 }}>
                        <TextWithUnderline
                            title="Trenutno popularno"
                            fontSize="2xl"
                        />
                        <Box>
                            {recipes?.data && recipes.data.length > 0 ? (
                                <RecipeCard
                                    imageHeight={450}
                                    {...recipes.data[0]}
                                />
                            ) : null}
                            <SimpleGrid
                                columns={{ base: 1, md: 2 }}
                                gap="8"
                                mt={8}
                            >
                                {recipes?.data && recipes.data.length > 0
                                    ? recipes.data
                                          .slice(1, 9)
                                          .map((recipe) => (
                                              <RecipeCard
                                                  key={recipe.id}
                                                  {...recipe}
                                              />
                                          ))
                                    : "No recipes data"}
                            </SimpleGrid>
                        </Box>
                    </GridItem>
                    {/* Right sidebar */}
                    <GridItem>
                        <TextWithUnderline title="Prati me" fontSize="2xl" />
                        <Text>Banner</Text>
                    </GridItem>
                </Grid>
            </Container>
        </Layout>
    );
};

export async function getServerSideProps() {
    const recipesResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/recipes?pagination[limit]=2&sort[publishedAt]=Desc`
    );
    const recipes = recipesResponse.data;

    const sliderRecipesResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/recipes?filters[isOnSlider][$eq]=true&sort[publishedAt]=Desc`
    );
    const sliderRecipes = sliderRecipesResponse.data;

    return {
        props: {
            recipes: recipes,
            sliderRecipes: sliderRecipes,
        },
    };
}

export default Home;
