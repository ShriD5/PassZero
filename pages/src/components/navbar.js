import { Flex } from '@chakra-ui/react';
import Logo from '../../../public/Pass0.png';
import Image from 'next/image';

const Navbar = () => {
  return (
    <Flex
      height={'100'}
      justify={'center'}
      alignItems={'center'}
      bg={'purple.200'}
      width={'100%'}
    >
      <Image src={Logo} width={'200%'} height={'200%'} />
    </Flex>
  );
};

export default Navbar;
