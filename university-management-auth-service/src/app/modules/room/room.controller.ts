import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { RoomService } from "./room.service";

const createRoom = catchAsync(async(req: Request, res: Response) => {
    const result  = await RoomService.createRoom(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Room created successfully!",
        data: result
    })
})
export const RoomController = {
    createRoom
}