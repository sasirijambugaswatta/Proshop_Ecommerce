import {Request, Response, NextFunction} from 'express';
import mongoose from "mongoose";

const notFound = (req:Request,res:Response,next:NextFunction) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err:Error, req:Request, res:Response, next:NextFunction) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;


    if (err.name === "CastError") {
        const castError = err as mongoose.CastError; // Type assertion
        if (castError.kind === "ObjectId") {
            statusCode = 404;
            message = "Resource not found";
        }
    }

    res.status(statusCode);
    res.json({
        message,
        stack: err.stack
    });
};

export {notFound, errorHandler};