import express from 'express';
import {verifyToken} from "../middleware/jwt.js";
import {
    createService,
    deleteService,
    getService,
    getServices
}from "../controllers/service.controller.js";


const router = express.Router();

router.post("/",verifyToken,createService);
router.delete("/:id",verifyToken,deleteService);
router.get("/single/:id",getService);
router.get("/",getServices);
//we can create endpoints in this way and use them so create users change dellete etc ;
//instead of writing the whole func here we imported it from the user conytrooler
//i sent the login and logout and join to auth.route.js for autherication 
export default router;