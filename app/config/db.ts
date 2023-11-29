import mongoose from "mongoose";

// const DB_URI = 'mongodb://127.0.0.1:27017/onlineshop';
const DB_URI = 'mongodb+srv://richarddivino128:H4q8iHxrII7lQHqS@cluster0.ik0nl25.mongodb.net/?retryWrites=true&w=majority'

export async function dbConnect() {
    await mongoose.connect(DB_URI);
}
