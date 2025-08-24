import '../styles/globals.css';          // load global CSS styles
import { Toaster } from 'react-hot-toast'; // toast notification system

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}
