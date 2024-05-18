import {Request} from "express";

const asyncHandler = (fn:any) => (req:any,res:any,next:any) => {
    Promise.resolve(fn(req,res,next).catch(next));
}

export default asyncHandler;