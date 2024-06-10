import {NextFunction, Request, Response} from "express";

import asyncHandler from "./asynchandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

//protect routes
const protect = asyncHandler(async (req:Request, res:Response, next:NextFunction) => {
  let token;

  //read the jwt from cookie
    token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            // @ts-ignore
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        }catch (error) {
            console.log(error)
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }

});

//Admin middleware

const admin =  (req:Request, res:Response, next:NextFunction) => {
    // @ts-ignore
    if(req.user && req.user.isAdmin){
        next();
    }else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}

export {protect, admin};
