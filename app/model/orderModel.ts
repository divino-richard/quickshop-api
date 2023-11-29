import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Users'
    },
    customer: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'Users'
    },
    orderItems: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Products',
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
        },
        subTotalAmount: {
            type: Number,
            require: true,
        },
    }],
    orderStatus: {
        type: String,
        enum: ['pending', 'shipped', 'delivered'],
        default: 'pending',
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        enum: ['cod', 'paypal', 'gcash', 'visa'],
        require: true,
    },
    totalAmount: {
        type: Number,
        require: true,
    },
    shippingFee: {
        type: Number,
        require: true,
    },
}, {timestamps: true});

export const OrderModel = mongoose.model('Orders', orderSchema);
