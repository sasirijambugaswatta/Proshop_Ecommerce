import express, {json, urlencoded} from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from "../config/db.js";
import productRouter from "../routes/productRoutes.js";
import {errorHandler, notFound} from "../middleware/errorMiddleware.js";
import userRoutes from "../routes/userRoutes.js";
import cookieParser from "cookie-parser";
import orderRoutes from "../routes/orderRoutes.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT;

const app = express();

app.use(cors());

//Body parser middleware
app.use(json());
app.use(express.urlencoded({extended: true}));

//cookie-parser middleware
app.use(cookieParser());

app.get('/',(req, res) => {
    res.send('API is running')
});

app.use('/api/products',productRouter);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))