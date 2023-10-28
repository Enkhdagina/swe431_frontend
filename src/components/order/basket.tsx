
import { Order } from "@/model/order";
import { currency } from "@/utils/function";
import { imgUrl } from "@/utils/values";
import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
type Types = {
  data: Order,
  add: () => void,
  minus: () => void,
};
const OrderBasketCard: FC<Types> = ({ data, add, minus }) => {
  
  return (
    <Box borderRadius={21} bg={"white"} w={"full"}>
      <HStack w={"full"} px={4} py={5}>
        <Image src={`${imgUrl}${data.product.img}`} h={135} />
        <VStack alignItems={"start"} w={"full"}>
          <VStack alignItems={"start"}>
            <Text fontSize={21} color={"brown"} mb={2} fontWeight={"bold"}>
              {data.product.name}
            </Text>
            <Text fontSize={18} color={"brown"}>
              Нийт:{" "}
              {currency((data.product?.price ?? 0 * data.quantity).toString())}
            </Text>
          </VStack>
          <HStack w={"full"} justifyContent={'space-between'}>
            <Box />
            <HStack w={'auto'}>
              {data.quantity > 1 && <Button onClick={minus} m={0} p={0}>
                <Icon as={AiOutlineMinusCircle} color={"brown"} boxSize={30} />
              </Button>}
              <Text fontWeight={"semibold"} fontSize={27} px={2}>
                {data.quantity}
              </Text>
              <Button onClick={add} m={0} p={0}>
                <Icon as={AiOutlinePlusCircle} color={"brown"} boxSize={30} />
              </Button>
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
};

export default OrderBasketCard;
