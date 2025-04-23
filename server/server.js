import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'
import { connectDB } from './configs/db.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || "3001"
const allowedOrigins = ['http://localhost:5173']

await connectDB();
//temporary middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));


app.use("/api/user", userRouter);
app.get('/', (req, res) =>  res.send("API is working!!!"));

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`)
})