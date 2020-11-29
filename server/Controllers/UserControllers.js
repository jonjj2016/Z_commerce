import asyncHandler from 'express-async-handler';
import User from '../Models/userModel.js';
import bycript from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js'


const respondUser = (res, user) => {
    return res.status(201).json({
        status: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    })
}

//  @desc Auth user & get user token
//  @route POST/api/users/login
//  @access Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        return respondUser(res, user);
        // return res.status(201).json({
        //     status: true,
        //     _id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     isAdmin: user.isAdmin,
        //     token: generateToken(user._id)
        // });

    } else {
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
});

//  @desc  get user profile for authentication
//  @route GET/api/users/profile
//  @access Private

const getUser = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.json({
            status: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })

    } else {
        res.status(404);
        throw new Error('User Not Found')
    }
});

//  @desc  register New User
//  @route POST/api/users/
//  @access Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;


    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400)
        throw new Error("User already exists")

    }
    const user = await User.create({ name, email, password });
    if (user) {
        return respondUser(res, user)
            // res.status(201).json({
            //     status: true,
            //     _id: user._id,
            //     name: user.name,
            //     email: user.email,
            //     isAdmin: user.isAdmin,
            //     token: generateToken(user._id)

        // })
    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }


})
export {
    authUser,
    getUser,
    registerUser
}