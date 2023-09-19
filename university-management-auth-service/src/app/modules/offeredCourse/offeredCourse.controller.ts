import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OfferedCourseService } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseService.createOfferedCourse(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Created Offered Course !!',
        data: result
    })
});

const getAllOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseService.getAllOfferedCourse();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Retrieve Semester Registration !!',
        data: result
    })
});

const getSingleOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseService.getSingleOfferedCourse(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Retrieve Semester Registration !!',
        data: result
    })
});

const deleteOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseService.deleteOfferedCourse(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully delete Semester Registration !!',
        data: result
    })
});

const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseService.updateOfferedCourse(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Update Semester Registration !!',
        data: result
    })
});

export const OfferedCourseController = {
    createOfferedCourse,
    getSingleOfferedCourse,
    getAllOfferedCourse,
    deleteOfferedCourse,
    updateOfferedCourse
}