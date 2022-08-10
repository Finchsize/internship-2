import {
  HStack,
  Avatar,
  VStack,
  Text,
  IconButton,
  Input,
  Icon,
} from "@chakra-ui/react";
import { forwardRef, RefObject, useState } from "react";

import type MessageType from "../../types/message";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosInstance from "../../lib/axios";
import Cookies from "js-cookie";
import parseJwt from "../../lib/parseJwt";

import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { MdCheck, MdClose } from "react-icons/md";
import { useParams } from "react-router";

type Inputs = {
  message: string;
};

export const Message = forwardRef(
  ({ id, content, authorNick, createdAt }: MessageType, ref) => {
    const params = useParams();
    const [showOptions, setShowOptions] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const { register, handleSubmit, reset } = useForm<Inputs>();

    const JWT: { nickname: string; exp: number } | undefined = parseJwt(
      Cookies.get("token")
    );

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      const message = data.message.trim();
      if (typeof JWT !== "undefined" && message !== "") {
        await axiosInstance({
          method: "put",
          headers: {
            Authorization: Cookies.get("token")!,
          },
          url:
            typeof params.id === "undefined"
              ? `/messages/${id}`
              : `/messages/channels/${params.id}/${id}`,
          data: {
            nickname: JWT.nickname,
            content: message,
          },
        }).catch((error) => console.log("Error", error.message));
      }
      reset();
      setEditMode(false);
    };

    const deleteMessage = async () => {
      await axiosInstance({
        method: "delete",
        headers: {
          Authorization: Cookies.get("token")!,
        },
        data: {},
        url:
          typeof params.id === "undefined"
            ? `/messages/${id}`
            : `/messages/channels/${params.id}/${id}`,
      });
    };

    return (
      <HStack
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
        onMouseEnter={() => {
          if (authorNick === JWT?.nickname) {
            setShowOptions(true);
          }
        }}
        onMouseLeave={() => setShowOptions(false)}
      >
        <HStack
          ref={ref ? (ref as RefObject<HTMLDivElement>) : null}
          spacing={"0.75rem"}
          paddingX={"1rem"}
          w={"full"}
        >
          <Avatar size={"sm"} />
          <VStack w={"full"} alignItems={"flex-start"} spacing={0}>
            <HStack>
              <Text fontSize={"sm"}>{authorNick}</Text>
              <Text fontSize={"xs"}>
                {new Date(createdAt).toLocaleString()}
              </Text>
            </HStack>
            {!editMode ? (
              <Text>{content}</Text>
            ) : (
              <form
                autoComplete={"off"}
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  width: "100%",
                  paddingTop: "0.25rem",
                }}
              >
                <HStack w={"full"}>
                  <Input
                    {...register("message")}
                    defaultValue={content}
                    w={"full"}
                    placeholder="Message..."
                    bgColor={"white"}
                    shadow={"sm"}
                    size={"sm"}
                    borderRadius={"md"}
                    padding={"0.5rem"}
                  />
                  <HStack>
                    <IconButton
                      type={"submit"}
                      onClick={() => setEditMode(true)}
                      _hover={{
                        bgColor: "blackAlpha.50",
                      }}
                      _active={{
                        bgColor: "blackAlpha.200",
                      }}
                      variant={"ghost"}
                      aria-label="Confirm edit"
                      size={"sm"}
                      icon={
                        <Icon as={MdCheck} color={"green.500"} w={7} h={7} />
                      }
                    />
                    <IconButton
                      onClick={() => setEditMode(false)}
                      _hover={{
                        bgColor: "blackAlpha.50",
                      }}
                      _active={{
                        bgColor: "blackAlpha.200",
                      }}
                      variant={"ghost"}
                      aria-label="Cancel edit"
                      size={"sm"}
                      icon={<Icon as={MdClose} color={"red.500"} w={7} h={7} />}
                    />
                  </HStack>
                </HStack>
              </form>
            )}
          </VStack>
        </HStack>
        {showOptions && !editMode && (
          <HStack spacing={0.5} paddingRight={"0.75rem"}>
            <IconButton
              onClick={() => setEditMode(true)}
              _hover={{
                bgColor: "blackAlpha.50",
              }}
              _active={{
                bgColor: "blackAlpha.200",
              }}
              variant={"ghost"}
              aria-label="Edit message"
              size={"sm"}
              icon={<EditIcon w={5} h={5} />}
            />
            <IconButton
              onClick={deleteMessage}
              _hover={{
                bgColor: "blackAlpha.50",
              }}
              _active={{
                bgColor: "blackAlpha.200",
              }}
              variant={"ghost"}
              aria-label="Delete message"
              size={"sm"}
              icon={<DeleteIcon w={5} h={5} />}
            />
          </HStack>
        )}
      </HStack>
    );
  }
);
