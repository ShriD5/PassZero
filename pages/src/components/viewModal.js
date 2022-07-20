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
import { createPass } from "../../src/utils/axios.utils";
import { useState } from "react";
import swal from "sweetalert";

export default function ViewModal(props) {
  const defaultInputValues = {
    masterPassword: "",
    confirmPassword: "",
  };

  const [inputValues, setInputValues] = useState(defaultInputValues);
  const { masterPassword, confirmPassword } = inputValues;

  // const resetInputFields = () => {
  //   setInputValues(defaultInputValues);
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (masterPassword !== confirmPassword) {
      swal("Error!", "Passwords do not match!", "error");
      return;
    }
    createPass(masterPassword);
  };
  return (
    <>
      <Modal closeOnOverlayClick={false} {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Master Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Flex>
                {" "}
                <FormLabel>Enter Master Password</FormLabel>
              </Flex>
              <Flex maxW={"20rem"}>
                <Input
                  onChange={handleChange}
                  placeholder={"Should be more than 5 characters"}
                  required
                  type={"password"}
                  name={"masterPassword"}
                  value={masterPassword}
                />
              </Flex>
              <Flex marginTop={"3"}>
                {" "}
                <FormLabel>Confirm Master Pasword</FormLabel>
              </Flex>
              <Flex maxW={"20rem"}>
                <Input
                  onChange={handleChange}
                  placeholder={"Should be more than 5 characters"}
                  required
                  type={"password"}
                  name={"confirmPassword"}
                  value={confirmPassword}
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
