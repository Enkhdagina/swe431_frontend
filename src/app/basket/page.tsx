"use client";
import { imgHeart } from "@/utils/assets";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

import Slider from "react-slick";
import { useEffect, useState } from "react";
import CoffeePhoneCard from "@/components/card/coffee_phone";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { store, useAppDispatch } from "../store";
import { updateBasket } from "../store/slices/basketSlice";
import { data } from "@/utils/values";
import { useCookies } from "react-cookie";

const BasketPage = () => {
  const [coffeeSlider, setCoffeeSlider] = useState<Slider | null>(null);
  const [mounted, setMounted] = useState(false);
  const [baskets, setBaskets] = useState(store.getState().basket.ids);
  const dispatch = useAppDispatch();
  const token = store.getState().auth.token;
  const basket = (id: string) => {
    dispatch(updateBasket(id));
    setBaskets(store.getState().basket.ids);
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

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (token == "") {
      router.push("/auth");
    }
  }, [token]);

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
      className="bg-color"
      w={"full"}
      pb={20}
      px={4}
      pt={20}
    >
      <Image src={imgHeart} px={12} mx={"auto"} maxW={400} />
      <HStack w={"full"} mb={4}>
        <Text>My lists</Text>
      </HStack>
      <Box position={"relative"} width={"full"} overflow={"hidden"}>
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
          {data
            .filter((d) => baskets.includes(d.id))
            .map((d, index) => {
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
                      basket(d.id);
                    }}
                    heart={true}
                  />
                </Box>
              );
            })}
        </Slider>
      </Box>
    </Box>
  );
};
export default BasketPage;
