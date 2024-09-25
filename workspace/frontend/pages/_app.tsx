import { AppProps } from 'next/app';
import '@/styles/global.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    document.body.style.backgroundColor = 'rgb(229, 225, 235)';
  })
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;