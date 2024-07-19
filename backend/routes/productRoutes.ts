import express from "express";
import {
    createProduct, createProductReview,
    deleteProduct,
    getProducts,
    getProductsById, getTopProducts,
    updateProducts
} from "../controller/product.contoller.js";
import {admin, protect} from "../middleware/authMiddleware.js";



const router = express.Router();

router.post('/',protect, admin,createProduct);
router.get('/top',getTopProducts);
router.get('/',getProducts);
router.route('/:id').get(getProductsById).put(protect,admin,updateProducts).delete(protect,admin,deleteProduct);
router.route('/:id/reviews').post(protect,createProductReview);


export default router;