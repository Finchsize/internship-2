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
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  member: {
    nickname: string;
    owner: boolean;
  };
};

export const MemberManage = ({ isOpen, onClose, member }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Manage user</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          What do you want to with the member{" "}
          <Text textColor={"blue"}>{member.nickname}?</Text>
        </ModalBody>
        <ModalFooter w={"full"} gap={4}>
          <Button w={"full"} variant="outline">
            Cancel
          </Button>
          <Button w={"full"} colorScheme="red">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
