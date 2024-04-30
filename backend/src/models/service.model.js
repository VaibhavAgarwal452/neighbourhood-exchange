import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: String,
    location: String,
    availabilitySchedule: String,
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Add more fields as needed
},
    {
        timestamps: true
    });

export const Service = mongoose.model("Service", serviceSchema)