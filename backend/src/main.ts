import express, {json, urlencoded} from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from "../config/db.js";
import productRouter from "../routes/productRoutes.js";
import {errorHandler, notFound} from "../middleware/errorMiddleware.js";
import userRoutes from "../routes/userRoutes.js";
import cookieParser from "cookie-parser";
import orderRoutes from "../routes/orderRoutes.js";
import uploadRoutes from "../routes/uploadRoutes.js";
import path from "path";

dotenv.config();

connectDB();

const PORT = process.env.PORT;

const app = express();

const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Access-Control-Allow-Methods'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: true,
    preflightContinue: false,
};

app.use(cors(options));

//Body parser middleware
app.use(json());
app.use(express.urlencoded({extended: true}));

//cookie-parser middleware
app.use(cookieParser());

app.use('/api/products',productRouter);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);

app.get('/api/config/paypal', (req, res) => {
    res.send({
        clientId: process.env.PAYPAL_CLIENT_ID
    })
});

const __dirname = path.resolve();
console.log(__dirname);
app.use('/uploads', express.static( path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}else{
    app.get('/', (req, res)=>{
        res.send('API is running...');
    })
}

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))