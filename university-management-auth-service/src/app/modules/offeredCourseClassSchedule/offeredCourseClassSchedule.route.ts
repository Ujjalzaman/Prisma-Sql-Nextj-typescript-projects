import express from 'express';
import { OfferedCourseClassScheduleController } from './offeredCourseClassSchedule.controller';

const router = express.Router();

router.post('/create', OfferedCourseClassScheduleController.createOfferedCourseClassSchedule);
router.get('/', OfferedCourseClassScheduleController.getAllFromDB);
// router.get('/:id', SemesterRegistrationController.getSingleSemesterRegistration);
// router.patch('/:id', SemesterRegistrationController.updateSemesterRegistration);
// router.delete('/:id', SemesterRegistrationController.deleteSemesterRegistration);

export const OfferedCourseClassScheduleRoute = router;