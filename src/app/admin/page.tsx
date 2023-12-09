'use client'
import { Order } from "@/model/order";
import { OrderPaymentType } from "@/utils/enum";
import { currency, orderPaymentValue, statusValue, typeValue } from "@/utils/function";
import { api, imgUrl } from "@/utils/values";
import { Box, Grid, GridItem, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const [data, setData] = useState<Order[]>([])
    const getData = async () => {
        try {
            await fetch(`${api}order`).then((d) => d.json()).then((d) => setData(d))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <Box mt={20}>

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
                                    <Text fontWeight={'bold'}>Хэрэглэгчийн нэр :</Text>
                                    <Text>{order.user.username ?? ''}</Text>
                                </HStack>
                                <HStack>
                                    <Text fontWeight={'bold'}>Хэрэглэгчийн и-майл :</Text>
                                    <Text>{order.user.email ?? ''}</Text>
                                </HStack>
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
                                    <Text fontWeight={'bold'}>Хаяг :</Text>
                                    <Text>{order.address}</Text>
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
        </Box>
    )
}