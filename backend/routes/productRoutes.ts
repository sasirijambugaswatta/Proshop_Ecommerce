import express from "express";
import {
    createProduct,
    deleteProduct,
    getProducts,
    getProductsById,
    updateProducts
} from "../controller/product.contoller.js";
import {admin, protect} from "../middleware/authMiddleware.js";



const router = express.Router();

router.get('/',getProducts);
router.route('/:id').get(getProductsById).put(protect,admin,updateProducts).delete(protect,admin,deleteProduct);
router.post('/',protect, admin,createProduct);


export default router;