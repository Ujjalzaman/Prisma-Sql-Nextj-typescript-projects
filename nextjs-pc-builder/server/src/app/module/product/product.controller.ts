import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import sendReponse from "../../../shared/sendReponse";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req: Request, res: Response) => {
    const { ...productInfo } = req.body;
    const result = await ProductService.createProduct(productInfo);
    sendReponse(res, {
        statusCode: 200,
        message: "Successfully Added Product !!",
        success: true,
        data: result,
    })
})

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductService.deleteByIdProduct(id);
    sendReponse(res, {
        statusCode: 200,
        message: "Successfully deleted Product!!",
        success: true,
        data: result,
    })
})

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProductService.getByIdProduct(id);
    sendReponse(res, {
        statusCode: 200,
        message: "Successfully retrieve Product information !!",
        success: true,
        data: result,
    })
})

const getAllProduct = catchAsync(async (req: Request, res: Response) => {
    const result = await ProductService.getAllProducts();
    sendReponse(res, {
        statusCode: 200,
        message: "Successfully retrieve all Product information !!",
        success: true,
        data: result
    })
})

const getProductByCategory = catchAsync(async (req: Request, res: Response) => {
    const category = req.query.category as string;
    const result = await ProductService.getProductByCategories(category);
    sendReponse(res, {
        statusCode: 200,
        message: "Successfully retrieve Product information !!",
        success: true,
        data: result
    })
})

export const ProductController = {
    getAllProduct,
    getSingleProduct,
    deleteProduct,
    createProduct,
    getProductByCategory
}