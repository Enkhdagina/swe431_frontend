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
} from "@chakra-ui/react";
import { BsMicFill } from "react-icons/bs";
import { BiCurrentLocation } from "react-icons/bi";
import MainInput from "@/components/Input";
import { useState } from "react";
import MainButton, { SupportButton } from "@/components/Button";
import { OrderType, PaymentType } from "@/utils/enum";
import PaymentCard from "@/components/card/payment";
import { paymentType } from "@/utils/values";
import { currency } from "@/utils/function";
import PaymentAlert from "@/components/order/Payment";
import PaymentPaid from "@/components/order/Paid";
import { useRouter } from "next/navigation";
export default function OrderDetail({ params }: { params: { id: string } }) {
  const [address, setAddress] = useState("");
  const [type, setType] = useState(OrderType.HAND);
  const [selectedPaymentType, setPaymentType] = useState(paymentType.type)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [success, setSuccess] = useState(false)
  const router = useRouter()
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
      <Tabs isFitted variant="enclosed" w={"full"}>
        <TabList mb="1em" className="bg-color" pt={20} border={"none"}>
          <Tab
            fontSize={22}
            fontWeight={"bold"}
            borderRadius={13}
            _selected={{ color: "white", bg: "blue" }}
          >
            Хүргэлт
          </Tab>
          <Tab
            fontSize={22}
            fontWeight={"bold"}
            borderRadius={13}
            _selected={{ color: "white", bg: "blue" }}
          >
            Авч явах
          </Tab>
        </TabList>
        <TabPanels py={3.5} px={5}>
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

            <PaymentAlert isOpen={isOpen} onClose={onClose}  setState={(value) => {
                setPaymentType(value)
            }} type={selectedPaymentType}/>

            <PaymentCard onClick={onOpen} data={paymentType} type={selectedPaymentType} />

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
              <Text color={"brown"}>{currency("30000")}</Text>
            </HStack>
            <HStack w={"full"} justifyContent={"space-between"} mb={1}>
              <Text fontWeight={"semibold"} color={"blackAlpha.700"}>
                Shipping Charges
              </Text>
              <Text color={"brown"}>{currency("3000")}</Text>
            </HStack>
            <HStack w={"full"} justifyContent={"space-between"} mb={1}>
              <Text fontWeight={"semibold"} color={"green"}>
                Price
              </Text>
              <Text color={"green"}>{currency("33000")}</Text>
            </HStack>
            
            <MainButton onClick={() => {
setSuccess(true)
            }} px={12} bg="blue">
              <Text color={"white"} fontWeight={"bold"}>
                Болсон
              </Text>
            </MainButton>
            <PaymentPaid isOpen={success} onClose={() => {
                router.push('/')
            }}/>
          </TabPanel>
          <TabPanel justifyContent={"center"} alignItems={"center"} w="full">
       
            <Text textAlign={"center"}>Тун удахгүй</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
