/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllFacultiesisable @typescript-eslint/no-explicit-any */
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import { facultySearchableFields } from './faculty.constant';
import { IFacultyFilters } from './faculty.interface';
// import { Faculty } from './faculty.model';
import { Faculty, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';


const creatFaculty = async (payload: Faculty): Promise<Faculty> => {
  const result = await prisma.faculty.create({
    data: payload
  })
  return result;
}

const getSingleFaculty = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.findUnique({
    where: {
      id
    }
  })
  // const result = await Faculty.findOne({ id })
  //   .populate('academicDepartment')
  //   .populate('academicFaculty');

  return result;
};

const getAllFaculties = async (filters: IFacultyFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<Faculty[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: facultySearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insesitive'
        }
      }))
    })
  }
  // if (searchTerm) {
  //   andConditions.push({
  //     $or: facultySearchableFields.map(field => ({
  //       [field]: {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     })),
  //   });
  // }
  // Filters needs $and to fullfill all the conditions
  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => ({
  //       [field]: value,
  //     })),
  //   });
  // }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.keys(filtersData).map((field) => ({
        [field]: {
          equals: (filtersData as any)[field]
        }
      }))
    })
  }

  // Dynamic  Sort needs  field to  do sorting
  // const sortConditions: { [key: string]: SortOrder } = {};
  // if (sortBy && sortOrder) {
  //   sortConditions[sortBy] = sortOrder;
  // }
  const whereConditions: Prisma.FacultyWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.faculty.findMany({
    skip: skip,
    take: limit,
    where: whereConditions,
    orderBy: sortBy && sortOrder ? {
      [sortBy]: sortOrder
    } :
      {
        createdAt: 'desc'
      }
  })

  // const result = await Faculty.find(whereConditions)
  //   .populate('academicDepartment')
  //   .populate('academicFaculty')
  //   .sort(sortConditions)
  //   .skip(skip)
  //   .limit(limit);
  const total = await prisma.faculty.count();
  // const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateFaculty = async (id: string, payload: Partial<Faculty>): Promise<Faculty | null> => {

  const result = await prisma.faculty.update({
    where: {
      id
    },
    data: payload
  })
  // const isExist = await Faculty.findOne({ id });

  // if (!isExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  // }

  // const { name, ...FacultyData } = payload;
  // const updatedFacultyData: Partial<IFaculty> = { ...FacultyData };

  // if (name && Object.keys(name).length > 0) {
  //   Object.keys(name).forEach(key => {
  //     const nameKey = `name.${key}` as keyof Partial<IFaculty>;
  //     (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
  //   });
  // }

  // const result = await Faculty.findOneAndUpdate({ id }, updatedFacultyData, {
  //   new: true,
  // });
  return result;
};

const deleteFaculty = async (id: string): Promise<Faculty | null> => {
  const result = await prisma.faculty.delete({
    where: {
      id
    }
  })
  return result;
  // check if the faculty is exist
  // const isExist = await Faculty.findOne({ id });

  // if (!isExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  // }

  // const session = await mongoose.startSession();

  // try {
  //   session.startTransaction();
  //   //delete faculty first
  //   const faculty = await Faculty.findOneAndDelete({ id }, { session });
  //   if (!faculty) {
  //     throw new ApiError(404, 'Failed to delete student');
  //   }
  //   //delete user
  //   await User.deleteOne({ id });
  //   session.commitTransaction();
  //   session.endSession();

  //   return faculty;
  // } catch (error) {
  //   session.abortTransaction();
  //   throw error;
  // }
};

export const FacultyService = {
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
  creatFaculty
};
