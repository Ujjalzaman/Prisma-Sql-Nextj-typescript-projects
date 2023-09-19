import { OfferedCourse } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { asyncForEach } from "../../../shared/utils";
import { ICreateOfferedCourse } from "./offeredCourse.interface";

const createOfferedCourse = async (payload: ICreateOfferedCourse): Promise<OfferedCourse[]> => {
    const { academicDepartmentId, semesterRegistrationId, courseIds } = payload;

    const result: OfferedCourse[] = [];

    await asyncForEach(courseIds, async (courseId: string) => {
        const isExist = await prisma.offeredCourse.findFirst({
            where: {
                academicDepartmentId,
                semesterRegistrationId,
                courseId
            }
        });

        if (!isExist) {
            const insertToOfferedCourse = await prisma.offeredCourse.create({
                data: {
                    academicDepartmentId,
                    semesterRegistrationId,
                    courseId
                },
                include: {
                    academicDepartment: true,
                    semesterRegistration: true,
                    course: true
                }
            })
            result.push(insertToOfferedCourse)
        }
    });
    return result;
}

const getAllOfferedCourse = async (): Promise<OfferedCourse[] | null> => {
    const result = await prisma.offeredCourse.findMany();
    return result;
}
const getSingleOfferedCourse = async (id: string): Promise<OfferedCourse | null> => {
    const result = await prisma.offeredCourse.findUnique({
        where: {
            id
        }
    })
    return result;
}

const deleteOfferedCourse = async (id: string): Promise<OfferedCourse | null> => {
    const result = await prisma.offeredCourse.delete({
        where: {
            id
        }
    })
    return result;
}

const updateOfferedCourse = async (id: string, payload: Partial<OfferedCourse>): Promise<OfferedCourse | null> => {
    const result = await prisma.offeredCourse.update({
        where: {
            id
        },
        data: payload
    })
    return result;
}

export const OfferedCourseService = {
    createOfferedCourse,
    getAllOfferedCourse,
    getSingleOfferedCourse,
    deleteOfferedCourse,
    updateOfferedCourse
}