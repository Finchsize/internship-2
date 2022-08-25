import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
  Icon,
  Text,
  Divider,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { MdHome } from "react-icons/md";
import axiosInstance from "../../lib/axios";
import Status from "../../types/status";

type UserDetailsType = {
  city?: string;
  country?: string;
  deleted?: boolean;
  email?: string;
  firstName?: string;
  lastName?: string;
  nickname: string;
  phoneNumber?: string;
  userStatus: Status;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  channel: number;
  member: {
    nickname: string;
    owner: boolean;
  };
  isOwner: boolean;
  isLoggedIn: boolean;
};

export const MemberManage = ({
  isOpen,
  onClose,
  channel,
  member,
  isOwner,
  isLoggedIn,
}: Props) => {
  const [removing, setRemoving] = useState(false);
  const [promoting, setPromoting] = useState(false);

  const [UserDetails, setUserDetails] = useState<UserDetailsType>();

  useEffect(() => {
    axiosInstance({
      method: "GET",
      url: isLoggedIn ? "/users/details" : `/users/${member.nickname}`,
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
      },
    }).then((response) => setUserDetails(response.data));
  }, [member.nickname, isLoggedIn]);

  console.log("UserDetails: ", UserDetails)

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
        <ModalHeader>{member.nickname}</ModalHeader>
        <ModalCloseButton disabled={removing || promoting} onClick={onClose} />
        <ModalBody>
          {typeof UserDetails === "undefined" ? (
            <Text fontSize={"sm"}>Loading...</Text>
          ) : (
            <>
              {UserDetails.firstName && UserDetails.lastName && (
                <Text fontSize={"sm"}>
                  {UserDetails.firstName} {UserDetails.lastName}
                </Text>
              )}
              {UserDetails.email && (
                <HStack>
                  <EmailIcon />
                  <Text fontSize={"sm"}>{UserDetails.email}</Text>
                </HStack>
              )}
              {UserDetails.phoneNumber && (
                <HStack>
                  <PhoneIcon />
                  <Text fontSize={"sm"}>{UserDetails.phoneNumber}</Text>
                </HStack>
              )}
              {UserDetails.country && UserDetails.city && (
                <HStack>
                  <Icon as={MdHome} />
                  <Text
                    fontSize={"sm"}
                    wordBreak={"break-word"}
                  >{`${UserDetails.country}, ${UserDetails.city}`}</Text>
                </HStack>
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter
          w={"full"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          gap={4}
        >
          {isOwner && channel !== -1 && (
            <>
              <Divider />
              <Text>{`What do you want to with ${member.nickname}?`}</Text>
              <HStack w="full">
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
              </HStack>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
