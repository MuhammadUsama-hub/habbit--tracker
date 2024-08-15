import { z } from "zod";

export const userRestVerify = z.object({
  verifyCode: z.string().length(6, { message: "enter correct 6 digit code" }),
  verifyCodeExpiry: z.date(),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: "enter correct pasword format" }
    ),
});
