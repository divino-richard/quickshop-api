import { Request, Response } from "express";
import { CartModel } from "../model/cartModel";

const cart = {
    create: async (req: Request, res: Response) => {
        try {
            const cartData = req.body
            const userId = req.jwt_payload?._id;
            
            const createdCart = await CartModel.create({...cartData, user: userId});

            return res.status(200).send({
                message: 'Cart created successfully',
                createdCart
            });

        } catch(error) {
            console.log(error);
            return res.status(500).send({
                error: {message: "Failed to add cart"}
            })
        }
    },
    getAllByUserId: async (req: Request, res: Response) => {
        try {
            const userId = req.jwt_payload?._id;
            const cartList = await CartModel.find({user: userId}).populate({
                path: 'product',
                select: 'title description price quantityInStock images'
            });
            const totalCart = await CartModel.countDocuments();
            return res.status(200).send({ cartList, totalCart });
        } catch(error) {
            console.log(error);
            return res.status(500).send({
                error: {message: "Failed to get cart list"}
            });
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const {quantity} = req.body;

            const foundCart = await CartModel.findById(id);
            if(!foundCart) {
                return res.status(204).end();
            }

            const updateCartResult = await CartModel.updateOne({_id: id}, {quantity});
            if(!updateCartResult.acknowledged) {
                return res.status(500).send({
                    error: {
                        message: "Failed to update cart"
                    }
                });
            }

            return res.status(200).send({
                message: 'Cart updated successfully',
                result: updateCartResult 
            });

        } catch(error) {
            console.log(error);
            return res.status(500).send({
                error: {
                    message: "Something went wrong. Please try again later."
                }
            });
        }
    },
    delete: async (req: Request, res: Response) => { 
        try {
            const {id} = req.params;
            
            const foundCart = await CartModel.findById(id);
            if(!foundCart) {
                return res.status(204).end();
            }

            const deleteCartResult = await CartModel.deleteOne({_id: id});
            if(!deleteCartResult.acknowledged) {
                return res.status(500).send({
                    error: {
                        message: "Failed to delete cart"
                    }
                });
            }

            return res.status(200).send({
                message: "Cart deleted sucessfully",
                result: deleteCartResult,
            });

        } catch(error) {
            console.log(error);
            return res.status(500).send({
                error: {
                    message: "Something went wrong. Please try again later."
                }
            });
        }
    },
}

export default cart;
