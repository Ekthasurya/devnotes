import express from "express";
import { NoteModel } from "../model/node.model.js";

const noteRouter = express.Router();

noteRouter.post("/create",async(req,res)=>{
    console.log(req.body, req.user)
    const {title,content,status} =req.body;
    const userId =req.user._id;
    try {
        const note = new NoteModel({
            title,
            content,
            status,
            userId
        });
        await note.save();
        res.status(201).json({message:"Note created successfully"})
    } catch (error) {
        res.status(500).json({message:`Error while creating note ${error}`});
    }
})

noteRouter.get("/", async(req, res)=>{
    const userId = req.user._id;
    try {
        const notes = await NoteModel.find({userId});
        res.status(200).json({notes});
    } catch (error) {
        res.status(500).json({message:`Error while fething notes ${error}`});
    }
})

noteRouter.patch("/update/:id",async(req,res)=>{
    const payload = req.body
    const noteId =req.params.id
    const userId = req.user._id
    console.log(payload,noteId,userId)
    try {
        if(note.userId.toString() == userId.toString()){
            await NoteModel.findByIdAndUpdate({_id:noteId},payload)
            return res.status(200).json({message: "note updated succesfully"})
        }else{
            return res.status(401).json({message:"Unauthorized"})
        }
    } catch (error) {
        res.status(500).json({message:`Error while updating note ${error}`});
    }
})

noteRouter.delete("/delete/:id",async(req,res)=>{
    const noteId =req.params.id
    const userId = req.user._id
    try {
        if(note.userId.toString() == userId.toString()){
            await NoteModel.findByIdAndDelete({_id:noteId},payload)
            return res.status(200).json({message: "note deleted succesfully"})
        }else{
            return res.status(401).json({message:"Unauthorized"})
        }
    } catch (error) {
        res.status(500).json({message:`Error while deleting note ${error}`});
    }
})



export default noteRouter;
