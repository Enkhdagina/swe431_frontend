"use client";
import { imgEmpty, imgHeart } from "@/utils/assets";
import { Box, HStack, Image, SlideFade, Text, VStack } from "@chakra-ui/react";

import Slider from "react-slick";
import { useEffect, useState } from "react";
import CoffeePhoneCard from "@/components/card/coffee_phone";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { store, useAppDispatch } from "../store";
import { updateBasket } from "../store/slices/basketSlice";

import { getCookie } from 'cookies-next'
import { Coffee } from "@/model/coffee";
import { api } from "@/utils/values";
import { User } from "@/model/user";
import Head from "next/head";
import CoffeeCard from "@/components/card/coffee";

const BasketPage = () => {
  const [loader, setLoader] = useState(false)
  const [coffeeSlider, setCoffeeSlider] = useState<Slider | null>(null);
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const [counts, setCounts] = useState<number[]>([]);
  const token = getCookie('token')
  const [data, setData] = useState<Coffee[]>([])
  const basket = async (id: string) => {
    if (token == undefined) {
      router.push("/auth");
    } else {
      dispatch(updateBasket(id));
      setData(data.filter((d) => d._id != id))

      let res = await fetch(`${api}user/basket/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      })
      let json = await res.json()

      if (json.statusCode == undefined) {


      } else {
        console.log(json);
      }

    }

  };
  const coffeeSliderSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2.5,

    autoplay: true,
    autoplaySpeed: 2000,

    initialSlide: 1,
  };

  const router = useRouter();
  const getBasket = async () => {
    try {
      setLoader(true)
      await fetch(`${api}product/basket`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).then((d) => d.json()).then((d: Coffee[]) => {

        setData(d)
        setCounts(Array.from(Array(d.length).fill(1)));

      })
      setLoader(false)
    } catch (error) {

    }
  }
  useEffect(() => {
    setMounted(true);

  }, []);
  useEffect(() => {
    if (token == undefined) {
      router.push("/auth");
    }
    else {
      getBasket()
    }
  }, []);

  if (!mounted) {
    return (
      <Box className="flex min-h-screen ">
        <Loader />
      </Box>
    );
  }
  return (
    <Box
      pos={"relative"}
      justifyContent={"space-between"}
      flexDir={"column"}
      display={"flex"}
      zIndex={10}
      alignItems={"center"}
      className="bg-color "
      w={"full"}
      pb={20}

      px={4}
      pt={20}
    >


      {
        data.length == 0 && !loader ? <VStack w={'full'}>
          <Image src={imgEmpty} mt={120} px={12} mx={'auto'} maxW={400} />
          <Text fontSize={30} letterSpacing={'-0.02'}>Уучлаарай</Text>
          <Text fontSize={30} letterSpacing={'-0.02'}>Таны сагс хоосон байна!</Text>
        </VStack> :
          <Box w={'full'} position={"relative"} width={"full"} overflow={"hidden"}>
            <Image src={imgHeart} px={12} mx={"auto"} maxW={400} />
            <HStack w={"full"} mb={4}>
              <Text>My lists</Text>
            </HStack>

          </Box>}
      {data.length > 0 && <Box
        display={{ md: "flex", base: "none" }}
        alignItems={"center"}
        flexDir={"column"}
      > {data.map((d, index) => {
        return (
          <Box
            key={index}
            w={"full"}
            my={index != data.length - 1 ? 10 : 0}
            data-aos={index % 2 == 0 ? "fade-left" : "fade-right"}
          >
            <CoffeeCard
              data={d}
              index={index}
              basket={() => {

                basket(d._id);

              }}
              quantity={counts[index]}
              minus={() => {
                if (counts[index] > 1) {
                  setCounts((prev) => ({
                    ...prev,
                    [index]: counts[index] - 1,
                  }));
                }
              }}
              plus={() => {
                setCounts((prev) => ({
                  ...prev,
                  [index]: counts[index] + 1,
                }));
              }}
              heart={true}
            />
          </Box>
        );
      })}</Box>}
      {data.length > 0 && <Box
        className="min-h-screen"
        pos={"relative"}
        flexDir={"column"}
        display={{ md: "none", base: "flex" }}
        w={'full'}


      > <Box position={"relative"} width={"full"} overflow={"hidden"} >
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />

          <Slider
            {...coffeeSliderSetting}
            ref={(slider) => setCoffeeSlider(slider)}
          >

            {data.map((d, index) => {
              return (
                <Box
                  key={index}
                  position="relative"
                  flexDir={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  m={"auto"}

                >
                  <CoffeePhoneCard
                    data={d}
                    basket={() => {
                      basket(d._id);
                    }}
                    heart={
                      true
                    }
                  />
                </Box>
              );
            })}

          </Slider>
        </Box> </Box>}
    </Box>
  );
};
export default BasketPage;
