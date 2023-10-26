"use client";
import MainButton from "@/components/Button";
import MainInput from "@/components/Input";
import {
  AbsoluteCenter,
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { AiOutlineMail } from "react-icons/ai";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import { FaUser, FaUserSecret } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { setToken } from "../store/slices/authSlice";
type Types = {
  username: string;
  password: string;
  email?: string;
  repeatPassword?: string;
};
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [cookies, setCookies] = useCookies(["token"]);
  const dispatch = useDispatch();
  const [data, setData] = useState<Types>({
    username: "",
    password: "",
  });
  const router = useRouter();
  const login = async () => {
    try {
      setCookies("token", "asdf");
      dispatch(setToken("asdf"));
      router.back();
    } catch (error) {}
  };
  const register = async () => {
    try {
    } catch (error) {}
  };
  return (
    <VStack w={"full"} className={"bg-color-left"} minH={"100vh"} pt={150}>
      <Tabs isFitted variant="enclosed" w={"90%"} maxW={500} mx={"auto"}>
        <TabList mb="1.5em" mx={10} border={"none"}>
          <Tab
            border={"none"}
            margin={0}
            p={0}
            onClick={() => setIsLogin(true)}
          >
            <VStack w={"full"}>
              <Text>Login</Text>
              <Box
                bg={isLogin ? "blue" : "white"}
                h={2}
                width={"full"}
                borderLeftRadius={10}
              />
            </VStack>
          </Tab>
          <Tab
            border={"none"}
            margin={0}
            p={0}
            onClick={() => setIsLogin(false)}
          >
            <VStack w={"full"}>
              <Text>Sign Up</Text>
              <Box
                bg={!isLogin ? "blue" : "white"}
                h={2}
                width={"full"}
                borderRightRadius={10}
              />
            </VStack>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel bg={"whiteAlpha.500"} borderRadius={16} px={6} py={8}>
            <Text mb={4}>Username</Text>
            <Input
              bg={"transparent"}
              borderColor={"blackAlpha.700"}
              onChange={(e) =>
                setData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
            <Text mt={12} mb={4}>
              Password
            </Text>
            <Input
              mb={4}
              bg={"transparent"}
              borderColor={"blackAlpha.500"}
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <HStack w={"full"} justifyContent={"space-between"} mb={4}>
              <Checkbox color={"blackAlpha.700"} defaultChecked>
                Remember
              </Checkbox>
              <Link href="/auth">Forgot Password?</Link>
            </HStack>
            <MainButton onClick={login} px={12}>
              <Text>Submit</Text>
            </MainButton>
            <HStack my={5}>
              <Divider bg={"blackAlpha.300"} />
              <Text px={4} fontSize={18} color={"blackAlpha.500"}>
                OR
              </Text>
              <Divider bg={"blackAlpha.300"} />
            </HStack>
            <HStack w={"full"} justifyContent={"center"}>
              <Button>
                <Icon as={BsFacebook} color={"blue"} fontSize={30} />
              </Button>
              <Button>
                <Icon as={BsGoogle} color={"red"} fontSize={30} />
              </Button>
              <Button>
                <Icon as={BsGithub} color={"black"} fontSize={30} />
              </Button>
            </HStack>
          </TabPanel>
          <TabPanel bg={"whiteAlpha.500"} borderRadius={16} px={6} py={8}>
            <InputGroup mb={6}>
              <InputLeftElement pointerEvents="none">
                <Icon as={FaUser} color="blackAlpha.500" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Username"
                borderColor={"blackAlpha.500"}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, username: e.target.value }));
                }}
              />
            </InputGroup>
            <InputGroup mb={6}>
              <InputLeftElement pointerEvents="none">
                <Icon as={AiOutlineMail} color="blackAlpha.500" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Email"
                borderColor={"blackAlpha.500"}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, email: e.target.value }));
                }}
              />
            </InputGroup>
            <InputGroup mb={6}>
              <InputLeftElement pointerEvents="none">
                <Icon as={RiLockPasswordLine} color="blackAlpha.500" />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="Password"
                borderColor={"blackAlpha.500"}
                onChange={(e) => {
                  setData((prev) => ({ ...prev, password: e.target.value }));
                }}
              />
            </InputGroup>
            <InputGroup mb={6}>
              <InputLeftElement pointerEvents="none">
                <Icon as={RiLockPasswordLine} color="blackAlpha.500" />
              </InputLeftElement>
              <Input
                type="password"
                placeholder="Confirm password"
                borderColor={"blackAlpha.500"}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    repeatPassword: e.target.value,
                  }));
                }}
              />
            </InputGroup>

            <MainButton onClick={register} px={12}>
              <Text>Create account</Text>
            </MainButton>
            <HStack my={5}>
              <Divider bg={"blackAlpha.300"} />
              <Text px={4} fontSize={18} color={"blackAlpha.500"}>
                OR
              </Text>
              <Divider bg={"blackAlpha.300"} />
            </HStack>
            <HStack w={"full"} justifyContent={"center"}>
              <Button>
                <Icon as={BsFacebook} color={"blue"} fontSize={30} />
              </Button>
              <Button>
                <Icon as={BsGoogle} color={"red"} fontSize={30} />
              </Button>
              <Button>
                <Icon as={BsGithub} color={"black"} fontSize={30} />
              </Button>
            </HStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default Auth;
