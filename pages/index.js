import {
  Center,
  Stack,
  Image,
  Heading,
  Text,
  Button,
  Input,
  Checkbox,
  InputLeftAddon,
  InputGroup,
  Flex,
  Icon,
} from '@chakra-ui/react';
import swal from 'sweetalert';

import { AtSignIcon } from '@chakra-ui/icons';
import { RiLockPasswordFill, RiLockPasswordLine } from 'react-icons/ri';
import { BsPersonFill } from 'react-icons/bs';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { createAuthUserWithEmailAndPassword } from './src/utils/firebase.utils';
import { useState } from 'react';

// import { inputfield } from './src/components/inputfield';

// import styles from '../styles/Home.module.css';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function Home() {
  const router = useRouter();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      swal('Error!', 'Passwords do not match!', 'error');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await swal(
        'Signed Up Successfully!',
        'Log into your account to manage your passwords!',
        'success'
      );
      router.push('/login');

      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        swal('Cant create user!', 'Email Already In Use!', 'error');
      } else {
        console.log('user creation encountered an error', error);
      }
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Center h={'100vh'} bg={'purple.100'}>
      <Stack
        boxShadow={'md'}
        bg={'whiteAlpha.900'}
        padding={'10px'}
        rounded={'2xl'}
      >
        <Image src={'Pass0.png'} maxWidth={'220px'} mx={'auto'} />
        <Text
          bg={'blackAlpha.800'}
          bgClip={'text'}
          fontSize={'xx-large'}
          fontWeight={'extrabold'}
          textAlign={'center'}
          marginTop={'15px'}
        >
          Sign Up
        </Text>
        <Flex alignContent={'center'} justify={'center'}>
          {' '}
          <Text mx={'3'} fontSize={'sm'} textColor={'gray.500'}>
            Sign up to manage and store your passwords
          </Text>
        </Flex>

        <Formik
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
            }, 1000);
          }}
          initialValues={{ email: '', password: '' }}
        >
          {({ isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Stack mx={'10'} my={'1'} spacing={'5'}>
                <InputGroup>
                  <InputLeftAddon
                    bg={'purple.400'}
                    // bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                  ><Icon as={BsPersonFill} /></InputLeftAddon>{' '}
                  <Input
                    onChange={handleChange}
                    maxWidth={'17rem'}
                    focusBorderColor={'purple.500'}
                    name={'displayName'}
                    type={'text'}
                    label={'name'}
                    placeholder={'Display Name'}
                    value={displayName}
                    required

                    // leftAddon={<AtSignIcon color={'purple.500'} />}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon
                    bg={'purple.400'}
                    // bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                    children={<AtSignIcon />}
                  />{' '}
                  <Input
                    onChange={handleChange}
                    maxWidth={'17rem'}
                    focusBorderColor={'purple.500'}
                    name={'email'}
                    type={'email'}
                    label={'Email'}
                    placeholder={'Enter your email'}
                    value={email}
                    required

                    // leftAddon={<AtSignIcon color={'purple.500'} />}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon
                    bg={'purple.400'}
                    // bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                    children={<Icon as={RiLockPasswordLine} />}
                  />{' '}
                  <Input
                    onChange={handleChange}
                    maxWidth={'17rem'}
                    focusBorderColor={'purple.500'}
                    name={'password'}
                    type={'password'}
                    label={'Password'}
                    placeholder={'Enter your password'}
                    value={password}
                    required
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon
                    bg={'purple.400'}
                    // bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                    children={<Icon as={RiLockPasswordFill} />}
                  />
                  <Input
                    onChange={handleChange}
                    placeholder={'Confirm your password'}
                    maxWidth={'17rem'}
                    focusBorderColor={'purple.500'}
                    name={'confirmPassword'}
                    type={'password'}
                    label={'Password'}
                    value={confirmPassword}
                    required

                    // leftAddon={<LockIcon color={'purple.500'} />}
                  />
                </InputGroup>
                {/* 
                <Checkbox size={'sm'} colorScheme={'pink'} defaultChecked>
                  Keep me logged in
                </Checkbox> */}
              </Stack>

              <Flex
                mt={'5'}
                alignContent={'center'}
                justifyContent={'center'}
                gap={'6 '}
              >
                {' '}
                <Button
                  isLoading={isSubmitting}
                  loadingText={'Whispering to our servers'}
                  bg={'purple.400'}
                  // bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                  type={'submit'}
                  width={'12rem'}
                  _hover={{ bg: 'purple.700', color: 'pink' }}
                >
                  Sign up
                </Button>
                {/* <Button
                  isLoading={isSubmitting}
                  loadingText={'Whispering to our servers'}
                  bg={'purple.400'}
                  // bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                  type={'submit'}
                  maxWidth={'15rem'}
                  size={'md'}
                >
                  Login
                </Button> */}
              </Flex>
            </Form>
          )}
        </Formik>

        <Stack
          padding={'20px'}
          justify={'center'}
          color={'gray.600'}
          spacing={'3'}
        >
          <Text size={'sm'} as={'div'} textAlign={'center'}>
            <span>Already have an account?</span>
            <Button
              onClick={() => router.push('/login')}
              size={'sm'}
              paddingLeft={'1.5'}
              colorScheme={'purple'}
              variant={'link'}
              _hover={{ color: 'pink.500' }}
            >
              Login{' '}
            </Button>
          </Text>
        </Stack>
      </Stack>
    </Center>
  );
}
