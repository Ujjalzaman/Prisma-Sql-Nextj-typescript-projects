import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { courseFiltersFields } from "./course.constatnt";
import { CourseService } from "./course.service";

const createCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.createCourse(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Course created successfully!",
        data: result
    })
})

const getAllCourses = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, courseFiltersFields);
    const paginationOptions = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await CourseService.getAllCourses(filters, paginationOptions);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses fetched successfully',
        meta: result.meta,
        data: result.data
    });
})

const getSingleCourses = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.getCourseById(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses fetched successfully',
        data: result
    });
})

const updateCourses = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.updateCourse(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses Updated successfully',
        data: result
    });
})

const deleteCourses = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.deleteCourses(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses delete successfully',
        data: result
    });
})

export const CourseController = {
    createCourse,
    getSingleCourses,
    deleteCourses,
    getAllCourses,
    updateCourses
}