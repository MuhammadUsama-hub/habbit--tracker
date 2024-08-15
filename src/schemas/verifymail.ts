import {z} from 'zod'

export const userSignupVerify = z.object({
    verifyCode:z.string().length(6,{message:'enter correct 6 digit code'}),
    verifyCodeExpiry:z.date()
})