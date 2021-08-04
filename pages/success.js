import { useEffect } from "react";
import Page from "../components/Styled/Page";
import useCart from "../hooks/useCart";

const Success = () => {
    const { clearCart } = useCart();
    // clears the cart when payment is succesful and items are purchased
    useEffect(() => {
        clearCart();
    }, [])
    return (
    <Page>
        <h2>Payment Successful!</h2>
    </Page>
    )
};

export default Success;