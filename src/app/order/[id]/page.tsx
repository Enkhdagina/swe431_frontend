"use client";
import {
  Box,
  HStack,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  Spinner
} from "@chakra-ui/react";
import { BsMicFill } from "react-icons/bs";
import { BiCurrentLocation } from "react-icons/bi";
import MainInput from "@/components/Input";
import { useState, useEffect } from "react";
import MainButton, { SupportButton } from "@/components/Button";
import { OrderType, PaymentType } from "@/utils/enum";
import PaymentCard from "@/components/card/payment";
import { api, } from "@/utils/values";
import { currency } from "@/utils/function";
import PaymentAlert from "@/components/order/Payment";
import PaymentPaid from "@/components/order/Paid";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";
import { Payment } from "@/model/payment";
import { Coffee } from "@/model/coffee";
export default function OrderDetail({ params }: { params: { id: string, name: string } }) {
  const [address, setAddress] = useState("");
  const [cookies] = useCookies(['token'])
  const [type, setType] = useState(OrderType.HAND);
  const [paymentTypes, setPaymentTypes] = useState<Payment[]>()
  const [selectedPaymentType, setPaymentType] = useState<PaymentType>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const query = useSearchParams();
  const [product, setProduct] = useState<Coffee>()
  const [loading, setLoading] = useState<boolean>(false)
  const getPayment = async () => {
    try {
      await fetch(`${api}payment/user`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies['token']}`
        },
      }).then((d) => d.json()).then((d: Payment[]) => {
        if (d.length != undefined && d?.length > 0) {
          setPaymentTypes(d),
            setPaymentType(d[0].type)
        }
      })

      await fetch(`${api}product/${params.id}`, {
        method: 'GET',

      }).then((d) => d.json()).then((d: Coffee) => {

        setProduct(d)


      })

    } catch (error) {

    }
  }
  useEffect(() => {
    getPayment()
  }, []);
  const order = async () => {
    try {
      setLoading(true)
      await fetch(`${api}order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies['token']}`
        },
        body: JSON.stringify({
          quantity: query.get('name'),
          product: params.id,
          address: address,
          type: type,
          payment: selectedPaymentType,
          
        })
      }).then((d) => d.json()).then((d) => {
        setSuccess(true)
        console.log(d);
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)

    }
  }
  if (cookies['token'] == undefined) {
    return router.push('/auth')
  }
  return (
    <Box
      pos={"relative"}
      justifyContent={"space-between"}
      flexDir={"column"}
      display={"flex"}
      zIndex={10}
      alignItems={"center"}
      w={"full"}

    >
      <Tabs isFitted variant="enclosed" w={"full"}  >
        <TabList mb="1em" justifyContent={'center'} className="bg-color" mx={'auto'} pt={{ md: 32, base: 20 }} border={"none"} px={{ md: 10, base: 4 }}>
          <Tab
            maxW={400}
            fontSize={22}
            fontWeight={"bold"}
            borderRadius={13}
            _selected={{ color: "white", bg: "blue" }}
          >
            Хүргэлт
          </Tab>
          <Tab
            maxW={400}
            fontSize={22}
            fontWeight={"bold"}
            borderRadius={13}
            _selected={{ color: "white", bg: "blue" }}
          >
            Авч явах
          </Tab>
        </TabList>
        <TabPanels py={3.5} px={5} maxW={800} mx={'auto'}>
          <TabPanel>
            <HStack justifyContent={"space-between"} mb={6}>
              <Text
                fontSize={15}
                color={"white"}
                fontWeight={"bold"}
                px={5}
                py={1}
                borderRadius={20}
                bg={"blue"}
              >
                Байршил
              </Text>
              <HStack>
                <Box bg={"prime"} borderRadius={"100%"} p={1} mr={3}>
                  <Icon as={BiCurrentLocation} color={"white"} boxSize={8} />
                </Box>
                <Box bg={"prime"} borderRadius={"100%"} p={1}>
                  <Icon as={BsMicFill} color={"white"} boxSize={8} />
                </Box>
              </HStack>
            </HStack>
            <MainInput
              onChange={(e) => {
                setAddress(e);
              }}
              bg="#A3ADB254"
              ph="Та авах газрынхаа хаягийг оруулна уу."
            />
            <HStack justifyContent={"space-between"} my={6}>
              <Text
                fontSize={15}
                color={"white"}
                fontWeight={"bold"}
                px={5}
                py={1}
                borderRadius={20}
                bg={"blue"}
              >
                Авах төрөл
              </Text>
            </HStack>
            <HStack mb={6} w={"full"}>
              <SupportButton
                onClick={() => {
                  setType(OrderType.HAND);
                }}
                bg={type == OrderType.HAND ? "#4D9FFE66" : "#C4C4C4A1"}
              >
                <Text>Гар дээр авах</Text>{" "}
              </SupportButton>
              <SupportButton
                onClick={() => {
                  setType(OrderType.DOOR);
                }}
                bg={type == OrderType.DOOR ? "#4D9FFE66" : "#C4C4C4A1"}
              >
                <Text>Үүдэнд тавих</Text>{" "}
              </SupportButton>
            </HStack>
            <HStack justifyContent={"space-between"} my={6}>
              <Text
                fontSize={15}
                color={"white"}
                fontWeight={"bold"}
                px={5}
                py={1}
                borderRadius={20}
                bg={"blue"}
              >
                Төлбөрийн нөхцөл
              </Text>
            </HStack>

            <PaymentAlert isOpen={isOpen} onClose={onClose} setState={(value) => {
              setPaymentType(value)
            }} type={selectedPaymentType} payments={paymentTypes} />

            <PaymentCard onClick={onOpen} data={paymentTypes} type={selectedPaymentType} />

            <HStack justifyContent={"space-between"} my={6}>
              <Text
                fontSize={15}
                color={"white"}
                fontWeight={"bold"}
                px={5}
                py={1}
                borderRadius={20}
                bg={"blue"}
              >
                Amount Detail
              </Text>
            </HStack>

            <HStack w={"full"} justifyContent={"space-between"} mb={1}>
              <Text fontWeight={"semibold"} color={"blackAlpha.700"}>
                Price
              </Text>
              <Text color={"brown"}>{currency(((product?.price ?? 0) * Number.parseInt(query.get('name') ?? '1')).toString())}</Text>
            </HStack>
            <HStack w={"full"} justifyContent={"space-between"} mb={1}>
              <Text fontWeight={"semibold"} color={"blackAlpha.700"}>
                Shipping Charges
              </Text>
              <Text color={"brown"}>{currency(((product?.price ?? 10) * 0.1 * Number.parseInt(query.get('name') ?? '1')).toString())}</Text>
            </HStack>
            <HStack w={"full"} justifyContent={"space-between"} mb={1}>
              <Text fontWeight={"semibold"} color={"green"}>
                Price
              </Text>
              <Text color={"green"}>{currency(((product?.price ?? 10) * 1.1 * Number.parseInt(query.get('name') ?? '1')).toString())}</Text>
            </HStack>

            <MainButton onClick={order} px={12} bg="blue">
              {
                loading ? <Spinner /> : <Text color={"white"} fontWeight={"bold"}>
                  Болсон
                </Text>
              }
            </MainButton>
            <PaymentPaid isOpen={success} onClose={() => {
              router.push('/order')
            }} />
          </TabPanel>
          <TabPanel justifyContent={"center"} alignItems={"center"} w="full">

            <Text textAlign={"center"}>Тун удахгүй</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
