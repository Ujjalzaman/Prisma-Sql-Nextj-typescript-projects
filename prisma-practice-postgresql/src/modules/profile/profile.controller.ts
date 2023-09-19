import { Request, Response } from "express";
import { ProfileService } from "./profile.service";

const insertIntoDbController = async(req:Request, res:Response)=> {
    try{
        const result = await ProfileService.insertIntoDb(req.body);
        res.send({
            success: true,
            status: 200,
            message: "Profile Created Successfully",
            data: result
        })
    }catch(err){
        res.send(err)
    }
}
export const ProfileController = {
    insertIntoDbController
}