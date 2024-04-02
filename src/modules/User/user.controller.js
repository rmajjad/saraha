import userModel from "../../../DB/model/User.model.js";

export const profile = async (req,res)=>{
    const user = await userModel.findById(req.user._id);
    
    return res.json({message:"success",user});
    
}