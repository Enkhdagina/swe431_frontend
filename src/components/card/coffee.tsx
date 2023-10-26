import { Coffee } from "@/model/coffee"
import { currency } from "@/utils/function"
import { imgUrl } from "@/utils/values"
import { Box, Button, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react"
import { FC } from "react"
import { AiFillHeart, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai"
import MainButton from "../Button"
import { useRouter } from "next/navigation"
import { BiPlusMedical } from "react-icons/bi"

type Props = {
    data: Coffee
    basket: () => void ,
    heart: boolean
    minus: () => void;
    plus: () => void;
    quantity: number
}

const Title = ({title, onClick, heart}: {title: string, onClick: () => void, heart: boolean}) => {
    return (
        <VStack >
            <HStack>
                <Text fontSize={42}>{title}</Text>
                <Button ml={8} mr={16} onClick={onClick}><Icon as={heart ? AiFillHeart : AiOutlineHeart} boxSize={77} color={heart ? 'red' : 'black'}/></Button>
            </HStack>
            <Box w={'full'} mt={2} h={0.25} bg={'brown'}/>

        </VStack>
    )
}

const CoffeeCard:FC<Props> = ({data, basket, heart, minus, plus, quantity}) => {
    const router = useRouter()
    return (
        <HStack w={'full'} maxW={1200} mx={'auto'} alignItems={'start'}>
            <Image src={`${imgUrl}${data.img}`} flex={1}/>
            <VStack flex={2} w={'full'} alignItems={'start'}>
                <Title onClick={basket} title={data.name} heart={heart}/>
                <Text fontSize={24} mb={20}>{data.description}</Text>
                <HStack w={'full'} justifyContent={'space-between'}>
                    <HStack>
                        <Button onClick={minus} bg={'brown'} borderRadius={'100%'} p={4}>-</Button>
                        <Text fontSize={34} mx={12} color={'brown'}>{quantity}</Text>
                        <Button h={54} w={54} onClick={plus}  bg={'brown'} borderRadius={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'} p={0} ><Icon as={BiPlusMedical} color={'white'}  fontSize={34} /></Button>
                    </HStack>
                    <Text color={'darkBrown'} >{currency((data.price * quantity).toString())}</Text>
                </HStack>
                <HStack w={'full'} justifyContent={'end'}>
                    <MainButton px={12} bg="brown" onClick={() => {router.push(`/order${data.id}`)}}><Text color={'white'} fontSize={34} fontWeight={'bold'}>ADD TO ORDER</Text></MainButton>
                </HStack>
            </VStack>
        </HStack>
    )
}

export default CoffeeCard