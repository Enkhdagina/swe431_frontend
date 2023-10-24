'use client'

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
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, BellIcon } from '@chakra-ui/icons'

import { imgAbout, imgBranches, imgCoffeePack, imgExit, imgFeedback, imgMenu, imgQuestion } from '@/utils/assets'

import MainButton from './Button'

interface Props {
  children: React.ReactNode
}


export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <HStack justifyContent={'space-between'} alignItems={'center'} zIndex={20} pos={'fixed'} left={0} right={0} top={0}>
      <Button display={{md: 'none', base: 'flex'}} mt={5} onClick={onOpen}><Image src={imgMenu} w={7} alt={'menu'}/></Button>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen} size={'xs'}>
        <DrawerOverlay />
        <DrawerContent bg={'waterBlue'}  borderTopRightRadius={60} borderBottomRightRadius={60}>
        
          <DrawerBody  pt={50}>
            <Image src={imgCoffeePack} alt='coffee' w={182} mx={'auto'}/>
            <Box h={42}/>
            <MainButton onClick={() => {}} w={'100%'} jc='start' bg='white' color='black' px={3}>
              <HStack>
              <Image src={imgAbout} alt='About' w={6}/>
              <Box w={4}/>
            <Text letterSpacing={'-0.02'} fontSize={18}>Бидний тухай</Text>
              </HStack>
            </MainButton>
<Box h={8}/>
            <MainButton onClick={() => {}} w={'100%'} jc='start' bg='white' color='black' px={3}>
              <HStack>
              <Image src={imgBranches} alt='Branches' w={6}/>
              <Box w={4}/>
            <Text letterSpacing={'-0.02'} fontSize={18}>Салбарууд</Text>
              </HStack>
            </MainButton>
<Box h={8}/>
            <MainButton onClick={() => {}} w={'100%'} jc='start' bg='white' color='black' px={3}>
              <HStack>
              <Image src={imgQuestion} alt='Question' w={6}/>
              <Box w={4}/>
            <Text letterSpacing={'-0.02'} fontSize={18}>Түгээмэл асуултууд</Text>
              </HStack>
            </MainButton>
<Box h={8}/>
            <MainButton onClick={() => {}} w={'100%'} jc='start' bg='white' color='black' px={3}>
              <HStack>
              <Image src={imgFeedback} alt='Feedback'w={6} />
              <Box w={4}/>
            <Text letterSpacing={'-0.02'} fontSize={18}>Санал хүсэлт</Text>
              </HStack>
            </MainButton>
<Box h={8}/>
            <MainButton onClick={() => {}} w={'100%'} jc='start' bg='white' color='black' px={3}>
              <HStack>
              <Image src={imgExit} alt='Exit'w={6} />
              <Box w={4}/>
            <Text letterSpacing={'-0.02'} fontSize={18}>Гарах</Text>
              </HStack>
            </MainButton>
       
         
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Button display={{md: 'none', base: 'flex'}} mt={5} onClick={onOpen}><BellIcon boxSize={10}/></Button>
    </HStack>
  )
}
