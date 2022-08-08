import Cookies from "js-cookie";
import parseJwt from "../../lib/parseJwt";
import axiosInstance from "../../lib/axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";

import {
  Avatar,
  Flex,
  HStack,
  Input,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import { ChatDetails } from "../../components/ChatDetails";
import { useNavigate } from "react-router";

type Inputs = {
  message: string;
};

type Message = {
  id: number;
  authorNick: string;
  content: string;
  createdAt: string;
};

export const Dashboard = () => {
  const navigator = useNavigate()
  const JWT: { nickname: string; exp: number } | undefined = parseJwt(
    Cookies.get("token")
  );
  
  useEffect(() => {
    if (typeof JWT === "undefined") {
      navigator("/signin");
    }
  }, []);

  const msgBoxRef = useRef<null | HTMLDivElement>(null);

  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const message = data.message.trim();
    if (typeof JWT !== "undefined" && message !== "") {
      await axiosInstance({
        method: "post",
        headers: {
          Authorization: Cookies.get("token")!,
        },
        url: "/messages",
        data: {
          nickname: JWT.nickname,
          content: message,
        },
      }).catch((error) => console.log("Error", error.message));
    }
    reset();
  };

  const [messages, setMessages] = useState<Message[]>([]);

  const getMessages = async () => {
    if (typeof JWT !== "undefined") {
      await axiosInstance({
        method: "get",
        headers: {
          Authorization: Cookies.get("token")!,
        },
        url: "/messages",
      }).then((response) => {
        setMessages(response.data);
      });
    }
  };

  /* Fetch messages from the backend */
  useEffect(() => {
    const timer = setInterval(getMessages, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (msgBoxRef.current !== null) {
      msgBoxRef.current!.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgBoxRef.current]);

  return (
    <Flex
      flexDirection={"row"}
      bgColor={"blackAlpha.50"}
      w={"full"}
      h={"100vh"}
    >
      <Sidebar />
      <VStack w="full" h="full" spacing={"0"}>
        <Topbar />
        <HStack w="full" h="full" alignItems={"flex-end"} spacing={0}>
          <Box w="full" h="full" position={"relative"}>
            <VStack
              position={"absolute"}
              overflowY={"scroll"}
              w={"full"}
              h={"calc(100% - 4.5rem)"}
              alignItems={"flex-start"}
            >
              {messages.map((message, key) => (
                <HStack
                  key={key}
                  ref={
                    messages.indexOf(message) === messages.length - 1
                      ? msgBoxRef
                      : null
                  }
                  spacing={"0.75rem"}
                  paddingX={"1rem"}
                >
                  <Avatar size={"sm"} />
                  <VStack alignItems={"flex-start"} spacing={0}>
                    <HStack>
                      <Text fontSize={"sm"}>{message.authorNick}</Text>
                      <Text fontSize={"xs"}>
                        {new Date(message.createdAt).toLocaleString()}
                      </Text>
                    </HStack>
                    <p>{message.content}</p>
                  </VStack>
                </HStack>
              ))}
            </VStack>
            <form
              autoComplete={"off"}
              onSubmit={handleSubmit(onSubmit)}
              style={{
                width: "100%",
                bottom: 0,
                position: "absolute",
                paddingLeft: "1rem",
                paddingRight: "2rem",
                paddingBottom: "1rem",
              }}
            >
              <Input
                {...register("message")}
                w={"full"}
                placeholder="Message..."
                bgColor={"white"}
                shadow={"sm"}
                padding={"1rem"}
              />
            </form>
          </Box>
          <ChatDetails />
        </HStack>
      </VStack>
    </Flex>
  );
};
