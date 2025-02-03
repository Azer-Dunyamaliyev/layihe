import express, { urlencoded } from 'express'
import { configDotenv } from "dotenv";
import cors from 'cors'
import connectDB from './config/connection.js';
import userRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser';

configDotenv()
const app = express()


app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors('*'))

app.use('/users',userRoutes)
connectDB()
const PORT = 5500

app.listen(PORT,() => {
    try {
        
        console.log(`Server ${PORT} portunda çalışır...`);
    } catch (error) {
        console.log(`Server ${PORT} portunda çalışır...`);
    }
})