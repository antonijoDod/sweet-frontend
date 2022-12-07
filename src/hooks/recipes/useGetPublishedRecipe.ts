import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TRecipe } from "@types";
import qs from "qs";

export const useGetPublishedRecipe = (slug: string) => {
    const {
        data: recipe,
        isLoading,
        isError,
    } = useQuery<TRecipe>(
        ["recipe", slug],
        async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_API}/api/recipes/feed/${slug}`,
            );
            return await res.data.data;
        },
        { keepPreviousData: true },
    );

    return { recipe, isLoading, isError };
};
