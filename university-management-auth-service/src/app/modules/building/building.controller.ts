import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { buildingFilterableFields } from "./building.constant";
import { BuildingService } from "./building.service";

const createBuilding = catchAsync(async (req: Request, res: Response) => {
    const result = await BuildingService.createBuilding(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Building created successfully!",
        data: result
    })
})

const getBuilding = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, buildingFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await BuildingService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Retrive Building Data successfully!",
        data: result
    })
})
export const BuildingController = {
    createBuilding,
    getBuilding
}