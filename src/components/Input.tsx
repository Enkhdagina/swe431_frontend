import {  SearchIcon } from '@chakra-ui/icons'
import {InputGroup, InputLeftElement, Input} from '@chakra-ui/react'
import {FC} from 'react'

type Props = {
    onChange: (value: string) => void,
    ph?: string,
    bg?: string,
    color?: string,
}
const MainInput:FC<Props> = ({onChange, ph = "Search...", bg = 'inputBlue', color= 'black'}) => {
    return (
        <InputGroup bg={bg} borderRadius={27} >
    <InputLeftElement pointerEvents='none' pl={5} pr={2.5}>
      <SearchIcon color={color}/>
    </InputLeftElement>
    <Input onChange={(e) => onChange(e.target.value)} bg={bg} type='text' placeholder={ph} color={'black'} _placeholder={{ color: color}} border={'none'} pr={5} borderRadius={27}/>
  </InputGroup>
    )
}

export default MainInput