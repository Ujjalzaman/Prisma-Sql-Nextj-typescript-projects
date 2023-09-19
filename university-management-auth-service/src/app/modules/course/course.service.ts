import { Course, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { asyncForEach } from "../../../shared/utils";
import { courseSearchableFields } from "./course.constatnt";
import { ICourse, ICourseFilterRequest, IPrerequisiteCourseRequest } from "./course.interface";

const createCourse = async (payload: ICourse): Promise<any> => {
    const { preRequisiteCourses, ...others } = payload;
    const newCourse = await prisma.$transaction(async (transactionClient) => {
        const result = await transactionClient.course.create({
            data: others
        })
        if (!result) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create course")
        }

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            await asyncForEach(
                preRequisiteCourses,
                async (preRequisiteCourse: IPrerequisiteCourseRequest) => {
                    await transactionClient.coursePrerequisite.create({
                        data: {
                            courseId: result.id,
                            preRequisiteId: preRequisiteCourse.courseId
                        }
                    })
                }
            )
        }
        return result;
    })

    if (newCourse) {
        const responseData = await prisma.course.findUnique({
            where: {
                id: newCourse.id
            },
            include: {
                preRequisite: {
                    include: {
                        preRequisite: true
                    }
                },
                preRequisiteFor: {
                    include: {
                        course: true
                    }
                }
            }
        })

        return responseData;
    }

    throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create course")
}

const getAllCourses = async (filters: ICourseFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Course[]>> => {
    const { limit, skip, page } = paginationHelpers.calculatePagination(options);
    const { searchTerm, ...filtersData } = filters;

    let andCondition = [];

    if (searchTerm) {
        andCondition.push({
            OR: courseSearchableFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    }

    if (Object.keys(filtersData).length > 0) {
        andCondition.push({
            AND: Object.keys(filtersData).map((field) => ({
                [field]: {
                    equals: (filtersData as any)[field]
                }
            }))
        })
    }
    const whereCondition: Prisma.CourseWhereInput = andCondition.length > 0 ? { AND: andCondition } : {};
    const result = await prisma.course.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } :
            {
                createdAt: 'desc'
            },
        include: {
            preRequisite: {
                include: {
                    preRequisite: true
                }
            }, preRequisiteFor: {
                include: {
                    course: true
                }
            }
        }
    })
    const total = await prisma.course.count({ where: whereCondition });

    return {
        meta: {
            total, page, limit
        },
        data: result
    }
}

const getCourseById = async (id: string): Promise<Course | null> => {
    const result = await prisma.course.findUnique({
        where: {
            id
        },
        include: {
            preRequisite: {
                include: {
                    preRequisite: true
                }
            },
            preRequisiteFor: {
                include: {
                    course: true
                }
            }
        }
    })
    return result;
}

const updateCourse = async (id: string, payload: ICourse): Promise<Course | null> => {
    const { preRequisiteCourses, ...others } = payload;

    await prisma.$transaction(async (tx) => {
        const result = await tx.course.update({
            where: {
                id
            },
            data: others
        })
        if (!result) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to Update Course !!');
        }
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            const deletePrerequisite = preRequisiteCourses.filter((field) => field.courseId && field.isDeleted);
            const newPreRequisite = preRequisiteCourses.filter((field) => field.courseId && !field.isDeleted);

            await asyncForEach(deletePrerequisite, async (deleteCourses: IPrerequisiteCourseRequest) => {
                await tx.coursePrerequisite.deleteMany({
                    where: {
                        AND: [
                            {
                                courseId: id
                            },
                            {
                                preRequisiteId: deleteCourses.courseId
                            }
                        ]
                    }
                })
            })

            await asyncForEach(newPreRequisite, async (insertPreRequisite: IPrerequisiteCourseRequest) => {
                await tx.coursePrerequisite.create({
                    data: {
                        courseId: id,
                        preRequisiteId: insertPreRequisite.courseId
                    }
                })
            })
        }
        return result;
    })

    const responseData = await prisma.course.findUnique({
        where: {
            id
        },
        include: {
            preRequisite: {
                include: {
                    preRequisite: true
                }
            },
            preRequisiteFor: {
                include: {
                    course: true
                }
            }
        }
    })
    return responseData;
}

const deleteCourses = async (id: string): Promise<Course> => {
    await prisma.coursePrerequisite.deleteMany({
        where: {
            OR: [
                {
                    courseId: id
                },
                {
                    preRequisiteId: id
                }
            ]
        }
    });
    const result = await prisma.course.delete({
        where: {
            id
        }
    })
    return result;
}
export const CourseService = {
    createCourse,
    deleteCourses,
    updateCourse,
    getAllCourses,
    getCourseById
}