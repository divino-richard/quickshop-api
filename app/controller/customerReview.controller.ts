import { Request, Response } from "express";
import { CustomerReviewModel } from "../model/customerReviewModel";
import { UserModel } from "../model/userModel";
import { ProductModel } from "../model/productModel";
import mongoose from "mongoose";

const customerReview = {
    create: async (req: Request, res: Response) => {
        try {
            const customerId =  req.jwt_payload?._id;
            const {productId, starRate, message} = req.body;
            
            const foundCustomer = await UserModel.findById(customerId);
            const foundProduct = await ProductModel.findById(productId);

            if(!foundCustomer || !foundProduct) {
                return res.status(204).end();
            }

            const createdReview = await CustomerReviewModel.create({
                customer: customerId,
                product: productId,
                starRate,
                message: message ?? ''
            })

            if(!createdReview) {
                return res.status(400).send({
                    error: {
                        message: 'Failed to create a review'
                    }
                })
            }

            return res.status(200).send({
                message:'Review created successfully',
                createdReview
            });
        } catch(error) {
            return res.status(500).send({
                error:  {
                    message: 'Something went wrong. Please try again later',
                    cause: error
                }
            });
        }
    },
    getAllByProductId: async (req: Request, res: Response) => {
        try{
            const productId = req.params.id;

            if(!mongoose.isValidObjectId(productId)) {
                return res.status(400).send({
                    error: {
                        message: 'Invalid product id'
                    }
                })
            }

            const reviews = await CustomerReviewModel.find()
                .where({product: productId});
            
            return res.status(200).send({
                productReviews: reviews
            })
        } catch(error) {
            return res.status(500).send({
                error: {
                    cause: error,
                    message: 'Something went wrong. Please try again later'
                }
            })
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const reviewId = req.params.id;
            const {starRate, message} = req.body;

            if(!mongoose.isValidObjectId(reviewId)) {
                return res.status(400).send({
                    error: {
                        message: 'Invalid review id',
                    }
                })
            }

            const foundReview = await CustomerReviewModel.findById(reviewId);
            if(!foundReview) {
                return res.status(400).send({
                    error: {
                        message: 'Review does not exist'
                    }
                })
            }

            const updateReviewResult = await CustomerReviewModel.updateOne({
                starRate,
                message
            });

            if(!updateReviewResult.acknowledged) {
                return res.status(400).send({
                    error: {
                        message: 'Failed to update review'
                    }
                })
            }

            return res.status(200).send({
                message: 'Review updated successfully',
                result: updateReviewResult,
            })
        } catch (error) {
            return res.status(500).send({
                error: {
                    cause: error,
                    message: 'Something went wrong. Please try again later'
                }
            })
        }
    },
    delete: async(req: Request, res: Response) => {
        try{
            const reviewId = req.params.id;

            if(!mongoose.isValidObjectId(reviewId)) {
                return res.status(400).send({
                    error: {
                        message: 'Invalid review id',
                    }
                })
            }

            const foundReview = await CustomerReviewModel.findById(reviewId);
            if(!foundReview) {
                return res.status(400).send({
                    error: {
                        message: 'Review does not exist'
                    }
                });
            }
            
            const deleteReviewResult = await CustomerReviewModel.deleteOne()
                .where({_id: reviewId});
            
            if(!deleteReviewResult.acknowledged) {
                return res.status(400).send({
                    error: {
                        message: 'Failed to delete review'
                    }
                })
            }
            
            return res.status(200).send({
                message: 'Review deleted successfully',
                result: deleteReviewResult
            });
        } catch(error){
            return res.status(500).send({
                error: {
                    cause: error,
                    message: 'Something went wrong. Please try again later'
                }
            })
        }
    }
}

export default customerReview;
