
import mongoose from "mongoose";

export const playerSchema = new mongoose.Schema (
    {
        first_name: {
            type: String
        },
        last_name: {
            type: String
        },
        age: {
            type: Number,
            required: false
        }
    }
)
export const playerModel = mongoose.model("players", playerSchema);


