import express from 'express';
import products from "../data/products.js";
import cors from 'cors';
import dotenv from 'dotenv'
import connectDB from "../config/db.js";
dotenv.config();

connectDB();

const PORT = process.env.PORT;

const app = express();

app.use(cors())

app.get('/',(req, res) => {
    res.send('API is running')
});

app.get('/api/products',(req, res)=> {
    res.json(products);
});

app.get('/api/products/:id',(req,res)=> {
    const product = products.find((p)=> p._id === req.params.id);
    res.json(product);
})


app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))