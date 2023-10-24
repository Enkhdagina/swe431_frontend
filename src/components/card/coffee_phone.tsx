import { currency } from "@/utils/function";
import {
  Image,
  VStack,
  HStack,
  Text,
  UnorderedList,
  ListItem,
  Button,
  Icon,
  Box
} from "@chakra-ui/react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {FC} from 'react'
import { Coffee } from "@/model/coffee";
import MainButton from "../Button";

type Props = {
    data: Coffee
    basket: () => void ,
    order: () => void ,
    push: () => void
}

const CoffeePhoneCard:FC<Props> = ({data, basket, order, push}) => {
  
  return (
    <VStack w={142} pos={'relative'}>
      <Image
        src={`https://res.cloudinary.com/dg2laerve/image/upload/${data.img}`}
        zIndex={1}
      />
      <VStack
        mt={-70}
        pt={78}
        px={2.5}
        w={"100%"}
        zIndex={0}
        className="bg-color"
        borderRadius={30}
        alignItems={"start"}
        pb={3}
        mb={1.5}
        pos={'relative'}
      >
        <Text fontWeight={"bold"} fontSize={18} mt={1.25}>
          {data.name}
        </Text>
        <UnorderedList color={"labelGray"} fontSize={13} mb={0.5}>
          {data.ingredients.map((ingredient, index) => {
            return <ListItem key={index}>{ingredient}</ListItem>
          })}
         
        </UnorderedList>
        <HStack
          justifyContent={"space-between"}
          w={"full"}
          alignItems={"center"}
          zIndex={2}
        >
          <Text fontSize={16} fontWeight={"bold"}>
            {currency(`${data.price}`)}
          </Text>
          <Button onClick={basket}><Icon as={AiFillHeart} boxSize={5} color={'red'}/></Button>
        </HStack>
      <Box pos={'absolute'} inset={0} zIndex={0} onClick={push}/>
      </VStack>
      <MainButton onClick={order} px={2.5} py={1.5}><Text color={'white'}  fontSize={15}>Order Now</Text></MainButton>
    </VStack>
  );
};
export default CoffeePhoneCard;
