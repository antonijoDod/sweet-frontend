import React, { ReactElement, useState } from "react";
import { AddImage, TextWithUnderline } from "@components";
import { ProfileLayout, MainRecipeImage, ImagesDrawer } from "@components";
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
import { HiOutlineTrash } from "react-icons/hi";
import { useCreateRecipe } from "@hooks";

type FormValues = {
    title: string;
    main_image: number;
    description: string;
    ingredients: { name: string; amount: string }[];
    steps: { description: string; step_image: number | null }[];
};

const NewRecipe = (): ReactElement => {
    const { createRecipe, isLoading, isError } = useCreateRecipe();

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
        console.log(
            "🚀 ~ file: novi-recept.tsx:50 ~ onSubmit ~ values",
            values
        );
        await createRecipe({ ...values });
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
                            required: "This is required",
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
                            required: "This is required",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.description && errors.description.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.title ? true : false}>
                    <Controller
                        name="main_image"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { ref, ...rest } }) => (
                            <AddImage {...rest} />
                        )}
                    />

                    <FormErrorMessage>
                        {errors.title && errors.title.message}
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
                            <Input
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
                                name={`steps.${index}.step_image`}
                                control={control}
                                rules={{ required: true }}
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
                        Novi sastojak
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
