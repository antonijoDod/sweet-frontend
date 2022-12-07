import { Checkbox, Stack } from "@chakra-ui/react";
import React, { ChangeEvent, ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { TCategories } from "@types";
import axios from "axios";

type TFilterCategoriesProps = {
    selectedCategories: number[];
    onCategorySelect: (categories: ChangeEvent<HTMLInputElement>) => void;
};

const FilterCategories = ({
    onCategorySelect,
}: TFilterCategoriesProps): ReactElement => {
    const {
        data: allCategories,
        isLoading,
        isError,
    } = useQuery<TCategories>(["categories"], async () => {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_API}/api/categories?populate=*`
        );
        return await res.data;
    });

    if (!allCategories) return <>Something went wrong</>;
    if (isLoading) return <>Loading</>;
    if (isError) return <>Error is occurred</>;

    return (
        <Stack gap={2}>
            {allCategories?.data.map((category) => (
                <Checkbox
                    key={category.id}
                    value={category.id}
                    onChange={(event) => onCategorySelect(event)}
                >
                    {category.attributes.name}
                </Checkbox>
            ))}
        </Stack>
    );
};

export default FilterCategories;
