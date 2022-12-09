import React, { ReactElement } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import Image from "next/image";

type TImageExistProps = {
    id: number;
    imageUrl: string;
    onClickDeleteImage: (imageId: number) => void;
};

const ImageExist = ({
    id,
    imageUrl,
    onClickDeleteImage,
}: TImageExistProps): ReactElement => {
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
                    <Button
                        size="sm"
                        colorScheme="red"
                        onClick={() => onClickDeleteImage(id)}
                    >
                        Ukloni
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
};

export default ImageExist;
