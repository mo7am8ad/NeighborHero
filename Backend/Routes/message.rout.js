import express from 'express';
import {verifyToken} from '../middleware/jwt.js'
import {
  createMessage,
  getMessages,
}from '../controllers/message.controller.js';

const router = express.Router();


//we can create endpoints in this way and use them so create users change dellete etc ;
//instead of writing the whole func here we imported it from the user conytrooler
//i sent the login and logout and join to auth.route.js for autherication 
router.post("/",verifyToken, createMessage);
router.get("/:id",verifyToken, getMessages);

export default router;