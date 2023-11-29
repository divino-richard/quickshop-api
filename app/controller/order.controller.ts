import { Request, Response } from "express";
import { OrderModel } from "../model/orderModel";
import { Schema } from "mongoose";
import { ProductModel } from "../model/productModel";

interface OrderItems {
    product: Schema.Types.ObjectId;
    quantity: number;
    subTotalAmount?: number | undefined;
}

const order = {
    create: async (req: Request, res: Response) => {
        try {
            const customer = req.jwt_payload?._id;
            const { paymentMethod } = req.body;
            const orderItems = req.body.orderItems as OrderItems[];
            const shippingFee = 125;
            let totalAmount = 0;
            
            const productItem = await ProductModel.findById(orderItems[0].product);

            let orderItemsWithSubTotal: OrderItems[] = []; 
            await Promise.all(orderItems.map(async (item) => {
                const product = await ProductModel.findById(item.product);

                if(!product || !product.price) return;

                const subTotalAmount = (product.price) * item.quantity;
                item.subTotalAmount = subTotalAmount;
                orderItemsWithSubTotal.push(item);
            
                totalAmount += subTotalAmount;
            }));

            const placeOrderResult = await OrderModel.create({
                seller: productItem?.user,
                customer,
                orderItems: orderItemsWithSubTotal,
                paymentMethod,
                totalAmount: totalAmount + shippingFee,
                shippingFee,
            });

            return res.status(200).send({
                message: 'Order placed successfully',
                order: placeOrderResult,
            });
        } catch(error) {
            console.log(error);
            return res.status(500).send({
                error: {message: "Something went wrong. Please try again later"}
            })
        }
    },
    getAll: async(req: Request, res: Response) => {
        try {
            const userId = req.jwt_payload?._id;
            const userRole = req.jwt_payload?.role;
            const {_limit, _offset} = req.params;
            let orders: any[] = [];

            const limit = Number(_limit);
            const offset = Number(_offset);

            if (limit < 0 || offset < 0) {
                return res.status(400).send({
                    error: {
                        message: 'Invalid parameters'
                    }
                });
            }

            if(userRole === 'ADMIN' || userRole === 'SELLER') {
                orders = await OrderModel.find({
                        seller: userId
                    })
                    .populate('orderItems.product')
                    .limit(limit)
                    .skip(offset);

            } else if(userRole === 'CUSTOMER') {
                orders = await OrderModel.find({
                        customer: userId
                    })
                    .populate('orderItems.product')
                    .limit(limit)
                    .skip(offset);
            }
           
            res.status(200).send({
                orders,
            });

        } catch (error) {
            console.log(error);
            return res.status(500).send({error});
        }
    },
    getByStatus: async(req: Request, res: Response) => {
        try {
            const userId = req.jwt_payload?._id;
            const userRole = req.jwt_payload?.role;
            const {_limit, _offset} = req.params;
            const {orderStatus} = req.body;
            let orders: any[] = [];

            const limit = Number(_limit);
            const offset = Number(_offset);

            if (limit < 0 || offset < 0) {
                return res.status(400).send({
                    error: {
                        message: 'Invalid parameters'
                    }
                });
            }

            if(userRole === 'ADMIN' || userRole === 'SELLER') {
                orders = await OrderModel.find({
                        seller: userId,
                        orderStatus
                    })
                    .populate('orderItems.product')
                    .limit(limit)
                    .skip(offset);

            } else if(userRole === 'CUSTOMER') {
                orders = await OrderModel.find({
                        customer: userId,
                        orderStatus,
                    })
                    .populate('orderItems.product')
                    .limit(limit)
                    .skip(offset);
            }
           
            res.status(200).send({
                orders,
            });

        } catch (error) {
            console.log(error);
            return res.status(500).send({error});
        }
    },
    updateOrderStatus: async(req: Request, res: Response) => {
        try {
            const orderId = req.body.orderId;
            const newStatus = req.body.orderStatus;
            
            const foundOrder = await OrderModel.findById(orderId);
            if(!foundOrder) {
                return res.status(204).end();
            }

            const updateStatusResult = await OrderModel.updateOne({ orderStatus: newStatus })
                .where({_id: orderId});

            if(!updateStatusResult.acknowledged) {
                return res.status(200).send({
                    error: {
                        message: 'Failed to update order status',
                    }
                });
            }

            return res.status(200).send({
                message: "Order updated successfully",
                result: updateStatusResult,
            })
        } catch(error) {
            console.log(error);
            return res.status(500).send({error});
        }
    },
    updatePaymentStatus: async(req: Request, res: Response) => {
        try {
            const orderId = req.body.orderId;
            const newStatus = req.body.paymentStatus;
            
            const foundOrder = await OrderModel.findById(orderId);
            if(!foundOrder) {
                return res.status(204).end();
            }

            const updateStatusResult = await OrderModel.updateOne({ paymentStatus: newStatus })
                .where({_id: orderId});

            if(!updateStatusResult.acknowledged) {
                return res.status(200).send({
                    error: {
                        message: 'Failed to update order status',
                    }
                });
            }

            return res.status(200).send({
                message: "Payment status updated successfully",
                result: updateStatusResult,
            })
        } catch(error) {
            console.log(error);
            return res.status(500).send({error});
        }
    },
    cancelOrder: async (req: Request, res: Response) => {
        const orderId = req.body.orderId;
        try {
            const foundOrder = await OrderModel.findById(orderId);
            if(!foundOrder) {
                return res.status(204).end();
            }

            if(foundOrder.orderStatus !== 'pending') {
                return res.status(400).send({
                    error: {
                        message: 'Unable to cancel the order',
                    }
                })
            }

            const deleteResult = await OrderModel.deleteOne({_id: orderId});
            if(!deleteResult.acknowledged) {
                return res.status(400).send({
                    error: {
                        message: 'Failed to cancel your order'
                    }
                })
            }

            return res.status(200).send({
                message: 'Order cancelled successfully',
                result: deleteResult,
            })

        } catch(error) {
            console.log(error);
            return res.status(500).send({error});
        }
    }
} 

export default order;
