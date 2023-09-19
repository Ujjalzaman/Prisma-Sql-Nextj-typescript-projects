import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Academic Department'
    }),
    academicFacultyId: z.string({
      required_error:'Academic Department Id is Required'
    })
  })
})

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    academicFacultyId: z.string().optional(),
  })
})

// const createAcademicDepartmentZodSchema = z.object({
//   body: z.object({
//     title: z.string({
//       required_error: 'Academic title is required',
//     }),
//     academicFaculty: z.string({
//       required_error: 'Academic department is required',
//     }),
//   }),
// });

// const updateAcademicDepartmentZodSchema = z.object({
//   body: z.object({
//     title: z.string().optional(),
//     academicFaculty: z.string().optional(),
//   }),
// });

export const AcademicDepartmentValidation = {
  create,
  update,
};
