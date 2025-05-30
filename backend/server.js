import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import proposalRoutes from './routes/proposalRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import techProposalsRoutes from './routes/techProposalsRoutes.js';
import teachersRoute from './routes/teachersRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
  ? ['https://skillonxcrm.netlify.app', 'https://www.skillonxcrm.netlify.app'] 
  : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

// File upload serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes) //protected routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/tech/resources', resourceRoutes);
app.use('/api/tech-proposals', techProposalsRoutes);
app.use('/api/teachers', teachersRoute);
app.use('/api/invoice', invoiceRoutes)


// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
