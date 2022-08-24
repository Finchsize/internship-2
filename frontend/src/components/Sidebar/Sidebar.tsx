import { BellIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Text,
  Flex,
  Heading,
  List,
  Button,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { BiCommentAdd, BiLogOut } from "react-icons/bi";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { useTranslation } from "react-i18next";
import { ChatCreate } from "../ChatCreate";
import { Chat } from "./Chat";

type ChatType = {
  id: number | null;
  members?: string[];
  owners?: string[];
  directMessage?: boolean;
};

export const Sidebar = ({ nickname }: { nickname: string | undefined }) => {
  const [showChannelCreationPopup, setShowChannelCreationPopup] =
    useState(false);

  const [chats, setChats] = useState<ChatType[]>([{ id: null }]);

  const logOut = async () => {
    await axiosInstance({
      method: "get",
      url: "/users/details",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: {},
    }).then((res) => {
      res.data.userStatus = "OFFLINE";

      axiosInstance({
        method: "put",
        url: "/users",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        data: res.data,
      }).then(() => {
        Cookies.remove("token");
      });
    });
  };

  const getChats = () => {
    axiosInstance({
      method: "get",
      url: "/channels",
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then((res) => {
      console.log("Res data: ", res.data)
      setChats([{ id: null }, ...res.data]);
    });
  };

  useEffect(() => getChats(), [showChannelCreationPopup]);

  /* Fetch chats from the backend */
  useEffect(() => {
    getChats();
    const timer = setInterval(getChats, 500);
    return () => clearInterval(timer);
  }, []);

  const { t } = useTranslation("sidebar");
  return (
    <Flex
      flexDirection={"column"}
      w={"20rem"}
      justifyContent={"space-between"}
      bgColor={"white"}
      borderRight={"1px"}
      borderColor={"blackAlpha.200"}
    >
      <Flex
        width={"full"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={"0.5rem"}
      >
        <Heading pl={3} py={2} size={"md"}>
          {t("sidebar:heading", "Chats")}
        </Heading>

        <Button
          shadow={"none"}
          bgColor={"transparent"}
          type={"submit"}
          onClick={() => setShowChannelCreationPopup(true)}
        >
          <Icon as={BiCommentAdd} />
        </Button>
        {showChannelCreationPopup && (
          <ChatCreate onClose={() => setShowChannelCreationPopup(false)} />
        )}
      </Flex>

      <List h={"full"} maxH={"100vh"} pl={".5rem"} overflow={"auto"}>
        {chats.map((chat, key) => (
          <Chat key={key} {...chat} />
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
          <IconButton
            variant={"ghost"}
            aria-label={"Log out"} // TODO: translation
            icon={<BiLogOut />}
            onClick={logOut}
          />
        </HStack>
      </Flex>
    </Flex>
  );
};
