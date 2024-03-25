import express from "express";
import {movieController} from "../controllers/movie.controller";
import { validateMongooseId } from "../middlewares/mongoose";
import { MovieUser } from "../middlewares/validations/movie_user";
import { MovieValidation } from "../schema/movie_schema";

export const movieRouter = express.Router();

movieRouter.get('/', movieController.getAll);
movieRouter.post('/',MovieUser(MovieValidation), movieController.create);
movieRouter.get('/:movieId',validateMongooseId, movieController.getById);
movieRouter.put('/:movieId', movieController.updateById);
movieRouter.delete('/:movieId', movieController.deleteById);
