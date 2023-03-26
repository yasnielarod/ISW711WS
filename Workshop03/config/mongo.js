import mongoose from "mongoose";

export const dbConnect = () => {
    const DB_URI = "mongodb://127.0.0.1:27017/fifapi";
    mongoose.set("strictQuery", false);
    mongoose.connect(DB_URI, () => {
        console.log("Connected to MongoDB");
});
}

 