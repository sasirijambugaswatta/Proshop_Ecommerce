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

//@desc create product
//@route POST /api/products/
//@access private/admin
const createProduct = asyncHandler(async (req:Request, res:Response) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        // @ts-ignore
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description'
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});


//@desc update product
//@route PUT /api/products/:id
//@access private/admin
const updateProducts = asyncHandler(async (req:Request, res:Response) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product!.save();
        res.status(201).json(updatedProduct);

    }else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export {getProducts, getProductsById, createProduct, updateProducts};