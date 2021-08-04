import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import styled from 'styled-components';
import UnstyledLink from '../components/Styled/UnstyledLink';
import useCart from '../hooks/useCart';
import { useContext } from 'react';



const Container = styled.div`
    background: #ffffd4;
    min-height: 15rem;
    padding: 1rem;
    position: relative;
    border-radius: .25rem;
    transition: transform 0.5s;
    &:hover {
        transform: scale(1.05)
    }
`

const ProductsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1.5rem;
    margin-top: 2rem;


`

const Price = styled.div`
    position: absolute;
    bottom:0;
    right:0;
    padding: 1rem;
    font-size: 2rem;
`

const renderProduct = (product, addItemToCart) => {
    const handleClick = (e) => {
        e.stopPropagation()
        addItemToCart(product)
    }

    return (
        <Link key={product.id} href={product.slug}>
            <UnstyledLink>
                <Container>
                    <h1>{product.name}</h1>
                    <p>{product.description}</p>
                    <button onClick={handleClick}>add to cart</button>
                    <Price>${product.price / 100}</Price>
                </Container>
            </UnstyledLink>
        </Link>
    );
}

const HomePage = (props) => {
    const { cart, addItemToCart } = useCart();
    console.log(cart);
    return <ProductsContainer>
        {props.products.map(product => renderProduct(product, addItemToCart))}
    </ProductsContainer>

};

export const getStaticProps = async () =>  {
    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory);
    const products = filenames.map(filename => {
      const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();  // read the file from file system
      const { data } = matter(fileContent) //pull out front matter => name
    // return formatted product name, slug   
    const slug = `/products/${filename.replace('.md', '')}`
    const product = {
        ...data,
        slug,
    };
    return product;
    }); 
    console.log(products);
    return {
        props: {
            products, 
        },  
    }
}
  
export default HomePage