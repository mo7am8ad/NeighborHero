import jwt from 'jsonwebtoken';
import createError from "../utils/createError.js";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401,"you arent authenticated"))

    jwt.verify(token,process.env.JWT_KEY, async (err,playload)=>{
        if (err) return next(createError(401,"token isnt valid !"));
        req.userId = playload.id;
        req.isSeller = playload.isSeller;
        next()
    });
};
