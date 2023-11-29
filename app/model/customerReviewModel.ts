
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const customerReviewSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Users'
    },
    product: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Products',
    },
    starRate: {
        type: Number,
        require: true
    },
    message: {
        type: String,
        require: false
    },
}, {timestamps: true});

export const CustomerReviewModel = mongoose.model('Reviews', customerReviewSchema);
