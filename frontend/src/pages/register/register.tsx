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
import { useState } from "react";

export const Register = () => {

  const [email, setEmail] = useState<string>();
  const [pass, setPass] = useState<string>();
  const [secondaryPass, setSecondaryPass] = useState<string>();
  

  function checkEmail(): boolean {
    if (typeof email === "undefined") {
      return true;
    }
    return /\S+@\S+\.\S+/.test(email);
  }
  const checkPassLength = (): boolean => {

    if (typeof pass === "undefined") return true;
    else return pass.length > 5;
  }
  function passwordValidation(e:any){
  
    setPass(e);
    
    
  }
  const confirmPass = ():boolean =>{
    
    return pass === secondaryPass;
    
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
              <FormControl my={8}>
                <FormLabel fontSize={"xl"}>
                  {" "}
                  <ChatIcon> </ChatIcon> Name
                </FormLabel>
                <Input type="text" max={30} mb={"2rem"} />

                <FormLabel fontSize={"xl"}>
                  {" "}
                  <EmailIcon> </EmailIcon> Email
                </FormLabel>
                <Input
                  type="email"
                  mb={"2rem"}
                  isInvalid={!checkEmail()}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <FormLabel fontSize={"xl"}>
                  {" "}
                  <LockIcon> </LockIcon> Password
                </FormLabel>
                <Input type="password" isInvalid={!checkPassLength()} onChange={(e) => (passwordValidation(e.target.value))}/>
                <FormHelperText mb={"2rem"}>
                  Password has to contain atleast 6 characters.
                </FormHelperText>

                <FormLabel fontSize={"xl"}>
                  {" "}
                  <LockIcon> </LockIcon> Confirm Password
                </FormLabel>
                <Input isInvalid={!confirmPass()} onChange={(e) => setSecondaryPass(e.target.value)} type="password" mb={"3rem"} />
              </FormControl>

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
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </div>
  );
};
