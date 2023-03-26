import mongoose from "mongoose";

export const teamSchema = new mongoose.Schema (
    {
        name: {
            type: String
        },
        description: {
            type: String
        }
    }
)
export const teamModel = mongoose.model("teams", teamSchema);


