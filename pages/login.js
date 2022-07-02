import {
  Center,
  Stack,
  Image,
  Text,
  Button,
  Input,
  InputLeftAddon,
  InputGroup,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { LockIcon, AtSignIcon } from "@chakra-ui/icons";
import { AiFillGoogleCircle } from "react-icons/ai";
import { Icon } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "./src/utils/firebase.utils";
import { useRouter } from "next/router";
import swal from "sweetalert";
import getApi from "./src/lib/axios";
import { createUser } from "./src/utils/axios.utils";
// import { inputfield } from './src/components/inputfield';

// import styles from '../styles/Home.module.css';
const defaultFormFields = {
  email: "",
  password: "",
};

export default function Home() {
  const router = useRouter();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const user = await signInWithGooglePopup();
    try {
      const res = createUser();
      console.log({ res });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      getApi().then((api) => api.get("/api/hello"));

      router.push("/home");

      // console.log({ user });
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          swal("Cant create user!", "Incorrect Password!", "error");
          break;
        case "auth/user-not-found":
          swal(
            "Cant create user!",
            "No user associated with this email!",
            "error"
          );
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <Center h={"100vh"} bg={"purple.100"}>
      <Stack
        boxShadow={"md"}
        bg={"whiteAlpha.900"}
        paddingTop={"1"}
        rounded={"2xl"}
      >
        <Image src={"Pass0.png"} alt={"Pass0"} maxWidth={"220px"} mx={"auto"} />
        <Text
          bg={"blackAlpha.800"}
          bgClip={"text"}
          fontSize={"xx-large"}
          fontWeight={"extrabold"}
          textAlign={"center"}
          marginTop={"15px"}
        >
          Login.
        </Text>
        <Flex alignContent={"center"} justify={"center"}>
          {" "}
          <Text mx={"3"} fontSize={"sm"} textColor={"gray.500"}>
            Login with the credentials used while Signing-up
          </Text>
        </Flex>

        <Formik
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              setSubmitting(false);
            }, 1000);
          }}
          initialValues={{ email: "", password: "" }}
        >
          {({ isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Stack mx={"10"} my={"1"} spacing={"5"}>
                <InputGroup>
                  <InputLeftAddon
                    bg={"purple.400"}
                    // bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                  >
                    <AtSignIcon />
                  </InputLeftAddon>
                  <Input
                    maxWidth={"17rem"}
                    focusBorderColor={"purple.500"}
                    name={"email"}
                    type={"email"}
                    label={"Email"}
                    placeholder={"Enter your email"}
                    onChange={handleChange}
                    // leftAddon={<AtSignIcon color={'purple.500'} />}
                  />
                </InputGroup>
                <InputGroup>
                  <InputLeftAddon
                    bg={"purple.400"}
                    // bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                  >
                    <LockIcon />
                  </InputLeftAddon>
                  <Input
                    placeholder={"Enter your Password"}
                    maxWidth={"17rem"}
                    focusBorderColor={"purple.500"}
                    name={"password"}
                    type={"password"}
                    label={"Password"}
                    onChange={handleChange}

                    // leftAddon={<LockIcon color={'purple.500'} />}
                  />
                </InputGroup>
                {/* 
                <Checkbox size={'sm'} colorScheme={'pink'} defaultChecked>
                  Keep me logged in
                </Checkbox> */}
              </Stack>

              <Flex
                mt={"5"}
                alignContent={"center"}
                justifyContent={"center"}
                gap={"6 "}
              >
                {" "}
                <Button
                  isLoading={isSubmitting}
                  loadingText={"Whispering to our servers"}
                  bg={"purple.400"}
                  // bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                  type={"submit"}
                  maxWidth={"20rem"}
                  size={"md"}
                  _hover={{ bg: "purple.700", color: "pink" }}
                >
                  Login
                </Button>
                <Button
                  isLoading={isSubmitting}
                  loadingText={"Whispering to our servers"}
                  bg={"purple.400"}
                  // bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                  type={"submit"}
                  maxWidth={"15rem"}
                  size={"md"}
                  _hover={{ bg: "purple.700", color: "pink" }}
                  onClick={signInWithGoogle}
                >
                  <Icon as={AiFillGoogleCircle} w={"10"} />{" "}
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>

        <Stack
          justify={"center"}
          color={"gray.600"}
          spacing={"3"}
          padding={"20px"}
        >
          <Text size={"sm"} as={"div"} textAlign={"center"}>
            <span>Dont have an account yet? </span>
            <Button
              size={"sm"}
              paddingLeft={"1.5"}
              colorScheme={"purple"}
              variant={"link"}
              onClick={() => router.push("/")}
            >
              Sign Up
            </Button>
          </Text>
          <Button size={"sm"} colorScheme={"purple"} variant={"link"}>
            Password Marthoda?{" "}
          </Button>
        </Stack>
      </Stack>
    </Center>
  );
}
