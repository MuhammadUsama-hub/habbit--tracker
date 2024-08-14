import { z } from "zod";

export const loginSchema = z.object({
  userName: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9_]{3,8}$/, { message: "incorrect username format" }),
  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      { message: "incorrect password format " }
    ),
});
