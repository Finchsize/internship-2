import {
  Flex,
  Container,
  Heading,
  Input,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormEvent, useId, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axios";

export const Signin = () => {
  const navigator = useNavigate()
  const loginId = useId();
  const [exception, setException] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axiosInstance({
      method: "post",
      url: "/login",
      data: {
        // Read data from target, then convert it to object, and then extract the login
        nickname: Object.fromEntries(new FormData(event.currentTarget)).login,
      },
    })
      .then((response) => {
        setException("");
        Cookies.set("token", response.data, { expires: 7 });
        navigator("/");
      })
      .catch((error) => {
        if (error.response) {
          setException(error.response.data.exceptionMessage);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  return (
    <Flex
      bgColor={"blackAlpha.50"}
      width={"full"}
      minHeight={"100vh"}
      alignItems={"center"}
    >
      <Container>
        <form onSubmit={handleSubmit}>
          <Flex
            bgColor={"white"}
            direction={"column"}
            p={6}
            alignItems={"center"}
            borderRadius={10}
            gap={6}
            borderColor={"blackAlpha.200"}
            borderWidth={1}
            boxShadow={"md"}
          >
            <Flex direction={"column"} w={"full"} gap={2}>
              <Heading
                w={"full"}
                textAlign={"center"}
                as={"h1"}
                size="2xl"
                color={"blackAlpha.900"}
              >
                Sign in
              </Heading>
              <Heading
                w={"full"}
                textAlign={"center"}
                as={"h2"}
                size={"md"}
                color={"blackAlpha.600"}
              >
                to your Chat™ account
              </Heading>
            </Flex>

            <FormControl isRequired isInvalid={exception !== ""}>
              <FormLabel
                htmlFor={loginId}
                as={"h3"}
                size={"sm"}
                color={"blackAlpha.600"}
              >
                Login
              </FormLabel>
              <Input id={loginId} name="login" type={"text"} />
              {exception !== "" && (
                <FormErrorMessage>{exception}</FormErrorMessage>
              )}
            </FormControl>
            <Flex
              width={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Link to="/register">
                <Button colorScheme="blue" variant={"link"}>
                  Don't have an account?
                </Button>
              </Link>
              <Button colorScheme="blue" type={"submit"}>
                Sign in
              </Button>
            </Flex>
          </Flex>
        </form>
      </Container>
    </Flex>
  );
};
