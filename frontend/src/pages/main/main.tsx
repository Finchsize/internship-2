import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BellIcon, ChatIcon, SettingsIcon } from "@chakra-ui/icons";

import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import { ChatDetails } from "../../components/ChatDetails";

export const Main = () => {
  return (
    <Flex
      flexDirection={"row"}
      bgColor={"blackAlpha.50"}
      w={"full"}
      h={"100vh"}
    >
      <Sidebar />
      <VStack w="full" h="full" spacing={"0"}>
        <Topbar />
        <HStack w="full" h="full" alignItems={"flex-end"}>
          <Flex
            alignItems={"flex-start"}
            justifyContent={"flex-end"}
            flexDirection={"column"}
            padding={"1rem"}
            w="full"
          >
            <Input placeholder="Message..." bgColor={"white"} shadow={"sm"} />
          </Flex>
          <ChatDetails />
        </HStack>
      </VStack>
    </Flex>
  );
};
