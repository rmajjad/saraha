import userModel from "../../../DB/model/User.model.js";
import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';
import SendEmail from "../../utils/sendEmail.js"; 


export const signUp = async(req,res)=>{

    const {userName,email,password} = req.body;
    
    const user = await userModel.findOne({email});
    //return res.json(user);
    if(user){
        return res.status(409).json("email is already exists");
    }
    const hashPassword = await bcrypt.hash(password,parseInt(process.env.SALTROUND));   
    const createUser = await userModel.create({userName,email,password:hashPassword});
    
    
    
    if(!createUser){
        return res.json("error while creating user");
    }
    const token = jwt.sign({email},process.env.CONFIRMEMAILTOKEN,{expiresIn:60});
    const refreshToken = jwt.sign({email},process.env.CONFIRMEMAILTOKEN,{expiresIn:60*60*24});
    const html = `
    <h1>Hello I'm Rama</h1>
    <h2>welcome to our site ❤️</h2>
    <p>hello ${userName}</p>
    <div>
        <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}">confirm your email please!</a><br/>
        <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${refreshToken}">resend confirm email</a>

    </div>
    
    `
    await SendEmail(email,"welcome",html);

    return res.status(201).json({message:"success",createUser});
}


export const signIn = async(req,res)=>{
    const {email,password} = req.body;
    
    const user = await userModel.findOne({email}).select('userName password confirmEmail');
    if(!user){
        return res.json("invalid data");
    }
    if(!user.confirmEmail){
        return res.json("plz confirm your email");
    }
    const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.json("invalid data");
        }
        const token = jwt.sign({id:user._id}, process.env.LOGINSIG);
        return res.json({message:"success",token,user});
};

export const confirmEmail = async(req,res)=>{
    const {token} = req.params;
    const decoded = jwt.verify(token, process.env.CONFIRMEMAILTOKEN);
    const user = await userModel.updateOne({email:decoded.email},{confirmEmail:true});
    if(user.modifiedCount > 0){
        return res.redirect(process.env.FRONTENDURL);
    }
    return res.json({message:"success",user});
}