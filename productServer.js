// Assuming you have Express.js set up
const express = require('express');
const app = express();

// Render the product.ejs template
app.get('/product', (req, res) => {
    const product = {
        name: 'Sample Product',
        image: 'https://via.placeholder.com/150',
        description: 'This is a sample product description.',
        price: 29.99,
        category: 'Sample Category',
        stock: 10
    };

    res.render('product.ejs', { product });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
