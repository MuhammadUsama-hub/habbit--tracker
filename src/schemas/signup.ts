import { z } from "zod";

export const signupSchema = z.object({
    userName: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9_]{3,8}$/, { message: "incorrect username format" }),
      email:z.string().email({message:'invalid email '})
      ,
      name:z.string().regex(/^[a-zA-Z0-9_]{3,20}$/,{message:'incorrect name format'}),
    password: z
      .string()
      .trim()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: "incorrect password format " }
      ),
  });