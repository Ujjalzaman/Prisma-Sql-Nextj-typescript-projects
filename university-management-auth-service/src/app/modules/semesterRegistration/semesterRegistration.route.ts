import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import { SemseterRegistrationValidtion } from './semesterRegistration.validation';

const router = express.Router();

router.post('/start-student-registration', auth(ENUM_USER_ROLE.STUDENT),
    SemesterRegistrationController.StartMyRegistration);
router.post('/enroll-course', auth(ENUM_USER_ROLE.STUDENT),
    validateRequest(SemseterRegistrationValidtion.enrolledOrWithdrawCourse), 
    SemesterRegistrationController.EnrollIntoCourse);
router.post('/withdraw-course',
    validateRequest(SemseterRegistrationValidtion.enrolledOrWithdrawCourse), 
    auth(ENUM_USER_ROLE.STUDENT),
    SemesterRegistrationController.WithdrawFromCourse);

router.post('/confirm-registration', auth(ENUM_USER_ROLE.STUDENT),
    SemesterRegistrationController.ConfirmMyRegistrtion);

router.get('/get-my-registration', auth(ENUM_USER_ROLE.STUDENT),
    SemesterRegistrationController.getMyRegistration);

router.post('/create', SemesterRegistrationController.createSemesterRegistration);
router.get('/', SemesterRegistrationController.getAllSemesterRegistration);
router.get('/:id', SemesterRegistrationController.getSingleSemesterRegistration);
router.patch('/:id', SemesterRegistrationController.updateSemesterRegistration);
router.delete('/:id', SemesterRegistrationController.deleteSemesterRegistration);

export const SemesterRegistrationRouter = router;