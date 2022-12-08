import React, { ReactElement } from "react";
import Image from "next/image";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { HiCheckCircle } from "react-icons/hi";

type TImageItemProps = {
    id: number;
    url: string;
    isChecked: boolean;
    onSelect: (e: { id: number; url: string }) => void;
};

const ImageItem = ({
    id,
    isChecked = true,
    url = "",
    onSelect,
}: TImageItemProps): ReactElement => {
    return (
        <Box
            mt={8}
            h="24"
            w="24"
            alignItems="center"
            justifyContent="center"
            bgColor="red.500"
            color="white"
            position="relative"
            cursor="pointer"
            onClick={() => onSelect({ id: id, url: url })}
        >
            <Box
                bg={isChecked ? "green.200" : "transparent"}
                w={12}
                p={1}
                rounded="full"
            >
                <Box h="full" w="full">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_API + url}`}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        alt="my image"
                    />
                    <Flex
                        position="relative"
                        alignItems="center"
                        justifyContent="center"
                        h="full"
                        w="full"
                    >
                        {isChecked && (
                            <Icon
                                as={HiCheckCircle}
                                fontSize="5xl"
                                color="green.500"
                            />
                        )}
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default ImageItem;
