import MessageModel from "../../../DB/model/Message.model.js";
import userModel from "../../../DB/model/User.model.js";

export const getMessages = async(req,res) =>{
    
    const messagesList = await MessageModel.find({receiverId:req.user._id}).select('content createdAt');
    
    return res.json({message:"success",messagesList});
}

export const sendMessage = async(req,res) =>{
    const {receiverId} = req.params;
    const {message} = req.body;

    const user = await userModel.findById(receiverId);
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    const createMessage = await MessageModel.create({content:message, receiverId});
    return res.status(201).json({message:"success", createMessage});
}