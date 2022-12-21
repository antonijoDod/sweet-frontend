import React, { ReactElement } from "react";
import { ProfileLayout, RecipeCard, LoadingSpinner } from "@components";
import {
    Box,
    Button,
    Divider,
    Text,
    Heading,
    HStack,
    SimpleGrid,
    useDisclosure,
} from "@chakra-ui/react";
import { useGetPrivateRecipes } from "@hooks";
import NextLink from "next/link";

const MyProfile = (): ReactElement => {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const { privateRecipes, isLoading, isError } = useGetPrivateRecipes();

    const handleDeleteRecipe = (id: number) => {
        console.log("🚀 ~ file: index.tsx:21 ~ handleDeleteRecipe ~ id", id);
    };

    // When I choose to delete a recipe, I want to show a popover with a confirmation
    // message and two buttons: "Yes" and "No". If I click "Yes", I want to delete

    // run handleDeleteRecipe(id)
    // open popover
    // When i click "Yes", I want to call hook deleteRecipe(id) and close the popover
    // If is success, I want to refresh react-query cache and close the popover
    // Show toast message "Recipe is deleted"

    // if I click "No", I want to close the popover

    if (isLoading)
        return (
            <ProfileLayout>
                <LoadingSpinner />
            </ProfileLayout>
        );
    if (isError) return <ProfileLayout>Error is occurred</ProfileLayout>;
    if (!privateRecipes)
        return <ProfileLayout>Something is wrong</ProfileLayout>;

    const isRecipeDataEmpty = privateRecipes.data.length === 0;

    return (
        <ProfileLayout>
            <Box p={8}>
                <Box mb={8}>
                    <HStack justifyContent="space-between">
                        <Heading size="lg">Moji recepti</Heading>
                        <Button
                            as={NextLink}
                            href="/moj-profil/novi-recept"
                            colorScheme="red"
                        >
                            Dodaj recept
                        </Button>
                    </HStack>
                    <Text mt={4}>
                        Svi moji objavljeni i neobjavljeni recepti
                    </Text>
                </Box>
                <Divider mb={8} />
                {isRecipeDataEmpty ? (
                    <HStack>
                        <Button as={NextLink} href="/moj-profil/novi-recept">
                            Dodaj novi recept
                        </Button>
                    </HStack>
                ) : (
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={8}>
                        {privateRecipes.data.map((recipe) => (
                            <Box key={recipe.id}>
                                <Box mb={2}>
                                    {recipe.attributes.publishedAt ? (
                                        <Box bg="green.100" p={2}>
                                            Objavljeno
                                        </Box>
                                    ) : (
                                        <Box bg="red.100" p={2}>
                                            Ceka potvrdu admina
                                        </Box>
                                    )}
                                </Box>
                                <RecipeCard {...recipe} />
                                <Button
                                    onClick={() =>
                                        handleDeleteRecipe(recipe.id)
                                    }
                                    mt={4}
                                    size="xs"
                                    variant="outline"
                                >
                                    Delete
                                </Button>
                            </Box>
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </ProfileLayout>
    );
};

export default MyProfile;
