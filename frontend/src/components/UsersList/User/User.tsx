import {
  ListItem,
  Button,
  HStack,
  Avatar,
  AvatarBadge,
  Badge,
  Text,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../lib/axios";

import type Status from "../../../types/status";

type Props = {
  nickname: string;
  owner: boolean;
  onClick: () => void;
};

export const User = ({ nickname, owner, onClick }: Props) => {
  const [status, setStatus] = useState<Status>("OFFLINE");

  const checkStatus = useCallback(() => {
    axiosInstance({
      method: "get",
      url: `/users/${nickname}`,
    }).then((res) => setStatus(res.data.userStatus));
  }, [nickname]);

  useEffect(() => {
    checkStatus();
    const timer = setInterval(checkStatus, 500);
    return () => clearInterval(timer);
  }, [checkStatus]);

  return (
    <ListItem>
      <Button
        onClick={() => onClick()}
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
        <HStack w="full" alignItems={"center"} justifyContent={"space-between"}>
          <HStack>
            <Avatar size={"xs"}>
              <AvatarBadge
                boxSize="1.25em"
                bg={status === "ONLINE" ? "green.500" : "gray.300"}
              />
            </Avatar>
            <Text fontSize={"md"}>{nickname}</Text>
          </HStack>
          {owner && <Badge colorScheme={"blue"}>Owner</Badge>}
        </HStack>
      </Button>
    </ListItem>
  );
};
