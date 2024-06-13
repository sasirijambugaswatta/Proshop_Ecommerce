import {Request,Response} from "express";
import asyncHandler from "../middleware/asynchandler.js";
import Order from "../models/order.model.js";

//@desc get logged in user orders
//@route GET /api/orders/myorders
//@access private
const getMyOrders = asyncHandler(async (req:Request, res:Response) => {
    res.send('get my orders');
});

//@desc create new order
//@route POST /api/orders
//@access private
const addOrderItems = asyncHandler(async (req:Request, res:Response) => {
    res.send('add order items');
});

//@desc get order by id
//@route GET /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req:Request, res:Response) => {
    res.send('get order by id');
});

//@desc update order to paid
//@route PUT /api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req:Request, res:Response) => {
    res.send('update order to paid');
});

//@desc update order to delivered
//@route PUT /api/orders/:id/deliver
//@access private/admin
const updateOrderToDelivered = asyncHandler(async (req:Request, res:Response) => {
    res.send('update order to delivered');
});

//@desc get All orders
//@route GET /api/orders/
//@access private/admin
const getAllOrders = asyncHandler(async (req:Request, res:Response) => {
    res.send('get all orders');
});

export {getMyOrders,
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders};
