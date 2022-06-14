import Head from "next/head";
import "../styles.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Snapp Express</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
