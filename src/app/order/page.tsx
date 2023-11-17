"use client";
import OrderBasketCard from "@/components/order/basket";
import { imgEmpty } from "@/utils/assets";

import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
  Grid, GridItem, Highlight,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { GiCancel } from "react-icons/gi";
import { store, useAppDispatch } from "../store";
import { updateBasket } from "../store/slices/basketSlice";
import { api, imgUrl } from "@/utils/values";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { Order } from "@/model/order";
import { currency, orderPaymentValue, statusValue, typeValue } from "@/utils/function";
import { OrderPaymentType } from "@/utils/enum";
export default function Order() {
  // const [baskets, setBaskets]  =  useState(store.getState().basket.ids);
  // const dispatch = useAppDispatch();
  const [cookies] = useCookies(["token"]);
  const [data, setData] = useState<Order[]>();
  const getData = async () => {
    try {
      await fetch(`${api}order/user`, {
        method: "POST",
        headers: { Authorization: `Bearer ${cookies["token"]}` },
      }).then((d) => d.json()).then((d: Order[]) => {
        setData(d)

      });
    } catch (error) { }
  };
  const router = useRouter();
  useEffect(() => {
    if (cookies["token"] == undefined) {
      router.push("/auth");
    } else {
      getData();
    }
  }, []);
  return (
    <Box
      pos={"relative"}
      justifyContent={"space-between"}
      flexDir={"column"}
      display={"flex"}
      zIndex={10}
      alignItems={"center"}

      className="bg-color"
      w={"full"}
      pb={20}
      pt={{ md: 32, base: 20 }}
    >
      {
        data == undefined || data.length == 0 ? <VStack w={'full'}>
          <Image src={imgEmpty} mt={120} px={12} mx={'auto'} maxW={400} />
          <Text fontSize={30} letterSpacing={'-0.02'}>Уучлаарай</Text>
          <Text fontSize={30} letterSpacing={'-0.02'}>Таны сагс хоосон байна!</Text>
        </VStack> :
          <VStack w={'full'} px={8} alignItems={'start'}>
            <Text fontWeight={'bold'} fontSize={23} mb={6}>Миний захиалгууд</Text>

            <Grid w={'full'} gap={{ md: 6, base: 4 }} gridTemplateColumns={{ md: 'repeat(2, 1fr)', base: 'repeat(1, 1fr)' }}>
              {data.map((order, index) => {
                return <GridItem key={index} bg={'white'} borderRadius={16} px={{ md: 6, base: 4 }} py={{ md: 6, base: 4 }}>
                  <HStack w={'full'} gap={{ md: 6, base: 4 }} alignItems={'start'}>
                    <Box flex={1}>
                      <Image src={`${imgUrl}${order.product.img}`} w={'auto'} />
                    </Box>
                    <VStack flex={1} alignItems={'start'} gap={4}>
                      <Text fontSize={20} fontWeight={'bold'}>{order.product.name}</Text>
                      <HStack>
                        <Text fontWeight={'bold'}>Авах төрөл:</Text>
                        <Text>{typeValue(order.type)}</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight={'bold'}>Тоо ширхэг :</Text>
                        <Text>{order.quantity}</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight={'bold'}>Төлбөр :</Text>
                        <Text>{orderPaymentValue(order.orderPayment ?? OrderPaymentType.UNPAID)}</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight={'bold'}>Статус :</Text>
                        <Text>{statusValue(order.status)}</Text>
                      </HStack>
                      <HStack>
                        <Text fontWeight={'bold'}>Нийт үнэ :</Text>
                        <Text>{currency((order.quantity * order.product.price).toString())}</Text>
                      </HStack>


                    </VStack>
                  </HStack>

                </GridItem>
              })}
            </Grid>

          </VStack>
      }
    </Box>
  );
}
