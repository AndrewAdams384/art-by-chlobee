import Page from '../components/Styled/Page';
import styled from 'styled-components';
import  useCart  from '../hooks/useCart';
import axios from 'axios';

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
const Item = styled.li`
    list-style: none;
    display: flex;
    justify-content: space-between;
    padding:1rem;
`

const Checkout = () => {
    const { cart, total } = useCart();

    const goToPayment = async () => {
        const url = '/.netlify/functions/charge-card';
        const newCart = cart.map(({ id, qty }) => ({
            id,
            qty,
        }))
        const { data } = await axios.post(url, { cart: newCart });
        console.log('woo');
    }

    return (
    <Page>  
        <h1>CHECKOUT</h1>
        {cart.length > 0 ? (
            <>
            <Ul>
            {cart.map(item => {
                return <Item>
                    <span>{item.qty} x {item.name}</span>
                    <span>${item.price/100}</span>
                    </Item>
            })}
            </Ul>
            <Total>
                <span>Total</span>
                <span>${total/100}</span>
            </Total>
            <Button onClick={goToPayment}>Process Payment</Button>
            </>
        ) : (
        <p>You do not have any items in your cart.</p>
        )}
    </Page>
    )
}

export default Checkout;