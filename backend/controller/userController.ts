import {Request,Response} from "express";
import asyncHandler from "../middleware/asynchandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

//desc Auth user & get token
//route POST/api/users/login
//access public
const authUser = asyncHandler(async (req:Request, res:Response) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id);

        res.status(200).json({
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
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        generateToken(res,user._id);

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//desc Logout user/clear cookie
//route POST/api/users/logout
//access private
const logoutUser = asyncHandler(async (req:Request, res:Response) => {
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'strict',
    });
    res.status(200).json({message:'Logged out successfully!'});
});

//desc Get user profile
//route GET/api/users/profile
//access private
const getUserProfile = asyncHandler(async (req:Request, res:Response) => {
    // @ts-ignore
    const user = await User.findById(req.user?._id);
    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

//desc Update user profile
//route PUT/api/users/profile
//access private
const updateUserProfile = asyncHandler(async (req:Request, res:Response) => {
    // @ts-ignore
    const user = await User.findById(req.user?._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        });
    }else {
        res.status(404);
        throw new Error('User not found');
    }
});

//desc Get users
//route GET/api/users
//access private/admin
const getUsers = asyncHandler(async (req:Request, res:Response) => {
    const users = await User.find({});
    if(users){
        res.json(users).status(200);
    }else {
        res.status(404);
        throw new Error('Users not found');
    }
});

//desc Get users by ID
//route GET/api/users/:id
//access private/admin
const getUsersById = asyncHandler(async (req:Request, res:Response) => {
    const user = await User.findById(req.params.id).select('-password');
    if(user){
        res.json(user).status(200);
    }else {
        res.status(404);
        throw new Error('User not found');
    }
});

//desc delete user
//route DELETE/api/users/:id
//access private/admin
const deleteUser = asyncHandler(async (req:Request, res:Response) => {
    const user = await User.findById(req.params.id);
    if(user){
        if(user.isAdmin){
            res.status(400);
            throw new Error('Cannot delete admin');
        }
        await User.deleteOne({_id: user._id});
        res.json({message:'User removed'}).status(200);
    }else {
        res.status(404);
        throw new Error('User not found');
    }
});

//desc update user
//route PUT/api/users/:id
//access private/admin
const updateUser = asyncHandler(async (req:Request, res:Response) => {
    const user = await User.findById(req.params.id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);
        const updatedUser = await user.save();
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        });
    }else {
        res.status(404);
        throw new Error('User not found');
    }
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
