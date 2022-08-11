import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { MdHome } from "react-icons/md";
import {
  Avatar,
  AvatarBadge,
  CloseButton,
  Flex,
  HStack,
  Icon,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axiosInstance from "../../lib/axios";

type UserDetailsType = {
  city: string;
  country: string;
  deleted: boolean;
  email: string;
  firstName: string;
  lastName: string;
  nickname: string;
  phoneNumber: string;
  showAddress: boolean;
  showEmail: boolean;
  showFirstNameAndLastName: boolean;
  showPhoneNumber: boolean;
  timeZone: string;
  userLanguage: "POLISH" | "ENGLISH" | "GERMAN";
  userStatus: "OFFLINE" | "ONLINE";
};

const UserDetails = ({
  nickname,
  onClose,
}: {
  nickname: string;
  onClose: () => void;
}) => {
  const [UserDetails, setUserDetails] = useState<UserDetailsType>({
    nickname: "string",
    firstName: "string",
    lastName: "string",
    email: "string@string.string",
    phoneNumber: "string",
    country: "string",
    city: "string",
    userStatus: "OFFLINE",
    userLanguage: "POLISH",
    timeZone: "GMT",
    showFirstNameAndLastName: true,
    showEmail: true,
    showPhoneNumber: true,
    showAddress: true,
    deleted: true,
  });
  return (
    <Portal>
      <Flex
        position={"absolute"}
        bg={"rgba(0,0,0,0.2)"}
        blur={"md"}
        w={"100%"}
        h={"100%"}
        inset={"0"}
        zIndex={"40"}
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <VStack
          bg={"white"}
          padding={"1rem"}
          alignItems={"flex-start"}
          borderWidth={1}
          borderColor={"blackAlpha.200"}
          borderRadius={"md"}
        >
          <HStack w={"full"} justifyContent={"space-between"} spacing={12}>
            <HStack alignItems={"center"} spacing={"0.75rem"}>
              <Avatar size={"sm"}>
                <AvatarBadge
                  boxSize="1.25em"
                  bg={
                    UserDetails?.userStatus === "ONLINE"
                      ? "green.500"
                      : "gray.500"
                  }
                />
              </Avatar>
              <Text fontSize={"2xl"} fontWeight={"semibold"}>
                {nickname}
              </Text>
            </HStack>
            <CloseButton onClick={() => onClose()} />
          </HStack>
          {typeof UserDetails === "undefined" ? (
            <Text fontSize={"sm"}>Loading...</Text>
          ) : (
            <>
              {UserDetails.showFirstNameAndLastName && (
                <Text fontSize={"sm"}>
                  {UserDetails.firstName} {UserDetails.lastName}
                </Text>
              )}
              {UserDetails.showEmail && (
                <HStack>
                  <EmailIcon />
                  <Text fontSize={"sm"}>{UserDetails.email}</Text>
                </HStack>
              )}
              {UserDetails.showPhoneNumber && (
                <HStack>
                  <PhoneIcon />
                  <Text fontSize={"sm"}>{UserDetails.phoneNumber}</Text>
                </HStack>
              )}
              {UserDetails.showAddress && (
                <HStack>
                  <Icon as={MdHome} />
                  <Text
                    fontSize={"sm"}
                  >{`${UserDetails.country}, ${UserDetails.city}`}</Text>
                </HStack>
              )}
            </>
          )}
        </VStack>
      </Flex>
    </Portal>
  );
};

export default UserDetails;
