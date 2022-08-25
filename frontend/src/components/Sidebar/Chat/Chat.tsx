import { ListItem, Button, Icon, HStack, Text, Badge } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { MdPerson, MdOutlineForum } from "react-icons/md";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../lib/axios";
import Cookies from "js-cookie";

type Props = {
  id: number | null;
  owners?: string[];
  members?: string[];
  directMessage?: boolean;
};

export const Chat = ({ id, owners, members, directMessage }: Props) => {
  const params = useParams();
  const [notify, setNotify] = useState(false);

  const checkIfNewMessages = useCallback(() => {
    const localNumber = localStorage.getItem(
      `channel${id === null ? "main" : id}msgCount`
    );
    console.log("localNumber: ", localNumber);
    axiosInstance({
      method: "GET",
      url: `/messages${id !== null ? `/channels/${id}` : ""}`,
    }).then((response) => {
      const latestId =
        response.data.length === 0
          ? 0
          : response.data[response.data.length - 1].id;
      console.log("dbNumber: ", latestId);
      console.log("Params: ", params.id);
      if (
        localNumber !== null &&
        latestId > localNumber &&
        ((params.id !== undefined && id === null) ||
          (params.id === undefined && id !== null))
      ) {
        setNotify(true);
      } else {
        localStorage.setItem(
          `channel${id === null ? "main" : id}msgCount`,
          latestId
        );
        setNotify(false);
      }
    });
  }, [id, params.id]);

  useEffect(() => checkIfNewMessages(), [checkIfNewMessages, params.id]);

  useEffect(() => {
    checkIfNewMessages();
    const interval = setInterval(() => {
      checkIfNewMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [checkIfNewMessages]);

  return (
    <ListItem pr={".5rem"}>
      <Link to={id === null ? "/" : `/${id}`}>
        <Button
          _hover={{
            bgColor: "blackAlpha.50",
          }}
          _active={{
            bgColor: "blackAlpha.200",
          }}
          gap={"0.25rem"}
          leftIcon={
            <Icon as={!directMessage ? MdOutlineForum : MdPerson} h={5} w={5} />
          }
          variant={"ghost"}
          w={"full"}
          justifyContent={"flex-start"}
          onClick={() => {
            window.location.replace(id === null ? "/" : `/${id}`);
          }}
        >
          <HStack>
            <Text>
              {typeof members === "undefined" || typeof owners === "undefined"
                ? "Main"
                : `${owners[0]}'s chat #${id}`}
            </Text>
            {notify && <Badge colorScheme="blue">New</Badge>}
          </HStack>
        </Button>
      </Link>
    </ListItem>
  );
};
