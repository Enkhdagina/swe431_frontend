"use client";
import NotificationCard from "@/components/card/notification";
import { imgCoupon, imgCreated, imgDelivered, imgReady } from "@/utils/assets";
import { Box, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { store, useAppDispatch } from "../store";
import { useRouter } from "next/navigation";
import { getCookie } from 'cookies-next'

const NotificationPage = () => {
  const dispatch = useAppDispatch();
  const token = getCookie('token')
  const router = useRouter();
  useEffect(() => {
    if (token == undefined) {
      router.push("/auth");
    }
  }, [token]);
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
      pt={32}
      px={8}
    >
      <VStack w={"full"}>
        {[
          {
            icon: imgDelivered,
            text: "Таны захиалга ирсэн байна.",
          },
          {
            icon: imgReady,
            text: "Таны захиалга гарсан байна.",
          },
          {
            icon: imgCreated,
            text: "Таны захиалга амжилттай хийгдлээ.",
          },
          {
            icon: imgCoupon,
            text: "Та үнэгүй кофе авах эрхтэй боллоо!",
          },
        ].map((d, index) => {
          return <NotificationCard icon={d.icon} text={d.text} key={index} />;
        })}
      </VStack>
    </Box>
  );
};

export default NotificationPage;
