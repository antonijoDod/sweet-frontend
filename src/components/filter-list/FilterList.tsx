import React, { ReactElement, useState } from "react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { SimpleGrid, Input, Text, Box, HStack } from "@chakra-ui/react";
import { useGetRecipes } from "@hooks/recipes";
import ReactPaginate from "react-paginate";
import { RecipeCard, Pagination } from "@components";
import { TRecipes } from "@types";
import axios from "axios";
import styles from "./filter-list.module.css";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Select from "react-select";

type TFilterListProps = {
    recipes: TRecipes;
    isLoading: boolean;
    isError: boolean;
    onTextChange: (e: string) => void;
};

const FilterList = ({
    recipes,
    isLoading,
    isError,
    onTextChange,
}: TFilterListProps): ReactElement => {
    const handlePageChange = (selectedPageId: number) => {};

    if (isLoading) return <>Loading</>;
    if (isError) return <>Something went wrong</>;

    return (
        <>
            <Input
                mt={8}
                type="text"
                placeholder="Unesi pojam"
                onChange={(e) => onTextChange(e.target.value)}
            />
            {!isLoading ? (
                <SimpleGrid columns={{ md: 2 }} gap={8} mt={8}>
                    {recipes?.data.length > 0
                        ? recipes?.data.map((recipe) => (
                              <RecipeCard key={recipe.id} {...recipe} />
                          ))
                        : "Nema rezultata"}
                </SimpleGrid>
            ) : (
                "Loading"
            )}
            {recipes?.data.length > 0
                ? recipes.meta.pagination.pageCount > 1 && (
                      <Pagination
                          onPageChange={(selectedPageId) =>
                              handlePageChange(selectedPageId)
                          }
                          pageCount={recipes.meta.pagination.pageCount}
                      />
                  )
                : null}
        </>
    );
};

export default FilterList;
