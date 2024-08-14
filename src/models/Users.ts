import mongoose,{ Schema, Document } from 'mongoose';

// Define an interface for the User document
interface IUser extends Document {
    userName:string;
    name: string;
    email: string;
    password: string;
}

// Define the User schema
const userSchema :Schema<IUser>= new Schema({
    userName:{
        type:String,
        required:[true,'user name is Required and unique'],
        trim:true,
        unique:true,
    },
    name: {
        type: String,
        required: [true,'name is Required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true,'Email is Required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'invalid Email']  // Regex to validate email format
    },
    password: {
        type: String,
        required: [true,'password is Required'],
        match:[/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,'invalid password'],  // Regex to enforce password rules: min 8 chars, at least one letter and one number
    },
}, {
    timestamps: true,
});

// Create the User model
const User = mongoose.models.User as mongoose.Model<IUser> || mongoose.model<IUser>('User', userSchema);

export default User;
