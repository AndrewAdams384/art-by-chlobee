import fs from 'fs';
import matter from 'gray-matter';
import marked from 'marked';
import styled from 'styled-components';
import Page from '../../components/Styled/Page';


const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Price = styled.p`
    font-size: 1.5rem;
`

//creates product page for each product in ../content
const Product = ({ product: { data, content } }) => {
    const html = marked(content);
    return (
        <Page>
            <Title>
                <h1>{data.name}</h1>
                <p>{data.description}</p>
            </Title>
            <div>
                <Price>${data.price / 100}</Price>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </Page>
    )
};

export const getStaticPaths = () => {
    //product pages to generate
    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory);

    const paths = filenames.map(filename => {
        return {
            params: {
                product: filename.replace('.md', ''),
            }
        }
    });

    return {
        paths,
        fallback: false, 
    }
};

export const getStaticProps = async (context) => {
    const productName = context.params.product;
    const filePath = `${process.cwd()}/content/${productName}.md`
    const fileContent = fs.readFileSync(filePath).toString();
    const { data, content } = matter(fileContent);

    return {
        props: {
            product: {
                data, 
                content,
            }
        },
    };
};

export default Product;