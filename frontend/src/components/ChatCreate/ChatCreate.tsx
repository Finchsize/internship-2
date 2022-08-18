import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Portal,
  Flex,
  VStack,
  HStack,
  CloseButton,
  Grid,
  Button,
  Icon,
  Text,
  Input,
  IconButton,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdChat, MdSend } from "react-icons/md";
import axiosInstance from "../../lib/axios";

type Inputs = {
  nick: string;
};

export const ChatCreate = ({ onClose }: { onClose: () => void }) => {
  const [showInput, setShowInput] = useState(false);
  const [searching, setSearching] = useState(false);
  const [successful, setSuccessful] = useState<boolean>();
  const { register, handleSubmit } = useForm<Inputs>();
  const createChat = (users?: string[]) => {
    axiosInstance({
      method: "post",
      url: "/channels",
      headers: {
        authorization: `Bearer ${Cookies.get("token")}`,
      },
      data: {
        users: users ? users : undefined,
        directMessage: users ? true : false,
      },
    });
    onClose();
  };
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setSearching(true);
    const nick = data.nick.trim();
    let channelId: number | undefined;
    if (nick !== "") {
      await axiosInstance({
        method: successful ? "post" : "get",
        url: successful ? "/channels" : `/users/${nick}`,
        headers: {
          Authorization: Cookies.get("token")!,
        },
        data: {
          directMessage: successful ? true : undefined,
        },
      })
        .then((res) => {
          if (successful) {
            channelId = res.data.id;
          }
          setSuccessful(true);
        })
        .catch((error) => {
          if (error.response) {
            setSuccessful(false);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    }
    if (successful) {
      await axiosInstance({
        method: "put",
        url: "/channels/users",
        headers: {
          Authorization: Cookies.get("token")!,
        },
        data: {
          id: channelId,
          userNickname: nick,
          action: "ADD_MEMBER",
          directMessage: true,
        },
      })
        .then((res) => {
          if (successful) {
            channelId = res.data.id;
          }
          setSuccessful(true);
        })
        .catch((error) => {
          if (error.response) {
            setSuccessful(false);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
      onClose();
    }
    setSearching(false);
  };
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
          borderWidth={1}
          borderColor={"blackAlpha.200"}
          borderRadius={"md"}
          spacing={4}
        >
          <HStack
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
          >
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              {!showInput ? (
                <>
                  What kind of chat
                  <br />
                  do you want to create?
                </>
              ) : (
                "Enter the nick of the user you want to DM"
              )}
            </Text>
            <CloseButton onClick={onClose} />
          </HStack>

          {!showInput ? (
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              <Button h={"full"} padding={4} onClick={() => createChat()}>
                <VStack>
                  <Icon as={MdChat} w={8} h={8} />
                  <Text>Group chat</Text>
                </VStack>
              </Button>
              <Button h={"full"} padding={4} onClick={() => setShowInput(true)}>
                <VStack>
                  <Icon as={MdSend} w={8} h={8} />
                  <Text>Direct message</Text>
                </VStack>
              </Button>
            </Grid>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <HStack alignItems={"flex-start"}>
                <FormControl
                  isRequired
                  isDisabled={searching || successful}
                  isInvalid={successful === false}
                >
                  <Input
                    {...register("nick")}
                    w={"full"}
                    bgColor={"white"}
                    shadow={"sm"}
                    padding={"1rem"}
                  />
                  {typeof successful !== "undefined" &&
                    (!successful ? (
                      <FormErrorMessage>User not found.</FormErrorMessage>
                    ) : (
                      <FormHelperText>
                        User found! Click the button to create a DM!
                      </FormHelperText>
                    ))}
                </FormControl>
                {searching ? (
                  <CircularProgress isIndeterminate size={"1.75rem"} />
                ) : successful !== true ? (
                  <IconButton
                    type={"submit"}
                    icon={<SearchIcon />}
                    aria-label={"Search for user"}
                  />
                ) : (
                  <IconButton
                    colorScheme={"blue"}
                    variant={"solid"}
                    type={"submit"}
                    icon={<AddIcon />}
                    aria-label={"Search for user"}
                  />
                )}
              </HStack>
            </form>
          )}
        </VStack>
      </Flex>
    </Portal>
  );
};
