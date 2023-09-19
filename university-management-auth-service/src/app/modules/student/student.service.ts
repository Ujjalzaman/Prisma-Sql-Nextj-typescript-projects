/* eslint-disable @typescript-eslint/no-explicit-any */
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';

import { Prisma, Student } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { studentSearchableFields } from './student.constant';
import { IStudentFilters } from './student.interface';
// import { Student } from './student.model';

const creatStudent = async (payload: Student): Promise<Student> => {
  const result = await prisma.student.create({
    data: payload
  })
  return result;
}

const getAllStudents = async (filters: IStudentFilters,paginationOptions: IPaginationOptions): Promise<IGenericResponse<Student[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];
  // Search needs $or for searching in specified fields
  if(searchTerm){
    andConditions.push({
      OR: studentSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insesitive'
        }
      }))
    })
  }
  // if (searchTerm) {
  //   andConditions.push({
  //     $or: studentSearchableFields.map(field => ({
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
  if(Object.keys(filtersData).length){
    andConditions.push({
      AND: Object.keys(filtersData).map((field) => ({
        [field]: {
          equals: (filtersData as any )[field]
        }
      }))
    })
  }

  // Dynamic  Sort needs  field to  do sorting
  // const sortConditions: { [key: string]: SortOrder } = {};
  // if (sortBy && sortOrder) {
  //   sortConditions[sortBy] = sortOrder;
  // }
  const whereConditions: Prisma.StudentWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.student.findMany({
    where: whereConditions,
    skip: skip,
    take: limit,
    orderBy: sortBy && sortOrder ? {
      [sortBy]: sortOrder
    }:{
      createdAt: 'desc'
    }
  })
  // const result = await Student.find(whereConditions)
  //   .populate('academicSemester')
  //   .populate('academicDepartment')
  //   .populate('academicFaculty')
  //   .sort(sortConditions)
  //   .skip(skip)
  //   .limit(limit);
  const total = await prisma.student.count();
  // const total = await Student.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.findUnique({where: {id}})
  // const result = await Student.findOne({ id })
  //   .populate('academicSemester')
  //   .populate('academicDepartment')
  //   .populate('academicFaculty');
  return result;
};

const updateStudent = async (id: string,payload: Partial<Student>): Promise<Student | null> => {
  const result = await prisma.student.update({
    where:{
      id
    },
    data: payload
  })
  // const isExist = await Student.findOne({ id });

  // if (!isExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !');
  // }

  // const { name, guardian, localGuardian, ...studentData } = payload;

  // const updatedStudentData: Partial<IStudent> = { ...studentData };

  // if (name && Object.keys(name).length > 0) {
  //   Object.keys(name).forEach(key => {
  //     const nameKey = `name.${key}` as keyof Partial<IStudent>; // `name.fisrtName`
  //     (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
  //   });
  // }
  // if (guardian && Object.keys(guardian).length > 0) {
  //   Object.keys(guardian).forEach(key => {
  //     const guardianKey = `guardian.${key}` as keyof Partial<IStudent>; // `guardian.fisrtguardian`
  //     (updatedStudentData as any)[guardianKey] =
  //       guardian[key as keyof typeof guardian];
  //   });
  // }
  // if (localGuardian && Object.keys(localGuardian).length > 0) {
  //   Object.keys(localGuardian).forEach(key => {
  //     const localGuradianKey =
  //       `localGuardian.${key}` as keyof Partial<IStudent>; // `localGuardian.fisrtName`
  //     (updatedStudentData as any)[localGuradianKey] =
  //       localGuardian[key as keyof typeof localGuardian];
  //   });
  // }

  // const result = await Student.findOneAndUpdate({ id }, updatedStudentData, {
  //   new: true,
  // });
  return result;
};

const deleteStudent = async (id: string): Promise<Student | null> => {
  const result = await prisma.student.delete({ where: { id } })
  return result;
  // check if the student is exist
  // const isExist = await Student.findOne({ id });

  // if (!isExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'Student not found !');
  // }

  // const session = await mongoose.startSession();

  // try {
  //   session.startTransaction();
  //   //delete student first
  //   const student = await Student.findOneAndDelete({ id }, { session });
  //   if (!student) {
  //     throw new ApiError(404, 'Failed to delete student');
  //   }
  //   //delete user
  //   await User.deleteOne({ id });
  //   session.commitTransaction();
  //   session.endSession();

  //   return student;
  // } catch (error) {
  //   session.abortTransaction();
  //   throw error;
  // }
};

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  creatStudent
};
