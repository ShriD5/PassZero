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
import { useState } from "react";
import { createAccount } from "../utils/axios.utils";

export default function AccountModal(props) {
  const defaultInputValues = {
    accountName: "",
    Website: "",
    Password: "",
    MasterPassword: "",
  };

  const [inputValues, setInputValues] = useState(defaultInputValues);
  const { accountName, website, password, MasterPassword } = inputValues;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleClick = (event) => {
    event.preventDefault();

    createAccount(accountName, website, password, MasterPassword);
  };
  return (
    <>
      <Modal closeOnOverlayClick={true} {...props}>
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
                  name={"accountName"}
                  value={accountName}
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
                  type={"url"}
                  name={"website"}
                  value={website}
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
                  name={"password"}
                  value={password}
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
                  name={"MasterPassword"}
                  value={MasterPassword}
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
