import React, { ReactElement } from "react";

import {
    Box,
    Container,
    HStack,
    Icon,
    Grid,
    GridItem,
    SimpleGrid,
} from "@chakra-ui/react";
import { FaFacebookF } from "react-icons/fa";

import { Layout, RecentCard, RecipeCard, HeroSlider, TextWithUnderline } from "@components";
import axios from "axios";
import { TRecipes } from "@types";

type THomeProps = {
    recipes: TRecipes
    popularRecipes: TRecipes
};

const Home = ({ recipes, popularRecipes }: THomeProps): ReactElement => {
    return (
        <Layout>
            <Container as="section" maxW="container.xl">
                <HeroSlider recipes={popularRecipes?.data.slice(0, 3)} />
            </Container>
            {/* Bellow hero */}
            <Container as="section" maxW="container.xl">
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing="8" mt={8}>
                    {popularRecipes?.data
                        .slice(1)
                        .slice(-3)
                        .map((recipe) => (
                            <RecipeCard key={recipe.id} {...recipe} />
                        ))}
                </SimpleGrid>
            </Container>
            <Container as="section" maxW="container.xl" mt={16}>
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
                            {popularRecipes?.data && (
                                <RecipeCard
                                    imageHeight={450}
                                    {...popularRecipes.data[0]}
                                />
                            )}
                            <SimpleGrid
                                columns={{ base: 1, md: 2 }}
                                gap="8"
                                mt={8}
                            >
                                {popularRecipes?.data
                                    ? popularRecipes.data
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
                        <SimpleGrid columns={2} gap={4}>
                            <HStack
                                alignItems="center"
                                bgColor="gray.100"
                                p={2}
                            >
                                <Box>
                                    <Icon as={FaFacebookF} />
                                </Box>
                                <Box>Like me on</Box>
                            </HStack>
                            <HStack
                                alignItems="center"
                                bgColor="gray.100"
                                p={2}
                            >
                                <Box>
                                    <Icon as={FaFacebookF} />
                                </Box>
                                <Box>0 Fans</Box>
                            </HStack>
                        </SimpleGrid>
                        <Box mt={8}>
                            <TextWithUnderline
                                title="Nedavni recepti"
                                fontSize="xl"
                            />
                            {recipes !== undefined && recipes?.data.length > 0
                                ? recipes.data
                                      .slice(0, 4)
                                      .map((recipe) => (
                                          <RecentCard
                                              key={recipe.id}
                                              {...recipe}
                                          />
                                      ))
                                : "No data"}
                        </Box>
                    </GridItem>
                </Grid>
            </Container>
        </Layout>
    );
};

export async function getServerSideProps() {
    const recipesResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/recipes?sort[publishedAt]=Desc`,
    );
    const recipes = recipesResponse.data;

    const popularRecipesResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/recipes?filters[isPopular][$eq]=true&sort[publishedAt]=Desc`,
    );
    const popularRecipes = popularRecipesResponse.data;

    return {
        props: {
            recipes: recipes,
            popularRecipes: popularRecipes,
        },
    };
}

export default Home;
