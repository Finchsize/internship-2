import { ChatIcon, BellIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Text,
  Box,
  Flex,
  Accordion,
  Heading,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  List,
  ListItem,
  Button,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import parseJwt from "../../lib/parseJwt";

export const Sidebar = () => {
  const JWT: { nickname: string; exp: number } | undefined = parseJwt(
    Cookies.get("token")
  );
  return (
    <Flex
      flexDirection={"column"}
      w={"20rem"}
      justifyContent={"space-between"}
      bgColor={"white"}
      borderRight={"1px"}
      borderColor={"blackAlpha.200"}
      pt={"0.75rem"}
    >
      <Accordion borderColor={"transparent"} allowToggle>
        <Heading
          px={"1rem"}
          pb={"0.5rem"}
          as={"h1"}
          fontSize={"xl"}
          fontWeight={"medium"}
        >
          Chats
        </Heading>
        <AccordionItem>
          <Heading as={"h2"} px={"1rem"}>
            <AccordionButton
              gap={"0.5rem"}
              borderRadius={"md"}
              px={2}
              _hover={{
                bgColor: "blackAlpha.50",
              }}
            >
              <AccordionIcon h={6} w={6} />
              <Box flex="1" textAlign="left">
                staż-chat
              </Box>
            </AccordionButton>
          </Heading>
          <AccordionPanel py={0} pl={12}>
            <List>
              <ListItem>
                <Button
                  _hover={{
                    bgColor: "blackAlpha.50",
                  }}
                  _active={{
                    bgColor: "blackAlpha.200",
                  }}
                  gap={"0.25rem"}
                  leftIcon={<ChatIcon />}
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"flex-start"}
                >
                  main
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
                  gap={"0.25rem"}
                  leftIcon={<ChatIcon />}
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"flex-start"}
                >
                  main
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
                  gap={"0.25rem"}
                  leftIcon={<ChatIcon />}
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"flex-start"}
                >
                  main
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
                  gap={"0.25rem"}
                  leftIcon={<ChatIcon />}
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"flex-start"}
                >
                  main
                </Button>
              </ListItem>
            </List>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <Heading as={"h2"} px={"1rem"}>
            <AccordionButton
              gap={"0.5rem"}
              borderRadius={"md"}
              px={2}
              _hover={{
                bgColor: "blackAlpha.50",
              }}
            >
              <AccordionIcon h={6} w={6} />
              <Box flex="1" textAlign="left">
                staż-chat
              </Box>
            </AccordionButton>
          </Heading>
          <AccordionPanel py={0} pl={12}>
            <List>
              <ListItem>
                <Button
                  _hover={{
                    bgColor: "blackAlpha.50",
                  }}
                  _active={{
                    bgColor: "blackAlpha.200",
                  }}
                  gap={"0.25rem"}
                  leftIcon={<ChatIcon />}
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"flex-start"}
                >
                  main
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
                  gap={"0.25rem"}
                  leftIcon={<ChatIcon />}
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"flex-start"}
                >
                  main
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
                  gap={"0.25rem"}
                  leftIcon={<ChatIcon />}
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"flex-start"}
                >
                  main
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
                  gap={"0.25rem"}
                  leftIcon={<ChatIcon />}
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"flex-start"}
                >
                  main
                </Button>
              </ListItem>
            </List>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <Heading as={"h2"} px={"1rem"}>
            <AccordionButton
              gap={"0.5rem"}
              borderRadius={"md"}
              px={2}
              _hover={{
                bgColor: "blackAlpha.50",
              }}
            >
              <AccordionIcon h={6} w={6} />
              <Box flex="1" textAlign="left">
                staż-chat
              </Box>
            </AccordionButton>
          </Heading>
          <AccordionPanel py={0} pl={12}>
            <List>
              <ListItem>
                <Button
                  _hover={{
                    bgColor: "blackAlpha.50",
                  }}
                  _active={{
                    bgColor: "blackAlpha.200",
                  }}
                  gap={"0.25rem"}
                  leftIcon={<ChatIcon />}
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"flex-start"}
                >
                  main
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
                  gap={"0.25rem"}
                  leftIcon={<ChatIcon />}
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"flex-start"}
                >
                  main
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
                  gap={"0.25rem"}
                  leftIcon={<ChatIcon />}
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"flex-start"}
                >
                  main
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
                  gap={"0.25rem"}
                  leftIcon={<ChatIcon />}
                  variant={"ghost"}
                  w={"full"}
                  justifyContent={"flex-start"}
                >
                  main
                </Button>
              </ListItem>
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Flex
        flexDirection={"row"}
        py={"0.75rem"}
        px={"1rem"}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderTop={"1px"}
        borderColor={"blackAlpha.200"}
      >
        <HStack spacing={"1rem"}>
          <Avatar size={"xs"}>
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Text fontSize={"lg"} fontWeight={"medium"}>
            {JWT?.nickname}
          </Text>
        </HStack>
        <HStack>
          <IconButton
            variant={"ghost"}
            aria-label="Read unread notifications"
            icon={<BellIcon />}
          />
          <IconButton
            variant={"ghost"}
            aria-label="Change settings"
            icon={<SettingsIcon />}
          />
        </HStack>
      </Flex>
    </Flex>
  );
};
