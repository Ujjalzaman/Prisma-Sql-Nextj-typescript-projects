import { Request, Response } from "express";
import { userService } from "./user.service";


const insertIntoDbController = async(req:Request, res:Response)=> {
    try{
        const result = await userService.insertIntoDb(req.body);
        res.send({
            success: true,
            status: 200,
            message: "user Created Successfully",
            data: result
        })
    }catch(err){
        res.send(err)
    }
}

const geteSingleUser = async(req:Request, res:Response)=> {
    try{
        const result = await userService.getSingleData(parseInt(req.params.id));
        res.send({
            success: true,
            status: 200,
            message: "User Retrive Successfully",
            data: result
        })
    }catch(err){
        res.send(err)
    }
}

const createUserOrUpdate = async(req:Request, res:Response)=> {
    try{
        const result = await userService.createUserOrUpdate(req.body);
        res.send({
            success: true,
            status: 200,
            message: "Profile Updated Successfully",
            data: result
        })
    }catch(err){
        res.send(err)
    }
}

const getUsers = async(req:Request, res:Response)=> {
    try{
        const result = await userService.getUsers();
        res.send({
            success: true,
            status: 200,
            message: "User Retrive Successfully",
            data: result
        })
    }catch(err){
        res.send(err)
    }
}

export const userController = {
    insertIntoDbController,
    geteSingleUser,
    createUserOrUpdate,
    getUsers
}