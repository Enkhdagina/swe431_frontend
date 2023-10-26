"use client";
import { imgCoffeeDetailPoster, imgCoffeeIngredient, imgStar } from "@/utils/assets";

import {
  Box,
  Image,
  VStack,
  HStack,
  Text,
  Icon,
  Button,
  Slider,
  SliderTrack,
  SliderMark,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useState } from "react";
import { SupportButton } from "@/components/Button";
import { currency } from "@/utils/function";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
export default function CoffeeDetail({ params }: { params: { id: string } }) {
  const [active, setActive] = useState(0);
  const setView = (value: number) => {
    setActive(value);
  };
  const [sliderValue, setSliderValue] = useState(50);
  const [orderCount, setOrderCount] = useState(1)
  const labelStyles = {
    mt: "2",
    ml: "-2.5",
    fontSize: "sm",
  };

  const router = useRouter()

  const order = async () => {
    try {
   
      router.push(`/order/asdf`)
    } catch (error) {
      
    }
  }
  return (
    <Box
      className="bg-color"
      pos={"relative"}
      h={"100vh"}
      justifyContent={"space-between"}
      flexDir={"column"}
      display={"flex"}
      zIndex={10}
      alignItems={"center"}
    >
      <Box />
      <Box
        w={active == 0 ? "100%" : "70%"}
        pos={"absolute"}
        mt={active == 0 || active == 1 ? "60px" :  '0px'}
        zIndex={10}
        display={"flex"}
        justifyContent={"center"}
      >
        <Image src={imgCoffeeDetailPoster} />
      </Box>
      <VStack w={"full"}>
        <VStack
          pos={active == 0 ? "relative" : "absolute"}
          bottom={0}
          w={"full"}
          h={190}
          pt={10}
          borderTopRadius={70}
          bg={"prime"}
          zIndex={4}
        >
          <Box
            pos={"absolute"}
            onClick={() => setView(0)}
            h={190}
            zIndex={5}
            bottom={0}
            left={0}
            right={0}
            cursor={"pointer"}
          />
          <HStack
            mb={6}
            pl={12}
            pr={5}
            justifyContent={"space-between"}
            w="full"
          >
            <Text
              fontSize={22}
              fontWeight={"bold"}
              color={"white"}
              letterSpacing={"-0.02"}
            >
              Захиалга
            </Text>
            <HStack>
             {orderCount > 1 &&  <Button onClick={() => {setOrderCount(orderCount-1)}} zIndex={6} p={0}>
                <Icon as={AiOutlineMinusCircle} boxSize={12} color={"white"} />
              </Button>}
              <Text
                fontSize={22}
                fontWeight={"bold"}
                color={"white"}
                letterSpacing={"-0.02"}
                mx={0}
                
              >
                {orderCount}
              </Text>
              <Button onClick={() => {setOrderCount(orderCount+1)}} zIndex={6} p={0}>
                <Icon as={AiOutlinePlusCircle} boxSize={12} color={"white"} />
              </Button>
            </HStack>
          </HStack>
          <HStack justifyContent={"space-between"} w={"full"} px={8} zIndex={5}>
            <SupportButton onClick={order} m={0}>
              <Text>Add to order</Text>
            </SupportButton>
            <Text fontSize={18}>Нийт: {currency(`${30000 * orderCount}`)}</Text>
          </HStack>
        </VStack>
        <VStack
          pos={active == 1 ? "relative" : "absolute"}
          bottom={0}
          w={"full"}
          h={active == 1 ? "auto" : 280}
          pt={4}
          borderTopRadius={70}
          bg={"white"}
          zIndex={3}
          pb={200}
        >
          <Box
            pos={"absolute"}
            onClick={() => setView(1)}
            h={280}
            zIndex={4}
            bottom={0}
            left={0}
            right={0}
            cursor={"pointer"}
          />
          <HStack
            mb={6}
            pl={12}
            pr={5}
            justifyContent={"space-between"}
            w="full"
          >
            <Text
              fontSize={22}
              fontWeight={"bold"}
              color={"black"}
              letterSpacing={"-0.02"}
            >
              Найрлага
            </Text>
            <Image src={imgCoffeeIngredient} w={150} />
          </HStack>
          {active == 1 && (
            <VStack w={"full"} px={6} mt={4}>
              <HStack w={"full"} justifyContent={"space-between"}>
                <Text fontWeight={"semibold"} fontSize={18}>
                  Грамм
                </Text>
                <HStack
                  borderRadius={23}
                  w={"auto"}
                  className="bg-color"
                  gap={0}
                  boxShadow={"0 4px 4px 0 rgba(0,0,0,0.25)"}
                >
                  <Button px={6}>250гр</Button>
                  <Button
                    px={6}
                    borderRight={"solid black 1px"}
                    borderRadius={0}
                    borderLeft={"solid black 1px"}
                  >
                    500гр
                  </Button>
                  <Button px={6}>1000гр</Button>
                </HStack>
              </HStack>
              <HStack w={"full"} justifyContent={"space-between"} mt={8}>
                <Text fontWeight={"semibold"} fontSize={18}>
                  Хууралтын түвшин
                </Text>
                <Slider
                  aria-label="slider-ex-6"
                  onChange={(val) => {
                    if (val > 10) {
                      setSliderValue(50);
                    }
                    if (val > 60) {
                      setSliderValue(100);
                    }
                    if (val < 40) {
                      setSliderValue(0);
                    }
                    if (val < 90) {
                      setSliderValue(50);
                    }
                  }}
                >
                  <SliderMark value={0} {...labelStyles}>
                    S
                  </SliderMark>
                  <SliderMark value={50} {...labelStyles}>
                    M
                  </SliderMark>
                  <SliderMark value={100} {...labelStyles}>
                    L
                  </SliderMark>

                  <SliderTrack
                    h={2}
                    boxShadow={"0 4px 4px 0 rgba(0,0,0,0.25)"}
                    bg={"darkGray"}
                    borderRadius={33}
                  >
                    <SliderFilledTrack bg={"prime"} borderRadius={30} />
                  </SliderTrack>
                  <SliderThumb
                    borderColor={"prime"}
                    bg={"black"}
                    borderWidth={1.5}
                  />
                </Slider>
              </HStack>
              <HStack w={"full"} justifyContent={"space-between"} mt={8}>
                <Text fontWeight={"semibold"} fontSize={18}>
                  Процесс
                </Text>

                <Button px={6} className="bg-color" borderRadius={33}>
                  Хуурай
                </Button>
                <Button px={6} className="bg-color" borderRadius={33}>
                  Нойтон
                </Button>
              </HStack>
            </VStack>
          )}
        </VStack>
        <VStack
          pos={active == 2 ? "relative" : "absolute"}
          bottom={0}
          w={"full"}
          h={active == 2 ? 'auto' : 380}
          pt={12}
          pb={280}
          borderTopRadius={70}
          bg={"dark"}
          zIndex={2}
        >
          <Box
            pos={"absolute"}
            onClick={() => setView(2)}
            h={370}
            zIndex={3}
            bottom={0}
            left={0}
            right={0}
            cursor={"pointer"}
          />
          <HStack
            mb={6}
            pl={12}
            pr={7}
            justifyContent={"space-between"}
            w="full"
          >
            <Text
              fontSize={22}
              fontWeight={"bold"}
              color={"white"}
              letterSpacing={"-0.02"}
            >
              Мэдээлэл
            </Text>
            <HStack>
              {[0,1,2,3,4].map((e, i) => {
                return <Image src={imgStar} w={6} ml={2.25} key={i}/>
              })}
            </HStack>
          </HStack>
          <VStack justifyContent={"center"} w={"full"} color={'white'} px={8} mt={11}>
            
              <Text mb={5} fontWeight={'bold'} fontSize={23}>TANZANIA</Text>
        <Text fontSize={17} >Африкын бүс нутаг Танзани улсад ургасан энэхүү кофе нь чихэрлэг жимсний үл ялиг амтнаас гадна бэрсүүт жүржний хүчиллэг амт давамгайлсан, хар цай болон дарсны амт мэдрэгдэх болно. Балгасны дараа аманд бага зэрэг шоколадны амт үлдэж таатай мэдрэмж төрүүлнэ.</Text>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
}
