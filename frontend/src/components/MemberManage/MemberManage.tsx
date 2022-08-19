import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  channel: number;
  member: {
    nickname: string;
    owner: boolean;
  };
};

export const MemberManage = ({ isOpen, onClose, channel, member }: Props) => {
  const [removing, setRemoving] = useState(false);
  const [promoting, setPromoting] = useState(false);

  const changeRole = async () => {
    setPromoting(true);
    await axiosInstance({
      method: "put",
      url: "channels/users",
      headers: {
        Authorization: Cookies.get("token")!,
      },
      data: {
        id: channel,
        userNickname: member.nickname,
        action: member.owner ? "REMOVE_OWNER" : "ADD_OWNER",
        directMessage: false,
      },
    }).then(() => {
      setPromoting(false);
      onClose();
    });
  };

  const removeMember = async () => {
    setRemoving(true);
    await axiosInstance({
      method: "put",
      url: "channels/users",
      headers: {
        Authorization: Cookies.get("token")!,
      },
      data: {
        id: channel,
        userNickname: member.nickname,
        action: "REMOVE_MEMBER",
        directMessage: false,
      },
    }).then(() => {
      setRemoving(false);
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage user</ModalHeader>
        <ModalCloseButton disabled={removing || promoting} onClick={onClose} />
        <ModalBody>{`What do you want to with ${member.nickname}?`}</ModalBody>
        <ModalFooter w={"full"} gap={4}>
          <Button
            disabled={removing}
            isLoading={promoting}
            loadingText={"Adding ownership..."}
            w={"full"}
            variant="outline"
            onClick={changeRole}
          >
            {`Make ${member.nickname} ${
              member.owner ? " a member" : " an owner"
            }`}
          </Button>
          {!member.owner && (
            <Button
              w={"full"}
              disabled={promoting}
              isLoading={removing}
              loadingText={"Removing..."}
              colorScheme="red"
              onClick={removeMember}
            >
              {`Remove ${member.nickname}`}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
