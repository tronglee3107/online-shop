import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'
import { connectDB } from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import addressRouter from './routes/addressRoutes.js';
import orderRouter from './routes/orderRoutes.js';
dotenv.config();
const app = express();
const port = process.env.PORT || "3001"
const allowedOrigins = ['http://localhost:5173', process.env.CLIENT_URL]

await connectDB();
await connectCloudinary();
//temporary middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));


app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/product", productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.get('/', (req, res) =>  res.send("API is working!!!"));

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})