import {Request,Response} from "express";
import asyncHandler from "../middleware/asynchandler.js";
import Product from "../models/product.model.js";

const getProducts = asyncHandler(async (req:Request, res:Response) => {
    const products = await Product.find({});
    res.json(products);
});

const getProductsById = asyncHandler(async (req:Request, res:Response) => {
    const product = await Product.findById(req.params.id);
    if(product){
        return res.json(product);
    }else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

export {getProducts, getProductsById};