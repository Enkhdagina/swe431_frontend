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
    color?: string
}

const  MainButton:FC<Props> = ( {onClick,px=10,color='white', m='auto', bg='prime',br=33, py=3, children} ) => {
    return <Button py={py} display={'flex'} borderRadius={br} bg={bg} px={px} m={m} onClick={onClick} color={color}>{children}</Button>
}
export default MainButton