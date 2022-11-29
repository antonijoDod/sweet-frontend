import React, { ReactElement } from "react";
import { Box, Text } from "@chakra-ui/react";

interface IProps {
    title: string;
    fontSize?: "xl" | "2xl";
}

const TextWithUnderline = ({
    title,
    fontSize = "xl",
    ...rest
}: IProps): ReactElement => {
    return (
        <Box
            mb={8}
            borderBottom="1px"
            position="relative"
            borderColor="blackAlpha.400"
            _before={{
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                height: "3px",
                width: "50px",
                backgroundColor: "red.500",
                marginBottom: "-2px",
            }}
            {...rest}
        >
            <Text
                fontSize={fontSize}
                textTransform="uppercase"
                fontWeight={600}
                color="gray.900"
                mb={2}
            >
                {title}
            </Text>
        </Box>
    );
};

export default TextWithUnderline;
