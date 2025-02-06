import express, { urlencoded } from 'express';
import { configDotenv } from "dotenv";
import cors from 'cors';
import connectDB from './config/connection.js';
import userRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';

configDotenv();
const app = express();

// Middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// CORS
const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization'],
  credentials: true, 
};

app.use(cors(corsOptions));

// Route
app.use('/users', userRoutes);

// DB Bağlantısı
connectDB().then(() => {
  console.log('DB quruldu');
}).catch((err) => {
  console.error('Veritabanına bağlanırken hata oluştu:', err);
});

// SERVER
const PORT = 5500;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalişir...`);
});
