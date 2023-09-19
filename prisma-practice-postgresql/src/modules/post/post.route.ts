import express from 'express';
import { PostController } from './post.controller';

const router = express.Router();

router.post('/create-post', PostController.insertIntoDbController);
router.get('/', PostController.getAllPost);
router.patch('/:id', PostController.UpdatePost);
router.delete('/:id', PostController.detelePost);

export const PostRoutes = router;