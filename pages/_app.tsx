import "@styles/global.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/lora/700.css";
import "@fontsource/hind/600.css";
import "@fontsource/hind/500.css";
import "@fontsource/hind/400.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
