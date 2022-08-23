import Cookies from "js-cookie";
import parseJwt from "../../lib/parseJwt";
import axiosInstance from "../../lib/axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Flex, HStack, Input, VStack } from "@chakra-ui/react";
import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import { ChatDetails } from "../../components/UsersList";
import { Message } from "../../components/Message";
import type MessageType from "../../types/message";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { MetaTags } from "../../components/MetaTags";
type Inputs = {
  message: string;
};

export const Dashboard = () => {
  const navigator = useNavigate();
  const { t, i18n } = useTranslation("dashboard");
  const JWT: { nickname: string; exp: number } | undefined = parseJwt(
    Cookies.get("token")
  );

  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof parseJwt(Cookies.get("token")) === "undefined") {
        navigator("/signin");
      }
    }, 100);
    return () => clearInterval(timer);
  }, [navigator]);

  useEffect(() => {
    axiosInstance({
      method: "get",
      url: "/users/details",
      headers: {
        Authorization: Cookies.get("token")!,
      },
      data: {
        nickname: JWT?.nickname,
      },
    }).then((response) =>
      i18n.changeLanguage(
        response.data.userLanguage === "POLISH"
          ? "pl"
          : response.data.userLanguage === "ENGLISH"
          ? "en"
          : "de"
      )
    );
  }, [JWT?.nickname, i18n]);
  const params = useParams();

  const msgBoxRef = useRef<null | HTMLDivElement>(null);

  const [sendingMessages, setSendingMessages] = useState<MessageType[]>([]);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const message = data.message.trim();
    if (typeof JWT !== "undefined" && message !== "") {
      setSendingMessages([
        ...sendingMessages,
        {
          id: -1,
          authorNick: JWT.nickname,
          content: message,
          createdAt: new Date().toUTCString(),
        },
      ]);
      await axiosInstance({
        method: "post",
        headers: {
          Authorization: Cookies.get("token")!,
        },
        url:
          typeof params.id === "undefined"
            ? "/messages"
            : `/messages/channels/${params.id}`,
        data: {
          nickname: JWT.nickname,
          content: message,
        },
      })
        .then(() => {
          setSendingMessages(sendingMessages.splice(1, sendingMessages.length));
          getMessages();
        })
        .catch((error) => console.log("Error", error.message));
    }
    reset();
  };

  const [messages, setMessages] = useState<MessageType[]>([]);

  const getMessages = useCallback(async () => {
    await axiosInstance({
      method: "get",
      headers: {
        Authorization: Cookies.get("token")!,
      },
      url:
        typeof params.id === "undefined"
          ? "/messages"
          : `/messages/channels/${params.id}`,
    }).then((response) => {
      setMessages(response.data);
    });
  }, [params.id]);

  /* Fetch messages from the backend */
  useEffect(() => {
    getMessages();
    const timer = setInterval(getMessages, 500);
    return () => clearInterval(timer);
  }, [getMessages]);

  useEffect(() => {
    if (msgBoxRef.current !== null) {
      msgBoxRef.current!.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <Flex
      flexDirection={"row"}
      bgColor={"blackAlpha.50"}
      w={"full"}
      h={"100vh"}
    >
      <MetaTags
        title="Chat App"
        description="Chat app built using react.js"
        authors="Maciej Malinowski, Marcel Alefierowicz"
      />

      <Sidebar nickname={JWT?.nickname} />
      <VStack w="full" h="full" spacing={"0"}>
        <Topbar />
        <HStack w="full" h="full" alignItems={"flex-end"} spacing={0}>
          <Flex w="full" h="full" position={"relative"} alignItems={"flex-end"}>
            <VStack
              position={"absolute"}
              overflowY={"auto"}
              w={"full"}
              maxH={"full"}
              marginBottom={"4.5rem"}
              alignItems={"flex-start"}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },

                /* Hide scrollbar for IE, Edge and Firefox */
                "&": {
                  "-ms-overflow-style": "none" /* IE and Edge */,
                  "scrollbar-width": "none" /* Firefox */,
                },
              }}
            >
              {[...messages, ...sendingMessages].map((message, key) => (
                <Message ref={msgBoxRef} {...message} key={key} />
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
                placeholder={t(
                  "dashboard:input-placeholder",
                  "Send message..."
                )}
                bgColor={"white"}
                shadow={"sm"}
                padding={"1rem"}
              />
            </form>
          </Flex>
          <ChatDetails />
        </HStack>
      </VStack>
    </Flex>
  );
};
