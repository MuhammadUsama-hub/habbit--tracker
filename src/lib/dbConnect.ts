
import mongoose from "mongoose";
interface ConnectionObject{
    isConnected?:number
}

const connection : ConnectionObject = {}

export const  dbConnect = async():Promise<void>=>{
    if(connection.isConnected){
        console.log('Db Already connected.')
        return 
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || '')
        connection.isConnected = db.connections[0].readyState
        console.log('db connected successfully')
        
        
    } catch (error:any) {
        console.log('db connection failed',error.message)
        process.exit(1)
        
    }


}