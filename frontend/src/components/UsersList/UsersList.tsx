import {
  Text,
  VStack,
  Heading,
  List,
  ListItem,
  Button,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { useParams } from "react-router-dom";

type User = {
  nickname: string;
  userStatus: string;
};

export const ChatDetails = () => {
  const { t } = useTranslation("userslist");
  const [users, setUsers] = useState<User[]>([]);
  const params = useParams();
  useEffect(() => {
    axiosInstance({
      method: "get",
      url: typeof params.id === "undefined" ? "/users" : `/channels`,
      data: typeof params.id === "undefined" ? undefined : {},
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then((res) => {
      // console.table(res.data);
      if (typeof params.id === "undefined") {
        setUsers(res.data);
      } else {
        const chat = res.data.filter((c: any) => {
          return c.id == params.id;
        })[0];
        setUsers([...chat.members, ...chat.owners]);
      }
    });
  }, []);

  return (
    <VStack
      h="full"
      w={"20rem"}
      bgColor={"white"}
      py={"0.75rem"}
      px={"1rem"}
      borderLeft={"1px"}
      alignItems={"flex-start"}
      borderColor={"blackAlpha.200"}
    >
      <Heading as={"h1"} fontSize={"xl"} fontWeight={"medium"}>
        {t("userslist:heading", "Members")}
      </Heading>
      <List w={"full"}>
        {users.map((user, key) => (
          <ListItem key={key}>
            <Button
              _hover={{
                bgColor: "blackAlpha.50",
              }}
              _active={{
                bgColor: "blackAlpha.200",
              }}
              variant={"ghost"}
              w={"full"}
              gap={"1rem"}
              justifyContent={"flex-start"}
            >
              <Avatar size={"xs"}>
                <AvatarBadge boxSize="1.25em" bg="orange.100" />
              </Avatar>
              <Text fontSize={"md"}>
                {typeof params.id === "undefined"
                  ? user.nickname
                  : user.toString()}
              </Text>
            </Button>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};
