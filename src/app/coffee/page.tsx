'use client'
import MainInput from '@/components/Input'
import {VStack, Grid, GridItem, Box, Text} from '@chakra-ui/react'
import { data } from '../page'
import CoffeePhoneCard from '@/components/card/coffee_phone'
import { useRouter } from 'next/navigation'
export default function CoffeePage() {
    const router = useRouter()
    return (
        <VStack w={'full'} px={10} mt={6}>
             <Box pos={'absolute'} h={160} left={0} right={0} top={0} className="bg-color" zIndex={-1}/>
             <Text fontSize={31} fontWeight={'bold'} mb={6}>COFFEE</Text>
             <MainInput onChange={(e) => {}}/>
             
            <Grid templateColumns='repeat(2, 1fr)' gap={6} w={'full'} mt={10}>
  {data.map((d, index) => {
    return <CoffeePhoneCard data={d} basket={() => {}} order={() => {}} key={index} push={() => router.push(`/coffee/${d.id}`)}/>
  })}
 
</Grid>
        </VStack>
    )
};
