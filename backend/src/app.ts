import express from "express";
import { config } from "dotenv";
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from "cookie-parser";
import cors from 'cors';

config();
const app = express();

//middleware
app.use(cors({ origin: "https://openai-chatbot-j6t5.onrender.com", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove in production
app.use(morgan("dev"));

app.use("/api/v1", appRouter); //domain/api/v1

import path from 'path';

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handles any requests that don’t match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

export default app;