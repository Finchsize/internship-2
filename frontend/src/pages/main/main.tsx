import Cookies from "js-cookie";
import parseJwt from "../../lib/parseJwt";
import axiosInstance from "../../lib/axios";
import { useForm, SubmitHandler } from "react-hook-form";

import { Flex, HStack, Input, VStack } from "@chakra-ui/react";
import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import { ChatDetails } from "../../components/UsersList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type Inputs = {
  message: string;
};

export const Main = () => {
  const navigator = useNavigate();
  const [JWT, setJWT] = useState<
    { nickname: string; exp: number } | undefined
  >();

  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof parseJwt(Cookies.get("token")) === "undefined") {
        navigator("/signin");
      } else {
        setJWT(parseJwt(Cookies.get("token")));
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

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

  return (
    <Flex
      flexDirection={"row"}
      bgColor={"blackAlpha.50"}
      w={"full"}
      h={"100vh"}
    >
      <Sidebar nickname={JWT?.nickname} />
      <VStack w="full" h="full" spacing={"0"}>
        <Topbar />
        <HStack w="full" h="full" alignItems={"flex-end"}>
          <Flex
            alignItems={"flex-start"}
            justifyContent={"flex-end"}
            flexDirection={"column"}
            padding={"1rem"}
            w="full"
          >
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Input
                {...register("message")}
                w={"full"}
                placeholder="Message..."
                bgColor={"white"}
                shadow={"sm"}
              />
            </form>
          </Flex>
          <ChatDetails />
        </HStack>
      </VStack>
    </Flex>
  );
};
