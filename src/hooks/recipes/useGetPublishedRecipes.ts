import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TRecipes } from "@types";
import qs from "qs";

type TProps = {
    text: string;
    categories: number[];
};

export const useGetPublishedRecipes = ({ text, categories }: TProps) => {
    const query = qs.stringify(
        {
            filters: {
                title: {
                    $contains: text,
                },
                categories: {
                    id: {
                        $in: categories,
                    },
                },
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        },
    );

    const {
        data: recipes,
        isLoading,
        isError,
    } = useQuery<TRecipes>(
        ["recipes", query],
        async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_API}/api/recipes?sort[publishedAt]=Desc&${query}`,
            );
            return await res.data;
        },
        { keepPreviousData: true },
    );

    return { recipes, isLoading, isError };
};
