import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { TCategories } from '@types'
import axios from 'axios';

export const useGetCategories = () => {
    const {
        data: dataCategories,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
    } = useQuery<TCategories>(
        ["categories"],
        async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_SERVER_API}/api/categories?populate=*`,
            );
            return await res.data;
        },
        { keepPreviousData: true },
    );

    return { dataCategories, isLoadingCategories, isErrorCategories };

}