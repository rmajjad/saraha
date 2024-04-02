import { connectDB } from '../../DB/connection.js';
import authRouter from './Auth/auth.router.js';
import messageRouter from './Message/message.router.js';
import userRouter from './User/user.router.js';


export const initApp = (app,express)=>{
    app.use(express.json());
    connectDB();
    app.use('/auth',authRouter);
    app.use('/messages',messageRouter);
    app.use('/user',userRouter); 

}

