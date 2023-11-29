import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    title: {
        require: true,
        type: String,
    },
    description: {
        require: true,
        type: String,
    },
    price: {
        require: true,
        type: Number,
    },
    quantityInStock: {
        require: true,
        type: Number,
    },
    images: [{
        required: true,
        type: String,
    }]
}, {timestamps: true});

export const ProductModel = mongoose.model('Products', productSchema);
