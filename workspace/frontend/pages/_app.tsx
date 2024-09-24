import { AppProps } from 'next/app';
import '@/styles/global.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    document.body.style.background = "#a49f9f";
  })
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;