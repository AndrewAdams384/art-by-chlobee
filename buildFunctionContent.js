const fs = require('fs');
const matter = require('gray-matter');

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

console.log(getProducts());

const filepath = `${process.cwd()}/functions/products.json`;

const products = getProducts()


fs.writeFileSync(filepath, JSON.stringify(products)) 