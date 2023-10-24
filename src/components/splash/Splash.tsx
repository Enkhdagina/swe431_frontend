"use client";

import React, { useState } from "react";
import {
  Box,

  Text,
  Container,
  Highlight,
  Image,
  HStack,
  Button,
} from "@chakra-ui/react";

import Slider from "react-slick";
import { imgSplash, imgSplash1 } from "@/utils/assets";
import MainButton from "../Button";
import {FC, } from 'react'

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
type Props = {
  setSlider: (slider: Slider | null) => void,
  prev: () => void,
  next: () => void,
  skip: () => void,
  active: number,

}

const SplashView:FC<Props> = ({setSlider, prev, next, skip, active}) => {
 


  const cards = [
    {
      title: "ТАВТАЙ МОРИЛНО УУ!",
      image: imgSplash,
      textSize: 38,
    },
    {
      title: "БИД ТАНЫ ХҮССЭН КОФЕ-Г ОЛОХОД ТАНЬ ТУСЛАХ БОЛНО",
      image: imgSplash1,
      highlight: "ОЛОХОД",
      textSize: 26,
    },
  ];

  
  return (
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

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            height={"100vh"}
            position="relative"
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            m={'auto'}
          >
            <Box className="bg-color">
              <Image src={card.image} />
            </Box>

            <Text
              fontSize={card.textSize}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              <Highlight
                query={card.highlight ?? ""}
                styles={{
                  color: "prime",
                  fontWeight: "bold",
                  fontSize: card.textSize,
                  letterSpacing: "-0.03",
                }}
              >
                {card.title}
              </Highlight>
            </Text>
            <Box h={10} />
            <HStack justifyContent={"center"}>
              {cards.map((card, i) => {
                return (
                  <Box
                    key={i}
                    borderRadius={20}
                    width={26}
                    height={11}
                    bg={active == i ? "prime" : "gray"}
                  />
                );
              })}
            </HStack>
            <Box h={3} />
            <HStack>
            {active != 0 && <MainButton
            
              onClick={prev}
            >
              Буцах
            </MainButton>}
            <MainButton
            px={active != 0 ? 10 : 70}
            py={active != 0 ? 3 : 4}
              onClick={next}
            >
              Дараах
            </MainButton>
            </HStack>
            <Box h={2}/>
            {active == 0 && <Button onClick={skip} m={'auto'} fontWeight={'bold'} fontSize={14} display={'flex'}>Алгасах</Button>}
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
export default SplashView