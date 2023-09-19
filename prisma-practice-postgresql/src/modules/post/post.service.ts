import { Post, PrismaClient, User } from "@prisma/client";
import { parse } from "path";

const prisma = new PrismaClient();

const createPost = async (data: Post): Promise<Post> => {
    const result = await prisma.post.create({
        data,
        include: {
            author: true,
            category: true
        }
    })
    return result;
}

const getAllPost = async (options: any) => {
    const { sortBy, sortOrder, searchTerm, page, limit } = options;
    const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
    const take = parseInt(limit) || 10;

    return await prisma.$transaction(async (tx) => {
        const result = await tx.post.findMany({
            skip,
            take,
            include: {
                author: true,
                category: true
            },
            orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } ? { createdAt: 'desc' },
            where: {
                OR: [
                    {
                        title: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        author: {
                            name: {
                                contains: searchTerm,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            }
        });
        const total = await tx.post.count();
        return {data: result, total};
    })
}

const updatePost = async (id: number, payload: Partial<Post | null>) => {
    const result = await prisma.post.update({
        where: {
            id
        },
        data: payload
    })

    // const result = await prisma.$executeRaw`update posts set title = ${payload?.title} where id=${id}`
    return result;
}

const deletePost = async (id: number) => {
    const result = await prisma.post.delete({
        where: {
            id
        }
    })
    return result;
}

export const PostService = {
    createPost,
    deletePost,
    updatePost,
    getAllPost
}

/**
 * Limit = 5
 * Page = 1
 * Total = 50
 * skip = limit * page - limit
 * 
 * 5*1-5 = 0
 * 5*2-5 = 5
 */