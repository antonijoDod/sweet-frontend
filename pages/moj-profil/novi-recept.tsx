import React, { ReactElement, useState, useRef } from "react";
import { AddImage, TextWithUnderline, ProfileLayout } from "@components";
import Router from "next/router";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Textarea,
    Box,
    HStack,
    Stack,
    IconButton,
} from "@chakra-ui/react";
import Select from "react-select";
import { HiOutlineTrash } from "react-icons/hi";
import { useCreateRecipe } from "@hooks";
import { useGetCategories } from "@hooks/categories";

type FormValues = {
    title: string;
    main_image: number;
    description: string;
    categories: number[];
    ingredients: { name: string; amount: string }[];
    steps: { description: string; step_image: number | null }[];
};

const NewRecipe = (): ReactElement => {
    const router = Router;
    const { createRecipe, isLoading, isError } = useCreateRecipe();
    const { dataCategories, isErrorCategories, isLoadingCategories } =
        useGetCategories();
    const inputRef = useRef();

    const [categoriesOption, setCategoriesOption] = useState<
        { value: number; label: string }[]
    >([]);

    const [imageData, setImageData] = useState<{
        id: number;
        url: string;
    } | null>(null);

    const {
        handleSubmit,
        control,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: {
            ingredients: [{ name: "", amount: "" }],
            steps: [{ description: "", step_image: null }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: `ingredients`,
    });

    const {
        fields: fieldsSteps,
        append: appendSteps,
        remove: removeSteps,
    } = useFieldArray({
        control,
        name: `steps`,
    });

    const onSubmit = async (values: any) => {
        await createRecipe(
            { ...values },
            {
                onSuccess: () => {
                    router.push("/moj-profil");
                },
            }
        );
    };

    return (
        <ProfileLayout>
            <TextWithUnderline title="Dodaj recept" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={errors.title ? true : false}>
                    <FormLabel htmlFor="title">Naziv</FormLabel>
                    <Input
                        id="title"
                        placeholder="title"
                        {...register("title", {
                            required: "Naziv recepta je obavezan",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.title && errors.title.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl
                    isInvalid={errors.description ? true : false}
                    mt="8"
                >
                    <FormLabel htmlFor="description">Opis</FormLabel>

                    <Textarea
                        id="description"
                        placeholder="description"
                        {...register("description", {
                            required: "Opis je obavezan",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.description && errors.description.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl
                    mt="8"
                    isInvalid={errors.categories ? true : false}
                >
                    <FormLabel htmlFor="category">Kategorija</FormLabel>

                    <Controller
                        control={control}
                        name="categories"
                        rules={{
                            required: "Odaberi kategoriju",
                        }}
                        render={({ field: { onChange, ref } }) => (
                            <Select
                                isMulti
                                isLoading={isLoadingCategories}
                                options={dataCategories?.data.map(
                                    (category) => ({
                                        value: category.id,
                                        label: category.attributes.name,
                                    })
                                )}
                                onChange={(value) =>
                                    onChange(value.map((val) => val.value))
                                }
                            />
                        )}
                    />

                    <FormErrorMessage>
                        {errors.categories && errors.categories.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.main_image ? true : false}>
                    <Controller
                        name="main_image"
                        control={control}
                        rules={{
                            required: "Odaberi sliku",
                        }}
                        render={({ field: { ref, ...rest } }) => (
                            <AddImage {...rest} />
                        )}
                    />

                    <FormErrorMessage>
                        {errors.main_image && errors.main_image.message}
                    </FormErrorMessage>
                </FormControl>

                <Box mt="8">
                    <TextWithUnderline title="Sastojci" />
                    {fields.map((field, index) => (
                        <HStack
                            key={field.id}
                            justify="space-between"
                            mt="4"
                            alignItems="start"
                        >
                            <Stack
                                direction={{ base: "column", md: "row" }}
                                flex={1}
                            >
                                <Input
                                    id={field.id}
                                    w="full"
                                    placeholder="Naziv sastojka"
                                    {...register(
                                        `ingredients.${index}.name` as const,
                                        {
                                            required: "This is required",
                                        }
                                    )}
                                />
                                <Input
                                    id={field.id}
                                    placeholder="Kolicina sastojka (npr: 200 grama)"
                                    w="full"
                                    {...register(
                                        `ingredients.${index}.amount` as const,
                                        {
                                            required: "This is required",
                                        }
                                    )}
                                />
                            </Stack>
                            <IconButton
                                icon={<HiOutlineTrash />}
                                aria-label="Remove ingredient"
                                onClick={() => remove(index)}
                            />
                        </HStack>
                    ))}
                    <Button
                        mt="8"
                        variant="outline"
                        size="sm"
                        colorScheme="green"
                        onClick={() => {
                            append({ name: "", amount: "" });
                        }}
                    >
                        Novi sastojak
                    </Button>
                </Box>

                {/* Koraci */}

                <Box mt="8">
                    <TextWithUnderline title="Koraci" />
                    {fieldsSteps.map((field, index) => (
                        <Box key={field.id} mt="4">
                            <Textarea
                                w="full"
                                placeholder="Opis koraka"
                                {...register(
                                    `steps.${index}.description` as const,
                                    {
                                        required: "This is required",
                                    }
                                )}
                            />
                            <Controller
                                name={`steps.${index}.step_image` as const}
                                control={control}
                                render={({ field: { ref, ...rest } }) => (
                                    <AddImage {...rest} />
                                )}
                            />
                            <IconButton
                                icon={<HiOutlineTrash />}
                                aria-label="Remove step"
                                onClick={() => removeSteps(index)}
                            />
                        </Box>
                    ))}
                    <Button
                        mt="8"
                        variant="outline"
                        size="sm"
                        colorScheme="green"
                        onClick={() => {
                            appendSteps({ description: "", step_image: null });
                        }}
                    >
                        Novi korak
                    </Button>
                </Box>
                <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                >
                    Podijeli
                </Button>
            </form>
        </ProfileLayout>
    );
};

export default NewRecipe;
