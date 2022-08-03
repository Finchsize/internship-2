import { Box, Flex, Button } from "@chakra-ui/react";
import { Heading, Text, Stack } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { ChatIcon, LockIcon } from "@chakra-ui/icons";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const Register = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState<string>();
  const [exception, setException] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    await axios({
      method: "POST",
      url: "http://localhost:8080/users",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      data: {
        nickname: login,
        firstName: "string",
        lastName: "string",
        email: email,
        phoneNumber: "123456789",
        country: "String",
        city: "Ghymobuimaoebegdraagbwgzwmbzajmmjtwxieocvqpskubhrmqgpernlomzhw",
        language: "POLISH",
      },
      responseType: "json",
    })
      .then((response) => {
        setException("");
        Cookies.set("token", response.data.token, { expires: 7 });
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

  const checkEmail = (): boolean => {
    if (typeof email === "undefined") {
      return true;
    }
    return /\S+@\S+\.\S+/.test(email);
  }

  return (
    <div>
      <Flex
        bgColor={"blackAlpha.50"}
        width={"full"}
        minHeight={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex
          bgColor={"whiteAlpha.50"}
          shadow={"2xl"}
          border={"1px"}
          borderColor={"gray.200"}
          width="500px"
          height="700"
          justifyContent="center"
          borderRadius={30}
          padding={8}
        >
          <Stack width={"full"}>
            <Heading textAlign={"center"} size={"2xl"} pt={"12"} pb={"5rem"}>
              <h1>Sign up</h1>
            </Heading>

            <Box width={"100%"}>
              <form onSubmit={handleSubmit}>
                <FormControl my={8}>
                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <ChatIcon> </ChatIcon> Name
                  </FormLabel>
                  <Input
                    value={login}
                    type="text"
                    onChange={(e) => setLogin(e.target.value)}
                    mb={"4rem"}
                  />

                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <EmailIcon> </EmailIcon> Email
                  </FormLabel>
                  <Input
                    type="email"
                    value={email}
                    mb={"2rem"}
                    isInvalid={!checkEmail()}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {exception !== "" && (
                    <FormErrorMessage>{exception}</FormErrorMessage>
                  )}

                  <Flex
                    width={"full"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Button colorScheme="blue" variant={"link"}>
                      Don't have an account?
                    </Button>
                    <Button colorScheme="teal" type={"submit"}>
                      Sign up
                    </Button>
                  </Flex>
                </FormControl>
              </form>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </div>
  );
};
