import React from "react";
import { ProfileLayout } from "@components";
import { Box } from "@chakra-ui/react";

const Settings = () => {
    return (
        <ProfileLayout>
            {" "}
            <Box bgColor="red.100" h="48">
                Stranica za postavke
            </Box>
        </ProfileLayout>
    );
};

export default Settings;
