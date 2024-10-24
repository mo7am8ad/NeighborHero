import express from 'express';
import mongoose from 'mongoose';
import userRout from './Routes/user.route.js';
import serviceRout from './Routes/service.route.js';
import orderRout from './Routes/order.route.js';
import messageRout from './Routes/message.rout.js';
import conversationRout from './Routes/conversation.rout.js';
import authRoute from './Routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = 8800;

const connect = async()=>{
try {
    await mongoose.connect(process.env.MONGO);//so we can hide the password in the connection link for more security when sharing the code 
    console.log("connected to MongoDB");    
  } catch (error) {
    console.log(error);
  }
};

//middlewares
app.use(cors({origin:"http://localhost:3000",credentials:true}));//for using on multiple ports and to send cookies from client to server
app.use(cookieParser());
app.use(express.json());//to allow user input;
app.use("/Api/auth",authRoute)
app.use("/Api/users",userRout)//if this enpoint then rout to user rout
app.use("/Api/service",serviceRout)
app.use("/Api/orders",orderRout)
app.use("/Api/conversations",conversationRout)
app.use("/Api/messages",messageRout)

app.use((err,req,res,next)=>{ //express error handling 
    const errorStatus = err.status|| 500
    const errorMessage = err.message|| "something went wrong";

    return res.status(errorStatus).send(errorMessage);
});

app.listen(port,()=>{
    connect();
    console.log("Backend Server Is Runing");
});
