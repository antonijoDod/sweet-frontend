import React, { ChangeEvent, ReactElement, useState } from "react";
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
} from "@chakra-ui/react";
import { HiOutlineCamera } from "react-icons/hi";
import { ImageRadioItem, ImagePreviewDrawer } from "@components";

const ImagesDrawer = ({
    isOpen,
    initialImage,
    images,
    handleOnClose,
    onImageChange,
}: {
    isOpen: boolean;
    initialImage: string | undefined;
    images: { id: string; url: string }[];
    handleOnClose: () => void;
    onImageChange: (value: string) => void;
}): ReactElement => {
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const [fileImage, setFileImage] = useState<File | null>(null);

    const handleImageOption = (value: string) => {
        onImageChange(value);
    };

    const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFileImage(files[0]);
            setIsPreviewOpen(true);
        }
    };

    const { getRadioProps } = useRadioGroup({
        defaultValue: initialImage,
        onChange: handleImageOption,
    });

    return (
        <>
            <Drawer onClose={handleOnClose} isOpen={isOpen} size="md">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Dodaj sliku</DrawerHeader>
                    <DrawerBody>
                        <SimpleGrid columns={{ base: 2, sm: 4 }} gap="8">
                            <Box
                                mt={8}
                                h="24"
                                w="24"
                                bgColor="red.500"
                                color="white"
                                _hover={{ bgColor: "red.400" }}
                            >
                                <label
                                    style={{
                                        cursor: "pointer",
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Box textAlign="center">
                                        <Icon
                                            as={HiOutlineCamera}
                                            fontSize="5xl"
                                        />
                                        <Text>Dodaj novu</Text>
                                    </Box>
                                    <input
                                        type="file"
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            display: "none",
                                        }}
                                        onChange={(e) => handleUploadImage(e)}
                                    />
                                </label>
                            </Box>
                            {images.map((image) => (
                                <ImageRadioItem
                                    key={image.id}
                                    url={image.url}
                                    {...getRadioProps({
                                        value: image.id,
                                    })}
                                />
                            ))}
                        </SimpleGrid>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button colorScheme="green">Odaberi sliku</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            {fileImage && (
                <ImagePreviewDrawer
                    fileImage={fileImage}
                    isPreviewOpen={isPreviewOpen}
                    closeImagePreviewDrawer={() => setIsPreviewOpen(false)}
                />
            )}
        </>
    );
};

export default ImagesDrawer;
