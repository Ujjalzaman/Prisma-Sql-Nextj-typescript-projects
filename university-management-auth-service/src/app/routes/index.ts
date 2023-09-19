import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.routes';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BuildingRouter } from '../modules/building/building.route';
import { CourseRouter } from '../modules/course/course.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { ManagementDepartmentRoutes } from '../modules/managementDepartment/managementDepartment.route';
import { OfferedCourseRouter } from '../modules/offeredCourse/offered.route';
import { OfferedCourseClassScheduleRoute } from '../modules/offeredCourseClassSchedule/offeredCourseClassSchedule.route';
import { OfferedCourseSectionRouter } from '../modules/offeredCourseSection/offeredCourseSection.route';
import { RoomRouter } from '../modules/room/room.route';
import { SemesterRegistrationRouter } from '../modules/semesterRegistration/semesterRegistration.route';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/management-departments',
    route: ManagementDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/rooms',
    route: RoomRouter,
  },
  {
    path: '/buildings',
    route: BuildingRouter,
  },
  {
    path: '/courses',
    route: CourseRouter,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/semester-registration',
    route: SemesterRegistrationRouter,
  },
  {
    path: '/offered-course',
    route: OfferedCourseRouter,
  },
  {
    path: '/offered-course-section',
    route: OfferedCourseSectionRouter,
  },
  {
    path: '/offered-course-class-schedule',
    route: OfferedCourseClassScheduleRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
