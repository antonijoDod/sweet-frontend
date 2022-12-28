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
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    useDisclosure,
    PopoverFooter,
    ButtonGroup,
    Alert,
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
import { useDeleteRecipe } from "@hooks/recipes";
import { useRouter } from "next/router";

type TRecipeProps = {
    recipe: TRecipe;
};

const Recipe = ({ recipe }: TRecipeProps): ReactElement => {
    const { data: session, status } = useSession();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const deleteRecipe = useDeleteRecipe();
    const router = useRouter();

    const handleDeleteRecipe = async () => {
        await deleteRecipe.mutate(recipe.id, {
            onSuccess: () => {
                router.push("/moj-profil");
            },
        });
    };

    if (!recipe) return <Text>Something is wrong</Text>;

    return (
        <Layout>
            <HeroAndBreadcrumb title={recipe.attributes.title} />
            <Container maxW="container.xl" mt="16">
                <Grid gap={16} templateColumns={{ md: "repeat(3, 1fr)" }}>
                    <GridItem colSpan={2}>
                        {status === "authenticated" &&
                            session?.id === recipe.attributes.owner.data.id && (
                                <>
                                    <Button
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Delete
                                    </Button>
                                    <Popover isOpen={isModalOpen}>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverHeader>
                                                Obriši recept?
                                            </PopoverHeader>
                                            <PopoverBody>
                                                Da li ste sigurni da želite
                                                obrisati ovaj recept?
                                                {deleteRecipe.isError && (
                                                    <Alert status="error">
                                                        {deleteRecipe?.error}
                                                    </Alert>
                                                )}
                                            </PopoverBody>
                                            <PopoverFooter>
                                                <ButtonGroup>
                                                    <Button
                                                        onClick={() =>
                                                            setIsModalOpen(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        Ne
                                                    </Button>
                                                    <Button
                                                        onClick={
                                                            handleDeleteRecipe
                                                        }
                                                        colorScheme="red"
                                                        isLoading={
                                                            deleteRecipe.isLoading
                                                        }
                                                    >
                                                        Da, obriši
                                                    </Button>
                                                </ButtonGroup>
                                            </PopoverFooter>
                                        </PopoverContent>
                                    </Popover>
                                </>
                            )}
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
                                <HStack align="center" h="full">
                                    <Icon as={HiUser} color="red.500" />
                                    <Text color="gray.600">
                                        by{" "}
                                        {
                                            recipe.attributes.owner.data
                                                .attributes.username
                                        }
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
                            {recipe.attributes.main_image.data ? (
                                <Image
                                    src={
                                        recipe.attributes.main_image.data
                                            ?.attributes.formats.large
                                            ? process.env
                                                  .NEXT_PUBLIC_SERVER_API +
                                              recipe.attributes.main_image.data
                                                  ?.attributes.formats.large.url
                                            : process.env
                                                  .NEXT_PUBLIC_SERVER_API +
                                              recipe.attributes.main_image.data
                                                  ?.attributes.url
                                    }
                                    layout="fill"
                                    objectFit="cover"
                                    alt={recipe.attributes.title}
                                />
                            ) : (
                                <Image
                                    src="/images/no-image.jpg"
                                    layout="fill"
                                    objectFit="cover"
                                    alt={recipe.attributes.title}
                                />
                            )}
                        </Box>
                        {/* Details with icons */}
                        <Box bg={"gray.50"} p="6" mt={8}>
                            <SimpleGrid columns={{ base: 1, sm: 2 }} gap={8}>
                                <InfoWithIcon
                                    icon={RiKnifeLine}
                                    label="Priprema"
                                    value="150 min"
                                />
                                <InfoWithIcon
                                    icon={GiCookingGlove}
                                    label="Pečenje"
                                    value="150 min"
                                />
                                <InfoWithIcon
                                    icon={HiOutlineClock}
                                    label="Ukupno"
                                    value="150 min"
                                />
                                <InfoWithIcon
                                    icon={HiOutlineUsers}
                                    label="Za osoba"
                                    value="5 osoba"
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
