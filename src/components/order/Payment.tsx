
import {
    AlertDialog,
    AlertDialogBody,

    AlertDialogContent,
    AlertDialogOverlay,

    Text,
    VStack,
    Box
  } from '@chakra-ui/react'
  import {FC, useRef} from 'react'
import { PaymentTypeCard } from '../card/payment'
import MainButton from '../Button'
import { PaymentType } from '@/utils/enum'
import { Payment } from '@/model/payment'

type Types = {
    onClose: () => void,
 
    setState: (value: PaymentType) => void,
    isOpen: boolean,
    payments?: Payment[],
    type?: PaymentType

}

const PaymentAlert:FC<Types> = ({onClose,  isOpen, payments,  setState, type}) =>  {

    const cancelRef = useRef< any>()

    return (
      <>
  
        <AlertDialog
        
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          
        >
          <AlertDialogOverlay alignItems={'end'}/>
  
          <AlertDialogContent borderRadius={20} className='bg-color-left'>
            
            <AlertDialogBody py={12} justifyContent={'center'}>
                <Text w={'70%'} m={'auto'} textAlign={'center'} fontWeight={'bold'} fontSize={23}>Та төлбөр төлөх 
хэлбэрээ сонгоно уу.</Text>
                <VStack w={'full'} mt={5}>
                    {
                        payments?.map((payment, index) => {
                            return (<Box key={index} w={'full'} mb={index != payments.length - 1 ? 3 : 8}>
                                <PaymentTypeCard payment={payment} onClick={() => setState(payment.type) } active={payment.type == type}/>
                            </Box>)
                        })
                    }
                </VStack>
                <MainButton onClick={onClose} bg='blackAlpha.700'><Text color={'white'} fontSize={21} fontWeight={'bold'}>Болсон</Text></MainButton>
            </AlertDialogBody>
            
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  }

  export default PaymentAlert