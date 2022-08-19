import {
  Text,
  VStack,
  Heading,
  List,
  ListItem,
  Button,
  Avatar,
  AvatarBadge,
  HStack,
  Badge,
  IconButton,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";
import { useParams } from "react-router-dom";

import { MdManageAccounts } from "react-icons/md";

type User = {
  nickname: string;
  owner: boolean;
};

export const ChatDetails = () => {
  const { t } = useTranslation("userslist");
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
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
      console.log(res.data);
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
        <Heading as={"h1"} fontSize={"xl"} fontWeight={"medium"}>
          {t("userslist:heading", "Members")}
        </Heading>
        <List w={"full"}>
          {users.map((user, key) => (
            <ListItem key={key}>
              <Button
                onClick={() => setShowModal(true)}
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
                    <Avatar size={"xs"} />
                    <Text fontSize={"md"}>{user.nickname}</Text>
                  </HStack>
                  {user.owner && <Badge colorScheme={"blue"}>Owner</Badge>}
                </HStack>
              </Button>
            </ListItem>
          ))}
        </List>
      </VStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage mejsiej</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this message?</ModalBody>
          <ModalFooter w={"full"} gap={4}>
            <Button
              w={"full"}
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button w={"full"} colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
