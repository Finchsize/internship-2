import Cookies from "js-cookie";
import parseJwt from "../../lib/parseJwt";
import axiosInstance from "../../lib/axios";
import { useForm, SubmitHandler } from "react-hook-form";

import { Flex, HStack, Input, VStack } from "@chakra-ui/react";
import { Sidebar } from "../../components/Sidebar";
import { Topbar } from "../../components/Topbar";
import { ChatDetails } from "../../components/ChatDetails";

type Inputs = {
  message: string;
};

export const Main = () => {
  const JWT: { nickname: string; exp: number } | undefined = parseJwt(
    Cookies.get("token")
  );

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
      <Sidebar />
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
