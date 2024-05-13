// pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default App;
