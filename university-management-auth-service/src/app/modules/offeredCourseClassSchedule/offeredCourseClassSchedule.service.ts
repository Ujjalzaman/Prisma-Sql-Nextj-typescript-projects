import { OfferedCourseClassSchedule, Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { offeredCourseClassScheduleRelationFields, offeredCourseClassScheduleRelationFieldsMapper, offeredCourseClassScheduleSearchableFields } from "./offeredCourseClassSchedule.constant";
import { IOfferedCourseClassScheduleFilterRequest } from "./offeredCourseClassSchedule.interface";
import { OfferedCourseClassScheduleUtils } from "./offeredCourseClassSchedule.utils";

const createofferedCourseClassSchedule = async (payload: OfferedCourseClassSchedule): Promise<OfferedCourseClassSchedule> => {
    await OfferedCourseClassScheduleUtils.checkRoomAvailability(payload)
    await OfferedCourseClassScheduleUtils.checkFacultyAvailability(payload);
    const result = await prisma.offeredCourseClassSchedule.create({
        data: payload,
        include: {
            faculty: true,
            room: true,
            OfferedCourseSection: true,
            SemesterRegistration: true
        }
    })
    return result;
}

const getAllOfferedCourseClassSchedule = async (
    filters: IOfferedCourseClassScheduleFilterRequest,
    options: IPaginationOptions
): Promise<IGenericResponse<OfferedCourseClassSchedule[]>> => {
    const {limit, page, skip} = paginationHelpers.calculatePagination(options);
    const {searchTerm, ...filtersOptions} = filters;

    const andCondition = [];

    if(searchTerm){
        andCondition.push({
            OR:offeredCourseClassScheduleSearchableFields.map((field) => ({
                [field]:{
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };

    if(Object.keys(filtersOptions).length > 0){
        andCondition.push({
            AND: Object.keys(filtersOptions).map((key) => {
                if(offeredCourseClassScheduleRelationFields.includes(key)){
                    return {
                        [offeredCourseClassScheduleRelationFieldsMapper[key]]: {
                            id: (filtersOptions as any)[key]
                        }
                        
                    }
                }else{
                    return {
                        [key]:{
                            equals: (filtersOptions as any)[key]
                        }
                    }
                }
            })
        })
    }

    const whereConditions: Prisma.OfferedCourseClassScheduleWhereInput = andCondition.length > 0 ? {AND: andCondition}: {};


    const result = await prisma.offeredCourseClassSchedule.findMany({
        include: {
            faculty: true,
            SemesterRegistration: true,
            room: true,
            OfferedCourseSection: true
        },
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        }: {
            createdAt: 'desc'
        }
    });

    const total = await prisma.offeredCourseClassSchedule.count({
        where: whereConditions
    });

    return {
        meta:{
            total,
            page,
            limit
        },
        data: result
    };
}
// const getSingleSemesterRegistration = async (id: string): Promise<SemesterRegistration | null> => {
//     const result = await prisma.semesterRegistration.findUnique({
//         where: {
//             id
//         }
//     })
//     return result;
// }

// const deleteSemesterRegistration = async (id: string): Promise<SemesterRegistration | null> => {
//     const result = await prisma.semesterRegistration.delete({
//         where: {
//             id
//         }
//     })
//     return result;
// }

// const updateSemesterRegistration = async (id: string, payload: Partial<SemesterRegistration>): Promise<SemesterRegistration | null> => {
//     const result = await prisma.semesterRegistration.update({
//         where: {
//             id
//         },
//         data: payload
//     })
//     return result;
// }

export const OfferedCourseClassScheduleService = {
    createofferedCourseClassSchedule,
    getAllOfferedCourseClassSchedule
}