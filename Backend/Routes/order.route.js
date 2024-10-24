import express from 'express';
import {verifyToken} from "../middleware/jwt.js";
import {getOrders/*,createOrder*/,intent,confirm} from "../controllers/order.controller.js";


const router = express.Router();

//we can create endpoints in this way and use them so create users change dellete etc ;
//instead of writing the whole func here we imported it from the user conytrooler
//i sent the login and logout and join to auth.route.js for autherication 

//router.post("/:serviceId", verifyToken, createOrder)
router.get("/", verifyToken, getOrders)
router.post("/create-payment-intent/:id" , verifyToken, intent)
router.put("/" , verifyToken, confirm)

export default router;