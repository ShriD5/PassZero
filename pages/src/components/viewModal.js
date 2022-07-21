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
  Text,
} from "@chakra-ui/react";
import { showPass } from "../../src/utils/axios.utils";
import { useState } from "react";

export default function ViewModal(props) {
  const defaultInputValues = {
    masterPassword: "",
  };

  const [inputValues, setInputValues] = useState(defaultInputValues);
  const [plainPass, setPlainPass] = useState();
  const [err, setErr] = useState();

  const { masterPassword } = inputValues;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ inputValues, [name]: value });
  };

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      const response = await showPass(props.accountId, masterPassword);
      const pwd = response.data.data;

      setPlainPass(pwd);
    } catch (error) {
      setErr("Master Password Is Incorrect");
    }
  };

  const handleClose = () => {
    setPlainPass("");
    setErr("");
    setInputValues(defaultInputValues);

    props?.onClose();
  };

  return (
    <>
      <Modal
        onClose={handleClose}
        closeOnOverlayClick={false}
        isOpen={props.isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {plainPass ? "Your Password is " : "Enter Master Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              {plainPass ? (
                <Flex>
                  <Flex> </Flex> <Text>{plainPass}</Text>
                </Flex>
              ) : (
                <Flex maxW={"100%"}>
                  <Input
                    onChange={handleChange}
                    placeholder={"Should be more than 5 characters"}
                    required
                    type={"password"}
                    name={"masterPassword"}
                    value={masterPassword}
                  />
                </Flex>
              )}
              {err && (
                <Text
                  color={"red"}
                  padding={"3.5"}
                  borderRadius={"3.5"}
                  backgroundColor={"ButtonHighlight"}
                  marginTop={"3.5"}
                >
                  {err}
                </Text>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {!plainPass && (
              <Button colorScheme="purple" mr={3} onClick={handleClick}>
                Show Password
              </Button>
            )}
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
