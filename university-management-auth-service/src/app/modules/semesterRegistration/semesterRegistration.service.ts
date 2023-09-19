import { SemesterRegistration, SemesterRegistrationStatus, StudentSemesterRegistration } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";
import { StudentSemesterREgistrationCourse } from "../studentSemesterRegistrationCourse/studentSemesterRegistrationCourse.service";
import { IEnrolledCoursePayload } from "./semesterRegistration.interface";

const createSemesterRegister = async (payload: SemesterRegistration): Promise<SemesterRegistration> => {

    const isAnySemesterRegistrationUpcomingOrOnging = await prisma.semesterRegistration.findFirst({
        where: {
            OR: [
                {
                    status: SemesterRegistrationStatus.UPCOMING
                },
                {
                    status: SemesterRegistrationStatus.ONGOING
                }
            ]
        }
    })
    if (isAnySemesterRegistrationUpcomingOrOnging) {
        throw new ApiError(httpStatus.BAD_REQUEST, `There is already an ${isAnySemesterRegistrationUpcomingOrOnging.status} status`)
    }
    const result = await prisma.semesterRegistration.create({
        data: payload
    })
    return result;
}

const getAllSemesterRegistration = async (): Promise<SemesterRegistration[] | null> => {
    const result = await prisma.semesterRegistration.findMany();
    return result;
}
const getSingleSemesterRegistration = async (id: string): Promise<SemesterRegistration | null> => {
    const result = await prisma.semesterRegistration.findUnique({
        where: {
            id
        }
    })
    return result;
}

const deleteSemesterRegistration = async (id: string): Promise<SemesterRegistration | null> => {
    const result = await prisma.semesterRegistration.delete({
        where: {
            id
        }
    })
    return result;
}

const updateSemesterRegistration = async (id: string, payload: Partial<SemesterRegistration>): Promise<SemesterRegistration | null> => {
    const result = await prisma.semesterRegistration.update({
        where: {
            id
        },
        data: payload
    })
    return result;
}

const startMyRegistration = async (payload: StudentSemesterRegistration, authUser: JwtPayload): Promise<{
    semesterRegistration: SemesterRegistration | null,
    studenSemesterRegistration: StudentSemesterRegistration | null
}> => {
    const studentInfo = await prisma.student.findFirst({
        where: {
            studentId: authUser.userId
        }
    })
    if (!studentInfo) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Student info not found !!');
    }

    const semesterRegistrationInfo = await prisma.semesterRegistration.findFirst({
        where: {
            status: {
                in: [SemesterRegistrationStatus.ONGOING, SemesterRegistrationStatus.UPCOMING]
            }
        }
    });

    if (semesterRegistrationInfo?.status === SemesterRegistrationStatus.UPCOMING) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Registration is not started yet!!')
    };

    let studentRegistration = await prisma.studentSemesterRegistration.findFirst({
        where: {
            student: {
                id: studentInfo?.id
            },
            semesterRegistration: {
                id: semesterRegistrationInfo?.id
            }
        }
    });
    if (studentRegistration) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'You Already Registered!!')
    };

    if (!studentRegistration) {
        studentRegistration = await prisma.studentSemesterRegistration.create({
            data: {
                student: {
                    connect: {
                        id: studentInfo.id
                    }
                },
                semesterRegistration: {
                    connect: {
                        id: semesterRegistrationInfo?.id
                    }
                }
            }
        })

    }

    return {
        semesterRegistration: semesterRegistrationInfo,
        studenSemesterRegistration: studentRegistration
    };
}

const EnrollIntoCourse = async (user: string, payload: IEnrolledCoursePayload): Promise<{
    message: string
}> => {
    return StudentSemesterREgistrationCourse.EnrollIntoCourse(user, payload)
}

const WidthDrewCourse = async (user: string, payload: IEnrolledCoursePayload): Promise<{ message: string }> => {
    return StudentSemesterREgistrationCourse.EnrollIntoCourse(user, payload)
}


const confirmMyRegistration = async (user: string):Promise<{
    message: string
}> => {
    const semesterRegistration = await prisma.semesterRegistration.findFirst({
        where: {
            status: SemesterRegistrationStatus.ONGOING
        }
    });

    const studentSemesterRegistration = await prisma.studentSemesterRegistration.findFirst({
        where: {
            semesterRegistration: {
                id: semesterRegistration?.id
            },
            student: {
                studentId: user
            }
        }
    })
    if (!studentSemesterRegistration) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'student semester is not valid')
    }

    if (studentSemesterRegistration.totalCreditsTaken === 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'You are not enrolled in any course !!')
    }

    if (
        studentSemesterRegistration.totalCreditsTaken &&
        semesterRegistration?.minCredit &&
        semesterRegistration?.maxCredit &&
        (studentSemesterRegistration.totalCreditsTaken < semesterRegistration.minCredit || studentSemesterRegistration.totalCreditsTaken > semesterRegistration.maxCredit)

    ) {
        throw new ApiError(httpStatus.BAD_REQUEST, `You can take only ${semesterRegistration?.minCredit} to ${semesterRegistration?.maxCredit}`)
    }

    await prisma.studentSemesterRegistration.update({
        where: {
            id: studentSemesterRegistration.id
        },
        data: {
            isConfirmed: true
        }
    });

    return {
        message: "Your Registration is confirmed"
    }
}

const getMyRegistration = async (user: string) => {
    const semesterRegistration = await prisma.semesterRegistration.findFirst({
        where: {
            status: SemesterRegistrationStatus.ONGOING
        },
        // include:{
        //     academicSemester: true
        // }
    });

    const studentSemesterRegistration = await prisma.studentSemesterRegistration.findFirst({
        where: {
            semesterRegistration: {
                id: semesterRegistration?.id
            },
            student: {
                studentId: user
            }
        },
        include:{
            student: true
        }
    })
    

    return {
        studentSemesterRegistration: studentSemesterRegistration,
        semesterRegistration: semesterRegistration
    }
}

export const SemesterRegistraiontService = {
    createSemesterRegister,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    deleteSemesterRegistration,
    updateSemesterRegistration,
    startMyRegistration,
    EnrollIntoCourse,
    WidthDrewCourse,
    confirmMyRegistration,
    getMyRegistration
}