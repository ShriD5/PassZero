import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  Flex,
  FormLabel,
} from "@chakra-ui/react";

export default function AccountModal(props) {
  const handleChange = () => {};

  const handleClick = () => {};

  return (
    <>
      <Modal closeOnOverlayClick={false} {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Flex>
                {" "}
                <FormLabel>Account</FormLabel>
              </Flex>
              <Flex maxW={"35rem"}>
                <Input
                  onChange={handleChange}
                  placeholder={"Enter the account to be saved"}
                  required
                  type={"text"}
                  name={"Account Name"}
                />
              </Flex>
              <Flex marginTop={"3"}>
                {" "}
                <FormLabel>Website</FormLabel>
              </Flex>
              <Flex maxW={"27rem"}>
                <Input
                  onChange={handleChange}
                  placeholder={"Website to be saved"}
                  required
                  type={"url.substring(1,7)"}
                  name={"Website"}
                />
              </Flex>
              <Flex marginTop={"3"}>
                {" "}
                <FormLabel>Password to Save</FormLabel>
              </Flex>
              <Flex maxW={"27rem"}>
                <Input
                  onChange={handleChange}
                  placeholder={"Should be more than 5 characters"}
                  required
                  type={"password"}
                  name={""}
                />
              </Flex>
              <Flex marginTop={"3"}>
                {" "}
                <FormLabel>Enter Master Password</FormLabel>
              </Flex>
              <Flex maxW={"27rem"}>
                <Input
                  onChange={handleChange}
                  placeholder={"Should be more than 5 characters"}
                  required
                  type={"password"}
                  name={"masterpass"}
                />
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={handleClick}>
              Save
            </Button>
            <Button onClick={props?.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
