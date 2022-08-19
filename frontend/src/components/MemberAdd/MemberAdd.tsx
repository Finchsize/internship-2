import { SearchIcon, AddIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type Inputs = {
  nick: string;
};

export const MemberAdd = ({ isOpen, onClose }: Props) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [searching, setSearching] = useState(false);
  const [successful, setSuccessful] = useState<boolean>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
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
              {searching ? (
                <CircularProgress isIndeterminate size={"1.75rem"} />
              ) : successful !== true ? (
                <IconButton
                  type={"submit"}
                  icon={<SearchIcon />}
                  aria-label={"Search for user"}
                />
              ) : (
                <IconButton
                  colorScheme={"blue"}
                  variant={"solid"}
                  type={"submit"}
                  icon={<AddIcon />}
                  aria-label={"Search for user"}
                />
              )}
            </HStack>
          </form>
        </ModalBody>
        <ModalFooter w={"full"}>
          {successful && (
            <>
              <Text>Do you want to add user as a member or as an owner?</Text>
              <HStack w={"full"} gap={4}>
                <Button w={"full"} variant="outline">
                  Add as a member
                </Button>
                <Button w={"full"} colorScheme="blue">
                  Add as an owner
                </Button>
              </HStack>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
