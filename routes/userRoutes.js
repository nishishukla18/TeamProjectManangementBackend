import express from 'express'
import { isAuthenticated, login, logout, register, resetUserPassword, sendResetOTP, sendVerifyOtp, verifyEmail } from '../controllers/auth-controller.js'
import userAuth from '../middlewares/userAuth.js';

const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout);
//authRouter.post('/send-verify-otp',userAuth,sendVerifyOtp);
authRouter.post('/send-verify-otp',sendVerifyOtp);
authRouter.post('/verify-account',verifyEmail); //removed middleware
authRouter.get('/is-auth',userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendResetOTP);
authRouter.post('/reset-password',resetUserPassword);

export default authRouter