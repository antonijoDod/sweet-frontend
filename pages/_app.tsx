import "@styles/global.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import {
    QueryClient,
    QueryClientProvider,
    Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import theme from "@definitions/chakra/theme";

import "@fontsource/poppins/700.css";
import "@fontsource/source-sans-pro/600.css";
import "@fontsource/source-sans-pro/400.css";

export default function App({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();
    return (
        <SessionProvider session={pageProps.session}>
            <ChakraProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <Hydrate state={pageProps.dehydratedState}>
                        <Component {...pageProps} />
                    </Hydrate>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ChakraProvider>
        </SessionProvider>
    );
}
