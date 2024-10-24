import express from 'express';
import {verifyToken} from '../middleware/jwt.js';
import{
    createConversation,
    getConversations,
    getSingleConversation,
    updateConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();

//we can create endpoints in this way and use them so create users change dellete etc ;
//instead of writing the whole func here we imported it from the user conytrooler
//i sent the login and logout and join to auth.route.js for autherication 
router.get("/", verifyToken, getConversations);
router.post("/", verifyToken, createConversation);
router.get("/single/:id", verifyToken, getSingleConversation);
router.put("/:id", verifyToken, updateConversation);

export default router;