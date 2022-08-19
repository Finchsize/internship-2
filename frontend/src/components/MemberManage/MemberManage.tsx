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
          {`What do you want to with ${member.nickname}?`}
        </ModalBody>
        <ModalFooter w={"full"} gap={4}>
          <Button w={"full"} variant="outline">
            {`Make ${member.nickname} ${
              member.owner ? " a member" : " an owner"
            }`}
          </Button>
          <Button w={"full"} colorScheme="red">
            {`Remove ${member.nickname}`}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
