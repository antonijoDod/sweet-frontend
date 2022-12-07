import React, { ReactElement } from "react";
import {
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    SimpleGrid,
    Flex,
    Box,
    Icon,
    DrawerFooter,
    Button,
    Text,
    useToast,
    useRadioGroup,
    Stack,
    Input,
    Image,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const ImagePreviewDrawer = ({
    isPreviewOpen,
    fileImage,
    closeImagePreviewDrawer,
}: /* handleOnClose, */
{
    isPreviewOpen: boolean;
    fileImage: File;
    closeImagePreviewDrawer: () => void;
}): ReactElement => {
    const {
        handleSubmit: handlePreviewSubmit,
        register: previewRegister,
        formState: { errors: previewErrors },
    } = useForm({ mode: "onBlur" });

    function onSubmit(values: any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                closeImagePreviewDrawer();
            }, 3000);
        });
    }

    const handleOnClose = () => {
        return null;
    };
    return (
        <Drawer onClose={handleOnClose} isOpen={isPreviewOpen} size="md">
            <DrawerOverlay />
            <form onSubmit={handlePreviewSubmit(onSubmit)}>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Dodaj sliku</DrawerHeader>
                    <DrawerBody>
                        <Box boxSize="xs">
                            <Image
                                src={URL.createObjectURL(fileImage)}
                                alt="Dan Abramov"
                            />
                        </Box>

                        <FormControl isInvalid={previewErrors.name}>
                            <FormLabel htmlFor="name">Naziv</FormLabel>
                            <Input
                                id="name"
                                placeholder="name"
                                defaultValue={fileImage.name}
                                {...previewRegister("name", {
                                    required: "This is required",
                                    minLength: {
                                        value: 4,
                                        message: "Minimum length should be 4",
                                    },
                                })}
                            />
                            <FormErrorMessage>
                                {previewErrors.name &&
                                    previewErrors.name.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl
                            isInvalid={previewErrors.description}
                            mt="8"
                        >
                            <FormLabel htmlFor="description">Opis</FormLabel>
                            <Textarea
                                id="description"
                                placeholder="description"
                                {...previewRegister("description", {
                                    required: "This is required",
                                    minLength: {
                                        value: 4,
                                        message: "Minimum length should be 4",
                                    },
                                })}
                            />
                            <FormErrorMessage>
                                {previewErrors.description &&
                                    previewErrors.description.message}
                            </FormErrorMessage>
                        </FormControl>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button colorScheme="green" type="submit" isFullWidth>
                            Objavi
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </form>
        </Drawer>
    );
};

export default ImagePreviewDrawer;
