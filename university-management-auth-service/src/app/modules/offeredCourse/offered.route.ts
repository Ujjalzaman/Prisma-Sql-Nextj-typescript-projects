import express from 'express';
import { OfferedCourseController } from './offeredCourse.controller';

const router = express.Router();

router.post('/create', OfferedCourseController.createOfferedCourse);
router.get('/', OfferedCourseController.getAllOfferedCourse);
router.get('/:id', OfferedCourseController.getSingleOfferedCourse);
router.patch('/:id', OfferedCourseController.updateOfferedCourse);
router.delete('/:id', OfferedCourseController.deleteOfferedCourse);

export const OfferedCourseRouter = router;