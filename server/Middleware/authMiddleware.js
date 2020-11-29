import jwt from 'jsonwebtoken';
import asynHandler from 'express-async-handler';
import User from '../Models/userModel.js';

export const Protect = asynHandler(async(req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        token = req.headers.authorization.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const { id } = decoded;
            const user = await User.findById(id).select('-password');
            req.user = user
            next()

        } catch (err) {
            console.error(err);
            res.status(401);
            throw new Error("Not Authorized,token failed")
        }
    } else {
        res.status(401);
        throw new Error("Not Authorized, no token")
    }
    // const user=await User.
})