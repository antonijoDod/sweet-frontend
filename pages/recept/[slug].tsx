import React, { ReactElement } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Layout,
  HeroAndBreadcrumb,
  TextWithUnderline,
  BakeStep,
  SocialShareMenu,
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
  HiUsers,
  HiViewList,
} from "react-icons/hi";
import axios from "axios";
import { TRecipe, TRecipes } from "@types";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

const breadcrumbItems = [
  { label: "Početna", href: "/" },
  { label: "Detalji recepta", href: "/recepti" },
];

type TRecipeProps = {
  recipe: TRecipe;
};

const Recipe = ({ recipe }: TRecipeProps): ReactElement => {
  if (!recipe) return <Text>Something is wrong</Text>;

  return (
    <Layout>
      <HeroAndBreadcrumb
        title={recipe.attributes.title}
        breadcrumbItems={breadcrumbItems}
      />
      <Container maxW="container.xl" mt="16">
        <Grid gap={16} templateColumns={{ md: "repeat(3, 1fr)" }}>
          <GridItem colSpan={2}>
            <HStack alignItems="center" mb={4}>
              <Text>Bez kategorije</Text>
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
                  <Icon as={HiOutlineCalendar} color="red.500" />
                  <Text color="gray.600">
                    {format(
                      new Date(recipe.attributes.publishedAt),
                      "dd.MM.yyyy"
                    )}
                  </Text>
                </HStack>
                <HStack align="center" h="full">
                  <Icon as={HiUser} color="red.500" />
                  <Text color="gray.600">
                    by {recipe.attributes.owner.data.attributes.username}
                  </Text>
                </HStack>
                <HStack align="center" h="full">
                  <Icon as={HiHeart} color="red.500" />
                  <Text color="gray.600">5</Text>
                </HStack>
              </HStack>
              <SocialShareMenu />
            </Stack>
            {/* Image */}
            <Box position="relative" h={96} mt="8">
              <Image
                src="/images/product1.jpg"
                layout="fill"
                objectFit="cover"
                alt={recipe.attributes.title}
              />
            </Box>
            {/* Details with icons */}
            <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={2}>
              <HStack p={4} bgColor="gray.100">
                <Icon as={HiOutlineClock} fontSize="3xl" color="gray.600" />
                <Box>
                  <Text as="b" fontSize="lg">
                    PRIPREMA
                  </Text>
                  <Text>{recipe.attributes.preparing_time} min</Text>
                </Box>
              </HStack>
              <HStack p={4} bgColor="gray.100">
                <Icon as={HiOutlineClock} fontSize="3xl" color="gray.600" />
                <Box>
                  <Text as="b" fontSize="lg">
                    PEČENJE
                  </Text>
                  <Text>{recipe.attributes.cooking_time} min</Text>
                </Box>
              </HStack>
              <HStack p={4} bgColor="gray.100">
                <Icon as={HiUsers} fontSize="3xl" color="gray.600" />
                <Box>
                  <Text as="b" fontSize="lg">
                    ZA
                  </Text>
                  <Text>{recipe.attributes.serving_for} osoba</Text>
                </Box>
              </HStack>
              <HStack p={4} bgColor="gray.100">
                <Icon as={HiUsers} fontSize="3xl" color="gray.600" />
                <Box>
                  <Text as="b" fontSize="lg">
                    ZA
                  </Text>
                  <Text>5 osoba</Text>
                </Box>
              </HStack>
            </SimpleGrid>
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
                <Icon as={HiViewList} fontSize="3xl" color="red.500" />
                <Heading as="h3" fontSize="2xl">
                  Sastojci
                </Heading>
              </HStack>
              <Flex direction={"column"} gap={2} mt="4" color={"gray.700"}>
                {recipe.attributes.ingredients.length > 0 ? (
                  recipe.attributes.ingredients.map((ingredient) => (
                    <Checkbox key={ingredient.id}>
                      <Text ml={2}>
                        {ingredient.name}
                        {" - "}
                        {ingredient.amount}
                      </Text>
                    </Checkbox>
                  ))
                ) : (
                  <Text>Sastojci nisu dodani</Text>
                )}
              </Flex>
            </Box>
            {/* Directions */}
            <Box mt={8}>
              <TextWithUnderline title="Priprema" fontSize="2xl" />
              {recipe.attributes.steps.length > 0 ? (
                recipe.attributes.steps.map((step, index) => (
                  <BakeStep key={step.id} stepNumber={index} {...step} />
                ))
              ) : (
                <Text>Nema koraka pripreme</Text>
              )}
            </Box>
          </GridItem>
          <GridItem colSpan={1}>2</GridItem>
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

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const recipeResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_API}/api/recipes/feed/${slug}`
  );

  const recipe = recipeResponse.data.data;

  return {
    props: {
      recipe,
    },
  };
}

export default Recipe;
