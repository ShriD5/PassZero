import { Button, Center, Heading, Stack, Flex, Text } from '@chakra-ui/react';
import { EditIcon, ViewIcon } from '@chakra-ui/icons';

export default function Card() {
  return (
    <Center py={6}>
      <Stack
        borderWidth='1px'
        borderRadius='lg'
        w={{ md: '40%', sm: '50%' }}
        height={'50%'}
        direction={{ md: 'column', sm: 'row' }}
        boxShadow={'2xl'}
        padding={2}
        gap={2}
      >
        <Stack
          flex={1}
          flexDirection='row'
          justifyContent='center'
          alignItems='center'
          gap={7}
        >
          <Flex justifyContent='center' alignItems='center' gap={'1'}>
            <Text fontFamily={''}>Github</Text>
            {/* <Text fontFamily={'heading'}> (devu.nm21@gmail.com)</Text> */}
          </Flex>
          {/* <Flex justifyContent='center' alignItems='center'>
            <Text fontFamily={'heading'}> (devu.nm21@gmail.com)</Text>
          </Flex> */}
          <Flex gap={'6'}>
            {' '}
            <Button
              bg={'purple.200'}
              borderRadius={'100%'}
              _hover={{ color: 'pink.400', backgroundColor: 'purple.600' }}
            >
              <EditIcon w={3} h={3} />
            </Button>
            <Button
              bg={'purple.200'}
              borderRadius={'100%'}
              _hover={{ color: 'pink.400', backgroundColor: 'purple.600' }}
            >
              <ViewIcon w={3} h={3} />{' '}
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Center>
  );
}
