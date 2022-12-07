import React, { ReactElement, useState } from "react";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { SimpleGrid, Input, Flex } from "@chakra-ui/react";
import { useGetPublishedRecipes } from "@hooks";
import ReactPaginate from "react-paginate";
import { RecipeCard } from "@components";
import { TRecipes } from "@types";
import axios from "axios";
import styles from "./filter-list.module.css";
import qs from "qs";

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
    const handlePageClick = (event: any) => {
        console.log(event);
    };

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
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={20}
                previousLabel="< previous"
                // @ts-ignore
                renderOnZeroPageCount={null}
                containerClassName={styles.container}
                pageLinkClassName={styles.pagination__link}
                previousLinkClassName={styles.pagination__link__prev}
                nextLinkClassName={styles.pagination__link__next}
                disabledClassName={styles.pagination__link_disabled}
                activeClassName={styles.pagination__link__active}
            />
        </>
    );
};

export default FilterList;