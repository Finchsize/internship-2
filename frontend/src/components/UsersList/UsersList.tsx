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
import { User } from "./User";

type UserType = {
  nickname: string;
  owner: boolean;
};

export const ChatDetails = () => {
  const { t } = useTranslation("userslist");
  const [add, setAdd] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [user, setUser] = useState<UserType>();
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
  }, [user, add, params.id]);
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
          {typeof params.id !== "undefined" && (
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
          )}
        </HStack>
        <List w={"full"}>
          {users.map((user, key) => (
            <User
              key={key}
              nickname={user.nickname}
              owner={user.owner}
              onClick={() => setUser(user)}
            />
          ))}
        </List>
      </VStack>
      {user && (
        <MemberManage
          isOpen={typeof user !== "undefined"}
          onClose={() => {
            setUser(undefined);
          }}
          channel={typeof params.id !== "undefined" ? parseInt(params.id) : -1}
          member={user}
          isOwner={isLoggedInUserAnOwner()}
        />
      )}
      {add && params.id && isLoggedInUserAnOwner() && (
        <MemberAdd
          isOpen={add}
          onClose={() => setAdd(false)}
          channel={parseInt(params.id)}
        />
      )}
    </>
  );
};
