import { ChakraProvider, theme } from '@chakra-ui/react';
import axios from 'axios';
import { SWRConfig } from 'swr';
import '../styles/globals.css';

axios.defaults.baseURL = process.env.API_ENDPOINT;

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SWRConfig value={{ fetcher: (url: string) => axios(url).then((r) => r.data) }}>
        <Component {...pageProps} resetCSS />
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
