import { ChatIcon, BellIcon, SettingsIcon, AddIcon } from "@chakra-ui/icons";
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
  Icon,
  FormControl,
  FormLabel,
  Input,
  Portal,
  VStack,
  Grid,
  CloseButton,
} from "@chakra-ui/react";
import { BiCommentAdd, BiFontSize } from "react-icons/bi";
import { MdPerson, MdOutlineForum } from "react-icons/md";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChatCreate } from "../ChatCreate";

type Chat = {
  id: number | null;
  members?: string[];
  owners?: string[];
  directMessage?: boolean;
};

export const Sidebar = ({ nickname }: { nickname: string | undefined }) => {
  const [showChannelCreationPopup, setShowChannelCreationPopup] =
    useState(false);

  const [chats, setChats] = useState<Chat[]>([{ id: null }]);

  console.log(chats);

  const params = useParams();

  useEffect(() => {
    axiosInstance({
      method: "get",
      url: "/channels",
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then((res) => {
      setChats([...chats, ...res.data]);
    });
  }, []);

  const createChat = ({
    users,
    directMessage,
  }: {
    users?: string[];
    directMessage: boolean;
  }) => {
    setShowChannelCreationPopup(directMessage);
    axiosInstance({
      method: "post",
      url: "/channels",
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then((res) => {
      setChats([...chats, res.data]);
    });
  };

  console.log(chats[0].id);
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
          <ListItem key={key} pr={".5rem"}>
            <Link to={chat.id === null ? "/" : `/${chat.id}`}>
              <Button
                _hover={{
                  bgColor: "blackAlpha.50",
                }}
                _active={{
                  bgColor: "blackAlpha.200",
                }}
                gap={"0.25rem"}
                leftIcon={
                  <Icon
                    as={!chat.directMessage ? MdOutlineForum : MdPerson}
                    h={5}
                    w={5}
                  />
                }
                variant={"ghost"}
                w={"full"}
                justifyContent={"flex-start"}
                onClick={() => {
                  window.location.replace(
                    chat.id === null ? "/" : `/${chat.id}`
                  );
                }}
              >
                {typeof chat.members === "undefined" ||
                typeof chat.owners === "undefined"
                  ? "Main"
                  : !chat.directMessage ? `${chat.owners[0]}'s chat #${chat.id}` : chat.members[0]}
              </Button>
            </Link>
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
