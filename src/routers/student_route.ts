import express from 'express';
import {index} from '../controllers/student_controller';

export const studentRouter = express.Router();
studentRouter.get('/', index);