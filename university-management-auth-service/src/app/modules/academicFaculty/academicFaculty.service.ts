import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicFacultySearchableFields } from './academicFaculty.constants';
import {
  IAcademicFacultyFilters
} from './academicFaculty.interfaces';
// import { AcademicFaculty } from './academicFaculty.model';
import { AcademicFaculty, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createFaculty = async (payload: AcademicFaculty) => {
  const result = await prisma.academicFaculty.create({
    data: payload
  })
  // const result = await AcademicFaculty.create(payload);
  return result;
};

const getSingleFaculty = async (id: string): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({ where: { id } })
  return result;
};

const getAllFaculties = async (filters: IAcademicFacultyFilters, paginationOptions: IPaginationOptions
): Promise<IGenericResponse<AcademicFaculty[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: academicFacultySearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    })
  }
  // if (searchTerm) {
  //   andConditions.push({
  //     $or: academicFacultySearchableFields.map(field => ({
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
  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map((keys) => ({
        [keys]: {
          equals: (filtersData as any)[keys]
        }
      }))
    })
  }

  // Dynamic sort needs  fields to  do sorting
  // const sortConditions: { [key: string]: SortOrder } = {};
  // if (sortBy && sortOrder) {
  //   sortConditions[sortBy] = sortOrder;
  // }

  // If there is no condition , put {} to give all data
  const whereConditions: Prisma.AcademicFacultyWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.academicFaculty.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortBy && sortOrder ? 
    { [sortBy]: sortOrder } 
    : { createdAt: 'desc' }
  })
  // const result = await AcademicFaculty.find(whereConditions)
  //   .sort(sortConditions)
  //   .skip(skip)
  //   .limit(limit);
  const total = await prisma.academicDepartment.count();
  // const total = await AcademicFaculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateFaculty = async (id: string, payload: Partial<AcademicFaculty>): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.update({
    where: {
      id
    },
    data: payload
  })
  // const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
  //   new: true,
  // });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.delete({ where: { id } })
  // const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteByIdFromDB,
};
