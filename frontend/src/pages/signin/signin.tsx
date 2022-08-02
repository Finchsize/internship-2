import { Flex, Container, Heading } from "@chakra-ui/react";

export const Signin: React.FC = () => {
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
          <Flex direction={"column"} w={"full"} gap={2}>
            <Heading as={"h3"} size={"sm"} color={"blackAlpha.600"}>
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
        </Flex>
      </Container>
    </Flex>
  );
};
