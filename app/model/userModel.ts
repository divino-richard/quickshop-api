import mongoose, { SchemaType, mongo } from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        require: true,
        type: String,
    },
    lastname: {
        require: true,
        type: String,
    },
    phoneNumber: {
        require: true,
        type: Number,
    },
    address: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String,
    },
    password: {
        require: true,
        type: String
    },
    role: {
        require: true,
        type: String,
    },
}, {timestamps: true});

export const UserModel = mongoose.model('Users', userSchema);
