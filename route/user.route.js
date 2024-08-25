import express from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../model/user.model.js";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

userRouter.post("/register", async(req,res)=>{
       const {name,email,password,gender,age}= req.body;
       try {
           bcrypt.hash(password,5,async(err, hash)=>{
               if(err){
                return res.status(500).json({message:"Internal Server Error"});
               }
               const user =  new UserModel({
                name,
                email,
                password:hash,
                gender,
                age
               });
               await user.save();
               res.status(201).json({message:"User registered successfully"})
           })
       } catch (error) {
          res.status(500).json({message:"Internal Server Error",error})
       }
})

userRouter.post("/login", async(req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await UserModel.findOne({email})
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    if(user){
        bcrypt.compare(password, user.password, (err,result)=>{
            if(err){
                return res.status(500).json({message:"Internal Server Error",error})
            }
            if(result){
                 const token = jwt.sign({id:user._id},process.env.SECRET_KEY)
                 return res.status(200).json({message : "user login successfully",token});

            }else{
                return res.status(401).json({message :"Invalid Password"});
            }
        })
    }
  } catch (error) {
    res.status(500).json({message:`Error while logging in user ${error}`}); 
  }
})

export default userRouter;
