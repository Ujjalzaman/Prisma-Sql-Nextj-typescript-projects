import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const insertIntoDbController = async(req:Request, res:Response)=> {
    try{
        const result = await CategoryService.insertIntoDb(req.body);
        res.send({
            success: true,
            status: 200,
            message: "Category Created Successfully",
            data: result
        })
    }catch(err){
        res.send(err)
    }
}

export const CategoryController = {
    insertIntoDbController
}