import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BuildingController } from './building.controller';

const router = express.Router();

router.post('/create-building',
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.FACULTY,
    ),
    BuildingController.createBuilding);
router.get('/', BuildingController.getBuilding);

export const BuildingRouter = router;