import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicDepartmentSearchableFields } from './academicDepartment.constants';
import {
  IAcademicDepartmentFilters
} from './academicDepartment.interfaces';
// import { AcademicDepartment } from './academicDepartment.model';
import { AcademicDepartment, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createDepartment = async (payload: AcademicDepartment): Promise<AcademicDepartment | null> => {
  const result = prisma.academicDepartment.create({
    data: payload
  })
  // const result = (await AcademicDepartment.create(payload)).populate('academicFaculty');
  return result;
};

const getSingleDepartment = async (id: string): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({ where: { id } })
  // const result = await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};

const getAllDepartments = async (filters: IAcademicDepartmentFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<AcademicDepartment[]>> => {
  const { limit, page, skip, sortBy, sortOrder } = paginationHelpers.calculatePagination(paginationOptions);

  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      OR: academicDepartmentSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    })
  }
  // if (searchTerm) {
  //   andConditions.push({
  //     $or: academicDepartmentSearchableFields.map(field => ({
  //       [field]: {
  //         $regex: searchTerm,
  //         $paginationOptions: 'i',
  //       },
  //     })),
  //   });
  // }

  // Filters needs $and to fullfill all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.keys(filtersData).map((field) => ({
        [field]: {
          equals: (filtersData as any)[field]
        }
      }))
    })
  }
  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => ({
  //       [field]: value,
  //     })),
  //   });
  // }

  // Dynamic  Sort needs  field to  do sorting
  // const sortConditions: { [key: string]: SortOrder } = {};
  // if (sortBy && sortOrder) {
  //   sortConditions[sortBy] = sortOrder;
  // }

  // If there is no condition , put {} to give all data
  const whereConditions: Prisma.AcademicDepartmentWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // const result = await AcademicDepartment.find(whereConditions)
  //   .populate('academicFaculty')
  //   .sort(sortConditions)
  //   .skip(skip)
  //   .limit(limit);

  const total = await prisma.academicDepartment.count();
  const result = await prisma.academicDepartment.findMany(
    {
      where: whereConditions,
      skip: skip,
      take: limit,
      orderBy: sortBy && sortOrder ? {
        [sortBy]: sortOrder
      }
        : {
          createdAt: 'desc'
        }
    }
  )
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateDepartment = async (id: string, payload: Partial<AcademicDepartment>): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.update({
    where: { id },
    data: payload
  })
  // const result = await AcademicDepartment.findOneAndUpdate({ _id: id },payload,{new: true,}
  // ).populate('academicFaculty');
  return result;
};

const deleteDepartment = async (id: string): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.delete({ where: { id } })
  // const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const AcademicDepartmentService = {
  createDepartment,
  getSingleDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
};
