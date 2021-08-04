import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import useCart from '../../hooks/useCart';
import { useRouter } from 'next/dist/client/router';
import Router from 'next/dist/next-server/server/router';

const Container = styled.div`
    position:fixed;
    top:0;
    bottom: 0;
    right: 0;
    height: 100vh;
    background: white;
    width: 300px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    transform: translateX(${props => props.isOpen ? '0%' : '100%'});
    transition: transform .5s;

`
const X = styled(FiX)`
    font-size: 2.5rem;
    &:hover {
        cursor: pointer;
    }

`
const XContainer = styled.div`
    display:flex;
    justify-content: flex-end;
`
const Content = styled.div`
padding: 2rem;
`
const Item = styled.li`
    list-style: none;
    display: flex;
    justify-content: space-between;
    padding:1rem;
`
const Ul = styled.ul`
    padding:0;
`
const Total = styled.p`
display: flex;
justify-content: space-between;
font-weight: 1000;
font-size: 1.5rem;
`
const Button = styled.button`
background: #ffffd4;;
font-size: 100%
color: inherit;
outline: none;
width: 100%;
font-size: 2rem;
padding: 1rem;
&:hover{
    cursor: pointer;
}

`

const Cart = () => {
    const { cart, isOpen, openCart, closeCart, total } = useCart();
    const handleClick = () => {
        closeCart();
    }
    const router = useRouter();

    const goToCheckout = () => {
        router.push('/checkout');
        closeCart();
    }
    return (
        <Container isOpen={isOpen}>
            <XContainer>
                <X onClick={handleClick}/>
            </XContainer>
            <Content>
            <h1>Cart</h1>
        {/* creates list of items in cart */}
            {cart.length > 0 ? (<>
                <Ul>
            {cart.map(item => {
                return <Item>
                    <span>{item.qty} x {item.name}</span>
                    <span>${item.price / 100}</span>
                    </Item>
            })}
            </Ul>
            <Total>
                <span>Total</span>
                <span>${total/100}</span>
            </Total>
            <Button onClick={goToCheckout}>Checkout</Button>
            </>) : (
                <p>Cart is empty!</p>
            )}
 
            </Content>
        </Container>

    );
};

export default Cart;
