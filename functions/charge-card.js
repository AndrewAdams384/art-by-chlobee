const fs = require('fs');
const matter = require('gray-matter');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const getProducts = () => {
    const directory = `${process.cwd()}/content`;
    const filenames = fs.readdirSync(directory);
    const products = filenames.map(filename => {
      const fileContent = fs.readFileSync(`${directory}/${filename}`).toString();  // read the file from file system
      const { data } = matter(fileContent) //pull out front matter => name
    return data;
    });

    return products;

}

exports.handler = async (event, context) => {  
const { cart } = JSON.parse(event.body);

const products = getProducts();

const cartWithProducts = cart.map(({ id, qty }) => {
    const product = products.find(p => p.id === id)
    return {
        ...product,
        qty,
    };
})
console.log(cartWithProducts);
const lineitems = cartWithProducts.map(product => ({
    price_data: {
        currency: 'usd',
        product_data: {
            name: product.name
        },
        unit_amount: product.price,
    },
    quantity: product.qty,
}));

const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineitems,
    mode: "payment",
    success_url: `${process.env.URL}/success`,
    cancel_url: `${process.env.URL}/cancelled`,
})

  return {
    statusCode: 200,
    body: JSON.stringify({
        id: session.id,
    }),
  };
};