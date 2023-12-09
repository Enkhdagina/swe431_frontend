"use client";

import "./styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "@/theme/chakra_theme";
import AOS from "aos";
import "aos/dist/aos.css";
import ReduxProvider from "@/app/store/ReduxProvider";
import { store, useAppDispatch } from "./store";
import { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import { getCookie } from 'cookies-next'
const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-quad',
      duration: 1000,
    });
  }, [])

  return null
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const dispatch = useAppDispatch();
  const token = getCookie("token");
  useEffect(() => {
    if (token != null || token != undefined || token != "") {
      // dispatch(setToken(cookies.token));
    }
  }, []);
  const [mounted, setMounted] = useState(false);

  const [title, setTitle] = useState("");
  const pathname = usePathname();
  const paths = pathname.split("/");
  useEffect(() => {
    setMounted(true);

  }, []);

  useEffect(() => {
    switch (paths[1]) {
      case "coffee":
        // paths[2] != undefined ? setTitle(paths[2]) : setTitle('COFFEE')
        setTitle("COFFEE");
        break;
      case "order":
        setTitle("ЗАХИАЛГА");
        break;
      case "notification":
        setTitle("МЭДЭГЛЭЛ");
        break;
      // case "profile":
      //   setTitle('ПРОФАЙЛ')
      //   break
      case "basket":
        setTitle("МИНИЙ ДУРТАЙ");
        break;
      default:
        setTitle("");
        break;
    }
  }, [pathname]);

  if (!mounted) {
    return (
      <html lang="en">
        <head><link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" /></head>
        <body>
          <Box className="flex min-h-screen ">
            <Loader />
          </Box>
          <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <AOSInit />
      <body>
        <ReduxProvider>

          <ChakraProvider theme={theme}>
            {/* {isShow && <Navbar path={paths[1]} slug={paths[2]} title={title} />} */}
            <Navbar path={paths[1]} slug={paths[2]} title={title} />
            {children}

          </ChakraProvider>

        </ReduxProvider>
      </body>
    </html>
  );
}
