"use client";
import SplashView from "@/components/splash/Splash";
import { store, useAppDispatch } from "./store";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { setShow, setView } from "./store/slices/splashSlice";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { Box, HStack, Text, Link, Image, VStack, Icon } from "@chakra-ui/react";
import CoffeePhoneCard from "@/components/card/coffee_phone";
import { Coffee } from "@/model/coffee";
import MainInput from "@/components/Input";
import { default as NextLink } from "next/link";
import { setBasket, updateBasket } from "./store/slices/basketSlice";
import {
  imgAbout,
  imgBg,
  imgCoffeePack,
  imgMain,
  imgProductFooter,
  imgSeparator,
  imgSeparator1,
} from "@/utils/assets";
import MainButton from "@/components/Button";
import CoffeeCard from "@/components/card/coffee";

import LocationCard from "@/components/card/location";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { FaInstagramSquare, FaTwitter } from "react-icons/fa";
import { ImYoutube } from "react-icons/im";
import { api } from "@/utils/values";
import { useCookies } from "react-cookie";

export default function Home() {
  const isShow = store.getState().splash.isShow;
  const [baskets, setBaskets] = useState(store.getState().basket.ids ?? []);
  const [cookies] = useCookies(['token'])
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const [coffeeSlider, setCoffeeSlider] = useState<Slider | null>(null);
  const [slider, setSlider] = useState<Slider | null>(null);
  const [coffeeActive, setCoffeeActive] = useState(0);
  const [active, setActive] = useState(0);
  const [data, setData] = useState<Coffee[]>([]);
  const [counts, setCounts] = useState<number[]>([]);
  const router = useRouter();
  const getBasket = async (token: string) => {
    
    try {
       await fetch(`${api}user/basket`, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
      }).then((d) => d.json()).then((d: string[]) => {
        dispatch(setBasket(d));
        setBaskets(store.getState().basket.ids)

      })
    } catch (error) {
      
    }
  }
  const getProduct = async () => {
    const res = await fetch(`${api}product`);

    const products = await res.json();
    setCounts(Array.from(Array(products.length).fill(1)));
    setData(products);
  };
  useEffect(() => {
    setMounted(true);
    getProduct();
    
  }, []);

  useEffect(() => {
    if(cookies['token'] != undefined) {
   
      getBasket(cookies['token'])
    }
  }, [cookies['token']]);
  
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

  const basket = async (id: string) => {
    if (cookies['token'] == undefined) {
      router.push("/auth");
    } else {
      dispatch(updateBasket(id));
      setBaskets(store.getState().basket.ids);
  
      let res = await fetch(`${api}user/basket/${id}`, {
        method: "GET",
        headers: {Authorization: `Bearer ${cookies['token']}`}
      })
      let json = await res.json()
 
     
      if(json.statusCode == undefined) {

      } else {
        console.log(json);
      }

    }
  
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
      <Box className="flex min-h-screen ">
        <Loader />
      </Box>
    );
  }
  return (
    // <div className="min-h-screen ">
    //   <SplashView
    //     active={active}
    //     next={next}
    //     prev={prev}
    //     setSlider={setSlider}
    //     skip={skip}
    //   />
    // </div>

    <Box>
      <Box
        display={{ md: "flex", base: "none" }}
        alignItems={"center"}
        flexDir={"column"}
      >
        <VStack w={"full"} className={"bg-color-right"} pt={150} pb={15}>
          <HStack w={"full"} maxW={1200} mb={5} px={4}>
            <Image src={imgMain} />
          </HStack>
          <VStack mb={2.5}>
            <Text fontSize={44} letterSpacing={1}>
              Бидний тухай
            </Text>
            <Image src={imgSeparator} maxW={750} />
          </VStack>
          <VStack maxW={1200} minW={750} mb={5} px={4}>
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
        <VStack w={"full"} pos={"relative"} alignItems={"center"} px={4}>
          <VStack mt={5} mb={10}>
            <Text fontSize={44} letterSpacing={1}>
              Products
            </Text>
            <Image src={imgSeparator1} maxW={750} />
          </VStack>
          <Image
            src={imgBg}
            maxW={560}
            pos={"absolute"}
            zIndex={-1}
            top={0}
            right={0}
          />
          {data.map((d, index) => {
            return (
              <Box
                key={index}
                w={"full"}
                my={index != data.length - 1 ? 10 : 0}
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
                  heart={baskets.includes(d._id)}
                />
              </Box>
            );
          })}
        </VStack>
        <Image
          src={imgProductFooter}
          // transform={"translateY(-25%)"}
          mt={"-10%"}
          zIndex={-1}
        />
        <VStack w={"full"} pt={5} className={"bg-color-right"}>
          <VStack mb={2.5}>
            <Text fontSize={44} letterSpacing={1}>
              Манай байршил
            </Text>
            <Image src={imgSeparator} maxW={750} />
          </VStack>
          <HStack
            w={"full"}
            maxW={1200}
            gap={12}
            px={4}
            display={"grid"}
            mb={20}
            gridTemplateColumns={"repeat(3, 1fr)"}
          >
            <LocationCard
              img="https://www.posist.com/restaurant-times/wp-content/uploads/2023/07/How-To-Start-A-Coffee-Shop-Business-A-Complete-Guide.jpg"
              name="Салбар 1"
              address="Tedy Center, Ulaanbaatar
Mongolia"
              schedule="MON-SAT- 7:00A.M-8:00P.M"
            />
            <LocationCard
              img="https://www.barniescoffee.com/cdn/shop/articles/bar-1869656_1920.jpg?v=1660683986"
              name="Салбар 2"
              address="Menifee Drive Thru
              Ulaanbaatar"
              schedule="MON-SAT- 7:00A.M-8:00P.M"
            />
            <LocationCard
              img="https://perfectdailygrind.com/wp-content/uploads/2019/02/coffee-bar.jpg"
              name="Салбар 3"
              address="San Diego, CA: Kearny Mesa DT"
              schedule="MON-SAT- 7:00A.M-8:00P.M"
            />
          </HStack>
          <HStack bg={"whiteAlpha.600"} w={"full"} py={9}>
            <HStack
              w={"full"}
              maxW={1200}
              px={4}
              margin={"auto"}
              justifyContent={"space-between"}
              alignItems={"start"}
            >
              <Box mr={20} w={"80%"} flex={1}>
                <Image src={imgCoffeePack} />
              </Box>
              <VStack flex={2} alignItems={"start"}>
                <Link href="/" fontWeight={"bold"} mb={4}>
                  About us
                </Link>
                <Link href="/" mb={1}>
                  Our coffees
                </Link>
                <Link href="/" mb={1}>
                  Our story
                </Link>
                <Link href="/" mb={1}>
                  Polices and reports
                </Link>
                <Link href="/" mb={1}>
                  Download our app
                </Link>
              </VStack>
              <VStack flex={2} alignItems={"start"}>
                <Link href="/" fontWeight={"bold"} mb={4}>
                  Gifting
                </Link>
                <Link href="/" mb={1}>
                  Gift cards
                </Link>
                <Link href="/" mb={1}>
                  Gift cards for business
                </Link>
              </VStack>
              <VStack flex={2} alignItems={"start"}>
                <Link href="/" fontWeight={"bold"} mb={4}>
                  Contact us
                </Link>
                <Link href="/" mb={1}>
                  (+976) 98765432
                </Link>
                <Link href="/" mb={1}>
                  FAQs
                </Link>
                <Link href="/" mb={1}>
                  {" "}
                  Press
                </Link>
                <Link href="/" mb={1}>
                  Careers
                </Link>
              </VStack>
            </HStack>
          </HStack>
        </VStack>
        <HStack
          w={"full"}
          py={9}
          maxW={1200}
          px={4}
          justifyContent={"space-between"}
        >
          <Link fontSize={20} href="/">
            Privacy policy
          </Link>
          <Link fontSize={20} href="/">
            Cookie policy
          </Link>
          <Link fontSize={20} href="/">
            Terms and conditions{" "}
          </Link>
        </HStack>
        <VStack
          w={"full"}
          margin={"auto"}
          maxW={1200}
          px={4}
          alignItems={"start"}
        >
          <Text mb={9} fontSize={20}>
            © 2013 - 2023 Costa. All rights reserved.
          </Text>
          <HStack pb={10}>
            <Link fontSize={20} href="/">
              <Icon as={BiLogoFacebookCircle} boxSize={30} />
            </Link>
            <Link fontSize={20} href="/" ml={8}>
              <Icon as={FaInstagramSquare} boxSize={30} />
            </Link>
            <Link fontSize={20} href="/" ml={8}>
              <Icon as={ImYoutube} boxSize={30} />
            </Link>
            <Link fontSize={20} href="/" ml={8}>
              <Icon as={FaTwitter} boxSize={30} />
            </Link>
          </HStack>
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
                      basket(d._id);
                    }}
                    heart={
                      baskets.includes(d._id)
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
                      basket(d._id)
                    }}
                    heart={
                      baskets.find((basket) => basket == d._id) != undefined
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
