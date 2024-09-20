import Habit from "@/models/Habits";
import {NextRequest,NextResponse} from 'next/server'
import { dbConnect } from "@/lib/dbConnect";

export const POST = async(request:NextRequest)=>{
    dbConnect()

    const {title,description,frequency} = await request.json()
   
    try {
        const existingHabitByTitle = await Habit.findOne({title})

        if(existingHabitByTitle && existingHabitByTitle.isActive == true){
            return NextResponse.json({
                "success":false,
                "status": 409,
                "message": "Habbit with this title already exist. Create New One"
              })
        }
        else if(existingHabitByTitle && existingHabitByTitle.isActive == false)
        {
            return NextResponse.json({
                "success":false,
                "status": 409,
                "message": "Habit already exists but is currently deactivated. Please reactivate the habit or create a new one."
              })

        }
        else {
            

            const newHabit = new Habit({
                // userId:,
                title:title,
                description:description,
                frequency:frequency,


            })

            await newHabit.save()
        }
       
        return NextResponse.json({success:true,message:'Habit Created Successfully.',status:200})



        
    } catch (error:any) {
        console.log("habbit creation rocess failed, Try again",error.message)
        return NextResponse.json({success:false,message:'Habbit Creation Failed',status:500})
        
    }

}