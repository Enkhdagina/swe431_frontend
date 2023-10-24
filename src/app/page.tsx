"use client";
import SplashView from "@/components/splash/Splash";
import { store, useAppDispatch } from "./store";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { setShow, setView } from "./store/slices/splashSlice";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { Box, HStack, Text, Link } from "@chakra-ui/react";
import CoffeePhoneCard from "@/components/card/coffee_phone";
import { Coffee } from "@/model/coffee";
import MainInput from "@/components/Input";
import { default as NextLink } from "next/link";
export const data: Coffee[] = [
  {
    name: "Tanzania",
    img: "v1698169047/srcx4tr421kfupbqdixw.svg",
    ingredients: ["Espresso", "Chocolate", "Steamed Milk"],
    price: 30000,
    id: "string",
  },
  {
    name: "asdf",
    img: "v1698169047/srcx4tr421kfupbqdixw.svg",
    ingredients: ["Espresso", "Chocolate", "Steamed Milk"],
    price: 30000,
    id: "string1",
  },
  {
    name: "asdfasdf",
    img: "v1698169047/srcx4tr421kfupbqdixw.svg",
    ingredients: ["Espresso", "Chocolate", "Steamed Milk"],
    price: 30000,
    id: "strin2g",
  },
  {
    name: "aa",
    img: "v1698169047/srcx4tr421kfupbqdixw.svg",
    ingredients: ["Espresso", "Chocolate", "Steamed Milk"],
    price: 30000,
    id: "strin4g",
  },
];
export default function Home() {
  const isShow = store.getState().splash.isShow;
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
    <Box className="min-h-screen" pl={5}>
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
                <CoffeePhoneCard data={d} basket={() => {}} order={() => {}} push={() => router.push(`/coffee/${d.id}`)}/>
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
                <CoffeePhoneCard data={d} basket={() => {}} order={() => {}} />
              </Box>
            );
          })}
        </Slider>
      </Box>
    </Box>
  );
}
