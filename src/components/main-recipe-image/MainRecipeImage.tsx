import React, { ReactElement } from "react";
import { Button, Flex, Icon, Text, Box } from "@chakra-ui/react";
import { HiOutlineCamera } from "react-icons/hi";
import Image from "next/image";

type TProps = {
    imageUrl: string | null;
    onClickOpenDrawer: () => void;
};

const MainRecipeImage = ({
    imageUrl,
    onClickOpenDrawer,
}: TProps): ReactElement => {
    if (!imageUrl) {
        return (
            <>
                <Button
                    onClick={onClickOpenDrawer}
                    variant="unstyled"
                    mt={8}
                    h="72"
                    w={{ base: "full", md: "96" }}
                    display="block"
                    overflow="hidden"
                >
                    <Flex
                        align="center"
                        justify="center"
                        bg="gray.100"
                        h="full"
                    >
                        <Icon as={HiOutlineCamera} fontSize="5xl" />
                        <Text>Dodaj glavnu fotografiju</Text>
                    </Flex>
                </Button>
            </>
        );
    }

    return (
        <>
            <Box mt={8} h="72" w="96" position="relative">
                <Image
                    src={imageUrl}
                    layout="fill"
                    objectFit="cover"
                    alt="Empty"
                />
                <Box
                    position="absolute"
                    zIndex={999}
                    bottom="0"
                    left="0"
                    right="0"
                >
                    <Flex w="full" justifyContent="space-between" p="4">
                        <Button
                            onClick={onClickOpenDrawer}
                            size="sm"
                            variant="outline"
                            backgroundColor="white"
                        >
                            Promijeni
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            backgroundColor="white"
                        >
                            Ukloni
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </>
    );
};

export default MainRecipeImage;
