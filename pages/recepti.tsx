import React, { ReactElement, useState, ChangeEvent } from "react";
import { useGetRecipes } from "@hooks/recipes";

import {
    Layout,
    HeroAndBreadcrumb,
    FilterList,
    TextWithUnderline,
    FilterCategories,
} from "@components";
import { Container, Grid, GridItem, Box, Button } from "@chakra-ui/react";

const breadcrumbItems = [
    { label: "Početna", href: "/" },
    { label: "Recepti", href: "/recepti" },
];

const Recipes = (): ReactElement => {
    const [textFilter, setTextFilter] = useState<string>("");
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

    const recipesQuery = useGetRecipes({
        text: textFilter,
        categories: selectedCategories,
    });

    const handleTextChange = (e: string) => {
        setTextFilter(e);
    };

    const handleSelectCategory = (e: ChangeEvent<HTMLInputElement>) => {
        const value: number = parseInt(e.target.value);

        if (selectedCategories.includes(value)) {
            const removedItem = selectedCategories.filter((id) => id !== value);
            setSelectedCategories(removedItem);
        } else {
            setSelectedCategories([...selectedCategories, value]);
        }
    };

    return (
        <Layout>
            <HeroAndBreadcrumb title="Pretraži recepte" />
            <Container maxW="container.xl" mb={8}>
                <Grid gridGap="8" templateColumns={{ md: "repeat(3, 1fr)" }}>
                    <GridItem colSpan={2}>
                        {recipesQuery.data ? (
                            <FilterList
                                recipes={recipesQuery.data}
                                isLoading={recipesQuery.isLoading}
                                isError={recipesQuery.isError}
                                onTextChange={handleTextChange}
                            />
                        ) : null}
                    </GridItem>
                    <GridItem>
                        <Box mt="8">
                            <TextWithUnderline title="Odaberi kategoriju" />
                            <FilterCategories
                                onCategorySelect={handleSelectCategory}
                                selectedCategories={selectedCategories}
                            />
                        </Box>
                    </GridItem>
                </Grid>
            </Container>
        </Layout>
    );
};

export default Recipes;
