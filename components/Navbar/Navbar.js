import Link from 'next/link'
import styled from 'styled-components';
import UnstyledLink from '../Styled/UnstyledLink';
import { BiCar, BiCartAlt } from "react-icons/bi";
import useCart  from '../../hooks/useCart';


const Nav = styled.nav`
background:white;
padding: 1.5rem;
`

const NavContainer = styled.div`
width:100%;
margin: 0 auto;
font-size: 1.5rem;
display: flex;
justify-content: space-between;
`
const Navbar = () => {
    const { openCart } = useCart();

    const handleClick = () => {
        openCart();
    }
    return (
        <Nav>
            <NavContainer>
                <Link href='/'>
                    <UnstyledLink>Digital Storefront</UnstyledLink>
                </Link>
                <BiCartAlt fontSize='2.5rem' onClick={handleClick} />
            </NavContainer>
        </Nav>
    );
};

export default Navbar