import express from 'express';
import userController from '../controllers/user_controller';
import { customError } from '../middlewares/validations/custom_error';
import { userValidation } from '../schema/user_validaton';

export const userRoute = express.Router();
userRoute.post('/', customError(userValidation), userController.create);
userRoute.get('/', userController.getAll);

