import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { offeredCourseClassScheduleFilterableFields } from "./offeredCourseClassSchedule.constant";
import { OfferedCourseClassScheduleService } from "./offeredCourseClassSchedule.service";

const createOfferedCourseClassSchedule = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseClassScheduleService.createofferedCourseClassSchedule(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Successfully created Offered course schedule Registration !!',
        data: result
    })
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, offeredCourseClassScheduleFilterableFields);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await OfferedCourseClassScheduleService.getAllOfferedCourseClassSchedule(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourse class schedule fetched successfully',
        meta: result.meta,
        data: result.data
    });
})

// const getSingleSemesterRegistration = catchAsync(async (req: Request, res: Response) => {
//     const result = await SemesterRegistraiontService.getSingleSemesterRegistration(req.params.id);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Successfully Retrieve Semester Registration !!',
//         data: result
//     })
// });

// const deleteSemesterRegistration = catchAsync(async (req: Request, res: Response) => {
//     const result = await SemesterRegistraiontService.deleteSemesterRegistration(req.params.id);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Successfully delete Semester Registration !!',
//         data: result
//     })
// });

// const updateSemesterRegistration = catchAsync(async (req: Request, res: Response) => {
//     const result = await SemesterRegistraiontService.updateSemesterRegistration(req.params.id, req.body);
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'Successfully Update Semester Registration !!',
//         data: result
//     })
// });

export const OfferedCourseClassScheduleController = {
    createOfferedCourseClassSchedule,
    getAllFromDB
}