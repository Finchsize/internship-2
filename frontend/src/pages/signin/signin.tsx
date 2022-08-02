import {
  Flex,
  Container,
  Heading,
  Stack,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export const Signin = () => {
  const [email, setEmail] = useState<string>();
  const [passwordLength, setPasswordLength] = useState<number>();

  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  const checkPasswordLength = (): boolean => {
    if (typeof passwordLength === "undefined") {
      return true;
    }
    return passwordLength >= 8;
  };

  const checkEmail = (): boolean => {
    if (typeof email === "undefined") {
      return true;
    }
    if (
      email.includes("@") &&
      email.split("@").length - 1 === 1 &&
      email.split("@")[1].includes(".") &&
      email.split("@")[1].split(".").length - 1 === 1
    ) {
      return true;
    }
    return false;
  };

  return (
    <Flex
      bgColor={"blackAlpha.50"}
      width={"full"}
      minHeight={"100vh"}
      alignItems={"center"}
    >
      <Container>
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
          <Stack spacing={2} width={"full"}>
            <Heading as={"h3"} size={"sm"} color={"blackAlpha.600"}>
              Email
            </Heading>
            <Input
              isInvalid={!checkEmail()}
              placeholder="john@example.com"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!checkEmail() && (
              <Text fontSize={"sm"} color={"blackAlpha.600"}>
                Please enter a valid email.
              </Text>
            )}
          </Stack>
          <Stack spacing={2} width={"full"}>
            <Heading as={"h3"} size={"sm"} color={"blackAlpha.600"}>
              Password
            </Heading>
            <InputGroup>
              <Input
                isInvalid={!checkPasswordLength()}
                pr="4.7rem"
                type={show ? "text" : "password"}
                placeholder="********"
                onChange={(e) => setPasswordLength(e.target.value.length)}
              />
              <InputRightElement width="4.7rem">
                <Button
                  size="sm"
                  width={"4.2rem"}
                  height={"1.75rem"}
                  marginRight={"0.2rem"}
                  onClick={handleClick}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {!checkPasswordLength() && (
              <Text fontSize={"sm"} color={"blackAlpha.600"}>
                Password must be at least 8 characters long.
              </Text>
            )}
          </Stack>
          <Flex
            width={"full"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Button colorScheme="blue" variant={"link"}>
              Don't have an account?
            </Button>
            <Button colorScheme="blue">Sign in</Button>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};
