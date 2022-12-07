import React, { ReactElement, useState, ChangeEvent } from "react";
import { useGetPublishedRecipes } from "@hooks";

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

    const { recipes, isLoading, isError } = useGetPublishedRecipes({
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
            {/*  <HeroAndBreadcrumb
                title="Pretraži recepte"
                breadcrumbItems={breadcrumbItems}
            /> */}
            <Container maxW="container.xl">
                <Grid gridGap="8" templateColumns={{ md: "repeat(3, 1fr)" }}>
                    <GridItem colSpan={2}>
                        {recipes ? (
                            <FilterList
                                recipes={recipes}
                                isLoading={isLoading}
                                isError={isError}
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
                        <Box mt={8}>
                            <TextWithUnderline
                                title="Nedavni recepti"
                                fontSize="xl"
                            />
                        </Box>
                    </GridItem>
                </Grid>
            </Container>
        </Layout>
    );
};

export default Recipes;
