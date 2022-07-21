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
import AccountCard from "../src/components/AccountCard";
import { useState, useEffect, useContext } from "react";
import { fetchAccount } from "../src/utils/axios.utils";
import { UserContext } from "../src/contexts/user.context";
import ViewModal from "../src/components/viewModal";

export default function Display() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isViewPassOpen,
    onOpen: onIsViewOpen,
    onClose: onIsViewClose,
  } = useDisclosure();
  const { currentUser } = useContext(UserContext);
  const [openedAccount, setOpenedAccount] = useState("");

  const [accounts, setAccounts] = useState([]);

  const fetchAndSetAccounts = async () => {
    const response = await fetchAccount();
    setAccounts(response.data.data);
    console.log(response);
  };

  useEffect(() => {
    if (currentUser?._id) fetchAndSetAccounts();
  }, [currentUser]);

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
      {accounts.map((account) => (
        <AccountCard
          name={account.name}
          accountId={account._id}
          website={account.domain}
          key={account._id}
          onShowClick={() => {
            setOpenedAccount(account._id);
            onIsViewOpen();
          }}
        />
      ))}
      <ViewModal
        accountId={openedAccount}
        isOpen={isViewPassOpen}
        onClose={onIsViewClose}
      />
    </>
  );
}
