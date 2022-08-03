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
  const [pass, setPass] = useState<string>(); // reduntant
  const [secondaryPass, setSecondaryPass] = useState<string>(); // reduntant
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
    }).then((response) => {
      console.log(response);
      Cookies.set("token", response.data.token, {expires: 7});

    }).catch(function(error){
      if(error.response){
        setException("");
      }
      else if (error.request) {
        console.log(error.request);
      }
      else {
        console.log("Error", error.message);
      }
    })
  };

  function checkEmail(): boolean {
    if (typeof email === "undefined") {
      return true;
    }
    return /\S+@\S+\.\S+/.test(email);
  }
  const checkPassLength = (): boolean => {
    if (typeof pass === "undefined") return true;
    else return pass.length > 5;
  };

  function passwordValidation(e: any) {
    // reduntant
    setPass(e);
  }
  const confirmPass = (): boolean => {
    // redundant
    return pass === secondaryPass;
  };

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
          height="800"
          justifyContent="center"
          borderRadius={30}
          padding={8}
        >
          <Stack width={"full"}>
            <Heading textAlign={"center"} size={"2xl"} py={"9"}>
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
                    mb={"2rem"}
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

                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <LockIcon> </LockIcon> <s>Password</s>
                  </FormLabel>
                  <Input
                    isDisabled={true}
                    type="password"
                    isInvalid={!checkPassLength()}
                    onChange={(e) => passwordValidation(e.target.value)}
                  />
                  <FormHelperText mb={"2rem"}>
                    Password has to contain atleast 6 characters.
                  </FormHelperText>

                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <s>
                      {" "}
                      <LockIcon> </LockIcon> Confirm Password
                    </s>
                  </FormLabel>
                  <Input
                    isDisabled={true}
                    isInvalid={!confirmPass()}
                    onChange={(e) => setSecondaryPass(e.target.value)}
                    type="password"
                    mb={"3rem"}
                  />

                  <Flex
                    width={"full"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Button colorScheme="blue" variant={"link"}>
                      Don't have an account?
                    </Button>
                    <Button colorScheme="teal" type={"submit"}>
                      Sign in
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
