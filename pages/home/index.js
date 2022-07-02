import {
  Flex,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import AccountModal from "../src/components/accountModal";
import { useDisclosure } from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import Navbar from "../src/components/navbar";
import Card from "../src/components/card";

export default function Display() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Navbar />

      <Flex
        height={"100"}
        width={"100%"}
        justify={"center"}
        alignItems={"center"}
      >
        <Flex
          width={"100%"}
          height={"100"}
          px={"3rem"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {" "}
          <InputGroup>
            <Input
              focusBorderColor={"purple.200"}
              name={"password"}
              type={"text"}
              maxWidth={"10rem"}
              minWidth={"3.5rem"}
              placeholder={"Your Passwords"}
            />
            <InputRightAddon bg={"purple.200"}>
              <SearchIcon />
            </InputRightAddon>
          </InputGroup>
          <Button onClick={onOpen} bg={"purple.200"}>
            <Text fontSize={"xs"}>Add Password</Text>
          </Button>
        </Flex>
        <AccountModal isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </>
  );
}
