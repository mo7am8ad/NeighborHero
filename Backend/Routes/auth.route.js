import express from 'express';
import {SignUp,login,logout} from '../controllers/auth.controller.js'

const router = express.Router();

router.post("/SignUp",SignUp)
router.post("/login", login)        //we can create endpoints in this way and use them so create users change dellete etc ;                        //instead of writing the whole func here we imported it from the user conytrooler
router.post("/logout", logout)

export default router;