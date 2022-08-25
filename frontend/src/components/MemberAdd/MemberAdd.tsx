import { SearchIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosInstance from "../../lib/axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  channel: number;
};

type Inputs = {
  nick: string;
};

export const MemberAdd = ({ isOpen, onClose, channel }: Props) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [searching, setSearching] = useState(false);
  const [successful, setSuccessful] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setSearching(true);
    const nick = data.nick.trim();
    if (nick !== "") {
      await axiosInstance({
        method: "get",
        url: `/users/${nick}`,
      })
        .then((res) => {
          setUser(res.data.nickname);
          setSuccessful(true);
        })
        .catch((error) => {
          if (error.response) {
            setSuccessful(false);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
        });
    }
    setSearching(false);
  };

  const addToChannel = async (asOwner: boolean) => {
    setLoading(true);
    await axiosInstance({
      method: "put",
      url: "channels/users",
      data: {
        id: channel,
        userNickname: user,
        action: asOwner ? "ADD_OWNER" : "ADD_MEMBER",
        directMessage: false,
      },
    }).then(() => {
      setLoading(false);
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Find user to add</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <HStack alignItems={"flex-start"}>
              <FormControl
                isRequired
                isDisabled={searching || successful}
                isInvalid={successful === false}
              >
                <Input
                  {...register("nick")}
                  w={"full"}
                  bgColor={"white"}
                  shadow={"sm"}
                  padding={"1rem"}
                />
                {typeof successful !== "undefined" &&
                  (!successful ? (
                    <FormErrorMessage>User not found.</FormErrorMessage>
                  ) : (
                    <FormHelperText>User found!</FormHelperText>
                  ))}
              </FormControl>
              {successful !== true && (
                <IconButton
                  isLoading={searching}
                  type={"submit"}
                  icon={<SearchIcon />}
                  aria-label={"Search for user"}
                />
              )}
            </HStack>
          </form>
        </ModalBody>
        <ModalFooter
          w={"full"}
          gap={4}
          alignItems="center"
          justifyItems={"center"}
        >
          {successful &&
            (!loading ? (
              <>
                <Button
                  w={"full"}
                  variant="outline"
                  onClick={() => addToChannel(false)}
                >
                  Add as a member
                </Button>
                <Button
                  w={"full"}
                  colorScheme="blue"
                  onClick={() => addToChannel(true)}
                >
                  Add as an owner
                </Button>
              </>
            ) : (
              <CircularProgress isIndeterminate size={"1.75rem"} />
            ))}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
