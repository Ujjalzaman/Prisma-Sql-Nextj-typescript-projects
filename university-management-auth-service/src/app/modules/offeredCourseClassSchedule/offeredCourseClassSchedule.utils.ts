import { OfferedCourseClassSchedule, WeekDays } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

type ITimeSlot = {
    startTime: string,
    endTime: string,
    dayOfWeek: WeekDays
}

const checkFacultyAvailability = async (payload: OfferedCourseClassSchedule) => {
    const alreadyBookRoomOnDay = await prisma.offeredCourseClassSchedule.findMany({
        where: {
            dayOfWeek: payload.dayOfWeek,
            faculty: {
                id: payload.facultyId
            }
        }
    })
    const existingSlot = alreadyBookRoomOnDay.map((item) => ({
        startTime: item.startTime,
        endTime: item.endTime,
        dayOfWeek: item.dayOfWeek
    }))

    const currentSlot = {
        startTime: payload.startTime,
        endTime: payload.endTime,
        dayOfWeek: payload.dayOfWeek
    }

    if (hasTimeConflict(existingSlot, currentSlot)) {
        throw new ApiError(httpStatus.CONFLICT, 'Faculty is Already Booked !!')
    }
}

const checkRoomAvailability = async (payload: OfferedCourseClassSchedule) => {
    const alreadyBookRoomOnDay = await prisma.offeredCourseClassSchedule.findMany({
        where: {
            dayOfWeek: payload.dayOfWeek,
            room: {
                id: payload.roomId
            }
        }
    })
    const existingSlot = alreadyBookRoomOnDay.map((item) => ({
        startTime: item.startTime,
        endTime: item.endTime,
        dayOfWeek: item.dayOfWeek
    }))

    const currentSlot = {
        startTime: payload.startTime,
        endTime: payload.endTime,
        dayOfWeek: payload.dayOfWeek
    }

    if (hasTimeConflict(existingSlot, currentSlot)) {
        throw new ApiError(httpStatus.CONFLICT, 'Room is Already Booked !!')
    }
}
const hasTimeConflict = (existingSlot: ITimeSlot[], currentSlot: ITimeSlot) => {
    for (const slot of existingSlot) {
        const existingStart = new Date(`2023-09-16T${slot.startTime}:00Z`);
        const existingEnd = new Date(`2023-09-16T${slot.endTime}:00Z`);
        const newStart = new Date(`2023-09-16T${currentSlot.startTime}:00Z`);
        const newEnd = new Date(`2023-09-16T${currentSlot.endTime}:00Z`);

        if (newStart < existingEnd && newEnd > existingStart) {
            return true
        }
    }
    return false;
}

export const OfferedCourseClassScheduleUtils = {
    checkRoomAvailability,
    checkFacultyAvailability
}