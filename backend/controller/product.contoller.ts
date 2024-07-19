import {Request,Response} from "express";
import asyncHandler from "../middleware/asynchandler.js";
import Product from "../models/product.model.js";


const getProducts = asyncHandler(async (req:Request, res:Response) => {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
        ? {
            name: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        }
        : {};

    const count = await Product.countDocuments({...keyword});
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
    res.json({products, page, pages: Math.ceil(count / pageSize)});

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


//@desc delete product
//@route DELETE /api/products/:id
//@access private/admin
const deleteProduct = asyncHandler(async (req:Request, res:Response) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({message: 'Product removed'}).status(200);
    }else {
        res.status(404);
        throw new Error('Product not found');
    }
});

//@desc create review
//@route POST /api/products/:id/review
//@access private/admin
const createProductReview = asyncHandler(async (req:Request, res:Response) => {
    const {rating,comment} = req.body;
    const user = (req as any).user;


    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === user._id.toString());
        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product already reviewed');
        }


        const review = {
            name: user.name,
            rating: Number(rating),
            comment,
            user: user._id
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({message: 'Review added'});
    }else {
        res.status(404);
        throw new Error('Product not found');
    }
})

export {getProducts,
    getProductsById,
    createProduct,
    updateProducts,
    deleteProduct,
createProductReview};