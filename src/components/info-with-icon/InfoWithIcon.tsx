import React, { ReactElement, ReactNode } from "react";
import { HStack, Icon, Box, Heading, Text } from "@chakra-ui/react";

type TInfoWithIconProps = {
    icon: any;
    label: string;
    value: string | number;
};

const InfoWithIcon = ({
    icon,
    label,
    value,
}: TInfoWithIconProps): ReactElement => {
    return (
        <HStack>
            <Icon as={icon} fontSize="3xl" color="red.500" />
            <Box>
                <Heading as="h3" fontSize="xl" color="gray.500">
                    {label}
                </Heading>
                <Text as="b">{value}</Text>
            </Box>
        </HStack>
    );
};

export default InfoWithIcon;
