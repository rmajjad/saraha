import mongoose from 'mongoose';

export const connectDB = ()=>{
    mongoose.connect(process.env.DB)
    .then(()=>{
        console.log('connected');
    }).catch((error)=>{
        console.log(error);
    })
}