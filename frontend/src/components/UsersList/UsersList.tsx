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
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";

type User = {
  nickname: string;
};

export const ChatDetails = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axiosInstance({
      method: "get",
      url: "/users",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then((res) => {
      setUsers(res.data);
      // console.log(users);
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
        Users
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
              <Text fontSize={"md"}>{user.nickname}</Text>
            </Button>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};
