import Link from 'next/link';
import styled from 'styled-components';
import { Normalize } from 'styled-normalize';
import Navbar from '../components/Navbar/Navbar';
import CartProvider from '../context/Cart';
import Cart from '../components/Cart/Cart';

const Container = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;500&display=swap');
    font-family: 'Oswald', sans-serif;
    background: linear-gradient(to right, #f2994a, #f2c94c);
    color: #424242;
    min-height: 150vh;
    `

const Page = styled.div`
    width:100%;
    max-width: 768px;
    margin: 0 auto;
`



function MyApp({ Component, pageProps }) {
  return (
      <CartProvider>
        <Container>
            <Normalize />
            <Navbar />
            <Page>
            <Component {...pageProps} />
            </Page>
            <Cart />
        </Container>
    </CartProvider>
  );
};

export default MyApp;