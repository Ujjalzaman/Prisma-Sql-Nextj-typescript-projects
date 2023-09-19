import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.post('/create-user', userController.insertIntoDbController);
router.post('/update-profile', userController.createUserOrUpdate);
router.get('/', userController.getUsers);
router.get('/:id', userController.geteSingleUser);

export const UserRoutes = router;