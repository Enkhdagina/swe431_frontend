import { Box, HStack, Icon, Image, Text } from "@chakra-ui/react"
import { FC } from "react"


type Types =  {
    icon: string,
    text: string    
}

const NotificationCard:FC<Types> = ({icon, text}) => {
    return (<HStack w={'full'} borderRadius={18} bg={'whiteAlpha.700'} py={1.5} px={3} mb={4}>
        <Image src={icon} w={49}/>
        <Text fontSize={15} color={'black'} fontWeight={'bold'} letterSpacing={-0.02}>{text}</Text>
    </HStack>)
}

export default NotificationCard