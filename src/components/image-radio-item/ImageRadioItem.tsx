import React, { ReactElement } from "react";
import Image from "next/image";
import { useRadio, chakra, Box, Flex, Icon } from "@chakra-ui/react";
import { HiCheckCircle } from "react-icons/hi";

type TProps = {
    url: string;
};

const ImageRadioItem = ({ url, ...radioProps }: TProps): ReactElement => {
    const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
        useRadio(radioProps);
    return (
        <chakra.label
            {...htmlProps}
            mt={8}
            h="24"
            w="24"
            alignItems="center"
            justifyContent="center"
            bgColor="red.500"
            color="white"
            position="relative"
            cursor="pointer"
        >
            <input {...getInputProps({})} hidden />
            <Box
                {...getCheckboxProps()}
                bg={state.isChecked ? "green.200" : "transparent"}
                w={12}
                p={1}
                rounded="full"
            >
                <Box h="full" w="full" {...getLabelProps()}>
                    <Image
                        src={url}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                    />
                    <Flex
                        position="relative"
                        alignItems="center"
                        justifyContent="center"
                        h="full"
                        w="full"
                    >
                        {state.isChecked && (
                            <Icon
                                as={HiCheckCircle}
                                fontSize="5xl"
                                color="green.500"
                            />
                        )}
                    </Flex>
                </Box>
            </Box>
        </chakra.label>
    );
};

export default ImageRadioItem;
