import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OfferedCourseSectionService } from "./offeredCourseSection.service";

const createOfferedCourseSection = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseSectionService.createOfferedCourseSection(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Created Offere course section Registration !!',
        data: result
    })
});

const getAllOfferedCourseSection = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseSectionService.getAllOfferedCourseSection();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Retrieve Offere course section Registration !!',
        data: result
    })
});

const getSingleOfferedCourseSection = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseSectionService.getSingleOfferedCourseSection(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Retrieve Offere course section Registration !!',
        data: result
    })
});

const deleteOfferedCourseSection = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseSectionService.deleteOfferedCourseSection(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully delete Offere course section Registration !!',
        data: result
    })
});

const updateOfferedCourseSection = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseSectionService.updateOfferedCourseSection(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Update Offere course section Registration !!',
        data: result
    })
});

export const OfferedCourseSectionController = {
    createOfferedCourseSection,
    getAllOfferedCourseSection,
    getSingleOfferedCourseSection,
    deleteOfferedCourseSection,
    updateOfferedCourseSection
}