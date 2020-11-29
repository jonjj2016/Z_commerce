import express from "express"
import dotEnv from 'dotenv';
import cors from "cors";
import colors from 'colors';
import productRoutes from './routs/ProductRouts.js'
import { errorHandler, notFound } from './Middleware/ErrorMiddleware.js'
import userRouter from "./routs/UserRotes.js";

dotEnv.config()
import connectDb from './config/db.js';
const app = express();
app.use(cors());
app.use(express.json())
connectDb()



//mount routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRouter);


//middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))