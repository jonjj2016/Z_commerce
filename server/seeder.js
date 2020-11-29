import mongoose from 'mongoose';
import dotEnv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './Models/userModel.js';
import Product from './Models/productModel.js';
import Order from './Models/orderModel.js';
import connectDb from './config/db.js';
dotEnv.config();

connectDb()
const importData = async() => {
    try {


        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map(item => ({...item, user: adminUser }))

        await Product.insertMany(sampleProducts);

        console.log(`Data has been inserted successfully`.green.inverse);
        process.exit()

    } catch (error) {
        console.error(`${error.message}`.red.inverse);
        process.exit(1)
    }
}
const destroyData = async() => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        console.log("Data has been successfully ".green.inverse + "destroyed".red.inverse);
        process.exit()
    } catch (error) {
        console.error(`${error.message}`.red.inverse);
        process.exit(1)
    }
}
if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}