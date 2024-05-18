import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from "../config/db.js";
import productRouter from "../routes/productRoutes.js";
import {errorHandler, notFound} from "../middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT;

const app = express();

app.use(cors())

app.get('/',(req, res) => {
    res.send('API is running')
});

app.use('/api/products',productRouter)


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))