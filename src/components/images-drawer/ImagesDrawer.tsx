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
import {
    ImageRadioItem,
    ImagePreviewDrawer,
    LoadingSpinner,
    ImageItem,
} from "@components";
import { useGetPrivateUploads } from "@hooks";

const ImagesDrawer = ({
    isOpen,
    initialImage,
    handleOnClose,
    onImageChange,
}: {
    isOpen: boolean;
    initialImage: string | undefined;
    handleOnClose: () => void;
    onImageChange: (event: { id: number; url: string }) => void;
}): ReactElement => {
    const {
        privateUploads,
        isLoading: isLoadingPrivateUploads,
        isError: isErrorPrivateUploads,
    } = useGetPrivateUploads();

    const [activeImage, setActiveImage] = useState<number | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const [fileImage, setFileImage] = useState<File | null>(null);

    const handleSelectImageItem = ({
        id,
        url,
    }: {
        id: number;
        url: string;
    }) => {
        setActiveImage(id);
        onImageChange({ id, url });
    };

    const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFileImage(files[0]);
            setIsPreviewOpen(true);
        }
    };

    if (isErrorPrivateUploads) return <>Error occurred</>;
    if (!privateUploads) return <>Something is went wrong</>;

    return (
        <>
            <Drawer onClose={handleOnClose} isOpen={isOpen} size="md">
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Dodaj sliku</DrawerHeader>
                    <DrawerBody>
                        {isLoadingPrivateUploads ? (
                            <LoadingSpinner />
                        ) : (
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
                                            onChange={(e) =>
                                                handleUploadImage(e)
                                            }
                                        />
                                    </label>
                                </Box>
                                {privateUploads.data.map((image) => (
                                    <ImageItem
                                        key={image.id}
                                        id={image.attributes.media.data.id}
                                        url={
                                            image.attributes.media.data
                                                .attributes.formats.thumbnail
                                                .url
                                        }
                                        onSelect={(event) =>
                                            handleSelectImageItem(event)
                                        }
                                        isChecked={activeImage === image.id}
                                    />
                                ))}
                            </SimpleGrid>
                        )}
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
