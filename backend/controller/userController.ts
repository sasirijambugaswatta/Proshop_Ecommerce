import {Request,Response} from "express";
import asyncHandler from "../middleware/asynchandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

//desc Auth user & get token
//route POST/api/users/login
//access public
const authUser = asyncHandler(async (req:Request, res:Response) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET!, {expiresIn: '30d'});

        //Set JWT as HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }

});

//desc Register
//route POST/api/users
//access public
const registerUser = asyncHandler(async (req:Request, res:Response) => {
    res.send('Register user');
});

//desc Logout user/clear cookie
//route POST/api/users/logout
//access private
const logoutUser = asyncHandler(async (req:Request, res:Response) => {
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({message:'Logged out successfully!'});
});

//desc Get user profile
//route GET/api/users/profile
//access private
const getUserProfile = asyncHandler(async (req:Request, res:Response) => {
    res.send(' get user profile');
});

//desc Update user profile
//route PUT/api/users/profile
//access private
const updateUserProfile = asyncHandler(async (req:Request, res:Response) => {
    res.send(' update user profile');
});

//desc Get users
//route GET/api/users
//access private/admin
const getUsers = asyncHandler(async (req:Request, res:Response) => {
    res.send('get users');
});

//desc Get users by ID
//route GET/api/users/:id
//access private/admin
const getUsersById = asyncHandler(async (req:Request, res:Response) => {
    res.send('get users by ID');
});

//desc delete user
//route DELETE/api/users/:id
//access private/admin
const deleteUser = asyncHandler(async (req:Request, res:Response) => {
    res.send('delete user');
});

//desc update user
//route PUT/api/users/:id
//access private/admin
const updateUser = asyncHandler(async (req:Request, res:Response) => {
    res.send('update user');
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUsersById,
    deleteUser,
    updateUser
}
