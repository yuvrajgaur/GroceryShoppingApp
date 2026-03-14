import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './Routes/userRoute.js';
import sellerRoute from './Routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './Routes/productRoute.js';
import cartRouter from './Routes/cartRoute.js';
import addressRouter from './Routes/addressRoute.js';
import orderRouter from './Routes/orderRoute.js';
import { stripeWebhooks } from './Controllers/orderController.js';

const app=express();
const port=process.env.PORT || 3000;

await connectDB();
await connectCloudinary();


//Allow multiple origins
const allowedOrigins=['http://localhost:5173', 'https://shopgogrocery.vercel.app']   //frontend dev server

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

//middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins, 
    credentials:true
}))

app.get('/', (req,res) => res.send("API is working"));
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRoute)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)


app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})
