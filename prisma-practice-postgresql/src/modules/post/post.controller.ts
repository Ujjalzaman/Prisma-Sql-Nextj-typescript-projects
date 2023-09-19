import { Request, Response } from "express";
import { PostService } from "./post.service";

const insertIntoDbController = async(req:Request, res:Response)=> {
    try{
        const result = await PostService.createPost(req.body);
        res.send({
            success: true,
            status: 200,
            message: "Post Created Successfully",
            data: result
        })
    }catch(err){
        res.send(err)
    }
}

const getAllPost = async(req:Request, res:Response)=> {
    const options = req.query;
    try{
        const result = await PostService.getAllPost(options);
        res.send({
            success: true,
            status: 200,
            message: "Post Retrive Successfully",
            data: result
        })
    }catch(err){
        res.send(err)
    }
}

const detelePost = async(req:Request, res:Response)=> {
    try{
        const result = await PostService.deletePost(parseInt(req.params.id));
        res.send({
            success: true,
            status: 200,
            message: "Post Delete Successfully",
            data: result
        })
    }catch(err){
        res.send(err)
    }
}

const UpdatePost = async(req:Request, res:Response)=> {
    const id = req.params.id
    const data = req.body;
    try{
        const result = await PostService.updatePost(parseInt(id), data);
        res.send({
            success: true,
            status: 200,
            message: "Post Updated Successfully",
            data: result
        })
    }catch(err){
        res.send(err)
    }
}


export const PostController = {
    insertIntoDbController,
    getAllPost,
    detelePost,
    UpdatePost
}