import { Request, Response } from "express";
import { ProductModel } from "../model/productModel";
import fs from 'fs';
import { ROOT_DIR } from "../../server";
const API_END_POINT = 'http://localhost:5000';

const product = {
    create: async (req: Request, res: Response) => {
        try {
            const product = req.body;
            const productImages = req.files as Express.Multer.File[];
            const userId = req.jwt_payload?._id;

            const images: string[] = [];
            productImages.map((image: Express.Multer.File) => {
                images.push(image.filename);
            });

            const createdProduct = await ProductModel.create({
                user: userId,
                ...product, 
                images, 
            });

            const imagesWithUri: string[] = [];
            createdProduct.images.forEach((filename: string) => {
                const imageUri = `${API_END_POINT}/uploads/products/${filename}`;  
                imagesWithUri.push(imageUri);              
            });
            createdProduct.images = imagesWithUri;

            return res.status(201).send({
                message: 'Product created successfully',
                createdProduct,
            });
        } catch(error) {
            console.log(error);
            return res.status(500).send({
                error: {message: "Something went wrong. Please try again later"}
            })
        }
    },
    getAll: async (req: Request, res: Response) => {
        const {_limits, _offset} = req.params;
        const limits = Number(_limits);
        const offset = Number(_offset);
        try {
            const products = await ProductModel.find().limit(limits).skip(offset);
            const totalProducts = await ProductModel.countDocuments();

            return res.status(200).send({
                products,
                total: totalProducts,
            })
        } catch(error) {
            console.log(error);
            return res.status(500).send({
                error: {message: "Something went wrong. Please try again later"}
            })
        }
    },
    getAllByUserId: async (req: Request, res: Response) => {
        const {userId} = req.params;
        try {
            const products = await ProductModel.find({user: userId});
            const totalProducts = await ProductModel.countDocuments();

            return res.status(200).send({
                products,
                total: totalProducts,
            })
        } catch(error) {
            console.log(error);
            res.status(500).send({
                error: {message: "Something went wrong. Please try again later"}
            })
        }
    },
    getById: async (req: Request, res: Response) => {
        const {_id} = req.params;
        try {
            const product = await ProductModel.findById(_id);
            if (!product) {
                return res.status(204).end();
            }
            return res.status(200).send({product});
        } catch(error) {
            console.error("Error fetching product:", error);
            return res.status(500).send({
                error: {message: "Something went wrong. Please try again later"}
            });
        }
    },
    search: async(req: Request, res: Response) => {
        try {
            const {_like} = req.params;
            const products = await ProductModel.find({
                $or: [{
                    title: {$regex: _like}
                }]
            });
            return res.status(200).send({products})
        } catch(error) {
            console.error("Error fetching product:", error);
            return res.status(500).send({
                error: {message: "Something went wrong. Please try again later"}
            });
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;
            const product = req.body;

            const foundProduct = await ProductModel.findById(id);
            if(!foundProduct) {
                return res.status(204).end();
            }

            if(req.files) {
                const images: string[] = [];
                const productImages = req.files as Express.Multer.File[];
                
                productImages.map((image: Express.Multer.File) => {
                    images.push(image.filename);
                });
                
                const updateProductImagesInfo = await ProductModel.updateOne({images});

                if(updateProductImagesInfo.acknowledged) {
                    foundProduct.images.forEach(filename => {
                        fs.unlink(`${ROOT_DIR}/uploads/products/${filename}`, (error) => {
                            if(error) {
                                console.log("Error product image deletion:", error);
                            }
                        })
                    })
                }
            }

            const updateProductInfo = await ProductModel.updateOne({ ...product });

            if(!updateProductInfo.acknowledged) {
                return res.status(500).send({
                    message: 'Unable to update the product', 
                    info: updateProductInfo
                });
            }

            return res.status(200).send({
                message: 'Product updated successfully', 
                info: updateProductInfo
            });
        } catch(error) {
            console.error("Error updating product:", error);
            return res.status(500).send({
                error: {message: "Something went wrong. Please try again later",}
            });
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            const {id} = req.params;

            const foundProduct = await ProductModel.findById(id);
            if(!foundProduct) {
                return res.status(204).end();
            }

            const deleteResult = await ProductModel.deleteOne({_id: id});
            if (!deleteResult.acknowledged) {
                return res.status(500).send({
                    message: 'Unable to delete the product',
                    info: deleteResult
                });
            }

            foundProduct.images.forEach(filename => {
                fs.unlink(`${ROOT_DIR}/uploads/products/${filename}`, (error) => {
                    if(error) {
                        console.log("Error product image deletion:", error);
                    }
                })
            })

            return res.status(200).send({
                message: 'Product deleted successfully',
                deleteResult
            });
        } catch(error) {
            console.error("Error deleting product:", error);
            return res.status(500).send({
                error: {message: "Something went wrong. Please try again later",}
            });
        }
    },
}

export default product;
