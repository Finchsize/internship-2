import {
  Text,
  VStack,
  Heading,
  List,
  ListItem,
  Button,
  Avatar,
  HStack,
  Badge,
  IconButton,
  Icon,
  AvatarBadge,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { useParams } from "react-router-dom";
import { MemberManage } from "../MemberManage";
import parseJwt from "../../lib/parseJwt";

import { MdPersonAdd } from "react-icons/md";
import { MemberAdd } from "../MemberAdd";

type User = {
  nickname: string;
  owner: boolean;
  userStatus: string;
};

export const ChatDetails = () => {
  const { t } = useTranslation("userslist");
  const [add, setAdd] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const JWT: { nickname: string; exp: number } | undefined = parseJwt(
    Cookies.get("token")
  );

  const isLoggedInUserAnOwner = () => {
    const member = users.find((user) => user.nickname === JWT?.nickname);
    return typeof params.id !== "undefined" && member?.owner === true;
  };

  const params = useParams();
  useEffect(() => {
    axiosInstance({
      method: "get",
      url:
        typeof params.id === "undefined" ? "/users" : `/channels/${params.id}`,
      data: typeof params.id === "undefined" ? undefined : {},
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then((res) => {
      if (typeof params.id === "undefined") {
        setUsers(
          res.data
            .map((member: { nickname: string }) => {
              return { nickname: member.nickname, owner: false };
            })
            .sort()
        );
      } else {
        setUsers(
          [
            ...res.data.members.map((member: string) => {
              return { nickname: member, owner: false };
            }),
            ...res.data.owners.map((member: string) => {
              return { nickname: member, owner: true };
            }),
          ].sort()
        );
      }
    });
  }, []);

  return (
    <>
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
        <HStack w="full" alignItems={"center"} justifyContent={"space-between"}>
          <Heading as={"h1"} fontSize={"xl"} fontWeight={"medium"}>
            {t("userslist:heading", "Members")}
          </Heading>
          <IconButton
            onClick={() => setAdd(true)}
            _hover={{
              bgColor: "blackAlpha.50",
            }}
            _active={{
              bgColor: "blackAlpha.200",
            }}
            variant={"ghost"}
            aria-label="Add a member"
            size={"sm"}
            icon={<Icon as={MdPersonAdd} w={6} h={6} />}
          />
        </HStack>
        <List w={"full"}>
          {users.map((user, key) => (
            <ListItem key={key}>
              <Button
                onClick={() => setUser(user)}
                _hover={{
                  bgColor: "blackAlpha.50",
                }}
                _active={{
                  bgColor: "blackAlpha.200",
                }}
                variant={"ghost"}
                w={"full"}
                justifyContent={"flex-start"}
              >
                <HStack
                  w="full"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <HStack>
                    <Avatar size={"xs"}>
                      <AvatarBadge
                        boxSize="1.25em"
                        bg={
                          user.userStatus === "ONLINE"
                            ? "green.500"
                            : "gray.300"
                        }
                      />
                    </Avatar>
                    <Text fontSize={"md"}>{user.nickname}</Text>
                  </HStack>
                  {user.owner && <Badge colorScheme={"blue"}>Owner</Badge>}
                </HStack>
              </Button>
            </ListItem>
          ))}
        </List>
      </VStack>
      {user && isLoggedInUserAnOwner() && (
        <MemberManage
          isOpen={typeof user !== undefined}
          onClose={() => {
            setUser(undefined);
          }}
          member={user}
        />
      )}
      {add && isLoggedInUserAnOwner() && (
        <MemberAdd isOpen={add} onClose={() => setAdd(false)} />
      )}
    </>
  );
};
