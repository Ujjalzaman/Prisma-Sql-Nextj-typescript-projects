import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  academicSemesterSearchableFields
} from './academicSemester.constant';
import {
  IAcademicSemesterFilters
} from './academicSemester.interface';
// import { AcademicSemester } from './academicSemester.model';
import { AcademicSemester, Prisma } from '@prisma/client';
import prisma from '../../../shared/prisma';


const createSemester = async (AcademicSemesterData: AcademicSemester): Promise<AcademicSemester> => {
  const result = prisma.academicSemester.create({
    data: AcademicSemesterData
  })
  return result;

  // if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  // }
  // const result = await AcademicSemester.create(payload);
};

const getSingleSemester = async (id: string): Promise<AcademicSemester | null> => {
  const result = prisma.academicSemester.findUnique({
    where: {
      id
    }
  })
  // const result = await AcademicSemester.findById(id);
  return result;
};

const getAllsemesters = async (filters: IAcademicSemesterFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<AcademicSemester[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      OR: academicSemesterSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    })
  }

  if(Object.keys(filtersData).length > 0){
    andConditions.push({
      AND: Object.keys(filtersData).map((key)=> ({
        [key]: {
          equals: (filtersData as any)[key]
        }
      }))
    })
  }

  const whereCondition: Prisma.AcademicSemesterWhereInput = andConditions.length > 0 ? {AND: andConditions} : {}
  
  const result = await prisma.academicSemester.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: sortBy && sortOrder ? {
      [sortBy]: sortOrder
    }
    : {
      createdAt: 'desc'
    }
  })

  const total = await prisma.academicSemester.count();
  // Search needs $or for searching in specified fields
  // if (searchTerm) {
  //   andConditions.push({
  //     $or: academicSemesterSearchableFields.map(field => ({
  //       [field]: {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     })),
  //   });
  // }

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
  // const whereConditions =
  //   andConditions.length > 0 ? { $and: andConditions } : {};

  // const result = await AcademicSemester.find(whereConditions)
  //   .sort(sortConditions)
  //   .skip(skip)
  //   .limit(limit);

  // const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateSemester = async (id: string, payload: Partial<AcademicSemester>): Promise<AcademicSemester | null> => {
  const result = prisma.academicSemester.update({
    where: {
      id
    },
    data: payload
  })
  // if (
  //   payload.title &&
  //   payload.code &&
  //   academicSemesterTitleCodeMapper[payload.title] !== payload.code
  // ) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  // }

  // const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
  //   new: true,
  // });
  return result;
};

const deleteSemester = async (id: string): Promise<AcademicSemester | null> => {
  const result = prisma.academicSemester.delete({
    where: {
      id
    }
  })
  // const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getSingleSemester,
  getAllsemesters,
  updateSemester,
  deleteSemester,
};
