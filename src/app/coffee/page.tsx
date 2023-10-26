'use client'
import MainInput from '@/components/Input'
import {VStack, Grid, GridItem, Box, Text} from '@chakra-ui/react'
import { data } from '../page'
import CoffeePhoneCard from '@/components/card/coffee_phone'
import { useRouter } from 'next/navigation'
import { store, useAppDispatch } from '../store'
import { useState } from 'react'
import { updateBasket } from '../store/slices/basketSlice'
export default function CoffeePage() {
    const router = useRouter()
    const [baskets, setBaskets]  =  useState(store.getState().basket.ids);
    const dispatch = useAppDispatch();
    const basket = (id: string) => {

      dispatch(updateBasket(id));
      setBaskets(store.getState().basket.ids)
    }
    return (
        <VStack w={'full'} px={10} pt={24}>
             <Box pos={'absolute'} h={160} left={0} right={0} top={0} className="bg-color" zIndex={-1}/>
        
             <MainInput onChange={(e) => {}}/>
             
            <Grid templateColumns='repeat(2, 1fr)' gap={6} w={'full'} mt={10}>
  {data.map((d, index) => {
    return <CoffeePhoneCard data={d} basket={() => {
      basket(d.id)
    }} key={index} heart={baskets.find((basket) => basket == d.id) != undefined}/>
  })}
 
</Grid>
        </VStack>
    )
};
