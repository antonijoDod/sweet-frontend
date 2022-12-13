import { Checkbox, Stack } from "@chakra-ui/react";
import React, { ChangeEvent, ReactElement } from "react";
import { useQuery } from "@tanstack/react-query";
import { TCategories } from "@types";
import axios from "axios";
import { useGetCategories } from "@hooks/categories";

type TFilterCategoriesProps = {
    selectedCategories: number[];
    onCategorySelect: (categories: ChangeEvent<HTMLInputElement>) => void;
};

const FilterCategories = ({
    onCategorySelect,
}: TFilterCategoriesProps): ReactElement => {
    const { dataCategories, isLoadingCategories, isErrorCategories } =
        useGetCategories();

    if (isLoadingCategories) return <>Loading</>;
    if (isErrorCategories) return <>Error is occurred</>;
    if (!dataCategories) return <>Something went wrong</>;

    return (
        <Stack gap={2}>
            {dataCategories?.data.map((category) => (
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
