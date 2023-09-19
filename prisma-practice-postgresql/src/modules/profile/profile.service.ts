import { PrismaClient, Profile } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDb = async (data: Profile): Promise<Profile> => {

    const result = await prisma.profile.create({
        data
    })
    return result;
}

export const ProfileService = {
    insertIntoDb
}