import React, { ReactElement, useState } from "react";
import { TextWithUnderline } from "@components";
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
import { useCreateRecipe, useGetPrivateUploads } from "@hooks";

const IMAGES = [
    { id: "1", url: "/images/product1.jpg" },
    { id: "2", url: "/images/product2.jpg" },
    { id: "3", url: "/images/product3.jpg" },
];

type FormValues = {
    title: string;
    description: string;
    ingredients: { name: string; amount: string }[];
};

const NewRecipe = (): ReactElement => {
    const { createRecipe, isLoading, isError } = useCreateRecipe();
    const {
        privateUploads,
        isLoading: isLoadingPrivateUploads,
        isError: isErrorPrivateUploads,
    } = useGetPrivateUploads();

    const [imageData, setImageData] = useState<{
        id: string;
        url: string;
    } | null>(null);

    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const {
        handleSubmit,
        control,
        register,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>({
        defaultValues: { ingredients: [{ name: "", amount: "" }] },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: `ingredients`,
    });

    const onSubmit = async (values: any) => {
        await createRecipe(values);
    };

    const handleImageChange = (value: string): void => {
        const [selectedImage] = IMAGES.filter((image) => image.id === value);
        setImageData(selectedImage);
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

                <MainRecipeImage
                    imageUrl={imageData && imageData.url}
                    onClickOpenDrawer={() => setIsDrawerOpen(true)}
                />

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
                <Button
                    mt={4}
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    type="submit"
                >
                    Podijeli
                </Button>
            </form>
            <ImagesDrawer
                isOpen={isDrawerOpen}
                handleOnClose={() => setIsDrawerOpen(false)}
                images={IMAGES}
                onImageChange={(value) => handleImageChange(value)}
                initialImage={imageData?.id ? imageData.id : "undefined"}
            />
        </ProfileLayout>
    );
};

export default NewRecipe;
