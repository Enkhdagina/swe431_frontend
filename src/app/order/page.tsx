'use client'
import OrderBasketCard from '@/components/order/basket'
import { imgEmpty } from '@/utils/assets'
import { orders } from '@/utils/values'
import {Box, Button, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'

import {GiCancel} from 'react-icons/gi'
import { store, useAppDispatch } from '../store'
import { updateBasket } from '../store/slices/basketSlice'
export default function Order() {
    // const [baskets, setBaskets]  =  useState(store.getState().basket.ids);
    // const dispatch = useAppDispatch();
    const [data, setData] = useState(orders)
    
    return (
        <Box
    pos={"relative"}
        justifyContent={"space-between"}
        flexDir={"column"}
        display={"flex"}
        zIndex={10}
        alignItems={"center"}
        className='bg-color'
        w={"full"}
        pb={20}
        pt={20}
        
      >
        {
            data.length == 0 ? <VStack w={'full'}>
            <Image src={imgEmpty} mt={120} px={12} mx={'auto'} maxW={400}/>
            <Text fontSize={30} letterSpacing={'-0.02'}>Уучлаарай</Text>
    <Text fontSize={30} letterSpacing={'-0.02'}>Таны сагс хоосон байна!</Text>
            </VStack> :
        <VStack w={'full'} px={8} alignItems={'start'}>
            <Text fontWeight={'bold'} fontSize={23} mb={6}>Миний сагс</Text>
            <HStack w={'full'}>
{data.map((order, index) => {
    return <HStack key={index} justifyContent={'space-between'}>
        <OrderBasketCard add={() => {
            setData([...data].map(d => {
                if(d.id == order.id) {
                    return {
                        ...d,
                        quantity: order.quantity+1
                    }
                } else {
                    return d
                }
            }))

        }} data={order} minus={() => {
            setData([...data].map(d => {
                if(d.id == order.id) {
                    return {
                        ...d,
                        quantity: order.quantity-1
                    }
                } else {
                    return d
                }
            }))
        }}/>
        <Button onClick={() => {
            setData(data.filter((d) =>  d.id != order.id))
        }}>
            <Icon bg={'white'} borderRadius={'100%'} as={GiCancel} color={'red'} fontSize={35}/>
        </Button>
    </HStack>
})}
            </HStack>
        </VStack>
        }

      </Box>)
};