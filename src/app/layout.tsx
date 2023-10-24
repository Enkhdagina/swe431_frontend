"use client";

import "./styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "@/theme/chakra_theme";

import ReduxProvider from "@/app/store/ReduxProvider";
import { store } from "./store";
import {useState, useEffect} from 'react'
import {Box} from '@chakra-ui/react'
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isShow = store.getState().splash.isShow;
  const [mounted, setMounted] = useState(false);
useEffect(() => {
  setMounted(true)
}, [])
if(!mounted) {
  return <html lang="en">
    <body>
    <Box className='min-h-screen flex '  ><Loader/></Box>
    </body>
  </html>
}
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ChakraProvider theme={theme}>
            {isShow && <Navbar/>}
            {children}
          </ChakraProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
