import express from 'express';
import { ProfileController } from './profile.controller';

const router = express.Router();
router.post('/create-profile', ProfileController.insertIntoDbController);

export const ProfileRoutes = router;