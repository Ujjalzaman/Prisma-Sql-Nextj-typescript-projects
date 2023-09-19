import { Room } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createRoom = async (paylod: Room): Promise<Room> => {
    const result = await prisma.room.create({
        data: paylod,
        include: {
            building: true
        }
    })
    return result
}

export const RoomService = {
    createRoom
}