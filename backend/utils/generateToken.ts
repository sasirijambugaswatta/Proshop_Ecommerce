import jwt from "jsonwebtoken";
import {Response} from "express";

const generateToken = (res:Response, userId:string) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET!, {expiresIn: '30d'});
    console.log(token);

    //Set JWT as HTTP-only cookie
    res.cookie('jwt', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000
    });
}


export default generateToken;