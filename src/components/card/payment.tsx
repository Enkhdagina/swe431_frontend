"use client";
import { Payment } from "@/model/payment";
import { PaymentType } from "@/utils/enum";
import { bankHide } from "@/utils/function";
import { imgUrl, } from "@/utils/values";
import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiCoupon3Fill } from "react-icons/ri";
import { FC } from "react";

type Types = {
  onClick: () => void;
  data?: Payment[];
  payment?: Payment;
  active?: boolean,
  type?: PaymentType
};

const PaymentCard: FC<Types> = ({ onClick, data, type }) => {
  
  
  return (
    <Button
      py={3}
      px={8}
      w={"full"}
      h={"auto"}
      border={"solid #4F4F5Fb3 1px"}
      borderRadius={42}
      onClick={onClick}
    >
      <VStack w={"full"} alignItems={"start"}>
        <Text mb={2} letterSpacing={"-0.02"}>
          Хэлбэр: {data?.find((p) => p.type == type)?.name ?? ''}
        </Text>
        <HStack justifyContent={"space-between"} w={"full"} mb={1}>
         <HStack>
         <Image src={`${imgUrl}v1698251138/aacurzycuvcaempc2obs.svg`} w={94} mr={4}/>
          <VStack alignItems={"start"}>
            <Text mb={0.25} letterSpacing={"-0.02"} fontSize={13}>
              Банк: {data?.find((p) => p.type == type)?.bank ?? ''}
            </Text>
            <Text
              mb={0.25}
              letterSpacing={"-0.02"}
              fontWeight={"semibold"}
              fontSize={13}
            >
              {" "}
              {bankHide(data?.find((p) => p.type == type)?.accountNumber?.toString() ?? "000000000000")}
            </Text>
            <Text letterSpacing={"-0.02"} color={"#00000080"} fontSize={13}>
              {" "}
              {data?.find((p) => p.type == type)?.accountName ?? ''}
            </Text>
          </VStack>
         </HStack>
          <ChevronRightIcon fontSize={40} color={"green"} />
        </HStack>
        <HStack w="full" justifyContent={"space-between"}>
          <HStack>
            <Icon as={RiCoupon3Fill} color={"green"} boxSize={21} mr={1.5} />
            <Text color={"green"} fontWeight={"bold"}>
              Хөнгөлөлт
            </Text>
          </HStack>
          <Text color={"brown"} fontWeight={"bold"}>
            Choose
          </Text>
        </HStack>
      </VStack>
    </Button>
  );
};

export default PaymentCard;

export const PaymentTypeCard: FC<Types> = ({ payment, onClick, active, type }) => {
  return (
    <Button
      onClick={onClick}
      py={4.5}
      px={5}
      width={"full"}
      bg={"white"}
      boxShadow={"3px 6px 6px 0 rgba(0,0,0,0.1)"}
      borderRadius={8}
      w={"full"}
      h={"auto"}
    >
      <HStack w={"full"} justifyContent={"space-between"}>
        <HStack>
        <Box w={62} h={55}>
          <Image src={`${imgUrl}${payment?.img ?? ''}`} h={"100%"} />
        </Box>
        <VStack alignItems={'start'}>
          <Text fontWeight={"semibold"} mb={1}>
            {payment?.name ?? ''}
          </Text>
          <Text color={"#232323"} fontSize={13}>{payment?.text ?? ''}</Text>
        </VStack>
        </HStack>
        <Box w={6} h={6} borderRadius={'100%'} bg={ 'white'}  border={`solid black ${active ? '1px' : '5px'}`} display={'flex'} >
            {active && <Box m={'auto'} bg={'black'} w={'18px'} h={'18px'} borderRadius={'100%'}/>}
        </Box>

      </HStack>
    </Button>
  );
};
