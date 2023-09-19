import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CourseController } from './course.controller';

const router = express.Router();

router.get('/:id',
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.FACULTY,
    ),
    CourseController.getSingleCourses);
router.post('/create-course',
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.FACULTY,
    ),
    CourseController.createCourse);


router.get('/',
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.FACULTY,
    ),
    CourseController.getAllCourses);

router.delete('/:id',
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.FACULTY,
    ),
    CourseController.deleteCourses);

router.patch('/:id',
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.FACULTY,
    ),
    CourseController.updateCourses);

export const CourseRouter = router;