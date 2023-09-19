import express, { Application } from 'express'
import cors from 'cors';
import { UserRoutes } from './modules/user/user.route';
import { PostRoutes } from './modules/post/post.route';
import { ProfileRoutes } from './modules/profile/profile.route';
import { CategoryRoutes } from './modules/category/category.route';
const app:Application = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/post', PostRoutes);
app.use('/api/v1/profile', ProfileRoutes);
app.use('/api/v1/category', CategoryRoutes);

export default app;