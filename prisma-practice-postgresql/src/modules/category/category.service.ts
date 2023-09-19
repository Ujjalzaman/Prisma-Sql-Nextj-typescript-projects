import { Category, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const insertIntoDb = async (data: Category): Promise<Category> => {

    const result = await prisma.category.create({
        data
    })
    return result;
}

export const CategoryService = {
    insertIntoDb
}