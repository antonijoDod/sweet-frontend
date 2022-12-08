import React, { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi";
import { Box, Icon, Text, Flex, Button } from "@chakra-ui/react";
import { useCreatePrivateUpload } from "@hooks/private-uploads";
import FormData from "form-data";
import Image from "next/image";
import { TPrivateUpload } from "@types";

const AddImage = ({ onChange }) => {
    const { uploadImage, isLoading, isError } = useCreatePrivateUpload();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleUploadImage = async (e) => {
        e.preventDefault();
        const files = e.target.files;
        if (files) {
            const data = { file: "media", name: "my-image" };
            let formData = new FormData();

            formData.append("files.media", files[0]);

            formData.append("data", JSON.stringify(data));

            await uploadImage(formData, {
                onSuccess: (data: { data: TPrivateUpload }) => {
                    setImageUrl(
                        data.data.attributes.media.data.attributes.formats
                            .thumbnail.url
                    );
                    onChange(data.data.attributes.media.data.id);
                },
            });
        }
    };

    if (!imageUrl) {
        return (
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
                        <Icon as={HiOutlineCamera} fontSize="5xl" />
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
        );
    }

    return (
        <Box mt={8} h="36" w="48" position="relative">
            <Image
                src={`${process.env.NEXT_PUBLIC_SERVER_API + imageUrl}`}
                layout="fill"
                objectFit="cover"
                alt="Empty"
            />
            <Box position="absolute" zIndex={999} bottom="0" left="0" right="0">
                <Flex w="full" justifyContent="space-between" p="4">
                    <Button size="sm" colorScheme="red">
                        Ukloni
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
};

export default AddImage;
