import {z} from 'zod'

export const userHabit = z.object({
    title:z.string().min(8).max(15),
    description:z.string().max(100),
    isActive:z.boolean()
})