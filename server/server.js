const express = require("express");
const products = require('./data/products');
const dotEnv = require('dotenv');


dotEnv.config()
const app = express();
const cors = require("cors");
app.use(cors())


app.get('/', (req, res) => {
    res.send('API is running')
})


app.get('/api/products', (req, res) => {
    res.json(products)
})
app.get('/api/products/:productId', (req, res) => {
    const { productId } = req.params
    const product = products.find(item => item._id === productId);


    res.json(product)
});

console.log(process.env.NODE_ENV);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))