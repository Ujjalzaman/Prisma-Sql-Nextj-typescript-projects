import { SemesterRegistrationStatus } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { IEnrolledCoursePayload } from "../semesterRegistration/semesterRegistration.interface";

const EnrollIntoCourse = async (user: string, payload: IEnrolledCoursePayload): Promise<{message: string}> => {
    const student = await prisma.student.findFirst({
        where: {
            studentId: user
        }
    });

    if(!student){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Student is not Found !!');
    }

    const semesterRegistration = await prisma.semesterRegistration.findFirst({
        where: {
            status: SemesterRegistrationStatus.ONGOING
        }
    })

    if(!semesterRegistration){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Semester is not Found !!');
    }

    const offeredCourse = await prisma.offeredCourse.findFirst({
        where: {
            id: payload.offerCourseId
        },
        include:{
            course: true
        }
    })

    if(!offeredCourse){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Offered is not Found !!');
    }

    const offeredCourseSection = await prisma.offeredCourseSection.findFirst({
        where: {
            id: payload.offeredCourseSectionId
        }
    })

    if(!offeredCourseSection){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Offered Section is not Found !!');
    }

    if(
        offeredCourseSection.maxCapacity &&
        offeredCourseSection.currentlyEnrolledStudent &&
        offeredCourseSection.currentlyEnrolledStudent >= offeredCourseSection.maxCapacity
    ){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Student Capacity is True')
    }

    await prisma.$transaction(async(tx) =>{
        await tx.studentSemesterRegistrationCourse.create({
            data: {
                studentId: student?.id,
                offerCourseId: payload?.offerCourseId,
                offeredCourseSectionId: payload?.offeredCourseSectionId,
                semesterRegistrationId: semesterRegistration?.id
            }
        })

        await tx.offeredCourseSection.update({
            where: {
                id: payload.offeredCourseSectionId
            },
            data:{
                currentlyEnrolledStudent:{
                    increment: 1
                }
            }
        });

        await tx.studentSemesterRegistration.updateMany({
            where: {
                student: {
                    id: student.id
                },
                semesterRegistration: {
                    id: semesterRegistration.id
                }
            },
            data: {
                totalCreditsTaken: {
                    increment: offeredCourse?.course?.credits
                }
            }
        })
    })

    return {
        message: "Successfully Enrolled !!"
    };
}

const WidthDrewCourse = async (user: string, payload: IEnrolledCoursePayload): Promise<{message: string}> => {
    const student = await prisma.student.findFirst({
        where: {
            studentId: user
        }
    });

    if(!student){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Student is not Found !!');
    }

    const semesterRegistration = await prisma.semesterRegistration.findFirst({
        where: {
            status: SemesterRegistrationStatus.ONGOING
        }
    })

    if(!semesterRegistration){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Semester is not Found !!');
    }

    const offeredCourse = await prisma.offeredCourse.findFirst({
        where: {
            id: payload.offerCourseId
        },
        include:{
            course: true
        }
    })

    if(!offeredCourse){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Offered is not Found !!');
    }


    await prisma.$transaction(async(tx) =>{
        await tx.studentSemesterRegistrationCourse.delete({
            where:{
                semesterRegistrationId_studentId_offerCourseId:{
                    semesterRegistrationId: semesterRegistration?.id,
                    studentId: student?.id,
                    offerCourseId: payload?.offerCourseId
                }
            }
        })

        await tx.offeredCourseSection.update({
            where: {
                id: payload.offeredCourseSectionId
            },
            data:{
                currentlyEnrolledStudent:{
                    decrement: 1
                }
            }
        });

        await tx.studentSemesterRegistration.updateMany({
            where: {
                student: {
                    id: student.id
                },
                semesterRegistration: {
                    id: semesterRegistration.id
                }
            },
            data: {
                totalCreditsTaken: {
                    decrement: offeredCourse?.course?.credits
                }
            }
        })
    })

    return {
        message: "Successfully Withdraw From Course !!"
    };
}

export const StudentSemesterREgistrationCourse = {
    WidthDrewCourse,
    EnrollIntoCourse
}