import { Text, HStack, Heading } from "@chakra-ui/react";

export const Topbar = () => {
  return (
    <HStack
      w="full"
      bgColor={"white"}
      alignItems={"flex-end"}
      py={"0.75rem"}
      px={"1rem"}
      borderBottom={"1px"}
      borderColor={"blackAlpha.200"}
    >
      <Heading as={"h1"} fontSize={"xl"} fontWeight={"medium"}>
        Main
      </Heading>
      <Text fontSize={"sm"} fontWeight={"normal"} textColor={"blackAlpha.600"}>
        this is the main chat's description, were all the information about it
        shall be
      </Text>
    </HStack>
  );
};
