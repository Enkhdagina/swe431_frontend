"use client";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import { theme } from "@/theme/chakra_theme";

import ReduxProvider from "@/app/store/ReduxProvider";
import { store } from "./store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isShow = store.getState().splash.isShow;
  // useEffect(() => {
    
  // }, [isShow]);
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ChakraProvider theme={theme}>
            {isShow && <Navbar />}
            {children}
          </ChakraProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
