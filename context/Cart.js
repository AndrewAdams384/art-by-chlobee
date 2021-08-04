import { createContext, useState, useEffect } from 'react';

export const Context = createContext();
//creates a global cart
const Cart = ({ children }) => {
    const getCart = () => JSON.parse(localStorage.getItem('cart'));
    const [cart, setCart] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [total, setTotal] = useState(0);

    // checks if there are items in cart,
    useEffect (() => {
        const initialCart = getCart()
        if (initialCart) {
            setCart(initialCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))

        let newTotal = 0
        // adds up the items in the cart
        cart.forEach((item) => (newTotal += item.price * item.qty));

        setTotal(newTotal);

    }, [cart]);


    const openCart = () => {
        setIsOpen(true);
    }

    const closeCart = () => {
        setIsOpen(false);
    }

    const addItemToCart = (product, qty = 1) => {
        // if item is already in cart, increase quantity instead of adding 'new' item.
        const item = cart.find(i => i.id === product.id)
        if (item) {
            item.qty += qty
            setCart([...cart]);
        } else {
        setCart([...cart, { ...product, qty }]);
        }
    };

    const removeItemFromCart = (id) => {
        const newCart = cart.filter(item => {
            return item.id !== id;
        });
        setCart(newCart);
    }

    const clearCart = () => {
        localStorage.removeItem('cart')
        setCart([]);
    }

    const exposed = {
        cart,
        addItemToCart,
        removeItemFromCart,
        openCart,
        closeCart,
        isOpen,
        total,
        clearCart,
    };

    return <Context.Provider value={exposed}>{children}</Context.Provider>
};

export default Cart;


