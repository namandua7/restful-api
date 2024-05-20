import { AppProps } from 'next/app';
import { ThemeProvider } from '../components/ThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
