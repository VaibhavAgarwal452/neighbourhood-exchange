import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: String,
    condition: String,
    location: String,
    availability: { type: Boolean, default: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},
    {
        timestamps: true
    }
)

export const Item = mongoose.model('Item', itemSchema);
