import {
  Text,
  VStack,
  Heading,
  List,
  ListItem,
  Button,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";

export const ChatDetails = () => {
  return (
    <VStack
      h="full"
      w={"20rem"}
      bgColor={"white"}
      py={"0.75rem"}
      px={"1rem"}
      borderLeft={"1px"}
      alignItems={"flex-start"}
      borderColor={"blackAlpha.200"}
    >
      <Heading as={"h1"} fontSize={"xl"} fontWeight={"medium"}>
        Users
      </Heading>
      <List w={"full"}>
        <ListItem>
          <Button
            _hover={{
              bgColor: "blackAlpha.50",
            }}
            _active={{
              bgColor: "blackAlpha.200",
            }}
            variant={"ghost"}
            w={"full"}
            gap={"1rem"}
            justifyContent={"flex-start"}
          >
            <Avatar size={"xs"}>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
            <Text fontSize={"md"}>Maciej</Text>
          </Button>
        </ListItem>
        <ListItem>
          <Button
            _hover={{
              bgColor: "blackAlpha.50",
            }}
            _active={{
              bgColor: "blackAlpha.200",
            }}
            variant={"ghost"}
            w={"full"}
            gap={"1rem"}
            justifyContent={"flex-start"}
          >
            <Avatar size={"xs"}>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
            <Text fontSize={"md"}>mvrcel</Text>
          </Button>
        </ListItem>
        <ListItem>
          <Button
            _hover={{
              bgColor: "blackAlpha.50",
            }}
            _active={{
              bgColor: "blackAlpha.200",
            }}
            variant={"ghost"}
            w={"full"}
            gap={"1rem"}
            justifyContent={"flex-start"}
          >
            <Avatar size={"xs"}>
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
            <Text fontSize={"md"}>Danielxwbt</Text>
          </Button>
        </ListItem>
      </List>
    </VStack>
  );
};
