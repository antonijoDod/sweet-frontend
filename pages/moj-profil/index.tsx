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
} from "@chakra-ui/react";
import { useGetPrivateRecipes } from "@hooks";
import NextLink from "next/link";

const MyProfile = (): ReactElement => {
    const { privateRecipes, isLoading, isError } = useGetPrivateRecipes();

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
                    <SimpleGrid columns={2} gap={8}>
                        {privateRecipes.data.map((recipe) => (
                            <RecipeCard key={recipe.id} {...recipe} />
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </ProfileLayout>
    );
};

export default MyProfile;
