import {
  Flex,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Navbar from '../src/components/navbar';
import Card from '../src/components/card';

export default function Display() {
  return (
    <>
      <Navbar />
      <Flex
        height={'100'}
        width={'100%'}
        justify={'center'}
        alignItems={'center'}
      >
        <Flex
          width={'100%'}
          height={'100'}
          px={'3rem'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          {' '}
          <InputGroup>
            <Input
              borderColor={'purple.500'}
              focusBorderColor={'purple.900'}
              name={'password'}
              type={'text'}
              maxWidth={'15rem'}
              minWidth={'4rem'}
              placeholder={'Search for Passwords'}
            />
            <InputRightAddon bg={'purple.200'} children={<SearchIcon />} />
          </InputGroup>
          <Button bg={'purple.200'} width={{ sm: '1', md: '5' }}>
            <Text>Add Password</Text>
          </Button>
        </Flex>
      </Flex>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </>
  );
}
