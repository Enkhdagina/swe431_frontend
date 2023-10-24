import { Button } from "@chakra-ui/react"
import { FC, ReactNode } from "react"

type Props = {
    onClick: () => void,
    py?: number,
    px?: number,
    bg?: string,
    br?: number
    children?: ReactNode,
    m?: any,
    color?: string,
    w?: string,
    jc?: string,
}

export const  SupportButton:FC<Props> = ( {onClick,px=10,color='bg', m='auto', bg='white',br=14, py=3, jc='center', w, children} ) => {
    return <Button py={py} h={'auto'} display={'flex'} boxShadow={ '0 4.5px 4.5px 0px rgba(0, 0, 0, .25)'} w={w} justifyContent={jc} borderRadius={br} bg={bg} px={px} m={m} onClick={onClick} color={color}>{children}</Button>
}


const  MainButton:FC<Props> = ( {onClick,px=10,color='white', m='auto', bg='prime',br=33, py=3, jc='center', w, children} ) => {
    return <Button py={py} h={'auto'} display={'flex'} w={w} justifyContent={jc} borderRadius={br} bg={bg} px={px} m={m} onClick={onClick} color={color}>{children}</Button>
}
export default MainButton


