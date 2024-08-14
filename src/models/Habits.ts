import mongoose,{Schema,Document,Types} from "mongoose";



// Define an interface for the Habit document
interface IHabit extends Document {
    userId: Types.ObjectId; // Reference to User schema
    title: string;
    description?: string;
    frequency: string[];
    startDate: Date;
    completedDates: Date[];
    isActive: boolean;
}

// Define the Habit schema
const habitSchema:Schema<IHabit> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Link to User schema
        required: true,
    },
    title: {
        type: String,
        required: [true,'Title is required'],
        trim: true,
        unique:true
    },
    description: {
        type: String,
        trim: true,
    },
    frequency: {
        type: [String], // Array of days or other intervals like ['Monday', 'Wednesday', 'Friday']
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    completedDates: {
        type: [Date], // Array of dates when the habit was completed
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

// Create the Habit model
const Habit = mongoose.models.Habit as mongoose.Model<IHabit> || mongoose.model<IHabit>('Habit', habitSchema);

export default Habit;
