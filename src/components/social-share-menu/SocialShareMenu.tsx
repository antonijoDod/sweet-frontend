import React, { ReactElement } from "react";
import {
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    Text,
    Box,
    HStack,
} from "@chakra-ui/react";
import { HiOutlineShare } from "react-icons/hi";
import { FacebookShareButton, FacebookIcon } from "react-share";

const SocialShareMenu = (): ReactElement => {
    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HiOutlineShare />}
                variant="outline"
            />
            <MenuList>
                <Box p={2}>
                    <FacebookShareButton
                        url="https://antonijo.com"
                        style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                        }}
                    >
                        <HStack>
                            <FacebookIcon size={32} />
                            <Text>Facebook</Text>
                        </HStack>
                    </FacebookShareButton>
                </Box>
            </MenuList>
        </Menu>
    );
};

export default SocialShareMenu;
