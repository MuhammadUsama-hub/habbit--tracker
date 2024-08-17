import nodemailer from 'nodemailer';
import VerifyEmail from '@/components/VerifyEmail';
import {ApiResponse} from '@/types/ApiResponse'

interface EmailProp{
  email:string,
  username:string,
  verifycode:string,
}
export const sendMail = async({
  email,
  username,
  verifycode,
}:EmailProp):Promise<ApiResponse>=>{
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.GMAIL_USER, // Your Gmail address
          pass: process.env.GMAIL_PASS, // Your Gmail password or App Password
      },
    });
    const options = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Habbit Tracker | Verify User',
      React: VerifyEmail({username,verifycode}),
    };
    
    await transporter.sendMail(options);
    
    return {success:true,message:'verification code send ',status:200}
    
  } catch (error:any) {
    console.log('Error sending verification mail,try again',error.message)
    return {success:false,message:'verification mail sending failed',status:500}
  }
}




