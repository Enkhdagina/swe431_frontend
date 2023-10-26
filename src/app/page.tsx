"use client";
import SplashView from "@/components/splash/Splash";
import { store, useAppDispatch } from "./store";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { setShow, setView } from "./store/slices/splashSlice";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { Box, HStack, Text, Link, Image, VStack } from "@chakra-ui/react";
import CoffeePhoneCard from "@/components/card/coffee_phone";
import { Coffee } from "@/model/coffee";
import MainInput from "@/components/Input";
import { default as NextLink } from "next/link";
import { setBasket, updateBasket } from "./store/slices/basketSlice";
import { imgAbout, imgBg, imgMain, imgSeparator, imgSeparator1 } from "@/utils/assets";
import MainButton from "@/components/Button";
import CoffeeCard from "@/components/card/coffee";
import { data } from "@/utils/values";

export default function Home() {
  const isShow = store.getState().splash.isShow;
  const [baskets, setBaskets] = useState(store.getState().basket.ids);
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const [coffeeSlider, setCoffeeSlider] = useState<Slider | null>(null);
  const [slider, setSlider] = useState<Slider | null>(null);
  const [coffeeActive, setCoffeeActive] = useState(0);
  const [active, setActive] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
  const next = () => {
    if (active < 1) {
      slider?.slickNext();

      setActive(active + 1);
    } else {
      dispatch(setView(true));
      dispatch(setShow(true));
      router.refresh();
    }
  };
  const prev = () => {
    if (active > 0) {
      slider?.slickPrev();

      setActive(active - 1);
    }
  };

  const basket = (id: string) => {
    dispatch(updateBasket(id));
    setBaskets(store.getState().basket.ids);
  };

  const skip = () => {
    dispatch(setView(false));
    dispatch(setShow(true));
    router.refresh();
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

  if (!mounted) {
    return (
      <Box className="min-h-screen flex ">
        <Loader />
      </Box>
    );
  }
  return !isShow ? (
    <div className=" min-h-screen ">
      <SplashView
        active={active}
        next={next}
        prev={prev}
        setSlider={setSlider}
        skip={skip}
      />
    </div>
  ) : (
    <Box>
      <Box
        display={{ md: "flex", base: "none" }}
        
        alignItems={"center"}
        flexDir={"column"}
        
     
      >
        <VStack w={"full"} className={"bg-color-right"} pt={150}   pb={15}>
          <HStack w={"full"} maxW={1200} mb={5}>
            <Image src={imgMain} />
          </HStack>
          <VStack mb={2.5}>
            <Text fontSize={44} letterSpacing={1}>
              Бидний тухай
            </Text>
            <Image src={imgSeparator} maxW={750} />
          </VStack>
          <VStack maxW={1200} minW={750} mb={5}>
            <Text fontSize={25} mb={4}>
              We've 50 years' experience of crafting the finest quality coffee.
              From revolutionary methods and commitment to quality to
              unforgettable successes that have made Costa Coffee the Nation’s
              Favourite* coffee shop, our story is as unique as our coffee.
            </Text>
            <HStack>
              <VStack alignItems={"start"}>
                <Text fontSize={25} mb={1.25}>
                  But first, let’s start with how every good story should. At
                  the very beginning. The Costa Coffee story began back in 1971
                  when Sergio and Bruno arrived in London with a burning desire
                  to make great tasting coffee a part of everyday life.
                </Text>
                <Text fontSize={25} mb={4}>
                  Setting up a small roastery in Newport Street, they committed
                  to crafting the finest quality coffee.
                </Text>
                <MainButton
                  m={"0"}
                  onClick={() => {}}
                  bg="brown"
                  px={20}
                  py={5}
                >
                  <Text fontSize={25}>READ MORE</Text>
                </MainButton>
              </VStack>
              <Image src={imgAbout} ml={12} />
            </HStack>
          </VStack>
        </VStack>
        <VStack w={'full'} pos={'relative'} alignItems={'center'}>
        <VStack mt={5} mb={10}>
            <Text fontSize={44} letterSpacing={1}>
              Products
            </Text>
            <Image src={imgSeparator1} maxW={750} />
          </VStack>
        <Image src={imgBg} maxW={560} pos={'absolute'} zIndex={-1} top={0} right={0}/>
        {data.map((d, index) => {
          return <Box key={index} w={'full'}><CoffeeCard data={d} basket={() => {
            basket(d.id)
          }} heart={     baskets.find((basket) => basket == d.id) != undefined}/></Box>
        })}
        </VStack>

      </Box>

      <Box
        className="min-h-screen"
        pos={"relative"}
        flexDir={"column"}
        display={{ md: "none", base: "flex" }}
        py={12}
        pl={5}
      >
        <Box
          pos={"absolute"}
          h={160}
          left={0}
          right={0}
          top={0}
          className="bg-color"
          zIndex={-1}
        />
        <Text fontWeight={"bold"} fontSize={19} mb={6} mt={6}>
          Good morning, Dagina!
        </Text>
        <Box pr={8} pl={3}>
          <MainInput onChange={(value) => {}} />
        </Box>

        <HStack justifyContent={"space-between"} pr={5} mt={10} mb={6}>
          <Text fontWeight={"bold"} fontSize={16}>
            Choose your style
          </Text>
          <Link href="/coffee">See all</Link>
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
                      basket(d.id);
                    }}
                    heart={
                      baskets.find((basket) => basket == d.id) != undefined
                    }
                  />
                </Box>
              );
            })}
          </Slider>
        </Box>
        <HStack justifyContent={"space-between"} pr={5} mt={9} mb={6}>
          <Text fontWeight={"bold"} fontSize={16}>
            Popular
          </Text>
          <Link>
            <NextLink
              href={{
                pathname: "/coffee",
                query: { name: "popular" },
              }}
            >
              See all
            </NextLink>
          </Link>
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
                      basket(d.id), console.log(d.id);
                    }}
                    heart={
                      baskets.find((basket) => basket == d.id) != undefined
                    }
                  />
                </Box>
              );
            })}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
}
