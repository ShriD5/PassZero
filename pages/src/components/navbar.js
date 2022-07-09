import { useContext } from "react";
import { Button, Flex } from "@chakra-ui/react";
import Logo from "../../../public/Pass0.png";
import Image from "next/image";
import { SettingsIcon } from "@chakra-ui/icons";
import SetMasterPasswordModal from "../components/modal";
import { useDisclosure } from "@chakra-ui/react";
import { UserContext } from "../contexts/user.context";

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      height={"100"}
      justify={"space-between"}
      alignItems={"center"}
      bg={"purple.200"}
      width={"100%"}
    >
      <Image src={Logo} alt={"Pass0"} width={"200%"} height={"200%"} />
      <Flex marginRight={"10"}>
        {!currentUser.masterPassword && (
          <Button onClick={onOpen}>
            Set Master Password
            <SettingsIcon marginLeft={2} />
          </Button>
        )}
      </Flex>
      <SetMasterPasswordModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Navbar;
