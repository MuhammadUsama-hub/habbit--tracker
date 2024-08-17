import User from "@/models/Users";
import { sendMail } from "@/helpers/mailer";
import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  await dbConnect();

  try {
    const { userName, name, email, password } = await request.json();
    const existingUserByUserName = await User.findOne({
      userName,
      isVerified: true,
    });
    const existinguserByEmail = await User.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByUserName) {
      return NextResponse.json({
        success: false,
        message: "user name already taken. Please choose a different username.",
        status: 409,
      });
    } else if (existinguserByEmail) {
      if (existinguserByEmail.isVerified) {
        return NextResponse.json({
          success: false,
          message: "Email already Exist. Please try with a different email.",
          status: 409,
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const codeExpiry = new Date();
        codeExpiry.setHours(codeExpiry.getHours() + 1);
        existinguserByEmail.verifyCode = verifyCode;
        existinguserByEmail.verifyCodeExpiry = codeExpiry;
        existinguserByEmail.password = hashedPassword;
        await existinguserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const codeExpiry = new Date();
      codeExpiry.setHours(codeExpiry.getHours() + 1); // set otp expiry to 1 hr expiry
      const newUser = new User({
        userName,
        name,
        email,
        password: hashedPassword,
        verifyCode: verifyCode,
        verifyCodeExpiry: codeExpiry,
        isVerified: false,
      });
      await newUser.save();
    }
    // send Email
    const mailResponse = await sendMail({
      email,
      username: userName,
      verifycode: verifyCode,
    });
    if (!mailResponse.success) {
      return Response.json(mailResponse);
    }

    return NextResponse.json({
      success: true,
      message: "user register successfully",
      status: 200,
    });
  } catch (error: any) {
    console.log("Registration process failed,Try again", error.message);
    return NextResponse.json({
      success: false,
      message: "registration process failed",
      status: 500,
    });
  }
};
