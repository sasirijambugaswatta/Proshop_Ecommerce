import express from "express";
import {
    authUser, deleteUser,
    getUserProfile,
    getUsers, getUsersById,
    logoutUser,
    registerUser, updateUser,
    updateUserProfile
} from "../controller/userController.js";
import {admin, protect} from "../middleware/authMiddleware.js";



const router = express.Router();

router.route('/').post(registerUser).get(protect,admin,getUsers);

router.post('/logout',logoutUser);
router.post('/auth',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUsersById).put(protect,admin,updateUser);


export default router;