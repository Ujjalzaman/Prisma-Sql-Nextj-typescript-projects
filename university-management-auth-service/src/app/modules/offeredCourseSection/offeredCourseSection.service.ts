import { OfferedCourseSection } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const createOfferedCourseSection = async (payload: OfferedCourseSection): Promise<OfferedCourseSection> => {
    const isExistOfferedCourse = await prisma.offeredCourseSection.findFirst({
        where: {
            id: payload.offeredCourseId
        }
    })
    if (!isExistOfferedCourse) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Offered course does not exist");
    }
    payload.semesterRegistrationId = isExistOfferedCourse.semesterRegistrationId;
    const result = await prisma.offeredCourseSection.create({
        data: payload
    })
    return result;
}

const getAllOfferedCourseSection = async (): Promise<OfferedCourseSection[] | null> => {
    const result = await prisma.offeredCourseSection.findMany();
    return result;
}
const getSingleOfferedCourseSection = async (id: string): Promise<OfferedCourseSection | null> => {
    const result = await prisma.offeredCourseSection.findUnique({
        where: {
            id
        }
    })
    return result;
}

const deleteOfferedCourseSection = async (id: string): Promise<OfferedCourseSection | null> => {
    const result = await prisma.offeredCourseSection.delete({
        where: {
            id
        }
    })
    return result;
}

const updateOfferedCourseSection = async (id: string, payload: Partial<OfferedCourseSection>): Promise<OfferedCourseSection | null> => {
    const result = await prisma.offeredCourseSection.update({
        where: {
            id
        },
        data: payload
    })
    return result;
}

export const OfferedCourseSectionService = {
    createOfferedCourseSection,
    getAllOfferedCourseSection,
    getSingleOfferedCourseSection,
    deleteOfferedCourseSection,
    updateOfferedCourseSection
}