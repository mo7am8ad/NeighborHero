import User from '../SchemaModules/user.model.js';
import bcrypt from 'bcrypt';//to incrept the password and hash it 
import createError from '../utils/createError.js';
import jwt from 'jsonwebtoken';


export const SignUp = async (req,res,next)=>{  //async cause we gonna make opperation using database
    try{
        const hash = bcrypt.hashSync(req.body.password,5)
        const newUser = new User({
            ...req.body,//spread operator will take the password hashed and pass the rest 
            password: hash,
        }); 
        await newUser.save();//to save the new user to mongoose database 
            res.status(201).send("user has been created");
        } catch (err){
            next(err)
        };
};//this function will be imported in the auth.rout , we placed it here for autheraction


export const login = async (req,res,next)=>{
    try{
        const user = await User.findOne({email:req.body.email});

        if(!user) return next(createError(404,"User not found!"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) 
            return next(createError(400,"wrong password or username!"));
        
        const token = jwt.sign({
            id:user._id,
            isSeller:user.isSeller,
        },
        process.env.JWT_KEY
        );

        const {password,...info} = user._doc//we seperate the password from the user so when we return user we only returns user without user 
        res.cookie("accessToken",token,{
            httpOnly: true,
        })
        .status(200)
        .send(info);
    }catch (err){
        next(err);//imported from create err
    }
};


export const logout = (req,res)=>{
    res
    .clearCookie("accessToken",{
        sameSite: "none",//frontend on port and backend on another port so they note the samesite
        secure: true,
    }).status(200).send("User has been logged out.")
};