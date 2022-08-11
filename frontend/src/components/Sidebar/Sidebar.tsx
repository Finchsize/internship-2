import { ChatIcon, BellIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Text,
  Flex,
  Heading,
  List,
  ListItem,
  Button,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const channels = ["main", "conversation", "off-topic", "music"];

export const Sidebar = ({ nickname }: { nickname: string | undefined }) => {
  const { t } = useTranslation("sidebar");
  return (
    <Flex
      flexDirection={"column"}
      w={"20rem"}
      justifyContent={"space-between"}
      bgColor={"white"}
      borderRight={"1px"}
      borderColor={"blackAlpha.200"}
      p={"0.5rem"}
    >
      <List>
        <ListItem>
          <Heading pl={3} py={2} size={"md"}>
            {t("sidebar:heading", "Chats")}
          </Heading>
        </ListItem>
        {channels.map((channel, key) => (
          <ListItem key={key}>
            <Button
              _hover={{
                bgColor: "blackAlpha.50",
              }}
              _active={{
                bgColor: "blackAlpha.200",
              }}
              gap={"0.25rem"}
              leftIcon={<ChatIcon />}
              variant={"ghost"}
              w={"full"}
              justifyContent={"flex-start"}
            >
              {channel}
            </Button>
          </ListItem>
        ))}
      </List>
      <Flex
        flexDirection={"row"}
        py={"0.75rem"}
        px={"1rem"}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderTop={"1px"}
        borderColor={"blackAlpha.200"}
      >
        <HStack spacing={"1rem"}>
          <Avatar size={"xs"}>
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Text fontSize={"lg"} fontWeight={"medium"}>
            {nickname}
          </Text>
        </HStack>
        <HStack>
          <IconButton
            variant={"ghost"}
            aria-label={t(
              "sidebar:read-notifications",
              "Read unread notifications"
            )}
            icon={<BellIcon />}
          />
          <IconButton
            variant={"ghost"}
            aria-label={t("sidebar:change-settings", "Change settings")}
            icon={<SettingsIcon />}
          />
        </HStack>
      </Flex>
    </Flex>
  );
};
