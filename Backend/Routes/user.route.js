import express from 'express';
import {deleteUser,getUser} from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/jwt.js';

const router = express.Router();


//we can create endpoints in this way and use them so create users change dellete etc ;
//instead of writing the whole func here we imported it from the user conytrooler
//i sent the login and logout and join to auth.route.js for autherication 
router.delete("/:id",verifyToken,deleteUser);
router.get("/:id",getUser)
export default router;