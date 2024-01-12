import express from "express";
import userRoutes from './routes/userRoutes.js'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import cors from 'cors';
dotenv.config()
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connetDB from './config/database.js'

connetDB();

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(cors())

app.get("/", (req, res) => {
    res.send('prashant is live')
});

app.use('/api/users', userRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));

