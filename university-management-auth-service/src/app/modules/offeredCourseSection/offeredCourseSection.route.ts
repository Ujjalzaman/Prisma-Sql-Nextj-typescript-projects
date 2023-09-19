import express from 'express';
import { OfferedCourseSectionController } from './offeredCourseSection.controller';

const router = express.Router();

router.post('/create', OfferedCourseSectionController.createOfferedCourseSection);
router.get('/', OfferedCourseSectionController.getAllOfferedCourseSection);
router.get('/:id', OfferedCourseSectionController.getSingleOfferedCourseSection);
router.patch('/:id', OfferedCourseSectionController.updateOfferedCourseSection);
router.delete('/:id', OfferedCourseSectionController.deleteOfferedCourseSection);

export const OfferedCourseSectionRouter = router;