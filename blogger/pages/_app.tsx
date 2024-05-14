import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

function App({ Component, pageProps }: any) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return <Component {...pageProps} />;
}

export default App;
