"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Image,
  DrawerHeader,
  Icon,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, BellIcon } from "@chakra-ui/icons";

import {



  imgCoffeePack,
  imgExit,



  imgLogo,



  imgMenu,


} from "@/utils/assets";

import MainButton from "./Button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {FaShoppingBasket} from 'react-icons/fa'
import {ImHome3} from 'react-icons/im'
import { BsPersonCircle } from "react-icons/bs";
import { store, useAppDispatch } from "@/app/store";
import { updateBasket } from "@/app/store/slices/basketSlice";

export default function Navbar({path, title, slug}:{path: string, title: string, slug: string}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

const router = useRouter()

const [baskets, setBaskets]  =  useState(store.getState().basket.ids);
    const dispatch = useAppDispatch();
    const basket = (id: string) => {

      dispatch(updateBasket(id));
      setBaskets(store.getState().basket.ids)
    }

    useEffect(() => {
      setBaskets(store.getState().basket.ids)
    }, [slug]);


  return (
    <HStack
      justifyContent={"space-between"}
      alignItems={"center"}
      zIndex={20}
      pos={"fixed"}
      left={0}
      right={0}
      top={5}
    >
      <HStack w={'full'} pt={1} px={8} display={{ md: "flex", base: "none" }} justifyContent={'space-between'}>
        
        <HStack visibility={'hidden'}>
          <Link href="/basket"><Icon as={AiOutlineHeart} boxSize={27} mr={2}/></Link>
          <Link href="/order"><Icon as={FaShoppingBasket} boxSize={27}/></Link>
        </HStack>
        <HStack>
          <Link href="/" px={6}><Text fontSize={21} letterSpacing={1}>Home</Text></Link>
          <Link href="/" px={6}><Text fontSize={21} letterSpacing={1}>About Us</Text></Link>
          <Link href="/" px={6}><Image src={imgLogo} w={90}/></Link>
          <Link href="/" px={6}><Text fontSize={21} letterSpacing={1}>Products</Text></Link>
          <Link href="/" px={6}><Text fontSize={21} letterSpacing={1}>Places</Text></Link>
          
        </HStack>
        <HStack>
          <Link href="/basket"><Icon as={AiOutlineHeart} boxSize={27} mr={2}/></Link>
          <Link href="/order"><Icon as={FaShoppingBasket} boxSize={27}/></Link>
        </HStack>
      </HStack>
      <Button display={{ md: "none", base: "flex" }}  onClick={onOpen}>
        <Image src={imgMenu} w={7} alt={"menu"} />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"xs"}>
        <DrawerOverlay />
        <DrawerContent
          bg={"waterBlue"}
          borderTopRightRadius={60}
          borderBottomRightRadius={60}
        >
          <DrawerBody pt={50}>
            <Image src={imgCoffeePack} alt="coffee" w={182} mx={"auto"} />
            <Box h={42} />
            <MainButton
              onClick={() => {router.push('/') , onClose()}}
              w={"100%"}
              jc="start"
              bg="white"
              color="black"
              px={5}
            >
              <HStack>
                <Icon as ={ImHome3} color={'black'} boxSize={6}/>
             
                <Box w={1} />
                <Text letterSpacing={"-0.02"} fontSize={18}>
                  Нүүр
                </Text>
              </HStack>
            </MainButton>
            <Box h={8} />
            <MainButton
               onClick={() => {router.push('/basket') , onClose()}}
              w={"100%"}
              jc="start"
              bg="white"
              color="black"
              px={5}
            >
              <HStack>
                <Icon as ={AiFillHeart} color={'black'} boxSize={6}/>
                
                <Box w={1} />
                <Text letterSpacing={"-0.02"} fontSize={18}>
                  Миний дуртай
                </Text>
              </HStack>
            </MainButton>
            <Box h={8} />
            <MainButton
              onClick={() => {router.push('/order') , onClose()}}
              w={"100%"}
              jc="start"
              bg="white"
              color="black"
              px={5}
            >
              <HStack>
                <Icon as ={FaShoppingBasket} color={'black'} boxSize={6}/>
          
                <Box w={1} />
                <Text letterSpacing={"-0.02"} fontSize={18}>
                  Захиалга
                </Text>
              </HStack>
            </MainButton>
            <Box h={8} />
            <MainButton
            onClick={() => {router.push('/profile'), onClose()}}
              w={"100%"}
              jc="start"
              bg="white"
              color="black"
                    px={5}
            >
              <HStack>
                <Icon as ={BsPersonCircle} color={'black'} boxSize={6}/>
        
                <Box w={1} />
                <Text letterSpacing={"-0.02"} fontSize={18}>
                  Профайл
                </Text>
              </HStack>
            </MainButton>
            <Box h={8} />
            <MainButton
              onClick={() => {}}
              w={"100%"}
              jc="start"
              bg="white"
              color="black"
                    px={5}
            >
              <HStack>
                <Image src={imgExit} alt="Exit" w={6} />
                <Box w={1} />
                <Text letterSpacing={"-0.02"} fontSize={18}>
                  Гарах
                </Text>
              </HStack>
            </MainButton>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Text fontSize={31} fontWeight={'bold'} >{title}</Text>

      { path != undefined && slug != undefined && path == 'coffee' ? 
        <Button display={{ md: "none", base: "flex" }}  onClick={() =>  {
         
          basket(slug)
        }}>
        <Icon as={ AiFillHeart } boxSize={10} color={baskets.find((basket) => basket == slug) != undefined ? 'red' : 'black'}/>
      </Button> :
      <Button display={{ md: "none", base: "flex" }}  onClick={() => router.push('/notification')}>
        <BellIcon boxSize={10} color={path == 'notification' ? 'brown' : 'black'}/>
      </Button>
      }
    </HStack>
  );
}
