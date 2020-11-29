import asyncHandler from 'express-async-handler';
import Product from '../Models/productModel.js';



//  @desc Fetch all products
//  @route GET/api/products
//  @access Public
const find = asyncHandler(async(req, res) => {

    const products = await Product.find({})

    res.json(products)



});
//  @desc Fetch single products
//  @route GET/api/products/:productId
//  @access Public
const get = asyncHandler(async(req, res) => {


    const { id } = req.params
    const fetched_products = await Product.find({})
    const product = await fetched_products.find(item => String(item._id) === id);
    if (product) {

        res.json(product)
    } else {
        res.status(404).json({
            status: false,
            message: "Product not found"
        })
    }

});
export {
    get,
    find
}