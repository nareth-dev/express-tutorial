import express from 'express';
import userController from '../controllers/user_controller';

export const userRoute = express.Router();
userRoute.post('/', userController.create);
userRoute.get('/', userController.getAll);