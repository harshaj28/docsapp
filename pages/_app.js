import "@material-tailwind/react/tailwind.css";
import '../styles/globals.css'
import Head from 'next/head';
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
    <link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>
    </Head>  
  <Provider session={pageProps.session}>
    <Component {...pageProps} />
  </Provider>
  </>
  )
}
export default MyApp
