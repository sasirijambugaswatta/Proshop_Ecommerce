import * as mongoose from "mongoose";

// Define types for nested objects
interface IOrderItems {
    name: string;
    qty: number;
    image: string;
    price: number;
    product: mongoose.Schema.Types.ObjectId;
}

interface IShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

interface IPaymentResult {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
}

// Define the main order schema
interface IOrder extends Document {
    user: mongoose.Schema.Types.ObjectId;
    orderItems: IOrderItems[];
    shippingAddress: IShippingAddress;
    paymentMethod: string;
    paymentResult: IPaymentResult;
    itemPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
}

const orderSchema = new mongoose.Schema<IOrder>({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems:[
        {
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Product"
            },
        }
    ],
    shippingAddress: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
    },
    paymentMethod:{
        type: String,
        required: true
    },
    paymentResult:{
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    itemPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice:{
        type: Number,
        required: true,
        default: 0.0
    },

    totalPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid:{
        type:Boolean,
        required: true,
        default: false
    },
    paidAt: Date, // Date when order is paid
    isDelivered:{
        type:Boolean,
        required: true,
        default: false
    },
    deliveredAt: Date, // Date when order is delivered
},{
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;