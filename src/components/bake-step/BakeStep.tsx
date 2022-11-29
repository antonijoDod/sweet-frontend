import React, { ReactElement } from "react";
import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { TStep } from "@types";

interface IBakeStepProps extends TStep {
    stepNumber: number;
}

const BakeStep = ({
    id,
    stepNumber,
    description,
    step_image,
}: IBakeStepProps): ReactElement => {
    const itHasSmallImage = () => {
        if (step_image.data?.attributes.formats.small) {
            return true;
        }
        return false;
    };

    return (
        <Box mt={8}>
            <Flex gap={4}>
                <Box>
                    <Text
                        bgColor="red.500"
                        color="white"
                        p={4}
                        fontWeight="bold"
                        fontSize="2xl"
                    >
                        {stepNumber + 1}.
                    </Text>
                </Box>
                <Box w="full">
                    <Box pt={2}>
                        <ReactMarkdown>{description}</ReactMarkdown>
                    </Box>
                    <Box position="relative" h={72} mt="8">
                        {step_image.data ? (
                            <Image
                                src={
                                    itHasSmallImage()
                                        ? process.env.NEXT_PUBLIC_SERVER_API +
                                          step_image.data?.attributes.formats
                                              .small.url
                                        : process.env.NEXT_PUBLIC_SERVER_API +
                                          step_image.data?.attributes.url
                                }
                                layout="fill"
                                objectFit="cover"
                                alt={step_image.data.attributes.name}
                            />
                        ) : (
                            <Image
                                src="/images/product1.jpg"
                                layout="fill"
                                objectFit="cover"
                                alt="No image"
                            />
                        )}
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default BakeStep;
