import React, { ReactElement, ChangeEvent } from "react";
import { Icon, Box, Text } from "@chakra-ui/react";
import { HiOutlineCamera } from "react-icons/hi";
import { LoadingSpinner } from "@components";

type TEmptyImageProps = {
    isLoading: boolean;
    onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const EmptyImage = ({
    isLoading,
    onImageChange,
}: TEmptyImageProps): ReactElement => {
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
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <Box textAlign="center">
                        <Icon as={HiOutlineCamera} fontSize="5xl" />
                        <Text>Dodaj sliku</Text>
                    </Box>
                )}
                <input
                    type="file"
                    style={{
                        height: "100%",
                        width: "100%",
                        display: "none",
                    }}
                    onChange={(event) => onImageChange(event)}
                />
            </label>
        </Box>
    );
};

export default EmptyImage;
