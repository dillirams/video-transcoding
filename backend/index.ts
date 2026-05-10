import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { appRouter } from './src/router/route';
const app=express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
app.use(cookieParser());
app.use('/v1/api',appRouter)

app.listen(3000, ()=>{
    console.log("server is listeneing to port 3000");
})