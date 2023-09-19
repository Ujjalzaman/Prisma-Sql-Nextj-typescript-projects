import { Request, Response } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { SemesterRegistraiontService } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(async (req: Request, res: Response) => {
    const result = await SemesterRegistraiontService.createSemesterRegister(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Created Semester Registration !!',
        data: result
    })
});

const getAllSemesterRegistration = catchAsync(async (req: Request, res: Response) => {
    const result = await SemesterRegistraiontService.getAllSemesterRegistration();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Retrieve Semester Registration !!',
        data: result
    })
});

const getSingleSemesterRegistration = catchAsync(async (req: Request, res: Response) => {
    const result = await SemesterRegistraiontService.getSingleSemesterRegistration(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Retrieve Semester Registration !!',
        data: result
    })
});

const deleteSemesterRegistration = catchAsync(async (req: Request, res: Response) => {
    const result = await SemesterRegistraiontService.deleteSemesterRegistration(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully delete Semester Registration !!',
        data: result
    })
});

const updateSemesterRegistration = catchAsync(async (req: Request, res: Response) => {
    const result = await SemesterRegistraiontService.updateSemesterRegistration(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Update Semester Registration !!',
        data: result
    })
});

const StartMyRegistration = catchAsync(async (req: Request, res: Response) => {
    const result = await SemesterRegistraiontService.startMyRegistration(req.body, req.user as JwtPayload);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Registered Student !!',
        data: result
    })
});

const EnrollIntoCourse = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user
    const result = await SemesterRegistraiontService.EnrollIntoCourse(user.userId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Enrolled In to course !!',
        data: result
    })
});

const WithdrawFromCourse = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user
    const result = await SemesterRegistraiontService.WidthDrewCourse(user.userId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Withdraw In to course !!',
        data: result
    })
});

const ConfirmMyRegistrtion = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user
    const result = await SemesterRegistraiontService.confirmMyRegistration(user.userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Registration Confirm !!',
        data: result
    })
});

const getMyRegistration = catchAsync(async (req: Request, res: Response) => {
    const user = (req as any).user
    const result = await SemesterRegistraiontService.getMyRegistration(user.userId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully Retreive Registration info !!',
        data: result
    })
});


export const SemesterRegistrationController = {
    createSemesterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    deleteSemesterRegistration,
    updateSemesterRegistration,
    StartMyRegistration,
    EnrollIntoCourse,
    WithdrawFromCourse,
    ConfirmMyRegistrtion,
    getMyRegistration
}