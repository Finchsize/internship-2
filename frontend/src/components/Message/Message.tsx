import { HStack, Avatar, VStack, Text } from "@chakra-ui/react";
import { forwardRef, RefObject } from "react";

type Props = {
  content: string;
  authorNick: string;
  createdAt: string;
};

export const Message = forwardRef(
  ({ content, authorNick, createdAt }: Props, ref) => {
    return (
      <HStack
        ref={ref ? (ref as RefObject<HTMLDivElement>) : null}
        spacing={"0.75rem"}
        paddingX={"1rem"}
      >
        <Avatar size={"sm"} />
        <VStack alignItems={"flex-start"} spacing={0}>
          <HStack>
            <Text fontSize={"sm"}>{authorNick}</Text>
            <Text fontSize={"xs"}>{new Date(createdAt).toLocaleString()}</Text>
          </HStack>
          <Text>{content}</Text>
        </VStack>
      </HStack>
    );
  }
);
