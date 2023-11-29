import mongoose from "mongoose"

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
    },
    quantity: Number,
}, {timestamps: true});

export const CartModel = mongoose.model('Carts', cartSchema);
