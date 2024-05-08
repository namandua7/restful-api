// pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css';

function App({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default App;
