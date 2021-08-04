import Link from 'next/link';

function MyApp({ Component, pageProps }) {
  return (
    <>
        <Link href='/'>
        <a>home</a>
        </Link>
        <br />
        <Link href='/about'>
        <a>about</a>
        </Link>
        <Component {...pageProps} />
        <footer>bye</footer>
    </>
  );
};

export default MyApp;