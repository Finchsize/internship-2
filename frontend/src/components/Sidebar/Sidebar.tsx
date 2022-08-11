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
} from "@chakra-ui/react";
import { BiCommentAdd, BiFontSize } from "react-icons/bi";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { Link, useParams } from "react-router-dom";

type Chat = {
  id: number | null;
  members?: string[];
  owners?: string[];
};

export const Sidebar = ({ nickname }: { nickname: string | undefined }) => {
  const [chats, setChats] = useState<Chat[]>([{ id: null }]);

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

  const createChat = () => {
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
          Chats
        </Heading>
        <form onSubmit={createChat}>
          <FormControl>
            <Button shadow={"none"} bgColor={"transparent"} type={"submit"}>
              <Icon as={BiCommentAdd}></Icon>
            </Button>
          </FormControl>
        </form>
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
                leftIcon={<ChatIcon />}
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
                  : `${chat.owners[0]}'s chat #${chat.id}`}
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
            aria-label="Read unread notifications"
            icon={<BellIcon />}
          />
          <IconButton
            variant={"ghost"}
            aria-label="Change settings"
            icon={<SettingsIcon />}
          />
        </HStack>
      </Flex>
    </Flex>
  );
};
