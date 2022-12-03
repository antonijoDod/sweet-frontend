import "@styles/global.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "@definitions/chakra/theme";

import "@fontsource/poppins/700.css";
import "@fontsource/source-sans-pro/600.css";
import "@fontsource/source-sans-pro/400.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
